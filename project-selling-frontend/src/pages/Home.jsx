import MainLayout from "../layout/MainLayout";
import HeroSlider from "../components/HeroSlider";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <MainLayout>
      <HeroSlider />
      <WhyChooseUs />

      {/* CONTACT TARGET */}
      <div id="contact">
        <ContactSection />
      </div>
    </MainLayout>
  );
};

export default Home;
