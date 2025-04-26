import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <motion.h1
        className="text-5xl font-bold text-green-800 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Turn Actions into Rewards
      </motion.h1>
      <motion.p
        className="text-xl text-green-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Complete eco-friendly tasks, earn GreenTokens, and shop eco-products!
      </motion.p>
      <Link href="/login">
        <motion.button
          className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </Link>
    </main>
  );
}
