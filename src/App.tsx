import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { registerAuthNavigate } from './lib/auth-navigation';
import './App.css';
import { initAuth } from './features/auth/api/auth.init';
import Navbar from './shared/components/Navbar';
import type { AppDispatch, RootState } from './store/store';

export default function App() {
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
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
    </>
  );
}
