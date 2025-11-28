import Hero from "../components/Hero";
import FeaturedCategories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Story from "../components/Story";

export default function Home() {
  return (
    <div className="overflow-x-hidden font-body bg-cream text-gray-700">
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <Story />
    </div>
  );
}
