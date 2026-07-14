/**
 * job-pool.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * Static pool of 95+ curated job listings spanning 20+ countries and 15+
 * industries. getDailyJobs() uses a date-based seeded shuffle so a different
 * subset of listings surfaces every day — no backend required.
 */

import { Job } from './mock-data';

// ── Seeded deterministic shuffle (changes with the calendar date) ─────────────
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const result = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const rng = () => {
    h ^= h << 13; h ^= h >> 17; h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Returns today's date string used as the rotation seed. */
export function getTodayLabel(): string {
  return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Returns a deterministic daily selection from the full pool.
 * Calling this twice on the same day returns the same list.
 * @param count how many listings to surface (default 60)
 */
export function getDailyJobs(count = 60): Job[] {
  const seed = new Date().toDateString(); // e.g. "Mon Jul 14 2026"
  return seededShuffle(JOB_POOL, seed).slice(0, count);
}

// ── Full pool ─────────────────────────────────────────────────────────────────
const d = (daysAgo: number) => new Date(Date.now() - 86400000 * daysAgo).toISOString();

export const JOB_POOL: Job[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // UNITED KINGDOM
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p1', title: 'Software Engineering Internship', company: 'DeepMind', country: 'UK', location: 'London', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Work on cutting-edge AI research alongside world-class scientists. Contribute to real production systems and have the chance to co-author papers.', relevantDegrees: ['Computer Science', 'Mathematics', 'Engineering'], postedDate: d(2) },
  { id: 'p2', title: 'Graduate Investment Banking Analyst', company: 'Barclays', country: 'UK', location: 'London', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Two-year rotational programme across Equity Research, M&A, and Capital Markets. Full CFA sponsorship and structured mentoring.', relevantDegrees: ['Economics', 'Finance', 'Mathematics'], postedDate: d(5) },
  { id: 'p3', title: 'Part-time Social Media Executive', company: 'Innocent Drinks', country: 'UK', location: 'London', type: 'Hybrid', jobCategory: 'Part-time Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Create content and manage campaigns across Instagram, TikTok, and X. Flexible 15 hrs/week around your studies.', relevantDegrees: ['Marketing', 'Business', 'Media Studies'], postedDate: d(3) },
  { id: 'p4', title: 'Full-Stack Developer', company: 'Revolut', country: 'UK', location: 'London', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build financial products used by 40 million customers globally. React, Node.js, and Kotlin stack with strong equity package.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(1) },
  { id: 'p5', title: 'Clinical Research Assistant', company: 'NHS England', country: 'UK', location: 'Manchester', type: 'On-site', jobCategory: 'Research Opportunity', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Support ongoing clinical trials across three hospital trusts. Gain hands-on research experience with direct patient data.', relevantDegrees: ['Medicine', 'Biology', 'Nursing', 'Pharmacy'], postedDate: d(7) },
  { id: 'p6', title: 'Trainee Solicitor', company: 'Clifford Chance', country: 'UK', location: 'London', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Law', experienceLevel: 'Entry', description: 'Two-year training contract rotating through corporate, finance, and disputes practice groups at a Magic Circle firm.', relevantDegrees: ['Law', 'LLB', 'GDL'], postedDate: d(4) },
  { id: 'p7', title: 'Architecture Graduate', company: 'Foster + Partners', country: 'UK', location: 'London', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Join one of the world\'s leading architecture practices. Work on landmark projects from concept to delivery.', relevantDegrees: ['Architecture', 'Architectural Engineering'], postedDate: d(6) },
  { id: 'p8', title: 'Remote Technical Writer', company: 'Canonical', country: 'UK', location: 'Remote', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Document Ubuntu and open-source tooling for millions of developers worldwide. Fully remote, async culture.', relevantDegrees: ['Computer Science', 'English', 'Communications'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // UNITED STATES
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p9', title: 'Product Management Intern', company: 'Google', country: 'USA', location: 'Mountain View, CA', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Drive product strategy for a product with millions of users. Collaborate with engineering, design, and data science.', relevantDegrees: ['Computer Science', 'Business', 'Engineering'], postedDate: d(4) },
  { id: 'p10', title: 'Data Science Graduate Program', company: 'Meta', country: 'USA', location: 'New York, NY', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Structured two-year data science programme. Rotate across integrity, ads, and growth analytics teams.', relevantDegrees: ['Statistics', 'Computer Science', 'Mathematics'], postedDate: d(6) },
  { id: 'p11', title: 'Remote UX Researcher', company: 'Figma', country: 'USA', location: 'Remote (US)', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Design', experienceLevel: 'Entry', description: 'Conduct user interviews, run usability studies, and present insights to product teams. Flexible async schedule.', relevantDegrees: ['Psychology', 'Design', 'HCI'], postedDate: d(2) },
  { id: 'p12', title: 'Software Engineer', company: 'Amazon', country: 'USA', location: 'Seattle, WA', type: 'On-site', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Join AWS working on distributed systems powering millions of cloud customers. Relocation assistance provided.', relevantDegrees: ['Computer Science', 'Software Engineering', 'Mathematics'], postedDate: d(3) },
  { id: 'p13', title: 'Investment Research Intern', company: 'Goldman Sachs', country: 'USA', location: 'New York, NY', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: '10-week summer internship in Global Investment Research. Strong academic record and Excel/Python skills required.', relevantDegrees: ['Finance', 'Economics', 'Mathematics'], postedDate: d(8) },
  { id: 'p14', title: 'Healthcare Policy Analyst', company: 'McKinsey & Company', country: 'USA', location: 'Washington DC', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Advise government and hospital clients on healthcare reform, reimbursement, and operational efficiency.', relevantDegrees: ['Public Health', 'Medicine', 'Economics', 'Business'], postedDate: d(5) },
  { id: 'p15', title: 'Journalist – Digital News', company: 'The Atlantic', country: 'USA', location: 'Washington DC', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Media', experienceLevel: 'Entry', description: 'Report and produce digital-first stories on politics, culture, and technology. Strong writing portfolio required.', relevantDegrees: ['Journalism', 'English', 'Communications', 'Political Science'], postedDate: d(3) },

  // ══════════════════════════════════════════════════════════════════════════
  // MAURITIUS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p16', title: 'Junior Software Developer', company: 'Ceridian Mauritius', country: 'Mauritius', location: 'Ebène Cybercity', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Develop and maintain HCM software used by global enterprise clients from Mauritius\'s premier tech hub.', relevantDegrees: ['Computer Science', 'Software Engineering', 'IT'], postedDate: d(2) },
  { id: 'p17', title: 'Banking Graduate Trainee', company: 'MCB Group', country: 'Mauritius', location: 'Port Louis', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Structured 18-month rotational programme through retail, corporate, and digital banking at Mauritius\'s largest bank.', relevantDegrees: ['Finance', 'Economics', 'Business Administration'], postedDate: d(4) },
  { id: 'p18', title: 'Digital Marketing Intern', company: 'Mauritius Telecom', country: 'Mauritius', location: 'Port Louis', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Support the brand and digital team on social campaigns, content creation, and web analytics. 6-month paid internship.', relevantDegrees: ['Marketing', 'Business', 'Communications'], postedDate: d(6) },
  { id: 'p19', title: 'Remote Customer Success Associate', company: 'Leal', country: 'Mauritius', location: 'Remote', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Join a fast-growing Mauritian loyalty-tech startup. Help local businesses grow via a digital rewards platform.', relevantDegrees: ['Business', 'IT', 'Communications'], postedDate: d(1) },
  { id: 'p20', title: 'Marine Biology Research Assistant', company: 'University of Mauritius', country: 'Mauritius', location: 'Réduit', type: 'On-site', jobCategory: 'Research Opportunity', pay: 'Unpaid', field: 'Science', experienceLevel: 'Entry', description: 'Assist coral reef conservation research around the Mauritian coast. Academic credit available for eligible students.', relevantDegrees: ['Biology', 'Marine Science', 'Environmental Science'], postedDate: d(9) },
  { id: 'p21', title: 'Hospitality Management Trainee', company: 'Beachcomber Hotels', country: 'Mauritius', location: 'Grand Baie', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Hospitality', experienceLevel: 'Entry', description: 'Rotate across front office, F&B, and events at a leading luxury resort group. French and English required.', relevantDegrees: ['Hospitality Management', 'Tourism', 'Business'], postedDate: d(5) },
  { id: 'p22', title: 'Accounting Intern', company: 'SBM Bank Mauritius', country: 'Mauritius', location: 'Port Louis', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Support the finance team with reconciliations, reporting, and regulatory submissions at a top regional bank.', relevantDegrees: ['Accounting', 'Finance', 'Business'], postedDate: d(3) },
  { id: 'p23', title: 'Full Time Data Analyst', company: 'Rogers Capital', country: 'Mauritius', location: 'Ebène', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Analyse investment portfolio performance and build dashboards for fund managers. Python and Power BI skills valued.', relevantDegrees: ['Mathematics', 'Statistics', 'Finance', 'Computer Science'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // INDIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p24', title: 'Software Development Engineer Intern', company: 'Infosys', country: 'India', location: 'Bangalore', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: '6-month internship in the digital transformation practice. Work on enterprise projects for Fortune 500 clients.', relevantDegrees: ['Computer Science', 'IT', 'Engineering'], postedDate: d(3) },
  { id: 'p25', title: 'Business Analyst', company: 'TCS', country: 'India', location: 'Mumbai', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Bridge business needs and tech solutions for global clients. TCS initial learning programme included.', relevantDegrees: ['Business', 'Computer Science', 'Engineering'], postedDate: d(5) },
  { id: 'p26', title: 'Finance Graduate Trainee', company: 'HDFC Bank', country: 'India', location: 'Delhi', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Structured programme across retail banking, wealth management, and credit analysis. Top performers fast-tracked.', relevantDegrees: ['Finance', 'Economics', 'Business', 'MBA'], postedDate: d(7) },
  { id: 'p27', title: 'UX Design Intern', company: 'Flipkart', country: 'India', location: 'Bangalore', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Design', experienceLevel: 'Entry', description: 'Design features for India\'s largest e-commerce platform. Sketch, Figma and user research skills needed.', relevantDegrees: ['Design', 'HCI', 'Computer Science'], postedDate: d(4) },
  { id: 'p28', title: 'Remote Content Strategist', company: 'Byju\'s', country: 'India', location: 'Remote', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Education', experienceLevel: 'Entry', description: 'Create and curate educational content for K-12 and competitive exam learners. Strong subject knowledge required.', relevantDegrees: ['Education', 'English', 'Any STEM'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // UAE
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p29', title: 'Financial Analyst Graduate', company: 'ADIA', country: 'UAE', location: 'Abu Dhabi', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Analyse global equity and alternative assets for one of the world\'s largest sovereign wealth funds. Tax-free salary.', relevantDegrees: ['Finance', 'Economics', 'Mathematics', 'Business'], postedDate: d(4) },
  { id: 'p30', title: 'Software Engineer', company: 'Careem', country: 'UAE', location: 'Dubai', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build features for the leading super-app in MENA. Modern tech stack, multicultural team, relocation package.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(2) },
  { id: 'p31', title: 'Marketing Intern', company: 'Emirates Group', country: 'UAE', location: 'Dubai', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Support global brand campaigns and in-flight product marketing. Accommodation allowance for international interns.', relevantDegrees: ['Marketing', 'Business', 'Communications'], postedDate: d(6) },
  { id: 'p32', title: 'Architecture Internship', company: 'AECOM Middle East', country: 'UAE', location: 'Dubai', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Work on iconic infrastructure and urban development projects across the Gulf region.', relevantDegrees: ['Architecture', 'Civil Engineering', 'Urban Planning'], postedDate: d(5) },
  { id: 'p33', title: 'Logistics Coordinator', company: 'DP World', country: 'UAE', location: 'Dubai', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Logistics', experienceLevel: 'Entry', description: 'Coordinate global port and supply chain operations at one of the world\'s leading port operators.', relevantDegrees: ['Logistics', 'Business', 'Engineering', 'Economics'], postedDate: d(3) },

  // ══════════════════════════════════════════════════════════════════════════
  // CANADA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p34', title: 'Machine Learning Intern', company: 'Shopify', country: 'Canada', location: 'Remote (CA)', type: 'Remote', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Apply ML to e-commerce personalisation and fraud detection at one of North America\'s fastest-growing tech companies.', relevantDegrees: ['Computer Science', 'Mathematics', 'Statistics'], postedDate: d(3) },
  { id: 'p35', title: 'Junior Accountant', company: 'Deloitte Canada', country: 'Canada', location: 'Toronto, ON', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Join the audit practice. CPA Canada registration support and mentorship from senior partners included.', relevantDegrees: ['Accounting', 'Finance', 'Business'], postedDate: d(5) },
  { id: 'p36', title: 'Healthcare Policy Research', company: 'University of Toronto', country: 'Canada', location: 'Toronto, ON', type: 'Hybrid', jobCategory: 'Research Opportunity', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Assist research on universal pharmacare. Co-authorship opportunity on published papers.', relevantDegrees: ['Public Health', 'Medicine', 'Economics', 'Political Science'], postedDate: d(10) },
  { id: 'p37', title: 'Environmental Engineer Graduate', company: 'WSP Canada', country: 'Canada', location: 'Vancouver, BC', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Work on environmental impact assessments and sustainability projects for major infrastructure developments.', relevantDegrees: ['Environmental Engineering', 'Civil Engineering', 'Environmental Science'], postedDate: d(4) },

  // ══════════════════════════════════════════════════════════════════════════
  // AUSTRALIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p38', title: 'Graduate Engineer', company: 'BHP', country: 'Australia', location: 'Perth, WA', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Rotate across mining operations in WA. Structured two-year programme with mentorship and relocation support.', relevantDegrees: ['Engineering', 'Geology', 'Environmental Science'], postedDate: d(4) },
  { id: 'p39', title: 'Part-time Data Analyst', company: 'Canva', country: 'Australia', location: 'Sydney, NSW', type: 'Hybrid', jobCategory: 'Part-time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Flexible part-time role supporting the growth analytics team. Great for students interested in data and product.', relevantDegrees: ['Statistics', 'Business', 'Computer Science'], postedDate: d(2) },
  { id: 'p40', title: 'Graduate Nurse Clinician', company: 'Royal Melbourne Hospital', country: 'Australia', location: 'Melbourne, VIC', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'One-year new graduate nursing programme with rotations across medical, surgical, and emergency departments.', relevantDegrees: ['Nursing', 'Healthcare'], postedDate: d(6) },

  // ══════════════════════════════════════════════════════════════════════════
  // SINGAPORE
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p41', title: 'Quantitative Research Intern', company: 'DBS Bank', country: 'Singapore', location: 'Marina Bay', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Build quant models for FX and rates trading desk. Strong maths background essential.', relevantDegrees: ['Mathematics', 'Statistics', 'Physics', 'Computer Science'], postedDate: d(5) },
  { id: 'p42', title: 'Operations Analyst', company: 'Grab', country: 'Singapore', location: 'Singapore City', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Drive operational excellence across Grab\'s ride-hailing and delivery platforms in Southeast Asia.', relevantDegrees: ['Business', 'Engineering', 'Computer Science'], postedDate: d(3) },
  { id: 'p43', title: 'Supply Chain Graduate', company: 'Procter & Gamble Singapore', country: 'Singapore', location: 'Singapore City', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Logistics', experienceLevel: 'Entry', description: 'Lead supply chain projects across Asia Pacific. Fast-track leadership development programme.', relevantDegrees: ['Logistics', 'Engineering', 'Business', 'Operations Management'], postedDate: d(7) },

  // ══════════════════════════════════════════════════════════════════════════
  // SOUTH AFRICA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p44', title: 'Junior Software Developer', company: 'Discovery Health', country: 'South Africa', location: 'Johannesburg', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build health-tech solutions powering South Africa\'s largest medical scheme. Agile team, modern stack.', relevantDegrees: ['Computer Science', 'Information Systems', 'Software Engineering'], postedDate: d(4) },
  { id: 'p45', title: 'Finance Internship', company: 'Standard Bank', country: 'South Africa', location: 'Cape Town', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: '10-week structured internship across corporate and investment banking at one of Africa\'s biggest banks.', relevantDegrees: ['Finance', 'Economics', 'Accounting'], postedDate: d(6) },
  { id: 'p46', title: 'Graduate Consultant', company: 'BCG South Africa', country: 'South Africa', location: 'Johannesburg', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Consulting', experienceLevel: 'Entry', description: 'Solve complex business challenges for clients across mining, retail, and financial services in Southern Africa.', relevantDegrees: ['Business', 'Engineering', 'Economics', 'Mathematics'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // FRANCE
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p47', title: 'UX/UI Design Intern', company: 'BlaBlaCar', country: 'France', location: 'Paris', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Design', experienceLevel: 'Entry', description: 'Shape the experience of 100M+ users on Europe\'s largest carpooling platform. Figma skills required.', relevantDegrees: ['Design', 'HCI', 'Computer Science'], postedDate: d(3) },
  { id: 'p48', title: 'Data Analyst', company: 'L\'Oréal', country: 'France', location: 'Paris', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Turn consumer data into actionable insights for global beauty brands. SQL and Python required.', relevantDegrees: ['Statistics', 'Business', 'Computer Science', 'Marketing'], postedDate: d(5) },
  { id: 'p49', title: 'Graduate Aerospace Engineer', company: 'Airbus', country: 'France', location: 'Toulouse', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Join Airbus\'s graduate engineering programme working on next-generation commercial aircraft systems.', relevantDegrees: ['Aerospace Engineering', 'Mechanical Engineering', 'Electronics'], postedDate: d(7) },

  // ══════════════════════════════════════════════════════════════════════════
  // GERMANY
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p50', title: 'Mechanical Engineering Graduate', company: 'Siemens', country: 'Germany', location: 'Munich', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'International graduate programme in industrial automation. Relocation support and German language classes provided.', relevantDegrees: ['Mechanical Engineering', 'Electrical Engineering', 'Physics'], postedDate: d(7) },
  { id: 'p51', title: 'Remote Backend Developer', company: 'Personio', country: 'Germany', location: 'Remote (EU)', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Work on a fast-growing HR platform from anywhere in Europe. Go or Java backend, strong testing culture.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(2) },
  { id: 'p52', title: 'Automotive Software Intern', company: 'BMW Group', country: 'Germany', location: 'Munich', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Develop embedded software for next-generation BMW connected vehicles. C++ and Python skills valued.', relevantDegrees: ['Computer Science', 'Electrical Engineering', 'Mechatronics'], postedDate: d(4) },

  // ══════════════════════════════════════════════════════════════════════════
  // JAPAN
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p53', title: 'English Teaching Assistant', company: 'AEON Corp', country: 'Japan', location: 'Tokyo', type: 'On-site', jobCategory: 'Part-time Job', pay: 'Paid', field: 'Education', experienceLevel: 'Entry', description: 'Teach conversational English at a leading language school chain. Visa sponsorship and apartment assistance available.', relevantDegrees: ['Education', 'English', 'Linguistics', 'Any Degree'], postedDate: d(5) },
  { id: 'p54', title: 'Software Engineer', company: 'Sony Interactive Entertainment', country: 'Japan', location: 'Tokyo', type: 'On-site', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build PlayStation platform features and developer tools. English-friendly team; relocation and visa handled.', relevantDegrees: ['Computer Science', 'Software Engineering', 'Mathematics'], postedDate: d(4) },
  { id: 'p55', title: 'UX Research Intern', company: 'Nintendo', country: 'Japan', location: 'Kyoto', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Design', experienceLevel: 'Entry', description: 'Research player behaviour and help shape game accessibility and interface design. Basic Japanese helpful.', relevantDegrees: ['Psychology', 'Design', 'Computer Science'], postedDate: d(6) },

  // ══════════════════════════════════════════════════════════════════════════
  // KENYA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p56', title: 'FinTech Product Intern', company: 'M-PESA (Safaricom)', country: 'Kenya', location: 'Nairobi', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Work on mobile money features used by 30M+ Kenyans. One of Africa\'s most innovative companies.', relevantDegrees: ['Computer Science', 'Finance', 'Business', 'Engineering'], postedDate: d(3) },
  { id: 'p57', title: 'Public Health Research Officer', company: 'APHRC', country: 'Kenya', location: 'Nairobi', type: 'Hybrid', jobCategory: 'Research Opportunity', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Support data collection and analysis for maternal health studies across East Africa. Stipend and accommodation provided.', relevantDegrees: ['Public Health', 'Medicine', 'Biology', 'Statistics'], postedDate: d(8) },
  { id: 'p58', title: 'Full Time Software Developer', company: 'Andela Kenya', country: 'Kenya', location: 'Nairobi', type: 'Remote', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Join Andela\'s engineering talent network. Work remotely for global tech companies with competitive USD pay.', relevantDegrees: ['Computer Science', 'Software Engineering', 'IT'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // NIGERIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p59', title: 'Software Engineering Intern', company: 'Paystack', country: 'Nigeria', location: 'Lagos', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build payment infrastructure for Africa\'s fastest-growing payment gateway (acquired by Stripe). Real production impact.', relevantDegrees: ['Computer Science', 'Software Engineering', 'IT'], postedDate: d(3) },
  { id: 'p60', title: 'Graduate Management Trainee', company: 'Dangote Group', country: 'Nigeria', location: 'Lagos', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Business', experienceLevel: 'Entry', description: 'Rotational management programme across manufacturing, logistics, and finance in one of Africa\'s largest conglomerates.', relevantDegrees: ['Business', 'Engineering', 'Economics', 'Finance'], postedDate: d(5) },
  { id: 'p61', title: 'Remote Social Media Manager', company: 'Flutterwave', country: 'Nigeria', location: 'Remote', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Grow Flutterwave\'s brand presence across Africa and globally. Content creation and community management.', relevantDegrees: ['Marketing', 'Communications', 'Business'], postedDate: d(1) },

  // ══════════════════════════════════════════════════════════════════════════
  // GHANA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p62', title: 'Finance Intern', company: 'GCB Bank', country: 'Ghana', location: 'Accra', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Gain practical banking experience in credit, treasury, and retail banking operations at Ghana\'s largest local bank.', relevantDegrees: ['Finance', 'Accounting', 'Economics', 'Business'], postedDate: d(4) },
  { id: 'p63', title: 'AgriTech Graduate Analyst', company: 'Farmerline', country: 'Ghana', location: 'Kumasi', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Use data and mobile technology to help smallholder farmers across West Africa improve yields and market access.', relevantDegrees: ['Agriculture', 'Data Science', 'Development Studies', 'Computer Science'], postedDate: d(6) },

  // ══════════════════════════════════════════════════════════════════════════
  // NEW ZEALAND
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p64', title: 'Environmental Science Graduate', company: 'NIWA', country: 'New Zealand', location: 'Wellington', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Science', experienceLevel: 'Entry', description: 'Work on climate modelling and coastal hazard research at NZ\'s national water and atmosphere institute.', relevantDegrees: ['Environmental Science', 'Marine Science', 'Physics', 'Geography'], postedDate: d(6) },
  { id: 'p65', title: 'IT Support (Part-time)', company: 'University of Auckland', country: 'New Zealand', location: 'Auckland', type: 'On-site', jobCategory: 'Part-time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Provide tech support to students and staff on campus. Flexible hours around lectures.', relevantDegrees: ['IT', 'Computer Science'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // IRELAND
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p66', title: 'Tax Graduate – Big 4', company: 'PwC Ireland', country: 'Ireland', location: 'Dublin', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Graduate Tax Practice with AITI qualification support. Gain experience with multinationals based in Ireland.', relevantDegrees: ['Accounting', 'Finance', 'Business', 'Law'], postedDate: d(4) },
  { id: 'p67', title: 'Cloud Engineering Intern', company: 'Microsoft Ireland', country: 'Ireland', location: 'Dublin', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: '12-week internship in Azure engineering at Microsoft\'s EMEA headquarters. Mentorship and possible return offer.', relevantDegrees: ['Computer Science', 'Software Engineering', 'Networking'], postedDate: d(5) },
  { id: 'p68', title: 'Pharmaceutical Analyst', company: 'Pfizer Ireland', country: 'Ireland', location: 'Cork', type: 'On-site', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Quality control and analytical chemistry role in one of Pfizer\'s largest global manufacturing sites.', relevantDegrees: ['Pharmacy', 'Chemistry', 'Biology', 'Biochemistry'], postedDate: d(3) },

  // ══════════════════════════════════════════════════════════════════════════
  // NETHERLANDS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p69', title: 'Growth Marketing Analyst', company: 'Booking.com', country: 'Netherlands', location: 'Amsterdam', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Run A/B experiments impacting millions of travellers. Data-driven culture, international team, relocation support.', relevantDegrees: ['Marketing', 'Business', 'Statistics', 'Economics'], postedDate: d(3) },
  { id: 'p70', title: 'Remote Content Writer', company: 'Miro', country: 'Netherlands', location: 'Remote (EU)', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Create technical and marketing content for a top-rated online collaboration tool. Fully async global team.', relevantDegrees: ['English', 'Journalism', 'Marketing', 'Communications'], postedDate: d(1) },
  { id: 'p71', title: 'Biomedical Research Intern', company: 'Philips Health', country: 'Netherlands', location: 'Eindhoven', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Research AI-powered medical imaging tools in collaboration with hospital partners across Europe.', relevantDegrees: ['Biomedical Engineering', 'Medicine', 'Computer Science', 'Physics'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // BRAZIL
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p72', title: 'FinTech Internship', company: 'Nubank', country: 'Brazil', location: 'São Paulo', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Join the world\'s largest digital bank. Work on product, data, or engineering squads. English-language teams available.', relevantDegrees: ['Computer Science', 'Finance', 'Engineering', 'Business'], postedDate: d(4) },
  { id: 'p73', title: 'Software Engineer', company: 'iFood', country: 'Brazil', location: 'Remote', type: 'Remote', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build logistics and marketplace features for Latin America\'s #1 food delivery platform. Remote-first culture.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // SOUTH KOREA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p74', title: 'Global Marketing Intern', company: 'Samsung Electronics', country: 'South Korea', location: 'Seoul', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Support product launches and brand campaigns for consumer electronics across global markets. English required.', relevantDegrees: ['Marketing', 'Business', 'Communications'], postedDate: d(5) },
  { id: 'p75', title: 'Software Engineer Graduate', company: 'Kakao', country: 'South Korea', location: 'Seongnam', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build services used by 45M+ Koreans. Strong engineering culture, competitive salary, English-friendly team.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(7) },

  // ══════════════════════════════════════════════════════════════════════════
  // MALAYSIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p76', title: 'Data Engineering Intern', company: 'Axiata Digital', country: 'Malaysia', location: 'Kuala Lumpur', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build data pipelines and analytics tools for Southeast Asia\'s leading telco-digital company. Python and Spark skills valued.', relevantDegrees: ['Computer Science', 'Data Science', 'IT'], postedDate: d(3) },
  { id: 'p77', title: 'Finance Analyst – Full Time', company: 'Maybank', country: 'Malaysia', location: 'Kuala Lumpur', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Join ASEAN\'s fourth-largest bank. Analyse retail and corporate banking portfolios. Islamic finance exposure.', relevantDegrees: ['Finance', 'Economics', 'Accounting', 'Business'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // SPAIN
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p78', title: 'Product Designer Intern', company: 'Typeform', country: 'Spain', location: 'Barcelona', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Design', experienceLevel: 'Entry', description: 'Design intuitive form and survey experiences used by millions globally. Portfolio and Figma skills required.', relevantDegrees: ['Design', 'HCI', 'Computer Science'], postedDate: d(4) },
  { id: 'p79', title: 'Tourism & Hospitality Graduate', company: 'Meliá Hotels', country: 'Spain', location: 'Madrid', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Hospitality', experienceLevel: 'Entry', description: 'International management training across F&B, rooms division, and events at a leading global hotel group.', relevantDegrees: ['Hospitality Management', 'Tourism', 'Business'], postedDate: d(6) },
  { id: 'p80', title: 'Remote Growth Hacker', company: 'Cabify', country: 'Spain', location: 'Remote (EU/LATAM)', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Marketing', experienceLevel: 'Entry', description: 'Drive user acquisition and retention experiments for Spain\'s leading ride-hailing app. Data-driven, startup pace.', relevantDegrees: ['Marketing', 'Business', 'Statistics'], postedDate: d(2) },

  // ══════════════════════════════════════════════════════════════════════════
  // SWEDEN
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p81', title: 'Backend Engineer Intern', company: 'Spotify', country: 'Sweden', location: 'Stockholm', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Help power audio streaming for 600M users. Java or Python backend, microservices architecture.', relevantDegrees: ['Computer Science', 'Software Engineering', 'Mathematics'], postedDate: d(3) },
  { id: 'p82', title: 'Supply Chain Analyst', company: 'IKEA', country: 'Sweden', location: 'Älmhult', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Logistics', experienceLevel: 'Entry', description: 'Optimise global home furnishing supply chains. Data analysis, supplier relations, and sustainability focus.', relevantDegrees: ['Logistics', 'Business', 'Engineering', 'Economics'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // SWITZERLAND
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p83', title: 'Investment Banking Internship', company: 'UBS', country: 'Switzerland', location: 'Zurich', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: '10-week summer internship across M&A and equity capital markets. Strong academic record and analytical skills required.', relevantDegrees: ['Finance', 'Economics', 'Mathematics', 'Business'], postedDate: d(4) },
  { id: 'p84', title: 'Data Scientist – Full Time', company: 'Nestlé', country: 'Switzerland', location: 'Vevey', type: 'Hybrid', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Apply machine learning to consumer behaviour and supply chain optimisation for one of the world\'s largest food companies.', relevantDegrees: ['Computer Science', 'Statistics', 'Data Science', 'Food Science'], postedDate: d(3) },

  // ══════════════════════════════════════════════════════════════════════════
  // RWANDA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p85', title: 'Software Developer Graduate', company: 'Andela Rwanda', country: 'Rwanda', location: 'Kigali', type: 'Remote', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Work remotely for top global companies through Andela\'s talent network. Competitive USD salary, Kigali hub.', relevantDegrees: ['Computer Science', 'Software Engineering', 'IT'], postedDate: d(2) },
  { id: 'p86', title: 'Healthcare Innovation Intern', company: 'Rwanda Biomedical Centre', country: 'Rwanda', location: 'Kigali', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Healthcare', experienceLevel: 'Entry', description: 'Support digital health initiatives including telemedicine rollout and health data analytics across Rwanda.', relevantDegrees: ['Public Health', 'Medicine', 'IT', 'Biology'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // HONG KONG
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p87', title: 'Equity Research Intern', company: 'HSBC', country: 'Hong Kong', location: 'Hong Kong', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Support equity research analysts covering pan-Asian markets. Excel modelling and sector-specific reports.', relevantDegrees: ['Finance', 'Economics', 'Business', 'Mathematics'], postedDate: d(5) },
  { id: 'p88', title: 'Technology Graduate Programme', company: 'Alibaba Group', country: 'Hong Kong', location: 'Hong Kong', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Develop e-commerce, cloud, and AI solutions for global markets. English-language team, Cantonese a plus.', relevantDegrees: ['Computer Science', 'Software Engineering', 'Business'], postedDate: d(6) },

  // ══════════════════════════════════════════════════════════════════════════
  // INDONESIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p89', title: 'Product Intern', company: 'Gojek', country: 'Indonesia', location: 'Jakarta', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Work on product features for Southeast Asia\'s super-app used by millions for transport, food, and payments.', relevantDegrees: ['Computer Science', 'Business', 'Design'], postedDate: d(4) },
  { id: 'p90', title: 'Graduate Finance Analyst', company: 'Bank Central Asia', country: 'Indonesia', location: 'Jakarta', type: 'On-site', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Join Indonesia\'s largest private bank. Structured training in retail banking, credit, and digital finance.', relevantDegrees: ['Finance', 'Economics', 'Accounting', 'Business'], postedDate: d(7) },

  // ══════════════════════════════════════════════════════════════════════════
  // POLAND
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p91', title: 'Remote QA Engineer', company: 'CD Projekt Red', country: 'Poland', location: 'Remote (EU)', type: 'Remote', jobCategory: 'Remote Job', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Test and ensure quality for AAA game titles. Knowledge of testing methodologies and gaming passion required.', relevantDegrees: ['Computer Science', 'Software Engineering', 'IT'], postedDate: d(3) },
  { id: 'p92', title: 'Accounting Graduate', company: 'KPMG Poland', country: 'Poland', location: 'Warsaw', type: 'Hybrid', jobCategory: 'Graduate Job', pay: 'Paid', field: 'Finance', experienceLevel: 'Entry', description: 'Join the audit and advisory practice. ACCA support programme, international client exposure.', relevantDegrees: ['Accounting', 'Finance', 'Business', 'Economics'], postedDate: d(5) },

  // ══════════════════════════════════════════════════════════════════════════
  // ETHIOPIA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p93', title: 'NGO Development Intern', company: 'Mercy Corps Ethiopia', country: 'Ethiopia', location: 'Addis Ababa', type: 'On-site', jobCategory: 'Internship', pay: 'Paid', field: 'Consulting', experienceLevel: 'Entry', description: 'Support food security and livelihood programmes in rural Ethiopia. Stipend and accommodation provided.', relevantDegrees: ['Development Studies', 'Economics', 'Agriculture', 'Social Work'], postedDate: d(6) },
  { id: 'p94', title: 'Telecom Engineer – Full Time', company: 'Ethio Telecom', country: 'Ethiopia', location: 'Addis Ababa', type: 'On-site', jobCategory: 'Full Time Job', pay: 'Paid', field: 'Engineering', experienceLevel: 'Entry', description: 'Work on national network infrastructure expansion across Africa\'s second-most populous country.', relevantDegrees: ['Electrical Engineering', 'Telecommunications', 'IT'], postedDate: d(4) },

  // ══════════════════════════════════════════════════════════════════════════
  // PORTUGAL
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'p95', title: 'Full-Stack Intern', company: 'Farfetch', country: 'Portugal', location: 'Porto', type: 'Hybrid', jobCategory: 'Internship', pay: 'Paid', field: 'Technology', experienceLevel: 'Entry', description: 'Build luxury e-commerce features for a global platform connecting boutiques to customers worldwide. React and Node.js.', relevantDegrees: ['Computer Science', 'Software Engineering'], postedDate: d(3) },
  { id: 'p96', title: 'Tourism Research Assistant', company: 'Universidade Nova de Lisboa', country: 'Portugal', location: 'Lisbon', type: 'Hybrid', jobCategory: 'Research Opportunity', pay: 'Paid', field: 'Hospitality', experienceLevel: 'Entry', description: 'Research sustainable tourism models in Southern Europe. Data collection, analysis, and policy brief writing.', relevantDegrees: ['Tourism', 'Geography', 'Environmental Science', 'Economics'], postedDate: d(8) },
];
