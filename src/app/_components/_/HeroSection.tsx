import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      <div className="overlay" />
      <Image
        src={"/main-bg-2.jpg"}
        alt="Background Main Image"
        width={1920}
        height={1080}
        layout="cover"
        className="h-[75vh] w-full object-cover"
      />
      <div className="hero-content"></div>
    </section>
  );
};

export default HeroSection;
