import Navbar from "./components/Homepage/Navbar";
import Hero from "./components/Homepage/Hero";
import Strip from "./components/Homepage/Strip";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Strip />
    </div>
  );
}
