import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";
import ContactForm from "./ContactForm";

export default function Hero() {
  return (
    <HeroSlider>
      <div className="min-h-screen flex items-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 text-white">
          <HeroContent />
          <ContactForm />
        </div>
      </div>
    </HeroSlider>
  );
}
