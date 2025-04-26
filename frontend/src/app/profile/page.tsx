import Navbar from "@/components/Navbar";
import WalletDisplay from "@/components/WalletDisplay";

export default function Profile() {
  // Replace with real user data
  const user = {
    email: "user@example.com",
    wallet: "0x1234...abcd",
    balance: 100,
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Profile</h2>
        <div className="mb-2">Email: {user.email}</div>
        <div className="mb-2">Wallet: {user.wallet}</div>
        <div className="mb-2">Token Balance: {user.balance} GreenTokens</div>
        <WalletDisplay />
      </div>
    </div>
  );
}