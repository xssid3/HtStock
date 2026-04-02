# HTStock — Product Requirements Document
**Version:** 4.0 (Updated Edition)

## Overview
HTStock is a trusted, multi-vendor marketplace for digital assets.
This document reflects the updated decisions.

### Core Differences from Version 3.0:
1. **Stock Upload**: NO CSV. Everything is handled via a textbox for bulk/single product input. If duplicates are found, a notification allows the seller to merge, replace, cancel, or compare to keep one by one.
2. **Soft Deletes**: Sellers can view and download soft-deleted items. Super admins can see which products were deleted or sold by a seller.
3. **Pre-sale Chat**: Buyers can message sellers before purchasing. Sellers will instantly see the buyer's purchase history with their store.
4. **Staff Whisper Mode**: In dispute chats, staff (Admin, Moderator) can use a whisper mode to leave private notes visible only to other staff, along with seeing avatar/names of who replied.
5. **Fixed USD Wallets**: Crypto deposits are converted to a fixed USD amount. If crypto drops, the USD stays the same. If a buyer deposits $50 and the network fee makes it $49.50, they receive $49.50 and must deposit more to buy a $50 item.
6. **Gas Fees**: Sellers pay the withdrawal gas fees from their withdrawal amount.
7. **SLA Breach**: If manual delivery SLA is breached (e.g. 24h passes), the system auto-cancels and refunds the buyer.
8. **Dispute Resolution**: Disputes are handled mutually. Admins/Moderators will review buyer/seller rank and previous activity to make a final decision.
9. **Dynamic Pricing Flexibility**: Admins/Super Admins/Sellers can globally set price increases for products or categories.
10. **Storage**: Local file storage emulator (MinIO) will be used for development, swapping to Cloudflare R2 for production.
11. **UI/UX**: Clean, professional, "million dollar" developer look with a professional glassmorphism trend. Color coding for roles (Admin, Super Admin, User, Seller) and seller tiers. Super Admin can dynamically change colors.
12. **Database**: PostgreSQL (self-hosted open-source).
13. **Tech Stack**: Monorepo using React.js (Next.js), TypeScript, Tailwind CSS on the frontend, and NestJS on the backend.

*(Refer to previous PRD version for granular schema and endpoint descriptions, adjusting them to the new textbox inventory model).*
