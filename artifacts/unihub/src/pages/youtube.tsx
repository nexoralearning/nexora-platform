import { useState } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { fetchYouTubeVideos, YouTubeVideo } from "@/lib/youtube";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PlayCircle, Search, Clock, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function YouTubeResources() {
  const user = useRequireAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  
  if (!user) return null;

  const allVideos = fetchYouTubeVideos(searchQuery);
  const filteredVideos = allVideos.filter(v => subjectFilter === "All" || v.subject === subjectFilter);

  const subjects = ["All", ...Array.from(new Set(allVideos.map(v => v.subject)))];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">YouTube Library</h1>
        <p className="text-muted-foreground mt-2">
          Curated video lectures and crash courses for your studies.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search videos..." 
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVideos.map((video) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="hover-elevate cursor-pointer group h-full flex flex-col overflow-hidden bg-card border-border">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1 backdrop-blur-sm">
                  <Clock className="w-3 h-3" /> {video.duration}
                </div>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {video.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                  <Youtube className="w-3.5 h-3.5" />
                  {video.channelName}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {video.subject}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border">
                    {video.country}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl border-border bg-sidebar">
          <Youtube className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-lg">No videos found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
