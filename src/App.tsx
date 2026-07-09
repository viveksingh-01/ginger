import ReactLenis, { type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { initAuth } from './features/auth/api/auth.init';
import { registerAuthNavigate } from './lib/auth-navigation';
import Navbar from './shared/components/Navbar';
import type { AppDispatch, RootState } from './store/store';

export default function App() {
  const lenisRef = useRef<LenisRef>(null);
  const dispatch = useDispatch.withTypes<AppDispatch>()();
  const loading = useSelector.withTypes<RootState>()(state => state.auth.loading);

  const navigate = useNavigate();

  useEffect(() => {
    registerAuthNavigate((to, options) => navigate(to, options));
  }, [navigate]);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
    </>
  );
}
