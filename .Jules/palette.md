## 2024-04-05 - Default Next.js Template Focus Indicators
**Learning:** The default Next.js template lacks explicit focus-visible states on its anchor tags out of the box, making keyboard navigation difficult to perceive for users relying on tab navigation.
**Action:** Always verify that interactive elements imported from or inspired by default templates have explicit `focus-visible` styles added (e.g. `focus-visible:ring-2`) to ensure keyboard accessibility compliance.
