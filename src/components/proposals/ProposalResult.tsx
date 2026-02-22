import { useState } from 'react';
import { ProposalResponse } from '@/lib/ai-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, ThumbsUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ProposalResultProps {
  data: ProposalResponse;
}

export function ProposalResult({ data }: ProposalResultProps) {
  const [copied, setCopied] = useState(false);

  const fullProposal = `
${data.hook}

${data.introduction}

${data.problemUnderstanding}

${data.solution}

${data.skillsMapping}

${data.portfolioSection}

${data.timeline}
${data.budgetSection}

${data.callToAction}

${data.psLine}
  `.trim();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Win Probability Score */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-primary" />
              <span className="font-semibold">Win Probability Score</span>
            </div>
            <span className="font-bold text-xl text-primary">{data.winProbability}%</span>
          </div>
          <Progress value={data.winProbability} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">{data.winProbabilityReasoning}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="proposal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposal">Main Proposal</TabsTrigger>
          <TabsTrigger value="subjects">Subject Lines</TabsTrigger>
          <TabsTrigger value="followup">Follow-ups</TabsTrigger>
          <TabsTrigger value="short">Short Versions</TabsTrigger>
        </TabsList>

        {/* Main Proposal Tab */}
        <TabsContent value="proposal" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Generated Proposal</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleCopy(fullProposal)}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm leading-relaxed">
                {fullProposal}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subject Lines Tab */}
        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Subject Line Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.subjectLines.map((subject, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-medium">{subject}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(subject)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Follow-ups Tab */}
        <TabsContent value="followup">
          <div className="grid gap-4">
            {data.followUpMessages.map((msg, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">Follow-up #{index + 1}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(msg)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{msg}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Short Versions Tab */}
        <TabsContent value="short">
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">LinkedIn DM</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(data.linkedinDm)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{data.linkedinDm}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Fiverr Bid</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(data.fiverrBid)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{data.fiverrBid}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
