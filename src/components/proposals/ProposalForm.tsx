import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { ProposalRequest } from '@/lib/ai-service';

const proposalSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters'),
  clientName: z.string().optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  skills: z.string().min(2, 'Please list at least one skill'),
  experienceLevel: z.string(),
  tone: z.string(),
  length: z.string(),
  portfolioLinks: z.string().optional(),
  customInstructions: z.string().optional(),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onSubmit: (data: ProposalRequest) => void;
  isLoading: boolean;
}

export function ProposalForm({ onSubmit, isLoading }: ProposalFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      platform: 'upwork',
      experienceLevel: 'intermediate',
      tone: 'professional',
      length: 'medium',
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Paste the job description to generate a winning proposal.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select onValueChange={(val) => setValue('platform', val)} defaultValue={watch('platform')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="freelancer">Freelancer.com</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="email">Cold Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="e.g. React Developer needed..." {...register('jobTitle')} />
              {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea 
              id="jobDescription" 
              placeholder="Paste the full job description here..." 
              className="min-h-[150px]"
              {...register('jobDescription')} 
            />
            {errors.jobDescription && <p className="text-xs text-destructive">{errors.jobDescription.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name (Optional)</Label>
              <Input id="clientName" placeholder="e.g. John Doe" {...register('clientName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Optional)</Label>
              <Input id="budget" placeholder="e.g. $500 or $30/hr" {...register('budget')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input id="deadline" placeholder="e.g. 1 week" {...register('deadline')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Your Relevant Skills</Label>
            <Input id="skills" placeholder="e.g. React, TypeScript, Tailwind CSS, UI Design" {...register('skills')} />
            {errors.skills && <p className="text-xs text-destructive">{errors.skills.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select onValueChange={(val) => setValue('experienceLevel', val)} defaultValue={watch('experienceLevel')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select onValueChange={(val) => setValue('tone', val)} defaultValue={watch('tone')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly & Casual</SelectItem>
                  <SelectItem value="bold">Bold & Confident</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Select onValueChange={(val) => setValue('length', val)} defaultValue={watch('length')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short & Punchy</SelectItem>
                  <SelectItem value="medium">Standard</SelectItem>
                  <SelectItem value="long">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolioLinks">Portfolio Links (Optional)</Label>
            <Input id="portfolioLinks" placeholder="e.g. myportfolio.com/project1" {...register('portfolioLinks')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customInstructions">Custom Instructions (Optional)</Label>
            <Input id="customInstructions" placeholder="e.g. Mention I have worked in this niche before" {...register('customInstructions')} />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Proposal...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Proposal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
