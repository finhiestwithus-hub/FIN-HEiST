import { ServiceItem, FeaturedService, BentoItem, ProcessStep, LoanCategory, TeamMember, Testimonial, FAQItem } from '../types';

export const TRUST_STATS = [
  { label: 'ITR Filings Completed', value: 1000, suffix: '+', prefix: '' },
  { label: 'GST Returns Processed', value: 500, suffix: '+', prefix: '' },
  { label: 'Business Registrations', value: 100, suffix: '+', prefix: '' },
  { label: 'Client Satisfaction Rating', value: 95, suffix: '%', prefix: '' },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'income-tax',
    title: 'Income Tax Services',
    description: 'Comprehensive ITR filing, tax planning, capital gains calculation, and notice resolution for salaried individuals, professionals, and corporations across India.',
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
    category: 'core',
    popular: true,
    gradient: 'from-blue-600/20 via-indigo-600/20 to-cyan-500/20',
    subServices: [
      'Income Tax Return Filing (ITR 1 to ITR 6)',
      'ITR for Salaried Individuals & High Net-Worth Individuals',
      'ITR for Businesses, Companies & Professionals',
      'Presumptive Taxation Support (Sec 44AD / 44ADA / 44AE)',
      'Capital Gains Tax Calculation (Property, Stocks, Crypto)',
      'Tax Planning & Advisory under Old vs New Tax Regimes',
      'Income Tax Notice & Assessment Resolution',
      'Previous Return Scrutiny & Refund Expediting Support'
    ]
  },
  {
    id: 'gst-services',
    title: 'GST Services',
    description: 'End-to-end GST registration, monthly GSTR-1 & GSTR-3B filings, annual returns, input tax credit (ITC) reconciliation, and notice advisory.',
    iconName: 'Receipt',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    category: 'core',
    popular: true,
    gradient: 'from-emerald-600/20 via-teal-600/20 to-cyan-500/20',
    subServices: [
      'New GST Registration & Modification Assistance',
      'Monthly/Quarterly GSTR-1 & GSTR-3B Return Filings',
      'Annual GST Return & Reconciliation (GSTR-9 & 9C)',
      'Input Tax Credit (ITC) Matching & Reconciliation 2A/2B',
      'GST Refund Application & Processing Support',
      'GST Notice, Advisory & Department Representation',
      'GST Compliance Review & Health Check Audit',
      'GST Cancellation & Revocation Assistance'
    ]
  },
  {
    id: 'accounting-tally',
    title: 'Accounting & Tally',
    description: 'Professional bookkeeping, ledger scrutiny, bank reconciliation, and year-end accounts finalization tailored to modern accounting standards.',
    iconName: 'Calculator',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    category: 'core',
    gradient: 'from-violet-600/20 via-purple-600/20 to-pink-500/20',
    subServices: [
      'End-to-End Bookkeeping on Tally Accounting',
      'Ledger Scrutiny & General Ledger Maintenance',
      'Periodic Bank & Vendor Ledger Reconciliation',
      'Accounts Finalization Support & Audit Readiness',
      'Profit & Loss Statement & Balance Sheet Preparation',
      'Cash Flow & Funds Flow Statement Preparation',
      'Fixed Asset Register Maintenance & Depreciation Calculation',
      'Custom Financial Data Organization & Clean-up'
    ]
  },
  {
    id: 'business-msme',
    title: 'Business & MSME Services',
    description: 'Strategic Udyam registration, startup recognition, government subsidy documentation, and ongoing corporate compliance assistance.',
    iconName: 'Briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    category: 'core',
    gradient: 'from-amber-500/20 via-orange-600/20 to-yellow-500/20',
    subServices: [
      'Udyam (MSME) Certificate Registration & Updates',
      'Startup India DPIIT Recognition & Tax Exemption Support',
      'Complete Business Financial Documentation & structuring',
      'Proprietorship, Partnership & LLP Compliance Support',
      'GeM Portal Registration & Tender Documentation Support',
      'MSME Samadhaan & Delayed Payment Advisory Support',
      'Strategic Business Growth & Cashflow Advisory',
      'Import Export Code (IEC) & Trade License Assistance'
    ]
  },
  {
    id: 'project-reports',
    title: 'Project Reports & Financial Documentation',
    description: 'Bank-ready project reports, multi-year financial projections, CMA data sheets, and DSCR analysis designed to accelerate credit approvals.',
    iconName: 'BarChart3',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop',
    category: 'specialized',
    popular: true,
    gradient: 'from-blue-600/20 via-cyan-600/20 to-emerald-500/20',
    subServices: [
      'Comprehensive Bank Loan Project Reports (Term & CC/OD)',
      'Credit Monitoring Arrangement (CMA) Data Preparation',
      'Debt Service Coverage Ratio (DSCR) Calculation & Optimization',
      '5-Year to 10-Year Projected P&L, Balance Sheets & Cash Flow',
      'Detailed Business Revenue Projections & Unit Economics',
      'Mudra Loan & PMEGP Specialized Project Reports',
      'Working Capital Assessment & Maximum Permissible Bank Finance',
      'Custom Financial Documentation for PE/VC Pitch Decks'
    ]
  },
  {
    id: 'audit-compliance',
    title: 'Audit & Compliance Support',
    description: 'Rigorous internal ledger scrutiny, vouching, statutory working paper preparation, and reconciliation to ensure 100% regulatory compliance.',
    iconName: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop',
    category: 'compliance',
    gradient: 'from-slate-700/30 via-indigo-800/20 to-blue-600/20',
    subServices: [
      'Pre-Audit Documentation Preparation & Scrutiny Support',
      'Deep-Dive Ledger Scrutiny & Vouching Verification',
      'Statutory & Internal Audit Working Paper Support',
      'Tax Audit Preparation Assistance (Section 44AB)',
      'Accounting Reconciliation & Variance Analysis',
      'Corporate Governance & Statutory Filings Review',
      'Assistance during Departmental Inspections & Queries',
      'Compliance Checklist & Internal Control Implementation'
    ]
  },
  {
    id: 'registration-services',
    title: 'Registration Services',
    description: 'Seamless entity structuring and registrations for Private Limited Companies, LLPs, Proprietorships, Section 8 NGOs, Trusts, and Trade Licenses.',
    iconName: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop',
    category: 'compliance',
    gradient: 'from-cyan-600/20 via-blue-600/20 to-indigo-600/20',
    subServices: [
      'Private Limited Company & One Person Company (OPC) Setup',
      'LLP & Partnership Firm Registration & Deed Drafting',
      'Proprietorship Registration & Shop & Establishment License',
      'Section 8 Company, Trust & Society (NGO) Registration',
      '12A, 80G, CSR-1 & NGO Darpan Certifications',
      'Trademark Registration, Brand Logo & IP Protection Support',
      'FSSAI Food License, Trade License & Professional Tax Setup',
      'EPF & ESIC Employer Registration & Monthly Return Compliance',
      'DSC, DIN, and more'
    ]
  },
  {
    id: 'ca-certificates',
    title: 'CA Certificates & Attestation',
    description: 'Authorized financial certificates for visa applications, government tenders, solvency verification, net worth estimation, and bank financing.',
    iconName: 'Award',
    imageUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1000&auto=format&fit=crop',
    category: 'advisory',
    gradient: 'from-emerald-500/20 via-green-600/20 to-teal-600/20',
    subServices: [
      'Net Worth Certificates for Visa, Immigration & Tenders',
      'Certified Turnover & Sales Valuation Certificates',
      'Solvency & Financial Stability Certificates for Authorities',
      'Fund Utilization & Grant Expenditure Certifications',
      'Debtors, Creditors & Stock Valuation Certificates',
      'Fixed Asset & Capital Investment Verification Certificates',
      'Bank Finance & Working Capital Assessment Certificates',
      'Attestation of Statutory Financial Documents & Projections',
      'Other Statutory & Financial Certificates as Required'
    ]
  },
  {
    id: 'tds-return',
    title: 'TDS Return & Compliance',
    description: 'End-to-end TDS deduction advice, quarterly returns (Forms 24Q, 26Q, 27Q, 27EQ), Form 16/16A generation, and reconciliation with Form 26AS & AIS.',
    iconName: 'FileSpreadsheet',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
    category: 'compliance',
    gradient: 'from-indigo-600/20 via-purple-600/20 to-blue-500/20',
    subServices: [
      'Quarterly TDS Return Filings (Forms 24Q, 26Q, 27Q, 27EQ)',
      'TDS Challan Payment Guidance & Challan Status Verification',
      'Form 16 (Employees) & Form 16A (Vendors) Generation Support',
      'Reconciliation with Form 26AS & Annual Information Statement (AIS)',
      'Lower / Nil TDS Certificate Application Assistance (Form 13)',
      'TDS Return Correction, Revised Filings & Demand Resolution',
      'PAN-TDS Correction & Default Notice Resolution',
      'Expert TDS Consultancy on Section 194C, 194J, 194Q & 195'
    ]
  },
  {
    id: 'advance-tax',
    title: 'Advance Tax Calculation & Advisory',
    description: 'Accurate quarterly advance tax liability calculations, interest estimation (Sections 234B/234C), and proactive tax planning for businesses and earners.',
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop',
    category: 'advisory',
    gradient: 'from-amber-600/20 via-rose-600/20 to-orange-500/20',
    subServices: [
      'Quarterly Advance Tax Liability Calculation & Scheduling',
      'Proactive Cash Flow Forecast for Advance Tax Payments',
      'Calculation & Mitigation of Sections 234B & 234C Interest',
      'Advance Tax Estimation for Salaried & Freelance Professionals',
      'Tax Planning for Capital Gains & Unexpected High-Value Income',
      'Corporate Advance Tax Compliance & Strategic Structuring',
      'Advance Tax Refund & Excess Tax Recovery Support',
      'Year-Round Tax Health Monitoring & Advisory Sessions'
    ]
  }
];

export const FEATURED_SERVICES: FeaturedService[] = [
  {
    id: 'income-tax-showcase',
    title: 'Income Tax Services',
    subtitle: 'Flawless Tax Filings with Maximum Legal Savings',
    description: 'We blend deep statutory expertise with modern automation to ensure your income tax returns are accurate, optimized for maximum legitimate deductions, and completely audit-ready.',
    benefits: [
      'Multi-source income reconciliation (Salary, Business, Capital Gains, Foreign Assets)',
      'Direct comparison of Old vs. New tax regime savings with customized projections',
      'Comprehensive AIS & Form 26AS matching to prevent departmental mismatch queries',
      'Dedicated CA Finalist review and direct representation for notice responses'
    ],
    ctaText: 'Explore Income Tax Solutions',
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
    metrics: [
      { label: 'Notice Avoidance Rate', value: '99.4%' },
      { label: 'Avg. Refund Speed', value: '14 Days' },
      { label: 'Tax Regimes Checked', value: '100%' }
    ]
  },
  {
    id: 'gst-showcase',
    title: 'GST Services',
    subtitle: 'Automated Compliance & Zero Input Tax Credit Leakage',
    description: 'Say goodbye to GST reconciliation nightmares. We provide meticulous GSTR-1 and GSTR-3B filings, ensuring every rupee of Input Tax Credit (ITC) is reconciled against vendor filings.',
    benefits: [
      'Automated 2A/2B vendor reconciliation to maximize lawful input tax credits',
      'Real-time filing alerts and error-free multi-state GST compliance tracking',
      'Swift resolution of GST notices, e-way bill disputes, and refund applications',
      'Strategic classification (HSN/SAC) check to prevent over-payment of GST'
    ],
    ctaText: 'Optimize Your GST Compliance',
    iconName: 'Receipt',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    metrics: [
      { label: 'ITC Recovery Rate', value: '98.8%' },
      { label: 'On-Time Filing', value: '100%' },
      { label: 'Reconciliation Accuracy', value: '99.9%' }
    ]
  },
  {
    id: 'accounting-showcase',
    title: 'Accounting & Tally',
    subtitle: 'Real-Time Financial Clarity for Smart Decision Making',
    description: 'Transform raw bank feeds and invoices into crisp, decision-ready financial statements. We maintain clean books on Tally Prime and modern cloud accounting software.',
    benefits: [
      'Accurate ledger maintenance with periodic bank, debtor, and creditor reconciliation',
      'Production of institutional-grade Balance Sheets and P&L Statements',
      'Complete preparation for statutory audits and corporate tax filings',
      'Real-time financial dashboard reporting and cash flow tracking'
    ],
    ctaText: 'Streamline Your Bookkeeping',
    iconName: 'Calculator',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    metrics: [
      { label: 'Books Cleaned', value: '500+' },
      { label: 'Reconciliation Speed', value: '3x Faster' },
      { label: 'Audit Readiness', value: '100%' }
    ]
  },
  {
    id: 'project-reports-showcase',
    title: 'Project Reports & Financial Projections',
    subtitle: 'Institutional-Grade Documentation that Lenders Trust',
    description: 'Secure term loans, working capital limits, and equity investments with precisely engineered financial projections, CMA data sheets, and DSCR optimization.',
    benefits: [
      'Bank-accepted CMA data formatted precisely to RBI and commercial bank guidelines',
      'Comprehensive Debt Service Coverage Ratio (DSCR) & sensitivity modeling',
      'Tailored for MSME Term Loans, Mudra Loans, Working Capital (CC/OD), and Startup Grants',
      'Detailed unit economics, break-even analysis, and cash flow forecasting'
    ],
    ctaText: 'Get Bank-Ready Reports',
    iconName: 'BarChart3',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop',
    metrics: [
      { label: 'Loan Approval Ratio', value: '94%' },
      { label: 'CMA Compliance', value: '100%' },
      { label: 'Report Turnaround', value: '3-5 Days' }
    ]
  },
  {
    id: 'loan-documentation-showcase',
    title: 'Bank Loan Assistance & Documentation Support',
    subtitle: 'Navigating Bank Requirements with CA-Backed Precision',
    description: 'We bridge the gap between business owners and lending institutions by structuring watertight financial dossiers, verifying collateral documents, and presenting compelling financial narratives.',
    benefits: [
      'Expert organization of income documents, 3-year ITRs, and bank statements',
      'Proactive alignment of financial statements with credit eligibility benchmarks',
      'Assistance in responding to bank credit queries and additional document requisitions',
      'Full compliance with statutory requirements for commercial and private lenders'
    ],
    ctaText: 'Discuss Your Loan Requirement',
    iconName: 'Landmark',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    metrics: [
      { label: 'Categories Handled', value: '12+' },
      { label: 'Document Verification', value: 'Rigorous' },
      { label: 'Lender Alignment', value: 'High' }
    ]
  }
];

export const BENTO_GRID_ITEMS: BentoItem[] = [
  {
    id: 'expert-team',
    title: 'Expert Leadership Team',
    description: 'Led by highly skilled CA Finalists and supported by a qualified Advisory Board of Chartered Accountants with deep domain expertise across direct & indirect taxation.',
    iconName: 'Users',
    colSpan: 2,
    rowSpan: 1,
    badge: 'Dual CA Finalist Led',
    gradient: 'from-blue-600/30 via-indigo-600/20 to-transparent'
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent & Upfront Pricing',
    description: 'Zero hidden fees, surprise bills, or hourly billing traps. Know exactly what you pay before we begin work on any filing or project.',
    iconName: 'Tag',
    colSpan: 1,
    rowSpan: 1,
    badge: 'Fixed Scope'
  },
  {
    id: 'fast-delivery',
    title: 'Fast Turnaround Delivery',
    description: 'Expedited processing workflows ensure your urgent ITRs, GST registrations, and project reports are finalized in days, not weeks.',
    iconName: 'Zap',
    colSpan: 1,
    rowSpan: 1,
    badge: 'Rapid Action'
  },
  {
    id: 'compliance-accuracy',
    title: '100% Compliance Accuracy',
    description: 'Every return and financial projection goes through a rigorous multi-tier checking procedure using modern fintech verification algorithms.',
    iconName: 'CheckCircle2',
    colSpan: 2,
    rowSpan: 1,
    badge: 'Zero Errors Guaranteed',
    gradient: 'from-emerald-600/30 via-teal-600/20 to-transparent'
  },
  {
    id: 'nationwide-support',
    title: 'Digital & Nationwide Support',
    description: 'Serving clients in Delhi, Mumbai, Bengaluru, Hyderabad, Dehradun, and remote towns across India with secure cloud collaboration.',
    iconName: 'Globe',
    colSpan: 1,
    rowSpan: 1,
    badge: 'Pan-India Reach'
  },
  {
    id: 'dedicated-assistance',
    title: 'Dedicated Consultation & Assistance',
    description: 'Direct access to your assigned financial specialist via WhatsApp, phone, or video call for instant resolution of tax queries.',
    iconName: 'Headphones',
    colSpan: 1,
    rowSpan: 1,
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Submit Requirement',
    subtitle: 'Tell Us Your Needs',
    description: 'Fill out our quick online consultation form or connect directly via WhatsApp outlining your business profile and compliance requirements.',
    duration: '2 Minutes',
    iconName: 'Send'
  },
  {
    id: 2,
    title: 'Free Consultation',
    subtitle: 'Expert Assessment',
    description: 'Our CA Finalists review your scenario, explain statutory obligations, answer your questions, and provide a clear, transparent fee estimate.',
    duration: 'Within 2-4 Hours',
    iconName: 'MessageSquare'
  },
  {
    id: 3,
    title: 'Document Collection',
    subtitle: 'Secure Cloud Upload',
    description: 'Easily upload your PAN, bank statements, invoices, and KYC documents via our secure, encrypted digital portal or organized WhatsApp thread.',
    duration: 'Same Day',
    iconName: 'FolderUp'
  },
  {
    id: 4,
    title: 'Processing & Scrutiny',
    subtitle: 'Multi-Tier Verification',
    description: 'Our specialists draft your returns, calculate tax savings, prepare project reports, and conduct thorough internal compliance audits.',
    duration: '1 to 3 Business Days',
    iconName: 'Cpu'
  },
  {
    id: 5,
    title: 'Delivery & Filing',
    subtitle: 'Official Acknowledgement',
    description: 'We file your returns with the government portal, deliver certified project dossiers, and share official acknowledgements with long-term digital storage.',
    duration: 'Instant Delivery',
    iconName: 'CheckSquare'
  }
];

export const BANK_LOAN_CATEGORIES: LoanCategory[] = [
  {
    id: 'msme-loans',
    title: 'MSME Loans',
    description: 'Government-backed and institutional funding for small and medium enterprises to expand machinery, inventory, and operations.',
    maxAmount: 'Up to ₹5 Crore',
    keyRequirement: 'Udyam Certificate, 3-Yr ITRs & Projected CMA Data',
    iconName: 'Building',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    features: ['Collateral-free CGTMSE options', 'Interest subvention schemes', 'Customized CMA & DSCR reports']
  },
  {
    id: 'mudra-loans',
    title: 'Pradhan Mantri Mudra Loan',
    description: 'Specialized financial assistance under Shishu, Kishore, and Tarun categories for micro-enterprises and non-corporate small businesses.',
    maxAmount: 'Up to ₹20 Lakhs',
    keyRequirement: 'Detailed Business Project Report & KYC Documents',
    iconName: 'Briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    features: ['Zero collateral requirement', 'Low processing charges', 'Structured project report preparation']
  },
  {
    id: 'business-loans',
    title: 'Commercial Business Loans',
    description: 'Unsecured and secured term loans tailored for established companies seeking working capital expansion or capital expenditure funding.',
    maxAmount: 'Up to ₹25 Crore+',
    keyRequirement: 'Audited Financial Statements & 5-Year Cash Flow Forecasts',
    iconName: 'Landmark',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?q=80&w=1000&auto=format&fit=crop',
    features: ['High loan quantum flexibility', 'Competitive institutional rates', 'Comprehensive DSCR sensitivity analysis']
  },
  {
    id: 'working-capital',
    title: 'Working Capital Finance (CC/OD)',
    description: 'Cash Credit and Overdraft limits to ensure uninterrupted daily business cash flows, supplier payments, and seasonal stock procurement.',
    maxAmount: 'Based on Turnover Assessment',
    keyRequirement: 'Monthly GST Returns, Stock Statements & MPBF Calculation',
    iconName: 'Wallet',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop',
    features: ['Turnover & drawing power calculation', 'Stock & book-debt statement formatting', 'CMA renewal & enhancement support']
  },
  {
    id: 'home-loans',
    title: 'Home Loan & Mortgage Assistance',
    description: 'Financial profiling and documentation for self-employed professionals and business owners seeking high-value residential property loans.',
    maxAmount: 'Up to ₹10 Crore+',
    keyRequirement: 'Clean ITR Computation & Business Profitability Proof',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    features: ['Income computation restructuring', 'Co-applicant financial alignment', 'Direct query resolution for credit officers']
  },
  {
    id: 'vehicle-loans',
    title: 'Commercial Vehicle & Equipment Finance',
    description: 'Swift documentation assistance for fleet operators, contractors, and businesses acquiring heavy transport vehicles and construction machinery.',
    maxAmount: 'Up to 90% Asset Value',
    keyRequirement: 'Asset Quotations, Debtors Summary & Repayment Capacity',
    iconName: 'Truck',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000&auto=format&fit=crop',
    features: ['Rapid turnaround processing', 'Fleet profitability projections', 'Tax benefit advisory on vehicle depreciation']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'vineet-choudhary',
    title_prefix: '',
    name: 'Vineet Choudhary',
    role: 'Co-Founder & Lead Financial Specialist',
    qualifications: 'CA Finalist | B.Com (Hons.)',
    expertise: ['Income Tax Filings', 'GST Compliance', 'Financial Documentation', 'Project Reports & Bank Loans', 'Regulatory Advisory'],
    bio: 'Vineet Choudhary is a CA Finalist with practical experience in taxation, GST, accounting, audit support, financial reporting, and business compliance. He has worked extensively on income tax filings, GST compliance, financial documentation, project reports, bank loan documentation, and regulatory advisory for individuals and MSMEs. His client-focused approach emphasizes practical solutions, transparency, and timely execution.',
    linkedin: 'https://linkedin.com/company/fin-heist',
    email: 'finhiestwithus@gmail.com',
    isAdvisory: false
  },
  {
    id: 'anshika-sahu',
    title_prefix: '',
    name: 'Anshika Sahu',
    role: 'Co-Founder & Statutory Compliance Lead',
    qualifications: 'CA Finalist | B.Com | M.Com',
    expertise: ['Accounting & Tally', 'Direct & Indirect Taxation', 'Statutory Audit Support', 'Financial Reporting', 'Business Advisory'],
    bio: ' Anshika Sahu is a CA Finalist with a strong academic background in Commerce and Finance. She specializes in accounting, taxation, statutory compliance, financial reporting, and business advisory services. With a detail-oriented approach and commitment to excellence, she assists individuals, startups, and businesses in meeting their financial and regulatory requirements efficiently.',
    linkedin: 'https://linkedin.com/company/fin-heist',
    email: 'finhiestwithus@gmail.com',
    isAdvisory: false
  },
  {
    id: 'ca-jatin-chopra',
    name: 'CA Jatin Chopra',
    role: 'Advisory Partner & Statutory Mentor',
    qualifications: 'Chartered Accountant | Founder, Jatin Chopra & Co. LLP',
    expertise: ['Internal Audits', 'Tax Advisory', 'Corporate Structuring', 'Statutory Attestation'],
    bio: 'CA Jatin Chopra is a distinguished Chartered Accountant based in Dehradun, Uttarakhand, recognized for his remarkable performance in the CA examinations. With over a decade of high-impact advisory experience, he mentors Fin-Heist on multidisciplinary practice areas including complex corporate audits, regulatory filings, and statutory certification procedures.',
    linkedin: 'https://linkedin.com/company/fin-heist',
    isAdvisory: true
  },
  {
    id: 'ca-alisha-uppal',
    name: 'CA Alisha Uppal',
    role: 'Advisory Partner — Auditing & Regulatory Compliance',
    qualifications: 'Chartered Accountant | Ex-Grant Thornton',
    expertise: ['Big-4 Audit Methodology', 'Ind-AS Compliance', 'Specialized Tax Assessments', 'Risk Advisory'],
    bio: 'CA Alisha Uppal is a qualified Chartered Accountant with over five years of specialized professional experience across top-tier auditing firms including Grant Thornton. Her deep involvement in high-level compliance, complex accounting standards, and regulatory scrutiny provides Fin-Heist clients with Big-4 caliber governance insights.',
    linkedin: 'https://linkedin.com/company/fin-heist',
    isAdvisory: true
  },
  {
    id: 'ca-mayank-aggarwal',
    name: 'CA Mayank Aggarwal',
    role: 'Advisory Partner — Corporate Law & MCA Compliance',
    qualifications: 'Chartered Accountant | Corporate Governance Specialist',
    expertise: ['MCA Compliance', 'Company Law Procedures', 'Financial Frameworks', 'Restructuring'],
    bio: 'CA Mayank Aggarwal is a veteran Chartered Accountant renowned for his authoritative practical approach to Ministry of Corporate Affairs (MCA) compliances, company law procedures, and corporate financial frameworks. He guides businesses through intricate secretarial compliances, entity restructurings, and statutory board documentation.',
    linkedin: 'https://linkedin.com/company/fin-heist',
    isAdvisory: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Rajeshwar Sharma',
    company: 'Vanguard Logistics & MSME PVT LTD',
    role: 'Managing Director',
    rating: 5,
    serviceUsed: 'Project Report & MSME Loan Assistance',
    location: 'Delhi NCR',
    content: 'Fin-Heist is worlds apart from traditional CAs. Their team formulated our ₹3.5 Crore bank loan project report with incredible precision—complete with DSCR sensitivity graphs and CMA sheets. Our bank manager specifically complimented the quality of the dossier. Loan sanctioned in just 18 days!'
  },
  {
    id: 'rev-2',
    name: 'Meenakshi Iyer',
    company: 'Sutra Digital Studios',
    role: 'Founder & CEO',
    rating: 5,
    serviceUsed: 'End-to-End GST & Accounting Package',
    location: 'Bengaluru',
    content: 'As a fast-growing tech agency, we needed a finance partner that works at SaaS speed. Vineet and Anshika restructured our messy Tally accounts and automated our monthly GSTR-1 and 3B filings. Their floating dashboard and WhatsApp responsiveness make us feel like we have a CFO on call 24/7.'
  },
  {
    id: 'rev-3',
    name: 'Vikramaditya Rathore',
    company: 'Apex Infra & Contracting LLP',
    role: 'Designated Partner',
    rating: 5,
    serviceUsed: 'Income Tax Assessment & Notice Resolution',
    location: 'Dehradun',
    content: 'We received an unexpected income tax notice regarding past year capital gains and presumptive business income. Fin-Heist handled the entire scrutiny representation with total professionalism. They saved us from heavy statutory penalties and got our assessment order cleared within 2 weeks.'
  },
  {
    id: 'rev-4',
    name: 'Dr. Sneha Mukherjee',
    company: 'AURA Diagnostics & Healthcare',
    role: 'Co-Founder',
    rating: 5,
    serviceUsed: 'Private Limited Registration & Startup Setup',
    location: 'Mumbai',
    content: 'From company incorporation to DPIIT Startup India registration and FSSAI licensing, Fin-Heist took care of every single compliance step. Their upfront pricing and zero hidden costs gave us complete peace of mind so we could focus 100% on building our medical clinic.'
  },
  {
    id: 'rev-5',
    name: 'Amanpreet Singh',
    company: 'Global Exports & E-Commerce',
    role: 'Independent Founder & E-tailer',
    rating: 5,
    serviceUsed: 'TDS Returns & Advance Tax Planning',
    location: 'Ludhiana / Online',
    content: 'Handling multi-state e-commerce GST and quarterly TDS returns used to consume half my month. Since switching to Fin-Heist, everything runs like clockwork. They proactively calculate my advance tax dues and have saved me over ₹1.2 Lakhs in tax interest and deductions this fiscal year.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'GST & Registration',
    question: 'How long does GST registration take?',
    answer: 'Once all required documents (PAN, Aadhaar, photograph, business address proof, and electricity bill/rent agreement) are submitted to us, we file your GST registration application the same business day. Typically, the GST department issues the Certificate of Registration along with your GSTIN within 3 to 7 working days, subject to jurisdictional officer verification.'
  },
  {
    id: 'faq-2',
    category: 'Income Tax',
    question: 'What documents are needed for Income Tax Return (ITR) filing?',
    answer: 'For salaried individuals, you require Form 16, PAN, Aadhaar, bank statements, and details of tax-saving investments (Section 80C, 80D, etc.). For freelancers, professionals, and businesses filing under presumptive taxation (44AD/44ADA) or regular books, we also collect sales summaries, expense receipts, capital gains statements (stocks/mutual funds), and Form 26AS / AIS reports.'
  },
  {
    id: 'faq-3',
    category: 'Service Delivery',
    question: 'Can services be provided remotely across India?',
    answer: 'Yes, 100%! Fin-Heist operates as a digital-first, cloud-enabled financial services firm. We serve individual clients, freelancers, and businesses located in Mumbai, Delhi, Bengaluru, Dehradun, Kolkata, Hyderabad, Chennai, and remote towns across India. All document collection, consultations, reviews, and government portal filings are handled securely online.'
  },
  {
    id: 'faq-4',
    category: 'Business & MSME',
    question: 'Do you help with MSME (Udyam) registration and Startup India certification?',
    answer: 'Absolutely. We provide immediate Udyam Registration (MSME certificate) usually within 24 to 48 hours. For startups, we handle DPIIT recognition applications, advisory on Section 80-IAC tax holidays, angel tax exemptions, and GeM (Government e-Marketplace) onboarding to help your business unlock government tenders and collateral-free bank loans.'
  },
  {
    id: 'faq-5',
    category: 'Project Reports & Loans',
    question: 'How long does project report preparation and CMA data take?',
    answer: 'For standard MSME Term Loans, Mudra Loans, and Working Capital limits (CC/OD), we deliver comprehensive, bank-ready project reports and Credit Monitoring Arrangement (CMA) data sheets within 3 to 5 business days after receiving your baseline financial inputs. For urgent bank requirements, we also offer an expedited 48-hour delivery track.'
  },
  {
    id: 'faq-6',
    category: 'Pricing & Packages',
    question: 'Are your pricing packages transparent, and are there any hidden fees?',
    answer: 'At Fin-Heist, we pride ourselves on SaaS-style transparency. Every service—whether it is an individual ITR filing, annual GST retainer, company incorporation, or complex DSCR project report—has a clear, upfront fixed fee agreed upon during your free consultation. There are never any hidden charges, unexpected billing surprises, or hourly billing increments.'
  },
  {
    id: 'faq-7',
    category: 'Audit & Certifications',
    question: 'Do you provide statutory audit and CA attestation certificates?',
    answer: 'Yes. Fin-Heist prepares comprehensive financial documentation and certificates (Net Worth, Solvency, Turnover, Fund Utilization, Visa certifications, and CMA sheets). Where statutory audits, tax audits (Section 44AB), or formal professional sign-offs under applicable laws are mandatory, we work in direct association with our qualified Chartered Accountant Advisory Partners (such as Jatin Chopra & Co. LLP) to ensure full legal compliance and authoritative certification.'
  },
  {
    id: 'faq-8',
    category: 'Bank Loan Support',
    question: 'Does Fin-Heist directly sanction or guarantee bank loans?',
    answer: 'Per our official Loan Disclaimer: Fin-Heist is a professional financial documentation, structuring, and advisory firm. We are not a bank, NBFC, or lending institution and do not directly disburse loans. We prepare high-quality CMA reports, DSCR projections, and application packages that dramatically improve your alignment with lender criteria, though final sanctioning remains at the sole discretion of the respective bank.'
  }
];

export const COMPANY_INFO = {
  name: 'Fin-Heist',
  tagline: 'Tax, GST & Compliance Made Simple',
  phone: '+91 9027661642',
  email: 'finhiestwithus@gmail.com',
  instagram: '@finheistwithus',
  instagramUrl: 'https://instagram.com/finheistwithus',
  whatsappNumber: '919027661642',
  address: 'Dehradun, Uttarakhand & Digital Pan-India Operation',
  location: 'Dehradun City & Pan-India',
  hours: 'Monday – Saturday: 9:30 AM to 7:30 PM (IST) | Online Consultation 24/7'
};

export const UTILITY_CATEGORIES = [
  {
    id: 'itr',
    label: 'Income Tax',
    iconName: 'FileText',
    subCalculators: [
      {
        id: 'income-tax-calculator',
        title: 'Income Tax Calculator FY 2025-26',
        description: 'Calculate income tax under both Old and New Regime. Compares tax liability across regimes and computes rebate u/s 87A.',
        badge: 'Income Tax Act',
        href: '/calculators/income-tax',
        iconName: 'Calculator'
      },
      {
        id: 'hra-calculator',
        title: 'HRA Exemption Calculator',
        description: 'Calculate HRA tax exemption as per Rule 279 of IT Rules 2026. Supports multiple employers and job changes.',
        badge: 'Income Tax Act 2025',
        href: '/calculators/hra',
        iconName: 'Home'
      },
      {
        id: 'form-121-utility',
        title: 'Form No. 121 Generator',
        description: 'Fill Form No. 121 online — Declaration under section 393(6) for receipt of certain incomes without deduction of tax.',
        badge: 'Income Tax Act 2025',
        href: '/calculators/form-121',
        iconName: 'FileSpreadsheet'
      }
    ]
  },
  {
    id: 'gst',
    label: 'GST',
    iconName: 'Layers',
    subCalculators: [
      {
        id: 'gst-calculator',
        title: 'GST Calculator',
        description: 'Free GST Calculator for all rates. Calculate GST inclusive or exclusive. Splits into CGST+SGST or IGST.',
        badge: 'GST Act',
        href: '/calculators/gst',
        iconName: 'Calculator'
      },
      {
        id: 'gst-product-price-calculator',
        title: 'GST Product Price & Margin Finder',
        description: 'Find the right selling price after GST registration. Enter taxable value, add margin % and get selling price & GST.',
        badge: 'GST Tool',
        href: '/calculators/gst-price',
        iconName: 'TrendingUp'
      },
      {
        id: 'gst-rate-finder',
        title: 'GST Rate Finder Utility',
        description: 'Quickly find applicable GST rates using HSN or SAC codes. Search by product or service name to identify tax rates.',
        badge: 'GST Tool',
        href: '/calculators/gst-rate',
        iconName: 'Search'
      },
      {
        id: 'gstr3b-converter',
        title: 'GSTR-3B PDF to Excel Converter',
        description: 'Extract GSTIN, outward supplies, ITC and exempt inward supplies from GSTR-3B PDFs into a structured Excel workbook.',
        badge: 'GST Tool',
        href: '/calculators/gstr3b-excel',
        iconName: 'FileSpreadsheet'
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    iconName: 'TrendingUp',
    subCalculators: [
      {
        id: 'emi-calculator',
        title: 'Loan EMI Calculator',
        description: 'Calculate your monthly EMI, total interest payable and full repayment schedule for any loan amount and tenure.',
        badge: 'Finance Tool',
        href: '/calculators/emi',
        iconName: 'Calculator'
      },
      {
        id: 'net-worth-calculator',
        title: 'Net Worth Calculator',
        description: 'Calculate your personal or business net worth by entering assets and liabilities. Download detailed statement.',
        badge: 'Personal Finance',
        href: '/calculators/net-worth',
        iconName: 'Briefcase'
      },
      {
        id: 'look-scanned',
        title: 'Look Scanned Utility',
        description: 'Make your PDF look scanned with realistic effects — noise, blur, rotation. Runs 100% in your browser.',
        badge: 'PDF Tool',
        href: '/calculators/pdf-scan',
        iconName: 'FileText'
      }
    ]
  },
  {
    id: 'tds-tcs',
    label: 'TDS / TCS',
    iconName: 'Percent',
    subCalculators: [
      {
        id: 'tds-tcs-rate',
        title: 'TDS & TCS Rate Calculator',
        description: 'Find applicable TDS/TCS section under Income Tax Act with old Act cross-reference. All rates & thresholds.',
        badge: 'Income Tax Act',
        href: '/calculators/tds-rate',
        iconName: 'Percent'
      },
      {
        id: 'tds-penalty',
        title: 'TDS Interest & Penalty Calculator',
        description: 'Calculate interest on late deduction, late payment & late filing fees under Income Tax Act sections 201(1A) and 234E.',
        badge: 'Income Tax Act',
        href: '/calculators/tds-penalty',
        iconName: 'AlertTriangle'
      },
      {
        id: 'tds-challan-converter',
        title: 'Challan to Excel Converter',
        description: 'Extract PAN, TAN, Name, BSR Code, Challan No from ITNS 280 and ITNS 281 challans to Excel.',
        badge: 'Tool',
        href: '/calculators/challan-excel',
        iconName: 'FileSpreadsheet'
      }
    ]
  }
];
