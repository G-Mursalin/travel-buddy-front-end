import { Container } from "@mui/material";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import HowWorks from "@/components/UI/HomePage/HowWorks/HowWorks";
import RecentTrips from "@/components/UI/HomePage/RecentTrips/RecentTrips";

const HomPage = () => {
  return (
    <Container>
      <HeroSection />
      <RecentTrips />
      <WhyUs />
      <HowWorks />
    </Container>
  );
};

export default HomPage;
