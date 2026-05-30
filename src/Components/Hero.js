import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold">
          Buy Gaming Accounts <br />
          <span className="text-purple-500">Safely & Instantly</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Premium Free Fire, TT accounts, Facebook accounts. Verified sellers only.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/listings"
            className="bg-purple-600 cursor-pointer px-6 py-3 rounded-xl hover:bg-purple-700 transition"
          >
            Browse Accounts
          </Link>

          <Link to="/admin/login" className="border cursor-pointer border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Sell Account
          </Link>
        </div>
      </motion.div>

      {/* glowing background effect */}
      <div className="absolute z-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full" />
    </div>
  );
}

export default Hero;
