import { Contact } from "@/components/Contact";
import { EmiCalculator } from "@/components/EmiCalculator";
import { Hero } from "@/components/Hero";
import { Lenders } from "@/components/Lenders";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Team } from "@/components/Team";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Products />
        <Lenders />
        <Process />
        <EmiCalculator />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
