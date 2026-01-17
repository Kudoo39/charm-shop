import { Link } from "react-router-dom";
import { Sparkles, HandCoins, Award, Gem, SwatchBook, Bubbles } from "lucide-react";

const categories = [
  { icon: Sparkles, label: "Charm điện thoại", slug: "charm-dien-thoai" },
  { icon: HandCoins, label: "Vòng cổ", slug: "vong-co" },
  { icon: Award, label: "Lắc tay", slug: "lac-tay" },
  { icon: Gem, label: "Bông tai", slug: "bong-tai" },
  { icon: SwatchBook, label: "Kẹp tóc", slug: "kep-toc" },
  { icon: Bubbles, label: "Phụ kiện khác", slug: "phu-kien-khac" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-display text-center text-rose mb-12">
        Danh mục nổi bật 🌙
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.slug}
              to={`/san-pham?category=${item.slug}`}
              className="group bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
            >
              <Icon className="w-12 h-12 mx-auto text-rose mb-4 transition-transform group-hover:scale-110" />
              <p className="text-gray-700 font-medium group-hover:text-rose">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
