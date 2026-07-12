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
  // v4: adds notes for multiple subjects; also clears legacy fake conversations
  if (!getStorage('unihub_mock_initialized_v4', false)) {
    setStorage('unihub_conversations', []);
  }

  const isInitialized = getStorage('unihub_mock_initialized_v4', false);
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

  const ago = (days: number) => new Date(Date.now() - 86400000 * days).toISOString();
  const sampleNotes: Note[] = [
    // ── Computer Science ──────────────────────────────────────────────────────
    {
      id: 'n1',
      title: 'Week 1: Introduction to Machine Learning',
      content: `Supervised vs Unsupervised Learning
─────────────────────────────────────
Supervised: labelled training data → learn mapping f(x) = y
  Examples: Linear Regression, SVM, Neural Networks
Unsupervised: no labels → find structure
  Examples: K-Means Clustering, PCA, Autoencoders

Bias-Variance Tradeoff
• High bias → underfitting (model too simple)
• High variance → overfitting (model memorises training data)
• Goal: find sweet spot that generalises well

Key Terms
• Epoch: one full pass through the training dataset
• Loss function: measures prediction error (MSE, Cross-Entropy)
• Gradient descent: iteratively minimise loss by adjusting weights`,
      subject: 'Computer Science', university, category: 'Lecture',
      createdAt: ago(10), updatedAt: ago(10)
    },
    {
      id: 'n2',
      title: 'Data Structures: Trees & Graphs',
      content: `Binary Search Tree (BST)
─────────────────────────
• Left child < parent < right child
• Search: O(log n) average, O(n) worst
• Insertion / Deletion: O(log n) average

Graph Representations
• Adjacency Matrix: O(V²) space, O(1) edge lookup
• Adjacency List: O(V+E) space, better for sparse graphs

BFS vs DFS
• BFS (queue): shortest path in unweighted graph
• DFS (stack/recursion): cycle detection, topological sort

Important Algorithms
→ Dijkstra's: single-source shortest path (weighted, no negative edges)
→ Bellman-Ford: handles negative weights
→ Kruskal / Prim: Minimum Spanning Tree`,
      subject: 'Computer Science', university, category: 'Lecture',
      createdAt: ago(8), updatedAt: ago(7)
    },
    {
      id: 'n3',
      title: 'Operating Systems: Process & Thread Management',
      content: `Process vs Thread
──────────────────
Process: independent program in execution; own memory space
Thread: lightweight unit within a process; shares memory

Process States: New → Ready → Running → Waiting → Terminated

Scheduling Algorithms
• FCFS: simple but convoy effect
• SJF: optimal avg wait time; needs future knowledge
• Round Robin: preemptive, time quantum q; fair CPU sharing
• Priority Scheduling: risk of starvation → use ageing

Deadlock Conditions (all four must hold)
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

Semaphores
• Binary (mutex): 0 or 1
• Counting: track resource instances
• P() = wait/down, V() = signal/up`,
      subject: 'Computer Science', university, category: 'Lecture',
      createdAt: ago(5), updatedAt: ago(5)
    },

    // ── Mathematics ──────────────────────────────────────────────────────────
    {
      id: 'n4',
      title: 'Calculus II: Integration Techniques',
      content: `Core Integration Methods
────────────────────────
1. Substitution (u-sub)
   Let u = g(x), then du = g'(x)dx
   ∫f(g(x))g'(x)dx = ∫f(u)du

2. Integration by Parts
   ∫u dv = uv − ∫v du
   Choose u: Logarithm, Inverse trig, Algebraic, Trig, Exponential (LIATE)

3. Partial Fractions
   Break rational functions into simpler fractions
   Useful when degree(numerator) < degree(denominator)

4. Trig Substitution
   √(a²−x²) → x = a sin θ
   √(a²+x²) → x = a tan θ
   √(x²−a²) → x = a sec θ

Convergence Tests for Series
• Ratio Test: L = lim|aₙ₊₁/aₙ|; converges if L < 1
• Comparison Test: compare to known series
• Integral Test: ∫f(x)dx convergence ↔ Σaₙ convergence`,
      subject: 'Mathematics', university, category: 'Lecture',
      createdAt: ago(12), updatedAt: ago(11)
    },
    {
      id: 'n5',
      title: 'Linear Algebra: Eigenvalues & Eigenvectors',
      content: `Definition
──────────
Av = λv  where A is n×n matrix, v is non-zero vector, λ is scalar

Finding Eigenvalues
det(A − λI) = 0  (characteristic equation)

Finding Eigenvectors
Solve (A − λI)v = 0 for each eigenvalue λ

Diagonalisation
A = PDP⁻¹  where D = diagonal matrix of eigenvalues, P = matrix of eigenvectors
Possible only if A has n linearly independent eigenvectors

Applications
• Principal Component Analysis (PCA)
• Markov chains (steady-state)
• Differential equations
• Google PageRank algorithm

Key Properties
• Trace(A) = sum of eigenvalues
• det(A) = product of eigenvalues
• Symmetric matrices always have real eigenvalues`,
      subject: 'Mathematics', university, category: 'Lecture',
      createdAt: ago(6), updatedAt: ago(6)
    },

    // ── Business / Marketing ──────────────────────────────────────────────────
    {
      id: 'n6',
      title: 'Marketing Strategy: The 4 Ps Framework',
      content: `The Marketing Mix (4 Ps)
─────────────────────────
Product
• Core benefit, actual product, augmented product
• Product life cycle: Introduction → Growth → Maturity → Decline

Price
• Cost-based: cost + markup
• Value-based: willingness to pay
• Competitive: match/undercut rivals
• Psychological pricing: £9.99 vs £10.00

Place (Distribution)
• Direct: D2C, e-commerce
• Indirect: wholesalers → retailers → consumer
• Channel conflict: managing multiple channels

Promotion
• Advertising, PR, Sales Promotion, Personal Selling, Direct Marketing
• AIDA model: Awareness → Interest → Desire → Action

Case Study Notes – Apple iPhone Launch
• Product: premium differentiation, ecosystem lock-in
• Price: skimming strategy at launch
• Place: exclusive Apple Stores + select carriers
• Promotion: hype-driven keynote events`,
      subject: 'Business', university, category: 'Lecture',
      createdAt: ago(9), updatedAt: ago(8)
    },
    {
      id: 'n7',
      title: 'Financial Accounting: Balance Sheet Basics',
      content: `The Accounting Equation
────────────────────────
Assets = Liabilities + Equity

Assets
• Current: cash, accounts receivable, inventory (<1 year)
• Non-current: property, plant & equipment, intangibles

Liabilities
• Current: accounts payable, short-term debt (<1 year)
• Non-current: bonds payable, lease obligations

Equity
• Share capital + Retained earnings − Dividends

Key Ratios
• Current Ratio = Current Assets / Current Liabilities  (ideal ≥ 2)
• Debt-to-Equity = Total Debt / Shareholders' Equity
• Return on Equity (ROE) = Net Income / Shareholders' Equity

Double-Entry Bookkeeping
Every transaction has equal debit and credit entries
Debit: increases assets & expenses; decreases liabilities & equity
Credit: increases liabilities & equity; decreases assets & expenses`,
      subject: 'Business', university, category: 'Lecture',
      createdAt: ago(14), updatedAt: ago(13)
    },

    // ── Economics ─────────────────────────────────────────────────────────────
    {
      id: 'n8',
      title: 'Macroeconomics: Fiscal & Monetary Policy',
      content: `Fiscal Policy (Government)
──────────────────────────
Expansionary: ↑ government spending or ↓ taxes → stimulate AD
Contractionary: ↓ spending or ↑ taxes → reduce inflation

Multiplier Effect
ΔY = ΔG × 1/(1−MPC)
MPC = Marginal Propensity to Consume (typically 0.6–0.9)

Monetary Policy (Central Bank)
────────────────────────────────
Tools: interest rates, open market operations, reserve requirements
Expansionary: ↓ interest rate → ↑ borrowing → ↑ spending
Contractionary: ↑ interest rate → ↓ inflation

Aggregate Demand (AD)
AD = C + I + G + (X − M)
Shifts: consumer confidence, credit availability, exchange rate

Phillips Curve
Short-run trade-off: ↓ unemployment ↔ ↑ inflation
Long-run: vertical at natural rate of unemployment (NAIRU)`,
      subject: 'Economics', university, category: 'Lecture',
      createdAt: ago(7), updatedAt: ago(7)
    },

    // ── Psychology ────────────────────────────────────────────────────────────
    {
      id: 'n9',
      title: 'Cognitive Psychology: Memory Models',
      content: `Atkinson–Shiffrin Multi-Store Model (1968)
───────────────────────────────────────────
Sensory Register → Short-Term Memory (STM) → Long-Term Memory (LTM)

STM Characteristics
• Capacity: 7 ± 2 chunks (Miller, 1956)
• Duration: ~20 seconds without rehearsal
• Encoding: mainly acoustic

LTM Characteristics
• Capacity: theoretically unlimited
• Duration: lifetime
• Encoding: mainly semantic

Types of LTM
• Episodic: personal autobiographical events
• Semantic: general world knowledge
• Procedural: how to do things (motor skills)
• Implicit vs Explicit memory

Working Memory Model (Baddeley & Hitch, 1974)
• Central Executive: coordinates attention
• Phonological Loop: verbal/acoustic info
• Visuospatial Sketchpad: visual/spatial info
• Episodic Buffer: links LTM and other components

Forgetting Theories
• Decay: trace fades over time
• Interference: pro/retroactive interference
• Retrieval failure: cue-dependent forgetting`,
      subject: 'Psychology', university, category: 'Lecture',
      createdAt: ago(11), updatedAt: ago(10)
    },

    // ── Biology / Medicine ────────────────────────────────────────────────────
    {
      id: 'n10',
      title: 'Cell Biology: DNA Replication & Transcription',
      content: `DNA Replication
───────────────
Semi-conservative: each new double helix has one old + one new strand

Steps
1. Helicase unwinds the double helix at origin of replication
2. Primase adds RNA primers (5'→3')
3. DNA Polymerase III adds nucleotides (5'→3' only)
   • Leading strand: continuous synthesis
   • Lagging strand: Okazaki fragments (5'→3' away from fork)
4. DNA Polymerase I replaces RNA primers with DNA
5. Ligase seals the nick between fragments

Transcription (DNA → mRNA)
─────────────────────────
• RNA Polymerase binds promoter, unwinds DNA
• Template strand read 3'→5'; mRNA synthesised 5'→3'
• Eukaryotes: pre-mRNA → splicing (remove introns) → mature mRNA

Translation (mRNA → Protein)
• Ribosome reads codons (3 bases) at A, P, E sites
• tRNA anticodon pairs with mRNA codon
• Elongation: peptide bond formed, ribosome translocates
• Stop codons: UAA, UAG, UGA`,
      subject: 'Biology', university, category: 'Lecture',
      createdAt: ago(4), updatedAt: ago(4)
    },

    // ── Physics ───────────────────────────────────────────────────────────────
    {
      id: 'n11',
      title: 'Quantum Mechanics: Wave-Particle Duality',
      content: `Historical Background
──────────────────────
• Planck (1900): energy quantised — E = hf
• Einstein (1905): photoelectric effect — light behaves as particles (photons)
• de Broglie (1924): particles have wave nature — λ = h/p

Double-Slit Experiment
• Single electron creates interference pattern → wave behaviour
• Observing which slit → pattern collapses → particle behaviour
• Measurement disturbs the system (Copenhagen interpretation)

Heisenberg Uncertainty Principle
Δx · Δp ≥ ℏ/2
• Cannot simultaneously know exact position AND momentum
• Not a measurement problem — fundamental property of nature

Schrödinger Equation
iℏ ∂Ψ/∂t = ĤΨ
• Ψ (wavefunction): probability amplitude
• |Ψ|² gives probability density of finding particle at position x

Quantum Numbers
n: principal (energy level)
l: azimuthal (shape of orbital, 0 to n−1)
mₗ: magnetic (orientation, −l to +l)
mₛ: spin (+½ or −½)`,
      subject: 'Physics', university, category: 'Lecture',
      createdAt: ago(3), updatedAt: ago(3)
    },

    // ── Law ───────────────────────────────────────────────────────────────────
    {
      id: 'n12',
      title: 'Contract Law: Formation & Vitiating Factors',
      content: `Elements of a Valid Contract
─────────────────────────────
1. Offer: clear, definite, communicated to offeree
2. Acceptance: unconditional, mirror-image rule
3. Consideration: something of value exchanged (must not be past)
4. Intention to create legal relations (presumed in commercial dealings)
5. Capacity: parties must be of legal age and sound mind

Rules of Offer & Acceptance
• Invitation to Treat ≠ Offer (display of goods, adverts — Fisher v Bell)
• Counter-offer terminates original offer (Hyde v Wrench)
• Postal Rule: acceptance effective on posting (Adams v Lindsell)
• Revocation: effective when communicated, not on posting

Vitiating Factors
• Misrepresentation: false statement of fact inducing contract
  → Fraudulent / Negligent / Innocent
• Duress: illegitimate pressure (economic duress now recognised)
• Undue Influence: presumed (solicitor–client, doctor–patient)
• Mistake: Common / Mutual / Unilateral
• Illegality: void ab initio if purpose is illegal

Remedies
• Damages (expectation / reliance)
• Specific Performance (equity — not for personal services)
• Rescission (voids contract from beginning)`,
      subject: 'Law', university, category: 'Lecture',
      createdAt: ago(6), updatedAt: ago(5)
    },

    // ── Engineering ───────────────────────────────────────────────────────────
    {
      id: 'n13',
      title: 'Thermodynamics: Laws & Heat Engines',
      content: `The Four Laws of Thermodynamics
────────────────────────────────
0th Law: If A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C (defines temperature)
1st Law: Energy is conserved — ΔU = Q − W
2nd Law: Entropy of an isolated system never decreases (ΔS ≥ 0)
3rd Law: Entropy → 0 as T → 0 K (absolute zero unattainable)

Ideal Gas Law
PV = nRT  (R = 8.314 J/mol·K)

Thermodynamic Processes
• Isothermal: T constant → ΔU = 0, Q = W
• Adiabatic: Q = 0 → ΔU = −W
• Isobaric: P constant → W = PΔV
• Isochoric: V constant → W = 0, ΔU = Q

Carnot Efficiency (maximum possible)
η = 1 − T_cold/T_hot  (temperatures in Kelvin)

Entropy
ΔS = Q_rev / T
Clausius inequality: ∮ dQ/T ≤ 0`,
      subject: 'Engineering', university, category: 'Lecture',
      createdAt: ago(8), updatedAt: ago(7)
    },

    // ── History ───────────────────────────────────────────────────────────────
    {
      id: 'n14',
      title: 'Modern History: Causes of World War I',
      content: `MAIN Causes Framework
──────────────────────
M – Militarism
• European arms race: esp. Anglo-German naval rivalry
• Schlieffen Plan (Germany): attack France via Belgium, then Russia

A – Alliances
• Triple Alliance: Germany, Austria-Hungary, Italy
• Triple Entente: France, Russia, Britain
• Alliance system turned local conflict into world war

I – Imperialism
• Competition over colonies in Africa & Asia
• Moroccan Crises (1905, 1911) increased Franco-German tension

N – Nationalism
• Pan-Slavism in Balkans threatened Austria-Hungary
• Serbian ambitions after Balkan Wars (1912–13)

The Spark: Assassination of Archduke Franz Ferdinand
June 28, 1914 — Sarajevo, by Gavrilo Princip (Black Hand)
• Austria-Hungary issued July Ultimatum to Serbia
• Serbia rejected key terms → A-H declared war → alliance cascade

Historiographical Debate
• Fischer Thesis: Germany deliberately sought war for expansion
• Revisionist view: shared responsibility across great powers
• Recent scholarship: contingency — war not inevitable until July 1914`,
      subject: 'History', university, category: 'Lecture',
      createdAt: ago(13), updatedAt: ago(12)
    },

    // ── Chemistry ─────────────────────────────────────────────────────────────
    {
      id: 'n15',
      title: 'Organic Chemistry: Reaction Mechanisms',
      content: `Arrow Pushing Conventions
──────────────────────────
Curved arrow: movement of an electron pair
Half-headed (fishhook) arrow: movement of a single electron (radical)
Arrow always from electron source (nucleophile/base) to electron sink

SN1 vs SN2
                SN1                 SN2
Mechanism     2-step (carbocation)  Concerted (1-step)
Rate          Rate = k[substrate]   Rate = k[substrate][nucleophile]
Stereochem.   Racemisation          Inversion of configuration (Walden)
Substrate     3° > 2° >> 1°        1° > 2° >> 3° (steric effects)
Solvent       Polar protic          Polar aprotic

Electrophilic Addition to Alkenes
1. π electrons attack electrophile → carbocation intermediate
2. Nucleophile attacks carbocation
Markovnikov's rule: H adds to carbon with MORE H's (more stable carbocation)

Elimination Reactions
E1: two-step, carbocation intermediate (same conditions as SN1)
E2: concerted, anti-periplanar arrangement required, strong base

Key Functional Group Tests
• Bromine water: decolourised → C=C present
• Fehling's/Tollens': reduces → aldehyde present
• 2,4-DNPH: orange precipitate → carbonyl present`,
      subject: 'Chemistry', university, category: 'Lecture',
      createdAt: ago(2), updatedAt: ago(2)
    },

    // ── Tutorial Notes ────────────────────────────────────────────────────────
    {
      id: 'n16',
      title: 'Statistics Tutorial: Hypothesis Testing',
      content: `Steps in Hypothesis Testing
────────────────────────────
1. State H₀ (null) and H₁ (alternative)
2. Choose significance level α (typically 0.05 or 0.01)
3. Select test statistic
4. Calculate p-value
5. Decision: reject H₀ if p-value < α

Common Tests
• z-test: known population σ, large sample (n > 30)
• t-test: unknown σ; one-sample, independent, paired
• χ² test: categorical data (goodness of fit / independence)
• ANOVA: comparing means across ≥3 groups

Type I vs Type II Errors
• Type I (α): reject true H₀ (false positive)
• Type II (β): fail to reject false H₀ (false negative)
• Power = 1 − β: ability to detect a real effect

Confidence Intervals
95% CI: x̄ ± 1.96 × (σ/√n)
Interpretation: 95% of such intervals would contain the true parameter
(NOT: "95% probability that the parameter is in this interval")`,
      subject: 'Statistics', university, category: 'Tutorial',
      createdAt: ago(5), updatedAt: ago(4)
    },
    {
      id: 'n17',
      title: 'Research Methods: Qualitative vs Quantitative',
      content: `Quantitative Research
──────────────────────
• Numerical data, statistical analysis
• Experiments, surveys, longitudinal studies
• High reliability (replicable), objective
• Weakness: may miss context/meaning

Qualitative Research
• Non-numerical: interviews, observations, case studies
• Grounded theory, ethnography, phenomenology
• High validity (depth of understanding)
• Weakness: subjective, hard to generalise

Mixed Methods
• Triangulation: converging evidence from multiple methods
• Explanatory: quant first → qual explains results
• Exploratory: qual first → quant tests findings

Sampling Strategies
• Probability: random, stratified, cluster → generalise to population
• Non-probability: purposive, snowball, convenience → depth not breadth

Ethical Considerations
• Informed consent, confidentiality, anonymity
• Right to withdraw at any time
• Deception: only if necessary, debrief afterward
• BPS / APA guidelines`,
      subject: 'Research Methods', university, category: 'Tutorial',
      createdAt: ago(9), updatedAt: ago(9)
    },

    // ── Personal / Revision ───────────────────────────────────────────────────
    {
      id: 'n18',
      title: 'Exam Revision Plan – Semester 2',
      content: `Upcoming Exams
───────────────
Week 1: Statistics (Mon), Macroeconomics (Thu)
Week 2: Organic Chemistry (Tue), Contract Law (Fri)
Week 3: Quantum Mechanics (Wed)

Daily Study Schedule
08:00–10:00  Priority subject (active recall)
10:15–12:00  Secondary subject (past papers)
13:00–14:30  Review yesterday's material (spaced repetition)
14:30–16:00  Problem sets / essay plans
16:30–17:30  Flashcard review (Anki)

Evidence-Based Revision Techniques
✓ Active recall (self-testing beats re-reading 3× more effective)
✓ Spaced repetition (review at increasing intervals)
✓ Interleaving (mix subjects in a session)
✓ Past paper practice under timed conditions
✗ Highlighting (passive, low retention)
✗ Re-reading notes repeatedly

Resources to Cover
• Lecture slides (fill gaps in these notes)
• Past papers 2020–2025 (see Past Papers section)
• Khan Academy for maths refresher
• Textbook chapters listed on module page`,
      subject: 'General', university, category: 'Personal',
      createdAt: ago(1), updatedAt: ago(1)
    },
  ];
  setStorage('unihub_notes', sampleNotes);

  setStorage('unihub_jobs', generateJobs());
  setStorage('unihub_marketplace', generateMarketplaceItems(university));
  setStorage('unihub_study_groups', generateStudyGroups(university));

  setStorage('unihub_mock_initialized_v4', true);
}
