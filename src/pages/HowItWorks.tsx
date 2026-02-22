import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardCopy, Sparkles, Send, Edit3 } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { GoBackButton } from '@/components/ui/go-back-button';

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardCopy,
      title: "1. Paste the Job Description",
      description: "Find a job you like on Upwork, Fiverr, or LinkedIn. Copy the full description and paste it into PitchForge AI."
    },
    {
      icon: Sparkles,
      title: "2. Let AI Analyze & Write",
      description: "Our AI identifies the client's pain points, matches them with your skills, and generates a persuasive proposal in seconds."
    },
    {
      icon: Edit3,
      title: "3. Review & Personalize",
      description: "Use our generated subject lines and hooks. Tweak the content if needed using our easy editor."
    },
    {
      icon: Send,
      title: "4. Send & Win",
      description: "Copy the polished proposal to your clipboard and send it off. Watch your response rates soar."
    }
  ];

  return (
    <PageTransition>
      <div className="container py-12 md:py-24 px-4 mx-auto bg-slate-950">
        <div className="mb-8">
          <GoBackButton />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-white">
            How PitchForge AI Works
          </h1>
          <p className="text-xl text-slate-200">
            Go from blank screen to "Proposal Sent" in under 60 seconds.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Icon Bubble */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shrink-0">
                  <step.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-lg text-slate-200">{step.description}</p>
                </div>

                {/* Spacer for the other side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to try it yourself?</h2>
            <p className="text-slate-200 mb-8">
              Sign up and start generating proposals - completely free.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="h-12 px-8">
                Create Your First Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
