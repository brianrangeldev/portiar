import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import AirwellBanner from "@/components/AirwellBanner";
import WhyUs from "@/components/WhyUs";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Works />
      <AirwellBanner />
      <WhyUs />
      <ContactCta />
      <Footer />
    </main>
  );
}
