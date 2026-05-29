import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-purple-500">Heimdall EXE Store</h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <Link className="hover:text-white" to="/">
            Home
          </Link>
          <Link className="hover:text-white" to="/listings">
            Listings
          </Link>
          <Link className="hover:text-white" to="/cart">
            Cart
          </Link>
        </div>

        <Link
          to="/admin/login"
          className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Sell Account
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
