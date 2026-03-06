# RewardWatch - Deployment Guide

This guide covers how to deploy RewardWatch to various platforms and set up backend integrations.

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Vercel Deployment (Recommended)

### Step 1: Connect to Vercel
```bash
npm i -g vercel
vercel
```

### Step 2: Configure Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

### Step 3: Deploy
```bash
vercel --prod
```

## Database Setup

### Supabase (Recommended for Postgres)

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Save connection string

2. **Set Environment Variables**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. **Initialize Database Schema**

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  wallet_address VARCHAR(255),
  total_points INT DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  current_tier VARCHAR(20) DEFAULT 'bronze',
  referral_code VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  tier VARCHAR(20) NOT NULL,
  points INT NOT NULL,
  reward_amount DECIMAL(10, 2) NOT NULL,
  task_url VARCHAR(500),
  icon VARCHAR(10),
  created_at TIMESTAMP DEFAULT now()
);

-- User Tasks (Completed Tasks)
CREATE TABLE user_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  task_id UUID NOT NULL REFERENCES tasks(id),
  points_earned INT NOT NULL,
  reward_earned DECIMAL(10, 2) NOT NULL,
  completed_at TIMESTAMP DEFAULT now()
);

-- Leaderboard (Cached for performance)
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  rank INT,
  points INT,
  week INT,
  year INT,
  updated_at TIMESTAMP DEFAULT now()
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_id UUID NOT NULL REFERENCES users(id),
  commission_earned DECIMAL(10, 2) DEFAULT 0,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT now()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

### Neon (PostgreSQL Alternative)

1. **Create Neon Database**
   - Go to neon.tech
   - Create project
   - Copy connection string

2. **Set Environment Variables**
```env
DATABASE_URL=postgresql://user:password@host/dbname
```

## Authentication Setup

### OAuth (Google)

1. **Create Google OAuth App**
   - Go to Google Cloud Console
   - Create credentials (OAuth 2.0)

2. **Set Environment Variables**
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Web3/Wallet Authentication

1. **Install Web3 Libraries**
```bash
npm install ethers wagmi @rainbow-me/rainbowkit
```

2. **Setup Web3 Provider**
```tsx
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Web3Provider({ children }) {
  return (
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## Payment Processing

### Stripe Integration

1. **Install Stripe SDK**
```bash
npm install @stripe/react-stripe-js stripe
```

2. **Set Environment Variables**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. **Create Payment Endpoint**
```typescript
// app/api/create-payment/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { amount, email } = await req.json()
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    receipt_email: email,
  })
  
  return Response.json({ clientSecret: paymentIntent.client_secret })
}
```

## Email Notifications

### SendGrid Setup

1. **Install SendGrid SDK**
```bash
npm install @sendgrid/mail
```

2. **Set Environment Variables**
```env
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@rewardwatch.com
```

3. **Create Email Service**
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendNotificationEmail(email: string, subject: string, html: string) {
  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    html,
  })
}
```

## Smart Contract Deployment

### Ethereum Smart Contract

1. **Install Hardhat**
```bash
npm install hardhat @openzeppelin/contracts
```

2. **Create Rewards Contract**
```solidity
// contracts/RewardToken.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("RewardWatch", "REWARD") {}
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

3. **Deploy to Testnet**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Environment Variables Checklist

- [ ] Database URL
- [ ] Supabase URL and Keys
- [ ] Google OAuth credentials
- [ ] Stripe keys
- [ ] SendGrid API key
- [ ] Web3 RPC URL
- [ ] Smart contract addresses
- [ ] API base URLs

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/reward-icon.png"
  alt="Reward"
  width={100}
  height={100}
  priority
/>
```

### Database Query Optimization
- Add indexes to frequently queried columns
- Use materialized views for leaderboard
- Cache user data in Redis

### Caching Strategy
```bash
npm install redis
```

## Monitoring & Analytics

### Sentry Integration
```bash
npm install @sentry/nextjs
```

## Production Checklist

- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Configure error tracking
- [ ] Setup email notifications
- [ ] Test payment processing
- [ ] Verify smart contract deployment
- [ ] Setup backup strategy
- [ ] Enable rate limiting
- [ ] Configure CORS
- [ ] Setup CDN for assets

## Rollback Procedure

```bash
# Revert to previous deployment
vercel rollback

# Or
git revert <commit-hash>
git push
```

## Support

For deployment issues, refer to:
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
