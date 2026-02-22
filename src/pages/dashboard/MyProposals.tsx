import { useEffect, useState } from 'react';
import { supabase, Proposal } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, ExternalLink, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageTransition } from '@/components/layout/PageTransition';

export default function MyProposals() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchProposals();
    }
  }, [user]);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      toast.error('Failed to load proposals');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('proposals').delete().eq('id', id);
      if (error) throw error;
      setProposals(proposals.filter(p => p.id !== id));
      toast.success('Proposal deleted');
    } catch (error) {
      toast.error('Failed to delete proposal');
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.job_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || proposal.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired': return 'bg-green-500 hover:bg-green-600';
      case 'Rejected': return 'bg-red-500 hover:bg-red-600';
      case 'Submitted': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">My Proposals</h1>
            <p className="text-slate-300 mt-1">View and manage all your generated proposals</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search job titles..."
                className="pl-8 w-full sm:w-[250px] bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full sm:w-[150px] bg-slate-900/50 border-slate-700 text-slate-200">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="upwork">Upwork</SelectItem>
                <SelectItem value="fiverr">Fiverr</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProposals.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-300 bg-slate-900/50 border border-slate-700 rounded-lg">
              No proposals found. Start generating some!
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="flex flex-col border-slate-700 bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="capitalize border-slate-600 text-slate-200">{proposal.platform}</Badge>
                    <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                  </div>
                  <CardTitle className="line-clamp-1 mt-2 text-lg text-slate-100">{proposal.job_title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    Created {formatDistanceToNow(new Date(proposal.created_at))} ago
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Win Probability:</span>
                    <span className="font-bold text-cyan-400 text-lg">{proposal.win_probability}%</span>
                  </div>
                  
                  <div className="mt-auto flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 border-slate-700 text-slate-200 hover:bg-slate-800">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-slate-100">{proposal.job_title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 whitespace-pre-wrap text-sm bg-slate-800 text-slate-200 p-4 rounded-md">
                          {proposal.generated_proposal?.introduction}
                          {'\n\n'}
                          {proposal.generated_proposal?.solution}
                          {'\n\n'}
                          {proposal.generated_proposal?.callToAction}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDelete(proposal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}
