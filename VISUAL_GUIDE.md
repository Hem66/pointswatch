# RewardWatch - Visual Design Guide

Complete visual and UI reference for the RewardWatch platform.

---

## 🎨 Design System Overview

### Color Palette

```
PRIMARY CYAN
━━━━━━━━━━━━━━━━━━━━━
HSL(180, 100%, 50%)
RGB(0, 217, 255)
HEX #00D9FF

Used for: Main buttons, highlights, active states

━━━━━━━━━━━━━━━━━━━━━
ACCENT CYAN
━━━━━━━━━━━━━━━━━━━━━
HSL(180, 90%, 55%)
RGB(0, 229, 255)
HEX #00E5FF

Used for: Secondary actions, accents

━━━━━━━━━━━━━━━━━━━━━
BACKGROUND
━━━━━━━━━━━━━━━━━━━━━
HSL(200, 40%, 6%)
RGB(15, 31, 46)
HEX #0F1F2E

Used for: Page background, main surface

━━━━━━━━━━━━━━━━━━━━━
CARD BACKGROUND
━━━━━━━━━━━━━━━━━━━━━
HSL(200, 50%, 12%)
RGB(26, 58, 82)
HEX #1A3A52

Used for: Card surfaces, elevated elements

━━━━━━━━━━━━━━━━━━━━━
SECONDARY
━━━━━━━━━━━━━━━━━━━━━
HSL(200, 60%, 25%)
RGB(26, 102, 153)
HEX #1A6699

Used for: Hover states, secondary elements

━━━━━━━━━━━━━━━━━━━━━
MUTED
━━━━━━━━━━━━━━━━━━━━━
HSL(200, 20%, 30%)
RGB(61, 91, 112)
HEX #3D5B70

Used for: Secondary text, disabled states
```

### Typography

```
HEADING 1
═════════════════════════════════════════
Font: Geist Sans Bold
Size: 2.25rem (36px) - 3rem (48px)
Line Height: 1.2
Letter Spacing: -0.02em
Color: #FFFFFF (foreground)

"Welcome to RewardWatch"

HEADING 2
═════════════════════════════════════════
Font: Geist Sans Bold
Size: 1.875rem (30px) - 2.25rem (36px)
Line Height: 1.3
Letter Spacing: -0.01em
Color: #FFFFFF

"Task Tiers"

HEADING 3
═════════════════════════════════════════
Font: Geist Sans Semibold
Size: 1.25rem (20px)
Line Height: 1.4
Color: #FFFFFF

"Bronze Tier"

BODY TEXT
═════════════════════════════════════════
Font: Geist Sans Regular
Size: 1rem (16px)
Line Height: 1.5
Color: #E5E7EB (foreground)

"Complete tasks to earn rewards"

SMALL TEXT
═════════════════════════════════════════
Font: Geist Sans Regular
Size: 0.875rem (14px)
Line Height: 1.5
Color: #9CA3AF (muted-foreground)

"Updated 2 hours ago"

CODE / MONO
═════════════════════════════════════════
Font: Geist Mono Regular
Size: 0.875rem
Color: #3B82F6
Background: #1F2937

`REWARD2024ABC`
```

---

## 🏗️ Layout Structure

### Hero Section
```
┌─────────────────────────────────────────────┐
│  RewardWatch Logo                  Sign In  │
└─────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────┐
│                      │                      │
│   Hero Copy         │   Hero Visual       │
│   Button CTA        │   (Large Graphic)   │
│                      │                      │
└──────────────────────┴──────────────────────┘

Stats Row:
┌──────────────┬──────────────┬──────────────┐
│  50K Users   │  $2.5M Paid  │   4.8★ Rate  │
└──────────────┴──────────────┴──────────────┘
```

### Dashboard Layout
```
┌──────────────────────────────────────────────┐
│  ⌚ RewardWatch    📊 📋 🏆 🤝 👤    🔔 👤  │
│  ───────────────────────────────────────────│
│     Dashboard | Tasks | Leaderboard ...     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│                                              │
│  Welcome Header                              │
│  ┌────────┬────────┬────────┬────────┐      │
│  │ Points │ Rewards│ Level  │Referral│      │
│  │ 12450  │ $245   │   8    │  23    │      │
│  └────────┴────────┴────────┴────────┘      │
│                                              │
│  Tier Progress                               │
│  ████████░ Diamond 80%                      │
│                                              │
└──────────────────────────────────────────────┘

Task Section:
┌──────────────────────────────────────────────┐
│  Bronze Tier  ▼                              │
│  ┌──────────────────────────────────────┐   │
│  │ 📺 Watch Video                       │   │
│  │    Watch featured video (5+ min)     │   │
│  │    ⭐ 100 points    💰 $2.50        │   │
│  │                          [Watch]    │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

### Card Component
```
┌──────────────────────────────────────────┐
│  📊                                       │
│  Total Points              (+350 week)    │
│  12,450                                   │
│                                           │
└──────────────────────────────────────────┘

Styling:
- Border: 1px solid --border/50
- Background: linear gradient from-card to-card/50
- Border Radius: 12px
- Padding: 24px
- Hover: border-primary/50 scale-105
```

---

## 🎬 Component Examples

### Stat Card
```
┌─────────────────────────────────────┐
│ ⭐  Total Points                    │
│     12,450                          │
│                                     │
│ +350 this week     ▲                │
└─────────────────────────────────────┘
```

### Task Card
```
┌───────────────────────────────────────────┐
│ 📺 Watch YouTube Video                    │
│    Watch a featured video (5+ min)        │
│    ⭐ 100 points    💰 $2.50              │
│                          [Watch Now]      │
└───────────────────────────────────────────┘
```

### Achievement Badge
```
┌─────────────────────┐
│        🏆           │
│   Task Master       │
│  Complete 50 tasks  │
│                     │
│ Unlocked 1 week ago │
└─────────────────────┘
```

### Leaderboard Row
```
┌────┬──────────────┬────────┬────────┬──────────┐
│ #1 │ 👑 User Name │ Gold   │ 45,230 │ +2,450   │
├────┼──────────────┼────────┼────────┼──────────┤
│ #2 │ ⚡ Task Hero │ Silver │ 38,900 │ +1,890   │
└────┴──────────────┴────────┴────────┴──────────┘
```

### Notification
```
┌─────────────────────────────────────┐
│ 🎉 Reward Claimed!                  │
│    You earned $10.00                │
│    2 min ago            [unread ●]  │
└─────────────────────────────────────┘
```

---

## 📐 Spacing Scale

```
Space Value | Tailwind Class | Usage
─────────────────────────────────────
4px         │ p-1, m-1, gap-1 │ Small gaps
8px         │ p-2, m-2, gap-2 │ Form spacing
12px        │ p-3, m-3, gap-3 │ Component spacing
16px        │ p-4, m-4, gap-4 │ Default spacing
20px        │ p-5, m-5, gap-5 │ Card padding
24px        │ p-6, m-6, gap-6 │ Section spacing
32px        │ p-8, m-8, gap-8 │ Large gaps
48px        │ p-12, m-12      │ Section padding
64px        │ p-16, m-16      │ Hero spacing
```

---

## 🎯 Button Styles

### Primary Button
```
┌──────────────────┐
│  Create Account  │
└──────────────────┘

Background: #00D9FF (primary)
Color: #0F1F2E (primary-foreground)
Padding: 12px 24px
Border Radius: 12px
Font Weight: 600
Hover: opacity 90%, scale 105%
```

### Outline Button
```
┌──────────────────┐
│   Back to Login  │
└──────────────────┘

Background: transparent
Border: 1px solid --border/50
Color: #FFFFFF (foreground)
Padding: 12px 24px
Border Radius: 12px
Hover: bg-secondary/50
```

### Ghost Button
```
┌──────────────────┐
│   View More      │
└──────────────────┘

Background: transparent
Color: #00E5FF (accent)
Border: none
Padding: 8px 16px
Hover: underline
```

---

## 🌈 Gradient Usage

### Primary to Accent
```
Background: linear-gradient(to right, #00D9FF, #00E5FF)
Used for: Hero section, feature highlights
```

### Card Gradient
```
Background: linear-gradient(to br, rgba(0,217,255,0.1), rgba(0,229,255,0.05))
Used for: Card backgrounds for visual interest
```

### Text Gradient
```
Background: linear-gradient(to right, #00D9FF, #00E5FF)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
Used for: Headings, important text
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
```
┌─────────────┐
│ RewardWatch │  [🔔]
├─────────────┤
│ Tabs scroll │  (horizontal)
├─────────────┤
│ Card        │
│ (full width)│
│             │
├─────────────┤
│ Card        │
│ (full width)│
│             │
└─────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────┐
│ RewardWatch       Tabs      [🔔]  │
├──────────────┬───────────────────┤
│ Card 1       │ Card 2            │
│ (2 cols)     │ (2 cols)          │
├──────────────┼───────────────────┤
│ Card 3       │ Card 4            │
└──────────────┴───────────────────┘
```

### Desktop (> 1024px)
```
┌─────────────────────────────────────────────┐
│ RewardWatch    Tabs...        Notif [👤]    │
├─────────────────────────────────────────────┤
│ Card 1        Card 2        Card 3          │
│ Card 4        Card 5        Card 6          │
│ Large Section (full width)                   │
│                                              │
│ Table (scrollable if needed)                 │
└─────────────────────────────────────────────┘
```

---

## 🎭 Interactive States

### Button States
```
NORMAL
┌──────────┐
│  Button  │
└──────────┘

HOVER
┌──────────┐ ← Lighter, scale up
│  Button  │
└──────────┘

ACTIVE/PRESSED
┌──────────┐ ← Darker shade
│  Button  │
└──────────┘

DISABLED
┌──────────┐ ← Grayed out, 50% opacity
│  Button  │
└──────────┘
```

### Card Hover
```
NORMAL
┌─────────────────┐
│ Card Content    │
│                 │
└─────────────────┘

HOVER
┌─────────────────┐ ← Border color changes
│ Card Content    │ ← Background slightly lighter
│                 │
└─────────────────┘
```

---

## 🎞️ Animation Effects

### Fade In
```
Duration: 300ms
Easing: ease-in-out
Opacity: 0 → 1
Used for: Page transitions
```

### Scale
```
Duration: 300ms
Transform: scale(1) → scale(1.05)
Used for: Hover states
```

### Bounce
```
Duration: 1s (infinite)
Transform: translateY
Used for: Icons, attention grabbers
```

### Slide
```
Duration: 500ms
Transform: translateX/Y
Used for: Modals, sidebars
```

---

## 📊 Data Visualization

### Progress Bar
```
└─────────────────┘  ← Container
█████████░░░░░░░░  80% Complete
```

### Tier Badge
```
┌────────┐
│  Gold  │ ← Gradient background
│ Tier 8 │
└────────┘
```

### Leaderboard Position
```
🏆 #1  (Gold border, special styling)
🥈 #2  (Silver styling)
🥉 #3  (Bronze styling)
#4-#10 (Standard styling)
```

---

## 🔆 Light/Dark Considerations

### Current: Dark Mode Only
- Dark background (#0F1F2E)
- Light text (#FFFFFF)
- Bright accents (cyan)
- High contrast for accessibility

### For Light Mode (Future)
- White background
- Dark text
- Muted accent colors
- Reduced saturation

---

## 🧪 Component Patterns

### Card Pattern
```tsx
<Card className="bg-card/50 border-border/50 p-6 hover:border-primary/50">
  {content}
</Card>
```

### Button Pattern
```tsx
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  {label}
</Button>
```

### Text Pattern
```tsx
<h2 className="text-2xl font-bold text-foreground">{title}</h2>
<p className="text-muted-foreground">{description}</p>
```

### Grid Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items}
</div>
```

---

## 🎨 Color Application Guide

### Where to Use Each Color

**Primary (Cyan #00D9FF)**
- Main action buttons
- Active tab indicator
- Stat highlights
- Links
- Badges

**Accent (Light Cyan #00E5FF)**
- Secondary buttons
- Text highlights
- Earnings display
- Gradients

**Background (Dark #0F1F2E)**
- Page background
- Large surfaces
- Container backgrounds

**Card (Dark Slate #1A3A52)**
- Card/component backgrounds
- Sections
- Modals
- Overlays

**Muted (Gray)**
- Secondary text
- Disabled states
- Borders
- Separators

---

## 📋 Accessibility in Design

✅ **Color Contrast**
- Text on background: AAA compliant
- Interactive elements: Clear visual indicator
- Don't rely on color alone

✅ **Typography**
- Minimum 14px for body text
- 1.4-1.6 line height for readability
- Clear heading hierarchy

✅ **Spacing**
- Touch targets: 48px minimum
- Adequate white space
- Visual grouping with gaps

✅ **Interactions**
- Visible focus states
- Clear hover effects
- Descriptive alt text
- Keyboard navigation support

---

## 🎯 Design Tokens Summary

```css
--primary: 180 100% 50%;          /* Cyan */
--accent: 180 90% 55%;            /* Light Cyan */
--background: 200 40% 6%;         /* Dark Blue */
--card: 200 50% 12%;              /* Dark Slate */
--secondary: 200 60% 25%;         /* Medium Blue */
--muted: 200 20% 30%;             /* Gray */
--foreground: 0 0% 98%;           /* White */
--border: 200 30% 20%;            /* Dark Gray */
--radius: 0.75rem;                /* 12px */
```

---

**Design Guidelines Complete!**

Use this guide to maintain consistency across components and pages.
