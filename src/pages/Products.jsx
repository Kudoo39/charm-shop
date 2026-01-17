/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import CategoryTab from "../components/CategoryTab";
import { useSearchParams } from "react-router-dom";

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + " ₫";
}

const categoryMap = {
  "all": "all",
  "bong-tai": "23dd9808-d983-4b3c-89c4-c32a7bffd8d9",
  "kep-toc": "9c046c72-073d-4641-99d4-42b38b9da4c4",
  "lac-tay": "b789fb50-cb45-49f6-b47b-64b0e50169bc",
  "phu-kien-khac": "ee4391d1-14a6-41cb-bb1d-86709b4ea172",
  "vong-co": "01c46499-5323-4e73-8946-61978b1011e4",
  "charm-dien-thoai": "73dbe4df-45e9-44d3-b862-17edcf7f9eb1",
}


export default function Products() {
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory !== "all" && categories.length === 0) return;
    fetchProducts();
  }, [activeCategory, categories]);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")

    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data ?? []);
    }
  }

  async function fetchProducts() {
    setLoading(true);

    let query = supabase
      .from("products")
      .select(`
        id,
        name,
        price,
        image_url,
        category_id
      `)
      .order("created_at", { ascending: false });

    const activeCategoryId = categoryMap[activeCategory] || null;
    if (activeCategory !== "all") {
      query = query.eq("category_id", activeCategoryId);
    }

    const { data } = await query;
    setProducts(data ?? []);
    setLoading(false);
  }

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-display text-center text-rose mb-10">
        Sản phẩm của chúng tôi ✨
      </h3>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <CategoryTab
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          Tất cả
        </CategoryTab>

        {categories.map((c) => (
          <CategoryTab
            key={c.id}
            active={activeCategory === c.slug}
            onClick={() => setActiveCategory(c.slug)}
          >
            {c.name}
          </CategoryTab>
        ))}
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <p className="text-center text-gray-400">Đang tải sản phẩm...⋆౨ৎ˚⟡˖ ࣪</p>
      ) : products.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            Hiện chưa có sản phẩm trong danh mục này 💗
          </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-40 object-contain mb-4"
              />

              <h4 className="text-gray-800 font-medium mb-1">
                {p.name}
              </h4>
              <p className="text-rose font-semibold mb-3">
                {formatPrice(p.price)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
