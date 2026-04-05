import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './shared/components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
    </>
  );
}
