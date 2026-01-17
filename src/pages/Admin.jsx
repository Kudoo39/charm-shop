import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { uploadProductImage } from "../lib/uploadImage";
import { toast } from "react-toastify";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        price,
        image_url,
        is_featured,
        categories (
          id,
          name
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) setProducts(data ?? []);
  }
  
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
      toast.warning("⚠️ Vui lòng chọn ảnh sản phẩm");
      return;
    }

    if (!categoryId) {
      toast.warning("⚠️ Vui lòng chọn danh mục");
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

      if (error) {
        toast.error("❌ Thêm sản phẩm thất bại");
        return;
      }

      toast.success("🎉 Thêm sản phẩm thành công!");
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

async function handleDelete(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    toast.error("❌ Xóa sản phẩm thất bại");
    return;
  }

  toast.success("🗑️ Đã xóa sản phẩm!");
  setProducts((prev) => prev.filter((p) => p.id !== id));
}

async function toggleFeatured(productId, currentValue) {
  const { error } = await supabase
    .from("products")
    .update({ is_featured: !currentValue })
    .eq("id", productId);

  if (error) {
    alert(error.message);
    return;
  }

  // Update state ngay, không cần refetch
  setProducts((prev) =>
    prev.map((p) =>
      p.id === productId
        ? { ...p, is_featured: !currentValue }
        : p
    )
  );
}

  return (
    <>
      <div className="mt-12 px-4">
        <h2 className="text-xl font-semibold mb-4 text-rose">
          Danh sách sản phẩm
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-rose/10 text-gray-700">
              <tr>
                <th className="p-3 text-left">Ảnh</th>
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-right">Giá</th>
                <th className="p-3 text-left">Danh mục</th>
                <th className="p-3 text-center">Xóa Sản Phẩm</th>
                <th className="p-3 text-center">Sản Phẩm Nổi Bật</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{p.name}</td>

                  <td className="p-3 text-right font-medium">
                    {p.price.toLocaleString("vi-VN")} ₫
                  </td>

                  <td className="p-3">
                    {p.categories?.name ?? "—"}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setDeleteId(p.id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Xóa
                    </button>
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.is_featured}
                      onChange={() => toggleFeatured(p.id, p.is_featured)}
                      className="w-5 h-5 accent-rose cursor-pointer"
                    />
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    Chưa có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-display text-rose mb-10 text-center">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh sản phẩm
            </label>

            <div className="flex items-center gap-4">
              {/* Preview */}
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-20 h-20 rounded-xl object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl border border-dashed flex items-center justify-center text-gray-400 text-xs">
                  Chưa có ảnh
                </div>
              )}

              {/* Input */}
              <label className="cursor-pointer inline-block px-4 py-2 rounded-full bg-rose/10 text-rose font-medium hover:bg-rose/20 transition">
                Chọn ảnh
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-rose text-white py-3 rounded-full font-medium tracking-wide hover:bg-rose-light transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Đang lưu..." : "Thêm sản phẩm"}
          </button>
        </form>

      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Xóa sản phẩm?
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
