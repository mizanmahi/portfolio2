import { AboutScrollSection } from "@/components/about/about-scroll-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { Hero } from "@/components/hero/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { TechToolsSection } from "@/components/tech-tools/tech-tools-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutScrollSection
        photoAlt="Mizanur Rahman, a full-stack web developer based in Dhaka, Bangladesh"
        photoSrc="/images/mizanur-rahman.png"
      />
      <TechToolsSection />
      <ProjectsSection />
      <ExperienceSection />
      <SiteFooter year={new Date().getFullYear()} />
    </>
  );
}
