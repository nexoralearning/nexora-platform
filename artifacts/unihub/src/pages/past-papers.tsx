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
  subject: string;
  year: number;
}

const generateMockPapers = (): PastPaper[] => {
  const subjects = ["Computer Science", "Business", "Law", "Medicine", "Engineering"];
  const universities = ["Oxford", "Harvard", "MIT", "Stanford", "Cambridge", "UCL", "NUS", "Sorbonne"];
  const countries = ["UK", "USA", "Singapore", "France", "Mauritius", "India"];
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  
  const papers: PastPaper[] = [];
  for (let i = 1; i <= 50; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const uni = universities[Math.floor(Math.random() * universities.length)];
    const type = Math.random() > 0.5 ? "Midterm" : "Final";
    papers.push({
      id: `p${i}`,
      title: `${subject} ${type} Exam`,
      university: uni,
      country: countries[Math.floor(Math.random() * countries.length)],
      subject,
      year: years[Math.floor(Math.random() * years.length)],
    });
  }
  return papers;
};

export default function PastPapers() {
  const user = useRequireAuth();
  const [papers] = useState<PastPaper[]>(generateMockPapers());
  
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  if (!user) return null;

  const countries = ["All", ...Array.from(new Set(papers.map(p => p.country)))];
  const subjects = ["All", ...Array.from(new Set(papers.map(p => p.subject)))];
  const years = ["All", ...Array.from(new Set(papers.map(p => p.year))).sort((a, b) => b - a)];

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.university.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === "All" || p.country === countryFilter;
    const matchesSubject = subjectFilter === "All" || p.subject === subjectFilter;
    const matchesYear = yearFilter === "All" || p.year.toString() === yearFilter;
    return matchesSearch && matchesCountry && matchesSubject && matchesYear;
  });

  const handleDownload = (paper: PastPaper) => {
    // Visual placeholder
    console.log(`Downloading ${paper.title}`);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Past Papers Archive</h1>
        <p className="text-muted-foreground mt-2">
          Find and download previous exam papers from universities globally.
        </p>
      </div>

      <div className="bg-card border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-[2]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search university or course..." 
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>
        <div className="flex-1">
          <Select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <div className="flex-1">
          <Select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
            {years.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
          </Select>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-sidebar border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Document</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground hidden md:table-cell">University</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground hidden sm:table-cell">Subject</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Year</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPapers.map((paper, index) => (
                <motion.tr 
                  key={paper.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 > 0.5 ? 0 : index * 0.02 }}
                  className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileStack className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium text-foreground">{paper.title}</div>
                        <div className="md:hidden text-xs text-muted-foreground mt-0.5">{paper.university}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{paper.university}</span>
                      <Badge variant="outline" className="text-[10px]">{paper.country}</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-muted-foreground">
                    {paper.subject}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{paper.year}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(paper)}>
                      <Download className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {filteredPapers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <FileStack className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    No papers found matching your filters.
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
