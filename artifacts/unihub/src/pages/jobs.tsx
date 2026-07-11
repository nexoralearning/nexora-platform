import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { fetchInternships } from "@/lib/jobs";
import { Job } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Briefcase, MapPin, Building2, ExternalLink, BookmarkPlus, BookmarkCheck, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Jobs() {
  const user = useRequireAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  
  const [fieldFilter, setFieldFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    if (user) {
      setJobs(fetchInternships());
      // In real app, load saved IDs from localStorage/DB
      const saved = new Set(JSON.parse(localStorage.getItem('unihub_saved_jobs') || '[]'));
      setSavedJobIds(saved as Set<string>);
    }
  }, [user]);

  if (!user) return null;

  const toggleSave = (id: string) => {
    const next = new Set(savedJobIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedJobIds(next);
    localStorage.setItem('unihub_saved_jobs', JSON.stringify(Array.from(next)));
  };

  const fields = ["All", ...Array.from(new Set(jobs.map(j => j.field)))];
  const countries = ["All", ...Array.from(new Set(jobs.map(j => j.country)))];

  const filteredJobs = jobs.filter(j => {
    if (fieldFilter !== "All" && j.field !== fieldFilter) return false;
    if (countryFilter !== "All" && j.country !== countryFilter) return false;
    if (typeFilter !== "All" && j.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jobs & Internships</h1>
        <p className="text-muted-foreground mt-2">
          Discover opportunities perfectly matched to your field of study.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Industry / Field</label>
          <Select value={fieldFilter} onChange={e => setFieldFilter(e.target.value)}>
            {fields.map(f => <option key={f} value={f}>{f}</option>)}
          </Select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Location</label>
          <Select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Work Type</label>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">Any Type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredJobs.map((job, idx) => {
          const isSaved = savedJobIds.has(job.id);
          return (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="hover-elevate transition-all bg-card border-border">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Company Logo Placeholder */}
                  <div className="hidden md:flex w-16 h-16 rounded-xl bg-sidebar items-center justify-center border shrink-0 text-xl font-bold text-muted-foreground">
                    {job.company.substring(0, 1)}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-foreground">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center text-foreground font-medium">
                            <Building2 className="w-4 h-4 mr-1 opacity-70" /> {job.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 opacity-70" /> {job.location}, {job.country}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1 opacity-70" /> {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleSave(job.id)}
                          className={isSaved ? "text-primary" : "text-muted-foreground"}
                        >
                          {isSaved ? <BookmarkCheck className="w-5 h-5 fill-primary/20" /> : <BookmarkPlus className="w-5 h-5" />}
                        </Button>
                        <Button className="shrink-0">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="secondary" className="bg-sidebar border font-normal">
                        {job.field}
                      </Badge>
                      <Badge variant="secondary" className="bg-sidebar border font-normal">
                        {job.experienceLevel} Level
                      </Badge>
                      <Badge variant={job.pay === 'Paid' ? 'default' : 'secondary'} className={job.pay === 'Paid' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : ''}>
                        {job.pay === 'Paid' && <DollarSign className="w-3 h-3 mr-0.5" />}
                        {job.pay}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto self-end">
                        Posted {Math.floor((new Date().getTime() - new Date(job.postedDate).getTime()) / 86400000)} days ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-20 border border-dashed rounded-xl bg-sidebar">
            <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg">No opportunities found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
