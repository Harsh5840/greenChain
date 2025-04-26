"use client";
import { toast } from "react-toastify";

export default function TaskCard({ task }: { task: { title: string; description: string; reward: number } }) {
  const handleComplete = async () => {
    // TODO: Call /api/tasks/complete
    toast.success("Task completed! Tokens minted.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="font-bold text-lg">{task.title}</div>
      <div className="text-gray-600">{task.description}</div>
      <div className="text-green-700 font-semibold">Reward: {task.reward} GreenTokens</div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleComplete}
      >
        Complete Task
      </button>
    </div>
  );
}