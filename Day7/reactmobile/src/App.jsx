import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Navbar />   {/* Navbar always visible */}
      <HomePage /> {/* Only HomePage content shows */}
    </div>
  );
}
