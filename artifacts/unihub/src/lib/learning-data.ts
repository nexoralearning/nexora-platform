export interface Module {
  id: string;
  name: string;
  topics: string[];
}

export interface LearningResource {
  title: string;
  type: 'website' | 'youtube' | 'course' | 'documentation' | 'book' | 'practice';
  url: string;
  description: string;
  free: boolean;
}

export interface LearningPath {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  resources: LearningResource[];
}

export interface Subject {
  id: string;
  name: string;
  code?: string;
  courseOverview: string;
  modules: Module[];
  learningPaths: LearningPath[]; // Beginner → Intermediate → Advanced
  recommendedWebsites: { name: string; url: string; description: string }[];
  onlineCourses: { name: string; platform: string; url: string; free: boolean }[];
  documentation: { name: string; url: string }[];
  books: { title: string; author: string; year?: number }[];
  youtubePlaylists: { title: string; channel: string; url: string }[];
  practiceMaterial: { name: string; url: string; description: string }[];
}

export interface DegreeYear {
  year: number;
  subjects: Subject[];
}

export interface Degree {
  id: string;
  name: string;
  faculty: string;
  years: DegreeYear[]; // Year 1 through Year 4+
}

export interface University {
  id: string;
  name: string;
  degrees: Degree[];
}

export interface CountryData {
  country: string;
  universities: University[];
}

const subjectsList = {
  "Computer Science / Software Engineering": [
    "Introduction to Programming", "Data Structures & Algorithms", "Database Systems", "Computer Networks", "Operating Systems", "Web Development", "Software Engineering Principles", "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Cloud Computing"
  ],
  "Business Administration / Management": [
    "Principles of Management", "Marketing Basics", "Financial Accounting", "Microeconomics", "Macroeconomics", "Organizational Behavior", "Business Ethics", "Strategic Management", "Operations Management", "Human Resource Management", "International Business"
  ],
  "Medicine / Biomedical Science": [
    "Anatomy", "Physiology", "Biochemistry", "Microbiology", "Pathology", "Pharmacology", "Immunology", "Genetics", "Clinical Skills", "Medical Ethics", "Epidemiology"
  ],
  "Law": [
    "Introduction to Legal Systems", "Contract Law", "Tort Law", "Criminal Law", "Constitutional Law", "Property Law", "International Law", "Company Law", "Human Rights Law", "Family Law", "Evidence"
  ],
  "Engineering (Mechanical/Civil/Electrical)": [
    "Engineering Mathematics", "Physics for Engineers", "Engineering Mechanics", "Fluid Mechanics", "Thermodynamics", "Materials Science", "Circuit Theory", "Control Systems", "Structural Analysis", "Geotechnical Engineering"
  ],
  "Psychology": [
    "Introduction to Psychology", "Cognitive Psychology", "Developmental Psychology", "Social Psychology", "Abnormal Psychology", "Research Methods", "Biopsychology", "Personality Psychology", "Clinical Psychology", "Neuropsychology"
  ],
  "Economics / Finance": [
    "Microeconomic Theory", "Macroeconomic Theory", "Quantitative Methods", "Econometrics", "Corporate Finance", "Investment Analysis", "Financial Markets", "International Economics", "Public Finance", "Game Theory"
  ]
};

const degreeFaculties = {
  "Computer Science / Software Engineering": "Faculty of Computing",
  "Business Administration / Management": "Faculty of Business",
  "Medicine / Biomedical Science": "Faculty of Medicine",
  "Law": "Faculty of Law",
  "Engineering (Mechanical/Civil/Electrical)": "Faculty of Engineering",
  "Psychology": "Faculty of Arts & Sciences",
  "Economics / Finance": "Faculty of Economics"
};

const uniNames: Record<string, string[]> = {
  "UK": ["University of Oxford", "Imperial College London", "UCL"],
  "USA": ["MIT", "Stanford University", "Harvard University"],
  "Mauritius": ["University of Mauritius", "Middlesex University Mauritius", "Curtin Mauritius"],
  "France": ["Sorbonne University", "École Polytechnique", "Université PSL"],
  "Canada": ["University of Toronto", "University of British Columbia", "McGill University"],
  "Australia": ["University of Melbourne", "University of Sydney", "UNSW Sydney"],
  "India": ["IIT Bombay", "IISc Mumbai", "Delhi University"],
  "Germany": ["Technical University of Munich", "LMU Munich", "Heidelberg University"],
  "Singapore": ["National University of Singapore", "Nanyang Technological University", "SMU"],
  "UAE": ["United Arab Emirates University", "Khalifa University", "Abu Dhabi University"]
};

// Deterministic random number generator for stable data
let seed = 1;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateSubjects(degreeName: string, year: number): Subject[] {
  const allSubjects = subjectsList[degreeName as keyof typeof subjectsList] || subjectsList["Computer Science / Software Engineering"];
  // Deterministically select 3-5 subjects based on year and degree
  const count = 3 + Math.floor(random() * 3); // 3 to 5
  const subjects: Subject[] = [];
  
  for (let i = 0; i < count; i++) {
    const subjectName = allSubjects[(year * 2 + i) % allSubjects.length];
    
    subjects.push({
      id: `${degreeName.substring(0, 3)}-${year}-${i}-${Math.floor(random()*1000)}`,
      name: subjectName,
      code: `${subjectName.substring(0, 3).toUpperCase()}${100 * year + i + 1}`,
      courseOverview: `This course covers the fundamentals and advanced topics in ${subjectName}. Students will learn theoretical concepts and practical applications relevant to modern industry standards.`,
      modules: [
        { id: `m1`, name: "Introduction & Fundamentals", topics: ["Basic Concepts", "Terminology", "Historical Context"] },
        { id: `m2`, name: "Core Principles", topics: ["Key Theories", "Analytical Methods", "Case Studies"] },
        { id: `m3`, name: "Advanced Applications", topics: ["Complex Problem Solving", "Modern Techniques", "Project Work"] },
        { id: `m4`, name: "Review & Assessment", topics: ["Synthesis", "Exam Preparation", "Final Review"] }
      ],
      learningPaths: [
        {
          level: "Beginner",
          resources: [
            { title: `${subjectName} 101`, type: 'youtube', url: "https://youtube.com/watch?v=123", description: "A gentle introduction to the topic.", free: true },
            { title: `Basics of ${subjectName}`, type: 'course', url: "https://coursera.org/learn/basics", description: "Foundational course on Coursera.", free: false },
            { title: "Introductory Guide", type: 'website', url: "https://khanacademy.org", description: "Interactive lessons.", free: true }
          ]
        },
        {
          level: "Intermediate",
          resources: [
            { title: `Intermediate ${subjectName}`, type: 'course', url: "https://edx.org", description: "Deep dive into core mechanics.", free: false },
            { title: "Standard Practices", type: 'documentation', url: "https://docs.example.com", description: "Official documentation and standards.", free: true },
            { title: "Practical Exercises", type: 'practice', url: "https://practice.com", description: "Workbook with solutions.", free: true }
          ]
        },
        {
          level: "Advanced",
          resources: [
            { title: `Advanced ${subjectName} Mastery`, type: 'course', url: "https://udacity.com", description: "University-level advanced concepts.", free: false },
            { title: "Research Papers Archive", type: 'website', url: "https://scholar.google.com", description: "Recent research in the field.", free: true },
            { title: "Expert Talks", type: 'youtube', url: "https://youtube.com/playlist", description: "Seminar recordings from top professors.", free: true }
          ]
        }
      ],
      recommendedWebsites: [
        { name: "Khan Academy", url: "https://khanacademy.org", description: "Great for fundamentals." },
        { name: "Coursera", url: "https://coursera.org", description: "University courses online." },
        { name: "Subject Archive", url: "https://archive.org", description: "Free texts and documents." }
      ],
      onlineCourses: [
        { name: `${subjectName} Specialization`, platform: "Coursera", url: "https://coursera.org", free: false },
        { name: `${subjectName} Crash Course`, platform: "edX", url: "https://edx.org", free: true }
      ],
      documentation: [
        { name: "Official Guidelines", url: "https://docs.org" },
        { name: "Reference Manual", url: "https://reference.com" }
      ],
      books: [
        { title: `Fundamentals of ${subjectName}`, author: "Dr. Jane Smith", year: 2021 },
        { title: `${subjectName} in Practice`, author: "Prof. John Doe", year: 2019 }
      ],
      youtubePlaylists: [
        { title: `${subjectName} Full University Course`, channel: "MIT OpenCourseWare", url: "https://youtube.com" },
        { title: `${subjectName} Explained Simple`, channel: "CrashCourse", url: "https://youtube.com" }
      ],
      practiceMaterial: [
        { name: "Past Papers Bundle", url: "https://unihub.com/past-papers", description: "Previous years exams with solutions." },
        { name: "Interactive Quizzes", url: "https://quizlet.com", description: "Test your knowledge." }
      ]
    });
  }
  return subjects;
}

function generateDegrees(): Degree[] {
  const degrees: Degree[] = [];
  for (const [degreeName, faculty] of Object.entries(degreeFaculties)) {
    const years: DegreeYear[] = [];
    for (let year = 1; year <= 4; year++) {
      years.push({
        year,
        subjects: generateSubjects(degreeName, year)
      });
    }
    degrees.push({
      id: degreeName.toLowerCase().replace(/[\s\/]+/g, '-'),
      name: degreeName,
      faculty,
      years
    });
  }
  return degrees;
}

export function generateLearningDatabase(): CountryData[] {
  seed = 42; // Reset seed
  const db: CountryData[] = [];
  const degreesTemplate = generateDegrees(); // Pre-generate to save time/memory, all unis share similar structure

  for (const [country, unis] of Object.entries(uniNames)) {
    const universities: University[] = unis.map(uniName => ({
      id: uniName.toLowerCase().replace(/\s+/g, '-'),
      name: uniName,
      degrees: degreesTemplate
    }));

    db.push({
      country,
      universities
    });
  }
  return db;
}

export const learningDatabase = generateLearningDatabase();
