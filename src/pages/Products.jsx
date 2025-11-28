import { products } from "../data/mock-product";

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + " ₫";
}

export default function Products() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-display text-center text-rose mb-12">
        Sản phẩm của chúng tôi
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-contain mb-4"
            />

            <h4 className="text-gray-800 font-medium mb-1">{p.name}</h4>
            <p className="text-rose font-semibold mb-3">{formatPrice(p.price)}</p>

            <button className="w-full px-3 py-2 bg-rose text-white rounded-full text-sm hover:bg-rose-light transition">
              Thêm vào giỏ
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
