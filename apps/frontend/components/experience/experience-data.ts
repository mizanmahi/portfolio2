import {
  AiBrain03Icon, CodeFolderIcon, CodeSquareIcon, LaptopProgrammingIcon,
  MentoringIcon, Presentation01Icon, SourceCodeIcon, TeachingIcon,
} from "@hugeicons/core-free-icons";

export type ExperienceRole = {
  id: string;
  title: string;
  dates: string;
  location?: string;
  icon: typeof CodeSquareIcon;
  current?: boolean;
  summary?: string;
  details: string[];
  technologies: string[];
};

export type Employer = {
  id: string;
  name: string;
  dates: string;
  location: string;
  description: string;
  roles: ExperienceRole[];
};

export const employers: Employer[] = [
  {
    id: "programming-hero", name: "Programming Hero",
    dates: "Jan 2022 to Present", location: "Dhaka, Bangladesh",
    description: "Learning platforms. Real-world engineering.",
    roles: [
      {
        id: "developer-l2", title: "Web developer L2", dates: "Jan 2026 to Present", icon: AiBrain03Icon, current: true,
        summary: "Building and maintaining Programming Hero’s main learning platform, Phitron’s CSE Fundamentals program, and the Next Level AI Engineering bootcamp site.",
        details: [
          "Integrate LLM-powered features into learning products using RAG pipelines and vector search.",
          "Apply agentic development workflows to speed up delivery.",
          "Own CI/CD pipelines and Redis-backed performance work.",
        ],
        technologies: ["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Vector DB", "Redis", "CI/CD", "RAG", "AI integration", "Agentic development"],
      },
      {
        id: "developer", title: "Web developer", dates: "Jan 2025 to Dec 2025", icon: SourceCodeIcon,
        summary: "Implemented centralized authentication with OpenID Connect (OIDC), enabling single sign-on across the company’s products.",
        details: [
          "Contributed to Edulavo, an AI-powered learning platform that generates personalized learning roadmaps with a multi-agent architecture.",
          "Built services in Go and Python, with gRPC and tRPC for typed service communication.",
          "Integrated AI and agentic features into product workflows.",
        ],
        technologies: ["Next.js", "React", "Golang", "Python", "gRPC", "tRPC", "MongoDB", "CI/CD", "AI integration", "Agentic AI"],
      },
      {
        id: "senior-mentor", title: "Senior mentor, Advance Web Course", dates: "Jan 2024 to Dec 2024", location: "Banani", icon: MentoringIcon,
        summary: "Trained and placed highly skilled programmers; 2,500+ Programming Hero students now work worldwide.",
        details: ["Mentored students through full-stack architecture, containerization, deployment on AWS, and testing practices."],
        technologies: ["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Redis", "PostgreSQL", "Prisma", "Linux", "Docker", "Nginx", "AWS", "Testing", "CI/CD"],
      },
      {
        id: "senior-instructor", title: "Senior web instructor", dates: "Jan 2023 to Dec 2023", location: "Banani, Dhaka", icon: Presentation01Icon,
        summary: "Taught advanced full-stack development, from TypeScript and databases to Docker and CI/CD.", details: [],
        technologies: ["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Mongoose", "Redis", "PostgreSQL", "Docker", "Testing", "CI/CD"],
      },
      {
        id: "instructor", title: "Web instructor", dates: "Jan 2022 to Dec 2022", location: "Banani, Dhaka", icon: TeachingIcon,
        summary: "Taught React, Node.js, Express, and MongoDB fundamentals to beginner cohorts.", details: [],
        technologies: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
      },
    ],
  },
  {
    id: "solruf", name: "SOLRUF",
    dates: "Dec 2021 to Jun 2022", location: "India",
    description: "A solar marketplace and installation platform.",
    roles: [
      {
        id: "lead-react", title: "Lead React developer", dates: "Mar 2022 to Jun 2022", location: "India", icon: CodeSquareIcon,
        summary: "Led frontend development for the marketplace.", details: [],
        technologies: ["React", "Material UI", "Firebase", "API integration"],
      },
      {
        id: "frontend", title: "Frontend developer", dates: "Dec 2021 to Feb 2022", location: "Maharashtra, India", icon: LaptopProgrammingIcon,
        details: [], technologies: ["React", "Material UI", "Firebase", "API integration"],
      },
    ],
  },
  {
    id: "esoftarena", name: "eSoftArena Ltd.",
    dates: "Feb 2019 to Apr 2019", location: "Bangladesh",
    description: "The beginning of my development journey.",
    roles: [
      {
        id: "intern", title: "Web development intern", dates: "Feb 2019 to Apr 2019", icon: CodeFolderIcon,
        details: [], technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      },
    ],
  },
];
