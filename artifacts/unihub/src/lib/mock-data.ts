import { getStorage, setStorage } from './storage';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  university: string;
  dueDate: string;
  description: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  university: string;
  category: 'Lecture' | 'Tutorial' | 'Personal' | 'Research';
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  country: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  jobCategory?: 'Internship' | 'Graduate Job' | 'Remote Job' | 'Part-time Job' | 'Research Opportunity';
  pay: 'Paid' | 'Unpaid';
  field: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  description: string;
  relevantDegrees?: string[];
  postedDate: string;
  saved?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Programming' | 'Design' | 'Tutoring' | 'Writing' | 'Marketing' | 'Notes' | 'Books' | 'Electronics' | 'Study Equipment' | 'Other';
  listingType: 'Service' | 'Item';
  condition?: 'New' | 'Good' | 'Fair';
  sellerName: string;
  sellerUniversity: string;
  sellerBio?: string;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  wishlisted?: boolean;
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  university: string;
  degree?: string;
  memberCount: number;
  activityStatus: 'Active' | 'Quiet' | 'Very Active';
  description: string;
  tags: string[];
  type: 'Subject' | 'University' | 'Degree';
  joined?: boolean;
  createdBy?: string;
  messages?: { sender: string; text: string; time: string }[];
}

// Data generator helpers
const generateJobs = (): Job[] => {
  const jobs: Job[] = [];
  const companies = ["Google", "Meta", "Amazon", "Local Startup Inc", "National Bank", "Global Consulting", "HealthTech", "EduCorp"];
  const fields = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Engineering"];
  const countries = ["UK", "USA", "Singapore", "Canada", "Australia"];
  const categories = ["Internship", "Graduate Job", "Remote Job", "Part-time Job", "Research Opportunity"] as const;
  const types = ["Remote", "On-site", "Hybrid"] as const;

  for (let i = 1; i <= 40; i++) {
    const field = fields[Math.floor(Math.random() * fields.length)];
    jobs.push({
      id: `j${i}`,
      title: `${field} ${categories[Math.floor(Math.random() * categories.length)]}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      location: "Metropolis",
      type: types[Math.floor(Math.random() * types.length)],
      jobCategory: categories[Math.floor(Math.random() * categories.length)],
      pay: Math.random() > 0.3 ? 'Paid' : 'Unpaid',
      field,
      experienceLevel: 'Entry',
      description: "Join our team to work on exciting projects. We offer great mentorship and growth opportunities. Ideal for students and recent graduates.",
      relevantDegrees: ["Computer Science", "Business Administration", "Engineering"].slice(0, Math.floor(Math.random() * 3) + 1),
      postedDate: new Date(Date.now() - Math.random() * 864000000).toISOString()
    });
  }
  return jobs;
};

const generateMarketplaceItems = (university: string): MarketplaceItem[] => {
  const items: MarketplaceItem[] = [];
  const categories: MarketplaceItem['category'][] = ['Programming', 'Design', 'Tutoring', 'Writing', 'Marketing', 'Notes', 'Books', 'Electronics', 'Study Equipment', 'Other'];
  
  // Add some specific items
  items.push({
    id: 'm1', title: 'Python Tutoring - 2 Hours', description: 'Struggling with data structures? I can help you ace your assignments.', price: 30, category: 'Tutoring', listingType: 'Service', sellerName: 'Alex Smith', sellerUniversity: university, rating: 4.8, reviewCount: 12, tags: ['Python', 'CS', 'Algorithms'], createdAt: new Date().toISOString()
  });
  items.push({
    id: 'm2', title: 'Logo Design for Student Projects', description: 'Professional logo design for your startup or coursework.', price: 50, category: 'Design', listingType: 'Service', sellerName: 'Sarah J.', sellerUniversity: university, rating: 5.0, reviewCount: 5, tags: ['Design', 'Figma', 'Illustrator'], createdAt: new Date().toISOString()
  });
  items.push({
    id: 'm3', title: 'Calculus 8th Edition', description: 'Good condition, no highlights.', price: 45, category: 'Books', listingType: 'Item', condition: 'Good', sellerName: 'Mike T.', sellerUniversity: university, tags: ['Math', 'Textbook'], createdAt: new Date().toISOString()
  });

  // Generate more
  for (let i = 4; i <= 25; i++) {
    const isService = Math.random() > 0.4;
    const cat = categories[Math.floor(Math.random() * categories.length)];
    items.push({
      id: `m${i}`,
      title: `${isService ? 'Expert' : 'Used'} ${cat} ${isService ? 'Services' : 'Bundle'}`,
      description: isService ? `High quality ${cat.toLowerCase()} help for students.` : `Selling my old ${cat.toLowerCase()} items. Great condition.`,
      price: Math.floor(Math.random() * 100) + 10,
      category: cat,
      listingType: isService ? 'Service' : 'Item',
      condition: isService ? undefined : 'Fair',
      sellerName: `Student ${i}`,
      sellerUniversity: university,
      rating: isService ? Number((Math.random() * 2 + 3).toFixed(1)) : undefined,
      reviewCount: isService ? Math.floor(Math.random() * 50) : undefined,
      tags: [cat, isService ? 'Help' : 'Cheap'],
      createdAt: new Date(Date.now() - Math.random() * 864000000).toISOString()
    });
  }
  return items;
};

const generateStudyGroups = (university: string): StudyGroup[] => {
  const groups: StudyGroup[] = [];
  const subjects = ["Computer Science", "Business", "Medicine", "Law"];
  const types: StudyGroup['type'][] = ['Subject', 'University', 'Degree'];
  const statuses: StudyGroup['activityStatus'][] = ['Active', 'Quiet', 'Very Active'];

  for (let i = 1; i <= 25; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    groups.push({
      id: `g${i}`,
      name: `${type === 'Degree' ? subject + ' Majors' : type === 'University' ? university + ' Connect' : subject + ' Study Squad'}`,
      subject,
      university,
      degree: type === 'Degree' ? subject : undefined,
      memberCount: Math.floor(Math.random() * 500) + 10,
      activityStatus: statuses[Math.floor(Math.random() * statuses.length)],
      description: `A great group for ${subject} students at ${university}. Join us for discussions and resource sharing!`,
      tags: [subject.split(' ')[0], type],
      type,
      joined: Math.random() > 0.8,
      createdBy: `Student${i}`,
      messages: []
    });
  }
  return groups;
}

export function initializeMockData(university: string) {
  const isInitialized = getStorage('unihub_mock_initialized_v2', false);
  if (isInitialized) return;

  const sampleAssignments: Assignment[] = [
    {
      id: 'a1',
      title: 'Advanced Algorithms Final Project',
      subject: 'Computer Science',
      university,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      description: 'Implement a distributed hash table.',
      status: 'Pending',
      priority: 'High',
      createdAt: new Date().toISOString()
    },
    {
      id: 'a2',
      title: 'Marketing Strategy Case Study',
      subject: 'Business',
      university,
      dueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      description: 'Analyze Apple\'s 2023 marketing campaign.',
      status: 'Overdue',
      priority: 'Medium',
      createdAt: new Date().toISOString()
    }
  ];
  setStorage('unihub_assignments', sampleAssignments);

  const sampleNotes: Note[] = [
    {
      id: 'n1',
      title: 'Week 1: Introduction to Machine Learning',
      content: 'Supervised vs Unsupervised learning. Bias-variance tradeoff...',
      subject: 'Computer Science',
      university,
      category: 'Lecture',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  setStorage('unihub_notes', sampleNotes);

  setStorage('unihub_jobs', generateJobs());
  setStorage('unihub_marketplace', generateMarketplaceItems(university));
  setStorage('unihub_study_groups', generateStudyGroups(university));

  setStorage('unihub_mock_initialized_v2', true);
}
