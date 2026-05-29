import { useEffect, useState } from "react";

export default function Listings({ adminMode = false }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://gaming-market-back.onrender.com";

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_URL}/listings`);

      const data = await res.json();

      console.log("REFRESHING LISTINGS", data);

      setListings(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching listings:", err);
      setListings([]);
      setLoading(false);
    }
  };

  const openWhatsApp = (listing) => {
    const message = `Hi, I'm interested in this account:

Game: ${listing.game}
Level: ${listing.level}
Price: ₦${listing.price}`;

    const url = `https://wa.me/2348100322216?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const markSold = async (id) => {
    console.log("MARK SOLD:", id);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/listings/${id}/sold`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("SOLD RESULT:", data);

      fetchListings();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteListing = async (id) => {
    console.log("DELETE:", id);

    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchListings();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading listings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        🔥 Heimdall EXE Store Listings
      </h1>

      {listings.length === 0 ? (
        <div className="text-center text-zinc-400 mt-20">
          No listings available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300 border border-zinc-800"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.images?.[0]}
                  alt="account"
                  className="w-full h-52 object-cover"
                />

                {/* SOLD OVERLAY */}
                {item.is_sold && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-red-500 text-4xl font-extrabold border-4 border-red-500 px-6 py-2 rotate-[-10deg] rounded-lg shadow-lg">
                      SOLD
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {item.game}
                  </h2>

                  <span className="text-green-400 font-bold text-lg">
                    ₦{item.price}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-zinc-300">
                  <p>
                    <span className="font-semibold text-white">
                      Level:
                    </span>{" "}
                    {item.level}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Emblem:
                    </span>{" "}
                    {item.heroic_emblem}
                  </p>
                </div>

                {item.description && (
                  <p className="text-zinc-400 text-sm border-t border-zinc-800 pt-3">
                    {item.description}
                  </p>
                )}

                {/* ADMIN ACTIONS */}
                {adminMode && (
                  <div className="flex gap-2 flex-wrap pt-2">
                    <button
                      onClick={() => markSold(item.id)}
                      disabled={item.is_sold}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        item.is_sold
                          ? "bg-zinc-700 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-400 text-black"
                      }`}
                    >
                      {item.is_sold
                        ? "Already Sold"
                        : "Mark as Sold"}
                    </button>

                    <button
                      onClick={() => deleteListing(item.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* BUY BUTTON */}
                {!item.is_sold && (
                  <button
                    onClick={() => openWhatsApp(item)}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl transition mt-3"
                  >
                    Buy via WhatsApp
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
