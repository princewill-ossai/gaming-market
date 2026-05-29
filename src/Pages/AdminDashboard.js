import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import Listings from "./Listings";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">
          🔥 Lil M Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-10">
        {/* UPLOAD SECTION */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Upload New Account
          </h2>

          <Upload />
        </div>

        {/* MANAGE LISTINGS */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Manage Listings
          </h2>

          <Listings adminMode />
        </div>
      </div>
    </div>
  );
}