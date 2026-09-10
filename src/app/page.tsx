import Hero from "@/components/main/Hero";
import AboutMe from "@/components/main/AboutMe";
import Skills from "@/components/main/Skills";
import Portfolio from "@/components/main/Portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Page() {
  return (
    <>
      <span id="top" />
      <FadeIn><Hero /></FadeIn>
      <FadeIn><AboutMe /></FadeIn>
      <FadeIn><Skills /></FadeIn>
      <FadeIn><Portfolio /></FadeIn>
    </>
  );
}
