import { useEffect, useState } from "react";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch("https://gaming-market-back.onrender.com/listings");
      const data = await res.json();
      console.log("REFRESHING LISTINGS");

      setListings(data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching listings:", err);
      setLoading(false);
    }
  };

  const openWhatsApp = (listing) => {
    const message = `Hi, I'm interested in this account:
Game: ${listing.game}
Level: ${listing.level}
Price: ${listing.price}`;

    const url = `https://wa.me/2348100322216?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading listings...
      </div>
    );
  }

const markSold = async (id) => {
  console.log("MARK SOLD:", id);

  try {
    const res = await fetch(`https://gaming-market-back.onrender.com/listings/${id}/sold`, {
      method: "PATCH",
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
    await fetch(`https://gaming-market-back.onrender.com/listings/${id}`, {
      method: "DELETE",
    });

    fetchListings();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🔥 Lil M Store Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            {/* IMAGE WRAPPER (WITH OVERLAY) */}
            <div className="relative">
              <img
                src={item.images?.[0]}
                alt="account"
                className="w-full h-48 object-cover"
              />

              {/* SOLD OVERLAY */}
              {item.is_sold && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-red-500 text-3xl font-extrabold border-2 border-red-500 px-4 py-2 rotate-[-12deg]">
                    SOLD
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{item.game}</h2>

              <p className="text-sm text-gray-300">Level: {item.level}</p>

              <p className="text-sm text-gray-300">
                Emblem: {item.heroic_emblem}
              </p>

              <p className="text-green-400 font-bold text-lg">₦{item.price}</p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => markSold(item.id)}
                  disabled={item.is_sold}
                  className={`px-3 py-1 rounded ${
                    item.is_sold
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {item.is_sold ? "Sold" : "Mark as Sold"}
                </button>

                <button
                  onClick={() => deleteListing(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => openWhatsApp(item)}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg mt-2"
              >
                Buy via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
