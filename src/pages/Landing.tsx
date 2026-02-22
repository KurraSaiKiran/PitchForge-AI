import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Win More Freelance Jobs <br /> with AI Proposals
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-6 text-center text-slate-400 text-lg md:text-xl max-w-2xl"
      >
        Generate high-converting, personalized proposals for Upwork, Fiverr, and LinkedIn in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Link to="/auth/signup">
          <Button size="lg" className="h-12 px-8 text-lg">
            Start for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link to="/how-it-works">
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg bg-slate-800/50 border-slate-700 hover:bg-slate-800">
            See How It Works
          </Button>
        </Link>
      </motion.div>
    </LampContainer>
  );
}
