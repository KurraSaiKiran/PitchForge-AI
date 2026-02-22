import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, BarChart3, Layers, Zap, PenTool, Target } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Writing",
      description: "Our advanced AI analyzes job descriptions to write personalized, persuasive proposals that address the client's specific needs.",
      badge: "Core"
    },
    {
      icon: Target,
      title: "Win Probability Score",
      description: "Get instant feedback on your chances of winning a job before you apply. Our AI scores your proposal based on job relevance.",
      badge: "New"
    },
    {
      icon: Layers,
      title: "Multi-Platform Support",
      description: "Optimized formats for Upwork, Fiverr, Freelancer.com, and LinkedIn DMs. One tool for all your freelance needs.",
      badge: "Versatile"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your proposal history, success rates, and platform performance to refine your strategy over time.",
      badge: "Insights"
    },
    {
      icon: PenTool,
      title: "Custom Templates",
      description: "Save your best opening hooks, bio snippets, and portfolio links to auto-insert them into generated proposals.",
      badge: "Time Saver"
    },
    {
      icon: Zap,
      title: "Tone Adjustment",
      description: "Choose between Professional, Friendly, Bold, or Formal tones to match the client's vibe perfectly.",
      badge: "Smart"
    }
  ];

  return (
    <PageTransition>
      <div className="container py-12 md:py-24 px-4 mx-auto max-w-6xl bg-slate-950">
        <div className="mb-8">
          <GoBackButton />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-white">
            Everything you need to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">write better proposals</span>
          </h1>
          <p className="text-xl text-slate-200">
            PitchForge AI isn't just a text generator. It's a complete toolkit designed to help you understand clients and sell your services effectively.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-700 bg-slate-900/90 backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  {feature.badge && <Badge variant="secondary" className="bg-slate-800 text-slate-100 border-slate-700">{feature.badge}</Badge>}
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-200 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 bg-slate-900/80 border border-slate-700 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">Why generic templates fail</h2>
              <p className="text-lg text-slate-200 mb-6">
                Clients can smell a copy-pasted proposal from a mile away. They ignore them.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-slate-100">They don't address specific problems</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-slate-100">They feel robotic and impersonal</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-slate-100">They waste your "connects" and credits</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800/90 rounded-xl p-6 shadow-lg border border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="font-semibold text-white">PitchForge AI Solution</span>
                </div>
                <p className="italic text-slate-200">
                  "I noticed you're looking for a React expert to fix a state management issue. I've handled similar Redux bugs for 3 other SaaS clients..."
                </p>
                <div className="h-2 bg-slate-700 rounded w-3/4" />
                <div className="h-2 bg-slate-700 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
