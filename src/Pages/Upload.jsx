import { useState } from "react";

function Upload() {
  const [form, setForm] = useState({
    game: "",
    heroicEmblem: "",
    level: "",
    price: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (e) => {
    setForm({
      ...form,
      images: [...e.target.files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("game", form.game);
      formData.append("heroicEmblem", form.heroicEmblem);
      formData.append("level", form.level);
      formData.append("price", form.price);
      formData.append("description", form.description);

      // append images
      for (let img of form.images) {
        formData.append("images", img);
      }

      const token = localStorage.getItem("token");
      const res = await fetch("https://gaming-market-back.onrender.com/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      alert("Account uploaded successfully!");

      // reset form
      setForm({
        game: "",
        heroicEmblem: "",
        level: "",
        price: "",
        description: "",
        images: [],
      });

    } catch (err) {
      console.log(err);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Sell Your Gaming Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl"
      >
        {/* GAME */}
        <div>
          <label className="text-sm text-gray-400">
            Game
          </label>

          <input
            type="text"
            name="game"
            value={form.game}
            onChange={handleChange}
            placeholder="Free Fire"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* HEROIC */}
        <div>
          <label className="text-sm text-gray-400">
            Heroic Emblem / Rank
          </label>

          <input
            type="text"
            name="heroicEmblem"
            value={form.heroicEmblem}
            onChange={handleChange}
            placeholder="Heroic"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* LEVEL */}
        <div>
          <label className="text-sm text-gray-400">
            Account Level
          </label>

          <input
            type="number"
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="70"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm text-gray-400">
            Price (₦)
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="35000"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-400">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe skins, bundles, emotes..."
            rows="5"
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="text-sm text-gray-400">
            Account Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full mt-2"
          />
        </div>

        {/* PREVIEW IMAGES */}
        <div className="grid grid-cols-3 gap-4">
          {form.images.length > 0 &&
            form.images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt=""
                className="h-28 w-full object-cover rounded-xl border border-white/10"
              />
            ))}
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
        >
          {loading ? "Uploading..." : "Upload Account"}
        </button>
      </form>
    </div>
  );
}

export default Upload;