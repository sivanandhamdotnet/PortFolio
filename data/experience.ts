export interface SystemStep {
  label: string;
  sub: string;
  status: "idle" | "active" | "validated";
}

export interface ExperienceChapter {
  id: string;
  index: string;
  company: string;
  role: string;
  period: string;
  location: string;
  category: string;
  technologies: string[];
  summary: string;
  points: {
    title: string;
    description: string;
  }[];
  systemDiagrams: {
    name: string;
    flow: string[];
    description: string;
  }[];
}

export const EXPERIENCES: ExperienceChapter[] = [
  {
    id: "pyolliv",
    index: "01",
    company: "Pyolliv Pvt Ltd",
    role: "Software Development Engineer",
    period: "JUL 2025 — PRESENT",
    location: "Chennai, India",
    category: "TRAVEL & BOOKING SYSTEMS",
    technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
    summary:
      "Engineered and maintained mission-critical backend services powering a high-concurrency travel and hotel booking engine, architecting business validation pipelines and financial invoicing logic.",
    points: [
      {
        title: "Travel & Hotel Booking Core",
        description:
          "Developed and maintained backend services for hotel and flight booking workflows with strict data integrity using Python, Django, DRF, and PostgreSQL.",
      },
      {
        title: "Dynamic Pricing & Invoicing",
        description:
          "Engineered dynamic pricing algorithms, discount logic, and booking lifecycle state machines. Implemented invoice enhancements ensuring auditable financial accuracy across hotel and flight transactions.",
      },
      {
        title: "Hierarchical Approval Workflows",
        description:
          "Designed multi-tier validation and approval workflows spanning Sub Admin and Super Admin roles, validating complex business constraints and mandatory criteria prior to system authorization.",
      },
    ],
    systemDiagrams: [
      {
        name: "Booking & Approval Pipeline",
        flow: ["BOOKING", "PRICING", "VALIDATION", "APPROVAL", "INVOICE"],
        description: "Enforces multi-tier business constraints and audit rules prior to financial settlement.",
      },
    ],
  },
  {
    id: "km-digi-commerce",
    index: "02",
    company: "KM Digi Commerce Pvt Ltd",
    role: "Software Back-End Developer",
    period: "OCT 2024 — JUN 2025",
    location: "Chennai, India",
    category: "COMMERCE · AI EXTRACTION · MARKETPLACE",
    technologies: [
      "Django",
      "MongoDB",
      "Amazon SP-API",
      "Walmart Marketplace APIs",
      "OAuth 2.0",
      "OCR",
      "Scheduled Sync",
    ],
    summary:
      "Spearheaded backend architecture across three enterprise initiatives: B2B supply chain ordering, automated document intelligence via OCR, and high-frequency marketplace API synchronization.",
    points: [
      {
        title: "B2B Ordering Infrastructure",
        description:
          "Engineered the commerce backbone serving manufacturers, distributors, and dealers with synchronized catalog management, streamlined ordering pipelines, and operational logistics tracking.",
      },
      {
        title: "AI-Powered Document Intelligence",
        description:
          "Implemented automated data extraction engines for complex commercial invoices and lease agreements utilizing OCR and intelligent entity mapping to eliminate manual data entry error vectors.",
      },
      {
        title: "Marketplace Intelligence & Sync Engine",
        description:
          "Integrated Amazon SP-API and Walmart Marketplace APIs. Architected an Insights experience inspired by marketplace intelligence platforms to monitor listing quality, page traffic, and trends. Built OAuth 2.0 token refreshes and scheduled background tasks for hourly metrics.",
      },
    ],
    systemDiagrams: [
      {
        name: "Supply Chain & Order Routing",
        flow: ["MANUFACTURER", "CATALOG", "ORDER", "LOGISTICS"],
        description: "B2B ordering pipeline coordinating manufacturer catalog changes down to distribution dealers.",
      },
      {
        name: "Marketplace Telemetry Engine",
        flow: ["AMAZON / WALMART", "API GATEWAY", "SYNC ENGINE", "MONGODB", "INSIGHTS"],
        description: "Background workers polling commerce APIs, refreshing tokens, and generating hourly sales trends.",
      },
      {
        name: "Document Intelligence Pipeline",
        flow: ["DOCUMENT", "OCR", "AI EXTRACTION", "DATA MAPPING", "STRUCTURED DATA"],
        description: "Transforms unstructured lease documents and invoices into normalized, validated JSON schemas.",
      },
    ],
  },
  {
    id: "hrlyics",
    index: "03",
    company: "HRLyics Private Limited",
    role: "Software Back-End Developer",
    period: "FEB 2023 — SEP 2024",
    location: "Bangalore, India",
    category: "AI INFRASTRUCTURE & HR PLATFORMS",
    technologies: ["Python", "Django", "MongoDB", "RESTful APIs", "AI Integrations"],
    summary:
      "Constructed reliable backend services and API gateways for an AI-driven human resource intelligence platform, processing high-volume candidate analytics and third-party data flows.",
    points: [
      {
        title: "AI Platform Services & Gateways",
        description:
          "Developed high-throughput RESTful APIs connecting frontend applications with intelligent processing services and third-party enterprise integrations.",
      },
      {
        title: "MongoDB Data Processing",
        description:
          "Optimized non-relational document schemas and aggregations to power real-time AI domain models, drastically lowering query latencies across large datasets.",
      },
      {
        title: "Performance & Scalability Tuning",
        description:
          "Continuously audited bottlenecks across database transactions, external API handshakes, and response serialization to guarantee low-latency application responsiveness.",
      },
    ],
    systemDiagrams: [
      {
        name: "HR Platform Telemetry",
        flow: ["USER", "API GATEWAY", "AI PLATFORM", "MONGODB", "RESPONSE"],
        description: "Low-latency request routing and document storage for AI analytics modules.",
      },
    ],
  },
];
