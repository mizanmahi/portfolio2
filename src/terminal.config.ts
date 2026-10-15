import { createElement, type ReactNode } from "react";

export type TerminalProject = {
  slug: string;
  title: string;
  description: string;
  url?: string;
};

export type TerminalTheme = {
  name: "amber" | "mono";
  hsl: string;
  hex: string;
};

export const terminalConfig = {
  name: "Mizanur Rahman",
  role: "Web Developer L2 @ Programming Hero",
  location: "Dhaka, Bangladesh",
  bio: "I build full-stack systems with a focus on clear interfaces, reliable backend architecture, and practical AI-assisted workflows.",
  links: {
    github: "https://github.com/mizanmahi",
    experience: "#experience",
    contact: "mailto:mizanmahi24@gmail.com",
  },
  stats: { mentorship: 2500, caption: "developers mentored and placed worldwide" },
  projects: [
    { slug: "edulavo", title: "Edulavo", description: "AI-powered personalized learning platform.", url: "https://www.edulavo.com/" },
    { slug: "next-level", title: "Next Level", description: "Advanced learning platform from Programming Hero.", url: "https://next.programming-hero.com/" },
    { slug: "programming-hero", title: "Programming Hero", description: "Bangladesh's hands-on programming education platform.", url: "https://web.programming-hero.com/home" },
    { slug: "phitron", title: "Phitron", description: "Structured CS education and mentorship.", url: "https://phitron.io/" },
    { slug: "solruf", title: "Solruf", description: "Solar marketplace and installation platform." },
    { slug: "mentora", title: "Mentora", description: "AI-powered learning management system." },
  ] satisfies TerminalProject[],
  themes: [
    { name: "amber", hsl: "38 91% 58%", hex: "#f5a623" },
    { name: "mono", hsl: "0 0% 89%", hex: "#e4e4e4" },
  ] satisfies TerminalTheme[],
  asciiName: "MIZANUR\nRAHMAN",
} as const;

export type TerminalCommandApi = {
  clearOutput: () => void;
  focusPane: (pane: number) => void;
  focusPrompt: () => void;
  setTheme: (theme: TerminalTheme) => void;
  toggleZoom: () => void;
};

export type TerminalCommand = (args: string[]) => ReactNode;
export type TerminalCommandRegistry = Record<string, TerminalCommand>;
export const terminalCommandNames = ["help", "whoami", "about", "cat", "theme", "github", "contact", "clear", "zoom"] as const;

export function createCommandRegistry(api: TerminalCommandApi): TerminalCommandRegistry {
  const projectBySlug = (slug: string) => terminalConfig.projects.find((project) => project.slug === slug);
  const projectNode = (project: TerminalProject) => createElement(
    "span",
    null,
    `${project.title} — ${project.description} `,
    project.url ? createElement("a", { href: project.url, rel: "noreferrer", target: "_blank" }, "open ↗") : "Private preview coming soon.",
  );

  return {
    help: () => "help · whoami · about · cat <project> · cat links.txt · theme <amber|mono> · github · contact · clear · zoom",
    whoami: () => `${terminalConfig.name} — ${terminalConfig.role}, ${terminalConfig.location}`,
    about: () => terminalConfig.bio,
    cat: ([slug]) => {
      if (slug === "links.txt") return createElement(
        "span",
        null,
        createElement("a", { href: terminalConfig.links.experience }, "Explore my experience →"),
        " · ",
        createElement("a", { href: terminalConfig.links.github, rel: "noreferrer", target: "_blank" }, "GitHub ↗"),
      );
      const project = slug ? projectBySlug(slug) : undefined;
      return project ? projectNode(project) : "cat: provide links.txt or a project slug from the projects pane";
    },
    theme: ([name]) => {
      const theme = terminalConfig.themes.find((item) => item.name === name);
      if (!theme) return "theme: choose amber or mono";
      api.setTheme(theme);
      return `accent set to ${theme.name}`;
    },
    github: () => createElement("a", { href: terminalConfig.links.github, rel: "noreferrer", target: "_blank" }, "github.com/mizanmahi ↗"),
    contact: () => createElement("a", { href: terminalConfig.links.contact }, "mizanmahi24@gmail.com"),
    clear: () => { api.clearOutput(); return null; },
    zoom: () => { api.toggleZoom(); return "pane zoom toggled"; },
  };
}
