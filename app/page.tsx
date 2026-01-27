import Banner from "@/src/components/body/homePage/Banner";
import Expert from "@/src/components/body/homePage/Expert";
import Galary from "@/src/components/body/homePage/Galary";
import HeartAnimation from "@/src/components/body/homePage/HeartAnimation";
import Hero from "@/src/components/body/homePage/Hero";
import ProductShowcase from "@/src/components/body/homePage/ProductShowcase";
import ShopByCategory from "@/src/components/body/homePage/ShopByCategory";

export default function Home() {
  return (
    <div>
      <Hero />

      <Banner />
      <HeartAnimation />
      <ProductShowcase />
      <Galary />
      <Expert />
      <ShopByCategory />
    </div>
  );
}
