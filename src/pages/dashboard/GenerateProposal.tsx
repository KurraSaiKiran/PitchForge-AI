import { useState, useEffect } from 'react';
import { ProposalForm } from '@/components/proposals/ProposalForm';
import { ProposalResult } from '@/components/proposals/ProposalResult';
import { generateProposalContent, ProposalRequest, ProposalResponse } from '@/lib/ai-service';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function GenerateProposal() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProposalResponse | null>(null);
  const [formData, setFormData] = useState<ProposalRequest | null>(null);
  const [proposalCount, setProposalCount] = useState<number>(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    if (user) {
      checkProposalLimit();
    }
  }, [user]);

  const checkProposalLimit = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .select('proposal_count')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setProposalCount(data.proposal_count || 0);
      setIsLimitReached(data.proposal_count >= 5);
    }
  };

  const handleGenerate = async (data: ProposalRequest) => {
    if (!user) return;
    
    if (isLimitReached) {
      toast.error('You have reached the maximum limit of 5 proposals.');
      return;
    }

    setIsLoading(true);
    setFormData(data);

    try {
      const generatedContent = await generateProposalContent(data);
      setResult(generatedContent);

      const { error } = await supabase.from('proposals').insert({
        user_id: user.id,
        job_title: data.jobTitle,
        platform: data.platform,
        generated_proposal: generatedContent,
        win_probability: generatedContent.winProbability,
        status: 'Draft',
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Failed to save proposal:', error);
        toast.error('Proposal generated but failed to save to history.');
      } else {
        toast.success('Proposal generated and saved!');
        await checkProposalLimit();
      }

    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(null);
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Generate Proposal</h1>
            <p className="text-slate-400 mt-1">Create AI-powered proposals in seconds</p>
          </div>
          {result && (
            <Button variant="ghost" onClick={handleReset} className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create New
            </Button>
          )}
        </motion.div>

        {isLimitReached && !result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Limit Reached
                </CardTitle>
                <CardDescription className="text-red-300/80">
                  You have reached the maximum free limit of 5 proposals. You have generated {proposalCount} out of 5 proposals.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}

        {!isLimitReached && !result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-slate-700 bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-200">
                    Proposals remaining: <span className="text-cyan-400 font-bold text-lg">{5 - proposalCount}</span> <span className="text-slate-300">out of</span> <span className="font-semibold text-slate-200">5</span>
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i < proposalCount ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {!result ? (
            <ProposalForm onSubmit={handleGenerate} isLoading={isLimitReached || isLoading} />
          ) : (
            <ProposalResult data={result} />
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
