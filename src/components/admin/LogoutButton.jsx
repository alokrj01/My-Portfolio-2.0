import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Failed to logout: " + error.message);
      return;
    }

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
    >
      Logout
    </button>
  );
}