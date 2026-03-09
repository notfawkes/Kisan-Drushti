import React, { useState } from 'react';
import { LoadingScreen } from './pages/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
type AppState = 'loading' | 'landing' | 'login' | 'dashboard';
export function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const handleLoadingComplete = () => setAppState('landing');
  const handleLoginClick = () => setAppState('login');
  const handleLoginSuccess = () => setAppState('dashboard');
  const handleLogout = () => setAppState('landing');
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {appState === 'loading' &&
      <LoadingScreen onComplete={handleLoadingComplete} />
      }
      {appState === 'landing' &&
      <LandingPage onLoginClick={handleLoginClick} />
      }
      {appState === 'login' && <LoginPage onLogin={handleLoginSuccess} />}
      {appState === 'dashboard' && <Dashboard onLogout={handleLogout} />}
    </div>);

}