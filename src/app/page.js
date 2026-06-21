import Banner, { HowItWorks, PopularCategories } from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navber";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <PopularCategories></PopularCategories>
      <Footer></Footer>
    </div>
  );
}
