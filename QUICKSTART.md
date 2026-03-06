# RewardWatch - Quick Start Guide

Get up and running with RewardWatch in 5 minutes!

## Installation

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd reward-watch

# Or download and extract the ZIP file
cd reward-watch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## User Flows

### Path 1: Authentication
1. **Home Page** (`/`) - See auth options
2. **Sign Up** - Create account with email/password + Web3 wallet
3. **Sign In** - Login with credentials

### Path 2: Dashboard Exploration
1. **Dashboard** (`/dashboard`) - View user stats and tier progress
2. **Tasks** - Browse tiered tasks and complete them
3. **Leaderboard** - Check global rankings and personal stats
4. **Referrals** - Share code and track earnings
5. **Profile** - Manage account and view achievements

### Path 3: Landing Page
1. **Home** (`/`) - Learn about platform
2. **Features** - See what makes RewardWatch special
3. **Testimonials** - Read user success stories
4. **Sign Up CTA** - Create account

---

## Key Pages

### Authentication Pages
- **`/`** - Main auth page with signup/login/welcome
  - Components: `SignUpForm`, `AuthHeader`
  - Features: Email validation, password matching, 2-step signup

### Dashboard Pages
- **`/dashboard`** - Main dashboard hub
  - Displays: User stats, task tiers, navigation
  - Components: `DashboardNav`, `UserStats`, `TaskTiers`

### Landing Pages
- **`/landing`** - Public information page
  - Shows: Features, testimonials, CTA buttons
  - No authentication required

---

## Component Hierarchy

```
App (Root)
├── Layout (app/layout.tsx)
├── Auth Pages
│   ├── Page (/) - Auth Entry Point
│   ├── SignUpForm
│   └── AuthHeader
├── Dashboard
│   ├── DashboardPage
│   ├── DashboardNav
│   ├── UserStats
│   ├── TaskTiers
│   ├── Leaderboard
│   ├── ReferralSection
│   ├── ProfileSection
│   └── NotificationCenter
├── Landing
│   └── LandingPage
└── Shared Components
    ├── TaskModal
    ├── AchievementBadge
    ├── StatsCard
    └── FeatureSpotlight
```

---

## Features Explained

### Task Tiers
**Bronze → Silver → Gold → Platinum**

- Each tier has different tasks
- Higher tiers = higher rewards
- Progress by accumulating points
- Locked tiers show with 🔒 icon

**Task Types:**
- 📺 YouTube video watching
- 📢 Subscribe to channels
- 💬 Share on social media
- 📋 Complete surveys
- 👥 Refer friends
- 🎥 Stream engagement
- ⛓️ Smart contract interaction

### Points & Rewards
- **Points**: Used for tier progression
- **Money**: USD, crypto, or tokens
- **Instant Payout**: Available in wallet
- **Commission**: From referrals (15% + more)

### Leaderboard
- Global rankings (50K+ users)
- Weekly competition
- Top 3 featured prominently
- Personal stats displayed

### Referral System
- Share referral code
- One-click sharing (WhatsApp, Twitter, Email)
- Multi-level commission:
  - Level 1: 15%
  - Level 2: 8%
  - Level 3: 3%

### Notifications
- Real-time task completion alerts
- Referral signup notifications
- Achievement unlocks
- System updates

---

## Customization

### Change App Name
```bash
# In multiple files:
# globals.css, layout.tsx, page.tsx, auth-header.tsx
# Replace "RewardWatch" with your name
```

### Update Colors
Edit `app/globals.css` in the `:root` section:
```css
--primary: 180 100% 50%;      /* Primary color */
--accent: 180 90% 55%;         /* Accent color */
--background: 200 40% 6%;      /* Background */
```

### Modify Task Tiers
Edit `components/dashboard/task-tiers.tsx`:
- Change tier names
- Add/remove tasks
- Adjust points and rewards
- Update icons

### Update Leaderboard Data
Edit `components/dashboard/leaderboard.tsx`:
- Modify sample user data
- Change tier colors
- Update achievement requirements

---

## Navigation

### Desktop
- Top navigation bar with tabs
- Sticky header stays visible
- One-click tab switching

### Mobile
- Horizontal scroll tabs
- Hamburger menu for settings
- Touch-friendly buttons

---

## Design System

### Colors
- **Primary**: Bright Cyan (#00D9FF)
- **Accent**: Light Cyan (#00E5FF)
- **Background**: Dark Blue (#0F1F2E)
- **Card**: Dark Slate (#1A3A52)

### Typography
- **Headings**: Geist Sans Bold
- **Body**: Geist Sans Regular
- **Code**: Geist Mono

### Components
- All use Tailwind CSS
- Responsive grid system
- Smooth animations
- Glassmorphism effects

---

## Common Tasks

### Accessing a Page
```tsx
// From any component
import Link from 'next/link'

<Link href="/dashboard">
  Go to Dashboard
</Link>
```

### Creating a New Task
```tsx
// In task-tiers.tsx, add to tasks array:
{
  id: 'task-999',
  name: 'New Task Name',
  description: 'What users need to do',
  points: 500,
  reward: 25.00,
  action: 'Start Task',
  completed: false,
  icon: '🎯',
}
```

### Adding a New Notification Type
```tsx
// In notification-center.tsx:
const notifications: Notification[] = [
  {
    id: 'new-1',
    type: 'your-type',
    title: 'Title',
    message: 'Message',
    icon: '🎉',
    timestamp: 'now',
    read: false,
  }
]

// Add color in getNotificationColor():
case 'your-type':
  return 'border-your-color/50 bg-your-color/5'
```

---

## Responsive Design

All pages are mobile-first:
- **Mobile** (< 640px): Full width, stacked layout
- **Tablet** (640px - 1024px): 2-column layout
- **Desktop** (> 1024px): Full multi-column grid

---

## Performance Tips

1. **Use Code Splitting**: Each page loads separately
2. **Lazy Loading**: Images load on demand
3. **CSS Optimization**: Only loaded styles needed
4. **Caching**: Browser cache for faster loads

---

## Deployment

### Deploy to Vercel (1 click)
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Auto-deploy on every push

```bash
npm run build
```

### Deploy to Other Platforms
See `DEPLOYMENT.md` for:
- AWS
- Netlify
- Docker
- Self-hosted

---

## Next Steps

### Backend Integration (When Ready)
- Set up database (Supabase/Neon)
- Implement authentication
- Create API routes
- Connect payment system

### Features to Add
- Email notifications
- Push notifications
- Advanced analytics
- Admin dashboard
- User moderation

### Enhancement Ideas
- Dark/light theme toggle
- Multi-language support
- Advanced filters
- User profiles
- Messaging system

---

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Styling Issues
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev
```

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **React Documentation**: https://react.dev

---

**Happy earning! 🚀**
