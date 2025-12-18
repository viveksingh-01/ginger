import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantList";

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RestaurantList />
    </main>
  );
}
