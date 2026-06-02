import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { AppLogo } from "../components/logo";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <div
          className="h-72 w-72 rounded-full blur-[120px]"
          style={{
            background: "rgba(91,76,244,0.18)",
            position: "absolute",
            top: "-120px",
            left: "-120px",
          }}
        />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
            style={{
              background:
                "linear-gradient(135deg,#5B4CF4,#7C3AED)",
            }}
          >
            N
          </div>

          <h1
            className="font-bold"
            style={{
              fontSize: "32px",
              color: "#12133A",
            }}
          >
            Neuberg
          </h1>

          <p className="text-gray-500 mt-2">
            Smart Report Processing
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-white rounded-3xl p-8"
          style={{
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            className="font-bold mb-2"
            style={{
              fontSize: "28px",
              color: "#12133A",
            }}
          >
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#5B4CF4]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#5B4CF4]"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm"
                style={{
                  color: "#5B4CF4",
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90"
              style={{
                background: "#5B4CF4",
              }}
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="text-center mt-8 text-gray-500 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              style={{
                color: "#5B4CF4",
                fontWeight: "600",
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}