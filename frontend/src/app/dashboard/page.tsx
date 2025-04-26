import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import WalletDisplay from "@/components/WalletDisplay";

const TASKS = [
  {
    id: 1,
    title: "Plant a Tree",
    description: "Plant a tree in your neighborhood or backyard.",
    tokenReward: 50,
    imageUrl: "/tasks/plant-tree.jpg"
  },
  {
    id: 2,
    title: "Carpool to Work",
    description: "Share a ride with colleagues at least twice a week.",
    tokenReward: 30,
    imageUrl: "/tasks/carpool.jpg"
  },
  {
    id: 3,
    title: "Recycle Waste",
    description: "Recycle plastic, paper, and metal waste properly.",
    tokenReward: 20,
    imageUrl: "/tasks/recycle.jpg"
  },
  {
    id: 4,
    title: "Bike or Walk",
    description: "Choose biking or walking instead of driving for 5km trips.",
    tokenReward: 40,
    imageUrl: "/tasks/bike-walk.jpg"
  },
  {
    id: 5,
    title: "Use Reusable Bags",
    description: "Avoid plastic bags by using cloth or jute bags for shopping.",
    tokenReward: 15,
    imageUrl: "/tasks/reusable-bag.jpg"
  },
  {
    id: 6,
    title: "Compost Organic Waste",
    description: "Start composting food scraps at home.",
    tokenReward: 35,
    imageUrl: "/tasks/compost.jpg"
  },
  {
    id: 7,
    title: "Save Water",
    description: "Limit showers to under 5 minutes for a week.",
    tokenReward: 25,
    imageUrl: "/tasks/save-water.jpg"
  },
  {
    id: 8,
    title: "Switch to LED bulbs",
    description: "Replace 5 old bulbs with energy-efficient LED lights.",
    tokenReward: 10,
    imageUrl: "/tasks/led-bulbs.jpg"
  },
  {
    id: 9,
    title: "Donate Clothes",
    description: "Donate unused clothes to those in need instead of trashing them.",
    tokenReward: 20,
    imageUrl: "/tasks/donate-clothes.jpg"
  },
  {
    id: 10,
    title: "Eco-Volunteering",
    description: "Spend a day volunteering for a local eco-friendly cause.",
    tokenReward: 60,
    imageUrl: "/tasks/volunteering.jpg"
  }
];

function getRandomTasks(tasks: Array<{
  id: number;
  title: string;
  description: string;
  tokenReward: number;
  imageUrl: string;
}>, n: number) {
  const shuffled = [...tasks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function Dashboard() {
  const tasks = getRandomTasks(TASKS, 3);
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <WalletDisplay />
        <h2 className="text-2xl font-bold mb-4 text-green-800">Eco Tasks</h2>
        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={{
                title: task.title,
                description: task.description,
                reward: task.tokenReward
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}