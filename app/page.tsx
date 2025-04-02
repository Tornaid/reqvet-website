import DogbotSection from '@/components/DogbotSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import LegacySection from '@/components/LegacySection';
import PricingSection from '@/components/PricingSection';
import TemplatesSection from '@/components/TemplatesSection';
import UseCases from '@/components/UseCases';


export default function HomePage() {
  return (
    <main>
      <Header />
      <HowItWorks />
      <UseCases />
      <TemplatesSection />
      <DogbotSection />
      <PricingSection />
      <LegacySection />
      <Footer />
      {/* Tu ajouteras les autres sections ici dans l’ordre d’apparition */}
      {/* <HowItWorks /> */}
      {/* <TemplatesSection /> */}
      {/* <Adaptability /> */}
      {/* <Footer /> */}
    </main>
  );
}
