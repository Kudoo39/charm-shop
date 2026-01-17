import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + " ₫";
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .then(({ data }) => setProducts(data));
  }, []);

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-display text-center text-rose mb-12">
        Sản phẩm nổi bật 🎀
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
          <img
            src={p.image_url}
            alt={p.name}
            className="w-full h-40 object-contain mb-4"
          />

            <h4 className="text-gray-800 font-medium mb-1">{p.name}</h4>
            <p className="text-rose font-semibold mb-3">
              {formatPrice(p.price)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
