"use client";
import { useAccount } from "wagmi";

export default function WalletDisplay() {
  const { address, isConnected } = useAccount();
  return (
    <div className="mb-4">
      {isConnected ? (
        <div className="text-green-700">Wallet: {address}</div>
      ) : (
        <div className="text-red-500">Wallet not connected</div>
      )}
    </div>
  );
}