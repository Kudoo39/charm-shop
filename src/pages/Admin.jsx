import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { uploadProductImage } from "../lib/uploadImage";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("name")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

 async function handleSubmit(e) {
  e.preventDefault();

  if (!image) {
    alert("Vui lòng chọn ảnh sản phẩm");
    return;
  }

  if (!categoryId) {
    alert("Vui lòng chọn danh mục");
    return;
  }

  setLoading(true);

  try {
    const imageUrl = await uploadProductImage(image);

    const { error } = await supabase.from("products").insert({
      name,
      price: Number(price),
      category_id: categoryId,
      image_url: imageUrl,
      is_featured: false,
    });

    if (error) throw error;

    alert("Thêm sản phẩm thành công!");
    setName("");
    setPrice("");
    setCategoryId("");
    setImage(null);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-display text-rose mb-8">
        Quản lý sản phẩm
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <input
          type="number"
          placeholder="Giá (VND)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-rose text-white py-2 rounded-full hover:bg-rose-light transition"
        >
          {loading ? "Đang lưu..." : "Thêm sản phẩm"}
        </button>
      </form>

    </div>
  );
}
