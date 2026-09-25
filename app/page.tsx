import { AboutSection } from "@/components/about/about-section";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection
        photoAlt="Mizanur Rahman, a full-stack web developer based in Dhaka, Bangladesh"
        photoSrc="/images/mizanur-rahman.png"
      />
    </>
  );
}
