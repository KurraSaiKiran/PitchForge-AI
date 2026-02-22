import { useEffect, useState } from 'react';
import { supabase, Proposal } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Loader2, TrendingUp, Award, FileText, Target } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Analytics() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setProposals(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate Stats
  const totalProposals = proposals.length;
  const avgWinProb = totalProposals > 0 
    ? Math.round(proposals.reduce((acc, curr) => acc + (curr.win_probability || 0), 0) / totalProposals) 
    : 0;
  
  // Platform Distribution
  const platformCounts = proposals.reduce((acc, curr) => {
    const platform = curr.platform || 'Other';
    acc[platform] = (acc[platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(platformCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Fallback data for empty state
  const emptyPieData = [{ name: 'No Data', value: 1 }];

  // Weekly Activity (Mock logic for demo - grouping by day of week)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyActivity = days.map(day => ({ name: day, count: 0 }));
  
  proposals.forEach(p => {
    const date = new Date(p.created_at);
    const dayIndex = date.getDay();
    weeklyActivity[dayIndex].count++;
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Analytics Dashboard</h1>
          <p className="text-slate-300 mt-1">Track your proposal performance and insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">{totalProposals}</div>
              <p className="text-xs text-slate-400">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Avg. Win Probability</CardTitle>
              <Target className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{avgWinProb}%</div>
              <p className="text-xs text-slate-400">Based on AI analysis</p>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Hired Rate</CardTitle>
              <Award className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">12%</div>
              <p className="text-xs text-slate-400">Self-reported status</p>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">24%</div>
              <p className="text-xs text-slate-400">Self-reported status</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1 border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Weekly Generation Activity</CardTitle>
              <CardDescription className="text-slate-400">Number of proposals generated per day</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#e2e8f0' }}
                      cursor={{ fill: '#334155' }}
                    />
                    <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-slate-700 bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Platform Distribution</CardTitle>
              <CardDescription className="text-slate-400">Where you are applying most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData.length > 0 ? pieData : emptyPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      fill="#8884d8"
                    >
                      {pieData.length > 0 ? pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      )) : <Cell fill="#e5e7eb" />}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                  {pieData.length > 0 ? pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="capitalize text-slate-200">{entry.name}</span>
                    </div>
                  )) : <span className="text-sm text-slate-400">No data available</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
