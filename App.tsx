import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import MediaHub from './components/MediaHub';
import FinanceHub from './components/FinanceHub';
import EarnMoney from './components/EarnMoney';
import AuthPortal from './components/AuthPortal';
import PublishCenter from './components/PublishCenter';
import NexusBackend from './NexusBackend';
import { User, Stats } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>(NexusBackend.getSystemState());

  if (!currentUser) {
    return <AuthPortal onLogin={(user) => setCurrentUser(user)} />;
  }

  const isAdmin = currentUser.email === 'Benalloua06@gmail.com';

  return (
    <div className="min-h-screen bg-[#020408] text-white rtl">
      <main className="p-4 md:p-10 pb-32">
        {activeTab === 'dashboard' && <Dashboard stats={stats} isAdmin={isAdmin} setActiveTab={setActiveTab} />}
        {activeTab === 'media' && <MediaHub onBoost={(amt) => setStats(NexusBackend.processEarning(amt, 'ad', isAdmin))} />}
        {activeTab === 'finance' && <FinanceHub stats={stats} isAdmin={isAdmin} onWithdraw={() => {}} onDeposit={() => {}} />}
        {activeTab === 'publish' && <PublishCenter />}
        {activeTab === 'tasks' && <EarnMoney onEarn={(amt) => setStats(NexusBackend.processEarning(amt, 'task', isAdmin))} stats={stats} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 flex justify-around p-4">
        <button onClick={() => setActiveTab('dashboard')} className="flex flex-col items-center gap-1">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('media')} className="flex flex-col items-center gap-1">
          <span className="text-xl">📺</span>
          <span className="text-[10px] font-bold">فيديوهات</span>
        </button>
        <button onClick={() => setActiveTab('tasks')} className="flex flex-col items-center gap-1">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold">مهام</span>
        </button>
        <button onClick={() => setActiveTab('finance')} className="flex flex-col items-center gap-1">
          <span className="text-xl">💰</span>
          <span className="text-[10px] font-bold">الخزنة</span>
        </button>
        {isAdmin && (
          <button onClick={() => setActiveTab('publish')} className="flex flex-col items-center gap-1 text-amber-500">
            <span className="text-xl">🚀</span>
            <span className="text-[10px] font-bold">تفعيل</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default App;
