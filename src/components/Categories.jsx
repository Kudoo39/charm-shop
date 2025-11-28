import { Sparkles, HandCoins, Award, Gem } from "lucide-react";

const categories = [
  { icon: Sparkles, label: "Charm điện thoại" },
  { icon: HandCoins, label: "Vòng cổ" },
  { icon: Award, label: "Lắc tay" },
  { icon: Gem, label: "Bông tai" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-display text-center text-rose mb-12">
        Danh mục nổi bật
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
            >
              <Icon className="w-12 h-12 mx-auto text-rose mb-4" />
              <p className="text-gray-700 font-medium">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
