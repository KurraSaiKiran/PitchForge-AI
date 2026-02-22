import { useEffect, useState } from 'react';
import { supabase, Template } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageTransition } from '@/components/layout/PageTransition';

export default function Templates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New Template Form
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplateName || !newTemplateContent) {
      toast.error('Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('templates')
        .insert({
          user_id: user?.id,
          template_name: newTemplateName,
          saved_template_content: newTemplateContent
        })
        .select()
        .single();

      if (error) throw error;

      setTemplates([data, ...templates]);
      toast.success('Template created successfully');
      setIsDialogOpen(false);
      setNewTemplateName('');
      setNewTemplateContent('');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to create template');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('templates').delete().eq('id', id);
      if (error) throw error;
      setTemplates(templates.filter(t => t.id !== id));
      toast.success('Template deleted');
    } catch (error) {
      toast.error('Failed to delete template');
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Templates</h1>
            <p className="text-slate-300 mt-1">Save and reuse your best content blocks</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Create Template</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Save reusable text blocks like your bio, signature, or niche-specific intros.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">Template Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. My Web Dev Bio"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-slate-200">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Type your template content here..."
                    className="min-h-[150px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
                    value={newTemplateContent}
                    onChange={(e) => setNewTemplateContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTemplate} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-300 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50">
              No templates yet. Create one to speed up your workflow!
            </div>
          ) : (
            templates.map((template) => (
              <Card key={template.id} className="flex flex-col border-slate-700 bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-slate-100">{template.template_name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(template.id)} className="hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="mt-2 flex-1">
                  <div className="bg-slate-800 p-3 rounded-md text-sm line-clamp-4 min-h-[5rem] whitespace-pre-wrap text-slate-200">
                    {template.saved_template_content}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="secondary" 
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    onClick={() => {
                      navigator.clipboard.writeText(template.saved_template_content);
                      toast.success('Copied to clipboard');
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}
