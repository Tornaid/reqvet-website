import DogbotSection from '@/components/DogbotSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import ImpactSection from '@/components/ImpactSection';
import LegacySection from '@/components/LegacySection';
import UseCases from '@/components/UseCases';


export default function HomePage() {
  return (
    <main>
      <Header />
      <HowItWorks />
      <ImpactSection />
      <UseCases />
      
      {/* <TemplatesSection /> */}
      <DogbotSection />
      {/* <PricingSection /> */}
      <LegacySection />
      <FinalCTASection />
      <Footer />
      {/* Tu ajouteras les autres sections ici dans l’ordre d’apparition */}
      {/* <HowItWorks /> */}
      {/* <TemplatesSection /> */}
      {/* <Adaptability /> */}
      {/* <Footer /> */}
    </main>
  );
}
