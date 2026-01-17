export default function Hero() {
  return (
    <section className="bg-cream py-24 text-center px-6">
      <h2 className="text-5xl font-display text-rose mb-4">
        Phụ kiện xinh – Tôn lên vẻ đẹp của bạn
      </h2>

      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
        Vòng cổ, charm, dây chuyền, móc khóa handmade và phụ kiện dễ thương
        được chọn lọc kỹ lưỡng. Mỗi món đều mang một câu chuyện nhỏ dành riêng cho bạn ❤️
      </p>

       <a
          href="/san-pham"
          className="px-8 py-3 bg-rose text-white font-medium rounded-full hover:bg-rose-light transition"
        >
          Xem Sản Phẩm
        </a>
    </section>
  );
}
