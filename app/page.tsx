import Banner from "@/src/components/body/homePage/Banner";
import Expert from "@/src/components/body/homePage/Expert";
import Galary from "@/src/components/body/homePage/Galary";
import Hero from "@/src/components/body/homePage/Hero";
import ShopByCategory from "@/src/components/body/homePage/ShopByCategory";

export default function Home() {
  return (
    <div>
      <Hero />

      <Banner />
      <Galary />
      <Expert />
      <ShopByCategory />
    </div>
  );
}
