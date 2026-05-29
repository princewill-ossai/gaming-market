import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const login = async () => {
  const res = await fetch(
    "http://localhost:5000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  // 🚨 CHECK STATUS FIRST
  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "Login failed");
    return;
  }

  const data = await res.json();

  localStorage.setItem("token", data.access_token);

  window.location.href = "/admin/dashboard";
};

   const openWhatsApp = (listing) => {
    const message = `Hi, i'm from ur store, i have an account for sale`;

    const url = `https://wa.me/2348124761652?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">
        <h1 className="text-white text-2xl font-bold">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-green-500 py-3 rounded font-bold"
        >
          Login
        </button>
        <p>If you are not an admin, click below</p>
        <button
          onClick={() => openWhatsApp()}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl transition mt-3"
        >
          Sell via WhatsApp
        </button>
      </div>
    </div>
  );
}