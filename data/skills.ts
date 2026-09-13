export interface TechNode {
  id: string;
  name: string;
  layer: "backend" | "data" | "cloud" | "ai" | "protocols" | "tools";
  description: string;
  connections: string[]; // Connected node IDs
  primary?: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: TechNode[];
}

export const TECH_CONSTELLATION: TechNode[] = [
  // Backend Core
  {
    id: "python",
    name: "Python",
    layer: "backend",
    primary: true,
    description: "Core language for backend architectures, services, and data pipelines.",
    connections: ["django", "drf", "celery", "postgres", "mongodb", "ai-doc"],
  },
  {
    id: "django",
    name: "Django",
    layer: "backend",
    primary: true,
    description: "High-level web framework for secure, scalable enterprise backends.",
    connections: ["python", "drf", "postgres", "celery", "oauth", "jwt"],
  },
  {
    id: "drf",
    name: "Django REST Framework",
    layer: "backend",
    primary: true,
    description: "Robust toolkit for building scalable RESTful web APIs and serializers.",
    connections: ["django", "jwt", "oauth", "postman", "redis"],
  },
  {
    id: "celery",
    name: "Celery",
    layer: "backend",
    description: "Asynchronous task queue/job queue based on distributed message passing.",
    connections: ["python", "django", "redis"],
  },
  {
    id: "rest-api",
    name: "RESTful APIs",
    layer: "backend",
    primary: true,
    description: "API development, endpoint architecture, rate limiting, and optimization.",
    connections: ["drf", "django", "postman", "jwt"],
  },

  // Databases & Cache
  {
    id: "postgres",
    name: "PostgreSQL",
    layer: "data",
    primary: true,
    description: "Enterprise relational database for transactional integrity and complex workflows.",
    connections: ["django", "python"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    layer: "data",
    primary: true,
    description: "Document store for marketplace insights, rapid ingestion, and telemetry snapshots.",
    connections: ["python", "django"],
  },
  {
    id: "redis",
    name: "Redis",
    layer: "data",
    description: "In-memory data structure store used as distributed cache and message broker.",
    connections: ["celery", "django", "drf"],
  },
  {
    id: "mysql",
    name: "MySQL",
    layer: "data",
    description: "Relational database management for structured transactional storage.",
    connections: ["django", "python"],
  },

  // Protocols & Auth
  {
    id: "oauth",
    name: "OAuth 2.0",
    layer: "protocols",
    description: "Secure token management, lifecycle rotation, and third-party API authorization.",
    connections: ["django", "drf", "rest-api"],
  },
  {
    id: "jwt",
    name: "JWT",
    layer: "protocols",
    description: "Stateless JSON Web Tokens for secure distributed identity and session claims.",
    connections: ["drf", "rest-api"],
  },

  // AI Integration
  {
    id: "ai-doc",
    name: "AI Document Processing",
    layer: "ai",
    primary: true,
    description: "OCR pipelines, intelligent data extraction from invoices and lease agreements.",
    connections: ["python", "openai", "gemini"],
  },
  {
    id: "openai",
    name: "OpenAI API",
    layer: "ai",
    description: "Integration of frontier LLMs for semantic extraction and text understanding.",
    connections: ["python", "ai-doc"],
  },
  {
    id: "gemini",
    name: "Gemini API",
    layer: "ai",
    description: "Multimodal and structured reasoning for automated document processing.",
    connections: ["python", "ai-doc"],
  },

  // Cloud & Infrastructure
  {
    id: "aws-ec2",
    name: "AWS EC2",
    layer: "cloud",
    description: "Scalable virtual cloud server deployment and runtime administration.",
    connections: ["aws-s3", "django"],
  },
  {
    id: "aws-s3",
    name: "AWS S3 & Elastic IP",
    layer: "cloud",
    description: "Object storage for documents/media and persistent IP routing infrastructure.",
    connections: ["aws-ec2", "ai-doc"],
  },

  // Tools & Methodologies
  {
    id: "git",
    name: "Git / GitLab / GitHub",
    layer: "tools",
    description: "Version control, distributed branching strategies, and CI/CD collaboration.",
    connections: ["python", "django"],
  },
  {
    id: "postman",
    name: "Postman",
    layer: "tools",
    description: "Comprehensive API test suites, boundary inspection, and contract verification.",
    connections: ["rest-api", "drf"],
  },
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    title: "Backend & Systems Architecture",
    subtitle: "Deterministic logic, distributed queues, and resilient web services",
    skills: TECH_CONSTELLATION.filter((s) => s.layer === "backend"),
  },
  {
    title: "Databases & Storage Engines",
    subtitle: "ACID guarantees, schemaless telemetry, and in-memory caches",
    skills: TECH_CONSTELLATION.filter((s) => s.layer === "data"),
  },
  {
    title: "API Protocols & Security",
    subtitle: "Token lifecycles, OAuth handshakes, and stateless authentication",
    skills: TECH_CONSTELLATION.filter((s) => s.layer === "protocols"),
  },
  {
    title: "AI Integration & Extraction",
    subtitle: "Document OCR, multi-modal reasoning, and automated data mapping",
    skills: TECH_CONSTELLATION.filter((s) => s.layer === "ai"),
  },
  {
    title: "Cloud & Developer Tooling",
    subtitle: "Cloud compute, object storage, and API verification tooling",
    skills: TECH_CONSTELLATION.filter((s) => s.layer === "cloud" || s.layer === "tools"),
  },
];
