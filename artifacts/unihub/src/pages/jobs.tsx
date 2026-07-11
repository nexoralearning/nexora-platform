import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { fetchLiveJobs } from "@/lib/api-ready";
import { Job } from "@/lib/mock-data";
import { getStorage, setStorage } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Briefcase, MapPin, Building2, ExternalLink, BookmarkPlus, BookmarkCheck, DollarSign, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { fetchInternships } from "@/lib/jobs";

// If fetchInternships from mock doesn't have the new fields, we will dynamically patch them for the UI here
// Alternatively, we load from mock-data which we will update in the next chunk.

export default function Jobs() {
  const user = useRequireAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  
  const [fieldFilter, setFieldFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");

  useEffect(() => {
    if (user) {
      // Get jobs from localStorage mock or generate
      let loadedJobs = getStorage<Job[]>('unihub_jobs', []);
      if(loadedJobs.length === 0) {
        // Fallback if not initialized yet
        loadedJobs = fetchInternships() as any; 
      }
      setJobs(loadedJobs);
      
      const saved = new Set(getStorage<string[]>('unihub_saved_jobs', []));
      setSavedJobIds(saved);
    }
  }, [user]);

  if (!user) return null;

  const toggleSave = (id: string) => {
    const next = new Set(savedJobIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedJobIds(next);
    setStorage('unihub_saved_jobs', Array.from(next));
  };

  const fields = ["All", ...Array.from(new Set(jobs.map(j => j.field))).filter(Boolean)];
  const countries = ["All", ...Array.from(new Set(jobs.map(j => j.country))).filter(Boolean)];
  const jobTypes = ["All", "Internship", "Graduate Job", "Remote Job", "Part-time Job", "Research Opportunity"];

  const filteredJobs = jobs.filter(j => {
    if (fieldFilter !== "All" && j.field !== fieldFilter) return false;
    if (countryFilter !== "All" && j.country !== countryFilter) return false;
    if (typeFilter !== "All" && j.type !== typeFilter) return false;
    // jobCategory is the new field for job types
    if (jobTypeFilter !== "All" && j.jobCategory !== jobTypeFilter) return false;
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

      <div className="bg-card border rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Job Type</label>
          <Select value={jobTypeFilter} onChange={e => setJobTypeFilter(e.target.value)}>
            {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
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
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Work Setting</label>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">Any Setting</option>
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
              transition={{ delay: Math.min(idx * 0.05, 0.3) }}
            >
              <Card className="hover-elevate transition-all bg-card border-border">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Company Logo Placeholder */}
                  <div className="hidden md:flex w-16 h-16 rounded-xl bg-sidebar items-center justify-center border shrink-0 text-xl font-bold text-muted-foreground shadow-sm">
                    {job.company?.substring(0, 1) || "C"}
                  </div>
                  
                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-foreground truncate">{job.title}</h3>
                          {job.jobCategory && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 shrink-0">
                              {job.jobCategory}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center text-foreground font-medium">
                            <Building2 className="w-4 h-4 mr-1.5 opacity-70" /> {job.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1.5 opacity-70" /> {job.location}, {job.country}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1.5 opacity-70" /> {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => toggleSave(job.id)}
                          className={isSaved ? "text-primary border-primary/30 bg-primary/5" : "text-muted-foreground"}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4 fill-primary/20" /> : <BookmarkPlus className="w-4 h-4" />}
                        </Button>
                        <Button className="shrink-0">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/80 leading-relaxed max-w-4xl line-clamp-3 md:line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <Badge variant="secondary" className="bg-sidebar border border-border/50 font-medium">
                        {job.field}
                      </Badge>
                      <Badge variant="secondary" className="bg-sidebar border border-border/50 font-medium">
                        {job.experienceLevel} Level
                      </Badge>
                      <Badge variant={job.pay === 'Paid' ? 'default' : 'secondary'} className={`font-medium ${job.pay === 'Paid' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border border-green-500/20' : 'bg-sidebar border border-border/50'}`}>
                        {job.pay === 'Paid' && <DollarSign className="w-3 h-3 mr-0.5" />}
                        {job.pay}
                      </Badge>
                      {job.relevantDegrees && job.relevantDegrees.length > 0 && (
                        <div className="flex items-center gap-1.5 ml-2 text-xs text-muted-foreground bg-sidebar/50 px-2 py-1 rounded-md border border-border/30">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[200px]">{job.relevantDegrees.join(", ")}</span>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto self-center">
                        Posted {Math.max(0, Math.floor((new Date().getTime() - new Date(job.postedDate).getTime()) / 86400000))} days ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed rounded-xl bg-sidebar/30 border-border/60">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="font-semibold text-xl text-foreground">No opportunities found</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">Try adjusting your filters or expanding your search criteria to see more results.</p>
            <Button variant="outline" className="mt-6" onClick={() => {
              setJobTypeFilter("All");
              setFieldFilter("All");
              setCountryFilter("All");
              setTypeFilter("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
