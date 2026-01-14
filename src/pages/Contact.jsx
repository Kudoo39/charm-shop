import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-cream min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-display text-rose text-center mb-12">
          Liên hệ với AnShop
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT: Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-display text-rose mb-6">Thông tin liên hệ</h2>

            <div className="flex items-start gap-4 mb-5">
              <Mail className="text-rose w-6 h-6" />
              <p className="text-gray-700">anshop1973@gmail.com</p>
            </div>

            <div className="flex items-start gap-4 mb-5">
              <Phone className="text-rose w-6 h-6" />
              <p className="text-gray-700">0388 556 900</p>
            </div>

            <div className="flex items-start gap-4 mb-5">
              <MapPin className="text-rose w-6 h-6" />
              <p className="text-gray-700">
                163/12 Lý Nam Đế, Phường Minh Phụng, TP. Hồ Chí Minh  
              </p>
            </div>

            <p className="text-gray-700 mt-6">
              Nếu bạn cần tư vấn, hỗ trợ đổi trả, hoặc muốn đặt hàng số lượng lớn,
              hãy gửi tin nhắn cho chúng mình. Rất vui được hỗ trợ bạn! 💕
            </p>
          </div>

          {/* RIGHT: Form */}
          <form className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-display text-rose mb-6">Gửi tin nhắn</h2>

            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full p-3 rounded-lg border mb-4 focus:border-rose outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border mb-4 focus:border-rose outline-none"
            />

            <textarea
              rows="4"
              placeholder="Tin nhắn của bạn..."
              className="w-full p-3 rounded-lg border mb-4 focus:border-rose outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-rose text-white rounded-full font-medium hover:bg-rose-light transition"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
