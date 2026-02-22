# PitchForge AI 

A premium AI-powered SaaS platform that generates high-converting, personalized proposals for freelancers on Upwork, Fiverr, LinkedIn, and other platforms in seconds.

![PitchForge AI](https://img.shields.io/badge/PitchForge-AI-8B5CF6?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🤖 **AI-Powered Proposal Generation** - Generate personalized proposals using advanced AI
- 🎯 **Win Probability Score** - Get instant feedback on your chances of winning
- 📊 **Analytics Dashboard** - Track proposal performance and success rates
- 🎨 **Multi-Platform Support** - Optimized for Upwork, Fiverr, LinkedIn, and more
- 🔒 **Secure Authentication** - Gmail-based authentication via Supabase
- 🎭 **Tone Adjustment** - Choose between Professional, Friendly, Bold, or Formal tones
- 💾 **Proposal History** - Save and manage all your generated proposals
- 🌓 **Dark/Light Mode** - Beautiful UI with theme support
- ⚡ **5 Free Proposals** - Lifetime limit of 5 proposals per account

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, RLS)
- **AI**: Groq API (LLaMA models)
- **Charts**: Recharts
- **State Management**: React Context API
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Groq API key

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KurraSaiKiran/PitchForge-AI.git
   cd PitchForge-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Set up Supabase database**
   
   Run the migrations in your Supabase SQL editor:
   - `supabase/migrations/20250523120000_init_schema.sql`
   - `supabase/migrations/20250524000000_remove_subscription_add_limit.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
PitchForge-AI/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Sidebar, Navbar)
│   │   ├── proposals/       # Proposal form and result components
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── contexts/            # React Context (Auth)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (Supabase, AI service)
│   ├── pages/               # Page components
│   │   ├── auth/            # Login, Signup
│   │   └── dashboard/       # Dashboard pages
│   └── main.tsx             # App entry point
├── supabase/
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## 🎨 Key Features Explained

### 5-Proposal Limit System
- Each user gets exactly 5 free proposals (lifetime)
- Proposal count tracked in database via `proposal_count` field
- Auto-increments on each proposal generation
- UI shows remaining proposals with visual progress dots
- Generation blocked when limit reached with clear messaging

### AI Proposal Generation
- Uses Groq API with LLaMA 3.1 70B model
- Analyzes job descriptions and generates:
  - Personalized introduction
  - Relevant solution/approach
  - Call-to-action
  - Win probability score

### Premium UI/UX
- Modern SaaS design with purple-to-blue gradients
- Animated components with Framer Motion
- Glassmorphism effects and smooth transitions
- High contrast text for accessibility (WCAG AA compliant)
- Responsive design for all devices

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `VITE_GROQ_API_KEY` | Your Groq API key for AI generation |

## 📊 Database Schema

### Users Table
- `id` (UUID) - Primary key
- `email` (TEXT) - User email
- `proposal_count` (INTEGER) - Number of proposals generated
- `created_at` (TIMESTAMPTZ) - Account creation date

### Proposals Table
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `job_title` (TEXT) - Job title
- `platform` (TEXT) - Platform (Upwork, Fiverr, etc.)
- `generated_proposal` (JSONB) - Full proposal content
- `win_probability` (INTEGER) - AI-calculated win probability
- `status` (TEXT) - Draft, Submitted, Hired, Rejected
- `created_at` (TIMESTAMPTZ) - Creation date

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kurra Sai Kiran**
- GitHub: [@KurraSaiKiran](https://github.com/KurraSaiKiran)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Supabase](https://supabase.com/) for backend infrastructure
- [Groq](https://groq.com/) for AI inference
- [Framer Motion](https://www.framer.com/motion/) for animations

---

⭐ Star this repo if you find it helpful!
