import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { StudyGroup } from "@/lib/mock-data";
import { getStorage, setStorage } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Users, MessagesSquare, Hash, Activity, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add some extra mock groups if needed
const generateExtraGroups = (uni: string): StudyGroup[] => [
  { id: 'g3', name: 'Med 2024 Study Buddy', subject: 'Medicine', university: uni, memberCount: 12, activityStatus: 'Active', description: 'Small group for anatomy review.', tags: ['Anatomy', 'Finals'], type: 'Subject' },
  { id: 'g4', name: 'Business Case Prep', subject: 'Business', university: uni, memberCount: 45, activityStatus: 'Quiet', description: 'Prep for consulting interviews.', tags: ['Consulting', 'Cases'], type: 'Subject' },
  { id: 'g5', name: `${uni} Freshers`, subject: 'General', university: uni, memberCount: 890, activityStatus: 'Very Active', description: 'General chat for all first years.', tags: ['Freshers', 'Social'], type: 'University' },
  { id: 'g6', name: 'Engineering Project Hub', subject: 'Engineering', university: uni, memberCount: 156, activityStatus: 'Active', description: 'Find teammates for senior design.', tags: ['Projects', 'Team'], type: 'University' },
];

export default function StudyGroups() {
  const user = useRequireAuth();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [activeTab, setActiveTab] = useState("subject");
  
  // Chat UI state
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (user) {
      let stored = getStorage<StudyGroup[]>('unihub_study_groups', []);
      if (stored.length < 3) {
        stored = [...stored, ...generateExtraGroups(user.university)];
        setStorage('unihub_study_groups', stored);
      }
      setGroups(stored);
    }
  }, [user]);

  if (!user) return null;

  const toggleJoin = (groupId: string) => {
    const updated = groups.map(g => {
      if (g.id === groupId) {
        const isJoining = !g.joined;
        return { ...g, joined: isJoining, memberCount: g.memberCount + (isJoining ? 1 : -1) };
      }
      return g;
    });
    setGroups(updated);
    setStorage('unihub_study_groups', updated);
  };

  const filteredGroups = groups.filter(g => 
    activeTab === "subject" ? g.type === "Subject" : g.type === "University"
  );

  const getActivityColor = (status: string) => {
    switch(status) {
      case 'Very Active': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Active': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Quiet': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
        <p className="text-muted-foreground mt-2">
          Connect with peers, share knowledge, and study together.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-sidebar">
          <TabsTrigger value="subject">Subject Groups</TabsTrigger>
          <TabsTrigger value="university">University Groups</TabsTrigger>
        </TabsList>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredGroups.map(group => (
            <Card key={group.id} className="hover-elevate flex flex-col group border-border">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MessagesSquare className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className={getActivityColor(group.activityStatus)}>
                    <Activity className="w-3 h-3 mr-1" />
                    {group.activityStatus}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{group.name}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
                  <Users className="w-4 h-4" />
                  {group.memberCount.toLocaleString()} members
                  <span className="mx-1">•</span>
                  <span className="truncate">{group.university}</span>
                </div>
                
                <p className="text-sm mb-6 flex-1 text-foreground/80">{group.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {group.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-sidebar font-normal">
                      <Hash className="w-3 h-3 mr-0.5 opacity-50" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button 
                    variant={group.joined ? "outline" : "default"} 
                    className="flex-1"
                    onClick={() => toggleJoin(group.id)}
                  >
                    {group.joined ? "Leave Group" : "Join Group"}
                  </Button>
                  {group.joined && (
                    <Button variant="secondary" className="px-3" onClick={() => setSelectedGroup(group)}>
                      Open Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Tabs>

      <Dialog open={!!selectedGroup} onOpenChange={(open) => !open && setSelectedGroup(null)}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden">
          {selectedGroup && (
            <>
              <DialogHeader className="p-4 border-b border-border bg-sidebar m-0">
                <DialogTitle className="flex items-center gap-2">
                  <MessagesSquare className="w-5 h-5 text-primary" />
                  {selectedGroup.name}
                </DialogTitle>
                <div className="text-xs text-muted-foreground font-normal">
                  {selectedGroup.memberCount} members • {selectedGroup.activityStatus}
                </div>
              </DialogHeader>
              
              <div className="flex-1 p-4 overflow-y-auto bg-background space-y-4">
                {/* Mock Chat Messages */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">AS</div>
                  <div className="bg-sidebar rounded-2xl rounded-tl-sm p-3 text-sm max-w-[80%]">
                    <div className="font-semibold text-xs mb-1 opacity-70">Alex S.</div>
                    Does anyone have the notes for week 3? I missed the lecture.
                    <div className="text-[10px] opacity-50 mt-1 text-right">10:42 AM</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold text-xs shrink-0">MJ</div>
                  <div className="bg-sidebar rounded-2xl rounded-tl-sm p-3 text-sm max-w-[80%]">
                    <div className="font-semibold text-xs mb-1 opacity-70">Maria J.</div>
                    Yeah I do! Let me upload the PDF here in a sec.
                    <div className="text-[10px] opacity-50 mt-1 text-right">10:45 AM</div>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 text-sm max-w-[80%]">
                    Awesome, thanks Maria! Also looking for a group for the final project.
                    <div className="text-[10px] opacity-70 mt-1 text-right">10:50 AM</div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-border bg-background flex items-center gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1 bg-sidebar border-none focus-visible:ring-1"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setChatInput("")}
                />
                <Button size="icon" className="shrink-0" onClick={() => setChatInput("")}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
