import { useState } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, ExternalLink, PlayCircle, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";

const SUBJECTS = ["Computer Science", "Business", "Medicine", "Law", "Engineering", "Design", "Arts"];

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "Tutorial" | "Video" | "Website" | "Guide";
  source: string;
  url: string;
};

// Generate some rich sample data based on subject
const getResourcesForSubject = (subject: string): Resource[] => {
  return [
    {
      id: "r1",
      title: `Advanced ${subject} Concepts`,
      description: `Deep dive into the core principles of ${subject} for senior year students.`,
      type: "Tutorial",
      source: "Coursera",
      url: "#"
    },
    {
      id: "r2",
      title: `${subject} Crash Course`,
      description: "A quick 2-hour recap of everything you need to know for the midterms.",
      type: "Video",
      source: "YouTube",
      url: "#"
    },
    {
      id: "r3",
      title: `The ${subject} Handbook`,
      description: "Comprehensive study guide summarizing 4 years of material.",
      type: "Guide",
      source: "University Archive",
      url: "#"
    },
    {
      id: "r4",
      title: `Top ${subject} Tools & Portals`,
      description: "Collection of interactive tools to help visualize problems.",
      type: "Website",
      source: "Medium",
      url: "#"
    }
  ];
};

export default function LearningHub() {
  const user = useRequireAuth();
  const [selectedSubject, setSelectedSubject] = useState(user?.degree || "Computer Science");
  const [activeTab, setActiveTab] = useState("all");

  if (!user) return null;

  const resources = getResourcesForSubject(selectedSubject);

  const filteredResources = activeTab === "all" 
    ? resources 
    : resources.filter(r => r.type.toLowerCase() === activeTab);

  const getIconForType = (type: string) => {
    switch(type) {
      case 'Video': return <PlayCircle className="w-4 h-4 mr-2" />;
      case 'Guide': return <FileText className="w-4 h-4 mr-2" />;
      case 'Website': return <Globe className="w-4 h-4 mr-2" />;
      default: return <FileText className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground mt-2">
          Curated study materials, tutorials, and guides tailored to your major.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Subject</label>
          <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            {user.degree && !SUBJECTS.includes(user.degree) && (
              <option value={user.degree}>{user.degree}</option>
            )}
          </Select>
        </div>
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Year Level</label>
          <Select defaultValue={user.year.toString()}>
            {[1,2,3,4,5,6].map(y => <option key={y} value={y.toString()}>Year {y}</option>)}
          </Select>
        </div>
        <div className="flex-1 w-full">
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Country Focus</label>
          <Select defaultValue={user.country}>
            <option value="UK">United Kingdom</option>
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="France">France</option>
            <option value="Mauritius">Mauritius</option>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-sidebar">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="guide">Study Guides</TabsTrigger>
          <TabsTrigger value="website">Websites</TabsTrigger>
        </TabsList>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedSubject + activeTab} 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover-elevate transition-all group overflow-hidden flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {getIconForType(resource.type)}
                    {resource.type}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground bg-sidebar px-2 py-1 rounded-md">
                    {resource.source}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">
                  {resource.description}
                </p>
                <Button variant="outline" className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Open Resource <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              No resources found for this category.
            </div>
          )}
        </motion.div>
      </Tabs>
    </div>
  );
}
