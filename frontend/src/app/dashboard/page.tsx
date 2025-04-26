import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import WalletDisplay from "@/components/WalletDisplay";

export default async function Dashboard() {
  // Fetch tasks from /api/tasks (replace with real fetch)
  const tasks = [
    { id: 1, title: "Plant a Tree", description: "Plant a tree in your neighborhood.", reward: 10 },
    { id: 2, title: "Recycle", description: "Recycle plastic bottles.", reward: 5 },
  ];
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <WalletDisplay />
        <h2 className="text-2xl font-bold mb-4 text-green-800">Eco Tasks</h2>
        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}