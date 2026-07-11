import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Note } from "@/lib/mock-data";
import { getStorage, setStorage } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Upload, Download, Trash2, Edit, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notes() {
  const user = useRequireAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Note['category']>("Lecture");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (user) {
      setNotes(getStorage<Note[]>('unihub_notes', []));
    }
  }, [user]);

  if (!user) return null;

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    setStorage('unihub_notes', newNotes);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      const updatedNotes = notes.map(n => 
        n.id === editingNote.id ? { ...n, title, content, category, subject, updatedAt: new Date().toISOString() } : n
      );
      saveNotes(updatedNotes);
    } else {
      const newNote: Note = {
        id: Math.random().toString(36).substring(7),
        title,
        content,
        category,
        subject: subject || user.degree,
        university: user.university,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveNotes([...notes, newNote]);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  const resetForm = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setCategory("Lecture");
    setSubject("");
  };

  const openEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setSubject(note.subject);
    setIsDialogOpen(true);
  };

  const handleDownload = (note: Note) => {
    const blob = new Blob([note.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || n.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
          <p className="text-muted-foreground mt-2">
            Organize and manage your study materials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">
            <Upload className="w-4 h-4 mr-2" />
            Upload PDF/Doc
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={open => { setIsDialogOpen(open); if(!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingNote ? "Edit Note" : "Create Note"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <Select value={category} onChange={e => setCategory(e.target.value as Note['category'])}>
                    <option value="Lecture">Lecture</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Research">Research</option>
                    <option value="Personal">Personal</option>
                  </Select>
                  <Input placeholder="Subject (e.g. CS101)" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <Textarea 
                  placeholder="Start typing your notes here..." 
                  className="min-h-[250px] font-mono text-sm"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSave}>{editingNote ? "Save Changes" : "Create"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Lecture">Lectures</option>
            <option value="Tutorial">Tutorials</option>
            <option value="Research">Research</option>
            <option value="Personal">Personal</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover-elevate h-full flex flex-col border-border group bg-card">
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {note.category}
                    </Badge>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleDownload(note)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(note)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(note.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 leading-tight">{note.title}</h3>
                  <div className="text-xs text-muted-foreground mb-4">{note.subject}</div>
                  <p className="text-sm text-muted-foreground line-clamp-4 flex-1 whitespace-pre-wrap font-serif">
                    {note.content}
                  </p>
                  <div className="mt-4 pt-4 border-t text-xs text-muted-foreground flex justify-between">
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    <span>{note.content.length} chars</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-sidebar border-border">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-lg">No notes found</h3>
          <p className="text-muted-foreground mt-1">Create your first note to start organizing your thoughts.</p>
        </div>
      )}
    </div>
  );
}
