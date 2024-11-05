import HeroSection from "~/app/_components/_/HeroSection";
import ShopsAround from "~/app/_components/_/ShopsAround";
import UpcomingEvent from "~/app/_components/_/UpcomingEvent";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ShopsAround />
      {/* <Shops /> */}
      <UpcomingEvent />
    </>
  );
};

export default Home;
