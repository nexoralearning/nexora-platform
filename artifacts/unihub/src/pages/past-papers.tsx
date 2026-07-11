import { useState } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileStack } from "lucide-react";
import { motion } from "framer-motion";

interface PastPaper {
  id: string;
  title: string;
  university: string;
  country: string;
  degree: string;
  subject: string;
  year: number;
  semester: 'Semester 1' | 'Semester 2' | 'Annual';
  fileSize?: string;
  pages?: number;
}

const generateMockPapers = (): PastPaper[] => {
  const degrees = ["Computer Science", "Business Admin", "Law", "Medicine", "Mechanical Engineering", "Psychology"];
  const subjectsByDegree: Record<string, string[]> = {
    "Computer Science": ["Data Structures", "Operating Systems", "AI", "Database Systems"],
    "Business Admin": ["Marketing", "Accounting", "Microeconomics"],
    "Law": ["Contract Law", "Criminal Law", "Tort Law"],
    "Medicine": ["Anatomy", "Pathology", "Immunology"],
    "Mechanical Engineering": ["Thermodynamics", "Fluid Mechanics", "Materials Science"],
    "Psychology": ["Cognitive Psychology", "Research Methods", "Neuropsychology"]
  };
  
  const universities = ["Oxford", "Harvard", "MIT", "Stanford", "Cambridge", "UCL", "NUS", "Sorbonne", "University of Mauritius", "IIT Bombay"];
  const countries = ["UK", "USA", "Singapore", "France", "Mauritius", "India", "Australia", "Canada"];
  const semesters: ('Semester 1' | 'Semester 2' | 'Annual')[] = ['Semester 1', 'Semester 2', 'Annual'];
  
  const papers: PastPaper[] = [];
  for (let i = 1; i <= 80; i++) {
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const subs = subjectsByDegree[degree];
    const subject = subs[Math.floor(Math.random() * subs.length)];
    const uni = universities[Math.floor(Math.random() * universities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const year = Math.floor(Math.random() * (2026 - 2000 + 1)) + 2000;
    const semester = semesters[Math.floor(Math.random() * semesters.length)];
    
    papers.push({
      id: `pp${i}`,
      title: `${subject} ${semester === 'Annual' ? 'Final' : semester} Exam`,
      university: uni,
      country,
      degree,
      subject,
      year,
      semester,
      fileSize: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 15) + 3
    });
  }
  
  // Sort by year descending by default
  return papers.sort((a, b) => b.year - a.year);
};

export default function PastPapers() {
  const user = useRequireAuth();
  const [papers] = useState<PastPaper[]>(generateMockPapers());
  
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");

  if (!user) return null;

  const countries = ["All", ...Array.from(new Set(papers.map(p => p.country))).sort()];
  const subjects = ["All", ...Array.from(new Set(papers.map(p => p.subject))).sort()];
  const years = ["All", ...Array.from(new Set(papers.map(p => p.year))).sort((a, b) => b - a)];
  const semesters = ["All", "Semester 1", "Semester 2", "Annual"];

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.university.toLowerCase().includes(search.toLowerCase()) ||
                          p.degree.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === "All" || p.country === countryFilter;
    const matchesSubject = subjectFilter === "All" || p.subject === subjectFilter;
    const matchesYear = yearFilter === "All" || p.year.toString() === yearFilter;
    const matchesSemester = semesterFilter === "All" || p.semester === semesterFilter;
    
    return matchesSearch && matchesCountry && matchesSubject && matchesYear && matchesSemester;
  });

  const handleDownload = (paper: PastPaper) => {
    // Visual placeholder
    console.log(`Downloading ${paper.title}`);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Past Papers Archive</h1>
        <p className="text-muted-foreground mt-2">
          Access thousands of previous exam papers spanning 2000–2026.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search university, course, degree..." 
              className="pl-9 h-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
              {countries.map(c => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
            </Select>
          </div>
          <div>
            <Select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
              {subjects.map(s => <option key={s} value={s}>{s === "All" ? "All Subjects" : s}</option>)}
            </Select>
          </div>
          <div>
            <Select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
              {years.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
            </Select>
          </div>
          <div>
            <Select value={semesterFilter} onChange={e => setSemesterFilter(e.target.value)}>
              {semesters.map(s => <option key={s} value={s}>{s === "All" ? "All Semesters" : s}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-sidebar/80 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Document</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">University / Program</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Term</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPapers.map((paper, index) => (
                <motion.tr 
                  key={paper.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.3) }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileStack className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-base leading-tight mb-1">{paper.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{paper.subject}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{paper.pages} pages</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{paper.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-foreground/90">{paper.university}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{paper.degree}</span>
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-border/60">{paper.country}</Badge>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <Badge variant="secondary" className="bg-sidebar font-medium text-foreground">{paper.year}</Badge>
                      <span className="text-xs text-muted-foreground">{paper.semester}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(paper)} className="hover:bg-primary hover:text-primary-foreground transition-colors group">
                      <Download className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      Download
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {filteredPapers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground bg-sidebar/20">
                    <FileStack className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium text-foreground/80">No papers found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
