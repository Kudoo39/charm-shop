import shopImage from "../assets/AnShop.png";

export default function About() {
  return (
    <div className="bg-cream min-h-screen font-body text-gray-700 pb-20">

      {/* HERO */}
      <section className="text-center py-20 px-6 bg-white border-b border-rose/20">
        <h1 className="text-4xl md:text-5xl font-display text-rose mb-4">
          Về AnShop
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Nơi những món phụ kiện nhỏ bé mang theo sự tinh tế, sự dịu dàng và câu chuyện riêng dành cho bạn 🌸
        </p>
      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-display text-rose mb-4">
            Câu chuyện bắt đầu như thế nào?
          </h2>
          <p className="leading-7 mb-4">
            AnShop được thành lập với mong muốn mang đến những món phụ kiện xinh xắn, chất lượng và phù hợp
            với phong cách của mọi cô gái Việt Nam.
          </p>
          <p className="leading-7">
            Từ những chiếc charm điện thoại đáng yêu, dây chuyền tinh tế cho đến những phụ kiện thời trang nhỏ xinh, 
            tất cả đều được chọn lọc cẩn thận, lấy cảm hứng từ sự nhẹ nhàng, thanh lịch và nữ tính.
          </p>
        </div>

        <img
          src={shopImage}
          className="rounded-2xl shadow-md w-full object-cover h-80"
        />
      </section>

      {/* VALUES */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-display text-rose text-center mb-10">
          Giá trị của chúng tôi
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-display text-rose mb-3">Tinh tế 💍</h3>
            <p className="text-gray-600 leading-6">
              Mỗi sản phẩm đều được chọn lựa kỹ càng, mang nét đẹp dịu dàng, phù hợp với phong cách nữ tính.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-display text-rose mb-3">Chất lượng 💎</h3>
            <p className="text-gray-600 leading-6">
              Chúng tôi ưu tiên những chất liệu an toàn cho da, độ bền tốt và đảm bảo tính thẩm mỹ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-display text-rose mb-3">Dễ thương & Hợp thời 🌟</h3>
            <p className="text-gray-600 leading-6">
              Luôn cập nhật xu hướng phụ kiện mới nhất giúp bạn tự tin thể hiện phong cách riêng.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="text-center mt-20 px-6">
        <h2 className="text-3xl font-display text-rose mb-4">
          Hãy cùng AnShop tỏa sáng mỗi ngày ✨
        </h2>
        <p className="text-gray-600 mb-8">
          Nếu bạn có câu hỏi hoặc cần tư vấn sản phẩm, đừng ngần ngại liên hệ với chúng tôi.
        </p>

        <a
          href="/lien-he"
          className="inline-block px-8 py-3 bg-rose text-white rounded-full shadow hover:bg-rose-light transition font-medium"
        >
          Liên hệ ngay
        </a>
      </section>
    </div>
  );
}
