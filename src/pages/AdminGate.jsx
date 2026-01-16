import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Admin from "./Admin";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export default function AdminGate() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (user?.email === ADMIN_EMAIL) {
    return <Admin />;
  }

  async function sendMagicLink(e) {
    e.preventDefault();

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      alert("Email này không có quyền quản trị.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/quan-ly`,
      },
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-md">
        <h1 className="text-3xl font-display text-rose mb-4 text-center">
          Quản lý cửa hàng
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Nhập email quản trị để nhận link đăng nhập.
        </p>

        <form onSubmit={sendMagicLink} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose/40"
            placeholder="Email quản trị"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-rose text-white rounded-xl hover:bg-rose-light transition font-medium"
          >
            {loading ? "Đang gửi..." : "Gửi link đăng nhập"}
          </button>
        </form>

        {sent && (
          <p className="text-sm text-green-600 text-center mt-4">
            Đã gửi link. Mở email và bấm vào để vào trang quản lý.
          </p>
        )}
      </div>
    </div>
  );
}
