import { Controller, Post, Body, Get, Req, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserRole } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    const { email, password, displayName } = registerDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Assign SUPER_ADMIN role if it's the designated super admin email
    const role = email === 'sayedaljohon@gmail.com' ? UserRole.SUPER_ADMIN : UserRole.BUYER;

    const user = this.userRepository.create({
      email,
      passwordHash,
      displayName,
      role
    });

    await this.userRepository.save(user);

    // Do not return password hash
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { status: 'success', user: userWithoutPassword };
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Replace with a secure secret from config later
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'super-secret-local-key',
      { expiresIn: '1d' }
    );

    return { token, user: { id: user.id, email: user.email, role: user.role, displayName: user.displayName } };
  }

  @Get('me')
  async me(@Req() request: any) {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-local-key');
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
