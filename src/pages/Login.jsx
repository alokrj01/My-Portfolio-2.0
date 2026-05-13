import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      navigate("/admin");
    } finally {
      setLoading(false);
    }
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setError(null);

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="border p-6 rounded-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        {error && (
          <div className="text-red-600 text-sm mb-4 p-2 border border-red-300 rounded bg-red-50">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
