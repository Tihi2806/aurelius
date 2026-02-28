import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <Process />
      <WhyUs />
      <ContactCTA />
    </main>
  );
}
