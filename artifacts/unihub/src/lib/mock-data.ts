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
  pay: 'Paid' | 'Unpaid';
  field: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  description: string;
  postedDate: string;
  saved?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Books' | 'Electronics' | 'Study Equipment' | 'Other';
  condition: 'New' | 'Good' | 'Fair';
  sellerName: string;
  university: string;
  wishlisted?: boolean;
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  university: string;
  memberCount: number;
  activityStatus: 'Active' | 'Quiet' | 'Very Active';
  description: string;
  tags: string[];
  type: 'Subject' | 'University';
  joined?: boolean;
}

export function initializeMockData(university: string) {
  const isInitialized = getStorage('unihub_mock_initialized', false);
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
    },
    {
      id: 'a3',
      title: 'Thermodynamics Lab Report',
      subject: 'Engineering',
      university,
      dueDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      description: 'Lab 4 writeup.',
      status: 'Completed',
      priority: 'Low',
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

  const sampleGroups: StudyGroup[] = [
    {
      id: 'g1',
      name: 'CS50 Study Group',
      subject: 'Computer Science',
      university,
      memberCount: 142,
      activityStatus: 'Very Active',
      description: 'Help with problem sets and final projects.',
      tags: ['C', 'Python', 'Algorithms'],
      type: 'Subject'
    },
    {
      id: 'g2',
      name: 'Law 101 Notes Swap',
      subject: 'Law',
      university,
      memberCount: 34,
      activityStatus: 'Active',
      description: 'Share notes and discuss cases.',
      tags: ['Contract Law', 'Torts'],
      type: 'Subject'
    }
  ];
  setStorage('unihub_study_groups', sampleGroups);

  const sampleMarketplace: MarketplaceItem[] = [
    {
      id: 'm1',
      title: 'Calculus Early Transcendentals 9th Ed',
      description: 'Good condition, no highlights.',
      price: 45,
      category: 'Books',
      condition: 'Good',
      sellerName: 'Alex Smith',
      university,
      createdAt: new Date().toISOString()
    },
    {
      id: 'm2',
      title: 'iPad Pro 11" 2021',
      description: 'Used for notes, works perfectly. Comes with Apple Pencil.',
      price: 550,
      category: 'Electronics',
      condition: 'Fair',
      sellerName: 'Sarah Jenkins',
      university,
      createdAt: new Date().toISOString()
    }
  ];
  setStorage('unihub_marketplace', sampleMarketplace);

  setStorage('unihub_mock_initialized', true);
}
