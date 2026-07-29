import React, { useState } from 'react';
import { CreditCard, Wallet, Calendar, AlertTriangle, ArrowDownRight, ArrowUpRight, X, CheckCircle } from 'lucide-react';

export const WalletView = () => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('wallet_balance');
    return saved ? parseInt(saved, 10) : 5420;
  });
  const [totalEarnings, setTotalEarnings] = useState(() => {
    const saved = localStorage.getItem('wallet_total_earnings');
    return saved ? parseInt(saved, 10) : 12500;
  });
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('wallet_transactions');
    return saved ? JSON.parse(saved) : [
      { txId: 'TXN_948271', title: 'Valorant Cup #12 Payout', amount: '+ ₹1,000', type: 'credit', date: '28 May 2026', status: 'COMPLETED' },
      { txId: 'TXN_940293', title: 'Cash Withdrawal Request', amount: '- ₹2,500', type: 'debit', date: '20 May 2026', status: 'COMPLETED' },
      { txId: 'TXN_932910', title: 'BGMI Masters Series Payout', amount: '+ ₹5,000', type: 'credit', date: '15 May 2026', status: 'COMPLETED' },
      { txId: 'TXN_920391', title: 'Cash Withdrawal Request', amount: '- ₹1,000', type: 'debit', date: '10 May 2026', status: 'COMPLETED' }
    ];
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseInt(withdrawAmount, 10);
    if (!amountNum || amountNum <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    if (amountNum > balance) {
      showToast('Insufficient wallet balance', 'error');
      return;
    }
    if (!upiId.includes('@')) {
      showToast('Please enter a valid UPI ID (e.g. name@okhdfc)', 'error');
      return;
    }

    const updatedBalance = balance - amountNum;
    setBalance(updatedBalance);
    localStorage.setItem('wallet_balance', updatedBalance);

    const newTx = {
      txId: `TXN_${Math.floor(100000 + Math.random() * 900000)}`,
      title: 'UPI Cash Withdrawal Request',
      amount: `- ₹${amountNum.toLocaleString('en-IN')}`,
      type: 'debit',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'PENDING'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem('wallet_transactions', JSON.stringify(updatedTx));

    // Log recent activity
    try {
      const defaultActivities = [
        { id: 1, text: 'You have registered for StageCore Valorant Cup #12', time: '2 min ago', type: 'registration' },
        { id: 2, text: 'Team Alpha has been approved by admin', time: '15 min ago', type: 'team' },
        { id: 3, text: 'Your match against Team Delta has been scheduled', time: '1 hour ago', type: 'match' },
        { id: 4, text: 'You have received ₹1,000 prize payout in wallet', time: '2 hours ago', type: 'wallet' }
      ];
      const savedActivities = localStorage.getItem('recent_activities');
      const activities = savedActivities ? JSON.parse(savedActivities) : defaultActivities;
      const newActivity = {
        id: Date.now(),
        text: `You have initiated a withdrawal of ₹${amountNum.toLocaleString('en-IN')} to UPI ID: ${upiId}`,
        time: 'Just now',
        type: 'wallet'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch (err) {
      console.error(err);
    }

    setWithdrawAmount('');
    setUpiId('');
    setShowWithdrawModal(false);
    showToast(`Withdrawal of ₹${amountNum} initiated successfully!`);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          toast.type === 'success' ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white' : 'bg-red-500/20 border-red-500/40 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Wallet className="text-gaming-purple" size={24} />
            My Wallet
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Review cash prizes, claim tournament earnings, and cashout to bank accounts instantly.
          </p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-extrabold rounded-xl transition-all shadow-[0_0_12px_rgba(124,58,237,0.3)] cursor-pointer uppercase tracking-wider whitespace-nowrap"
        >
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Current Balance */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-gaming-purple/10 rounded-full blur-lg" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Available Balance</span>
            <h3 className="text-3xl font-black text-white tracking-tight">₹{balance.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-gray-500">Withdrawable prize cash</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gaming-purple/15 border border-gaming-purple/30 flex items-center justify-center text-gaming-purple">
            <Wallet size={22} />
          </div>
        </div>

        {/* Card 2: Total Earnings */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-gaming-blue/10 rounded-full blur-lg" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Total Prize Earnings</span>
            <h3 className="text-3xl font-black text-gaming-blue tracking-tight">₹{totalEarnings.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-gray-500">Cumulative historical earnings</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gaming-blue/15 border border-gaming-blue/30 flex items-center justify-center text-gaming-blue">
            <CreditCard size={22} />
          </div>
        </div>

        {/* Card 3: Pending Balance */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/10 rounded-full blur-lg" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Pending Approvals</span>
            <h3 className="text-3xl font-black text-amber-500 tracking-tight">₹0</h3>
            <p className="text-[10px] text-gray-500">Verification in progress</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Calendar size={22} />
          </div>
        </div>

      </div>

      {/* Transaction History log list */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-white uppercase tracking-wider">Transaction Ledger History</h3>
        
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4">Transaction ID</th>
                  <th className="px-5 py-4">Description / Event</th>
                  <th className="px-5 py-4">Transaction Amount</th>
                  <th className="px-5 py-4">Timestamp</th>
                  <th className="px-5 py-4 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                {transactions.map(tx => (
                  <tr key={tx.txId} className="hover:bg-white/2 transition-colors duration-150">
                    <td className="px-5 py-3.5 font-mono text-gray-500">#{tx.txId}</td>
                    <td className="px-5 py-3.5 font-bold text-white flex items-center gap-2">
                      {tx.type === 'credit' ? (
                        <ArrowUpRight size={13} className="text-emerald-400" />
                      ) : (
                        <ArrowDownRight size={13} className="text-red-400" />
                      )}
                      <span>{tx.title}</span>
                    </td>
                    <td className={`px-5 py-3.5 font-bold font-mono text-sm ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.amount}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{tx.date}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[8px] font-black uppercase border ${
                        tx.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setShowWithdrawModal(false)} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-sm w-full bg-[#050816] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={16} className="text-gaming-purple" />
                Initiate Cashout
              </h3>
              <button
                type="button"
                onClick={() => setShowWithdrawModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center">
                <span className="text-[9px] text-gray-500 font-bold uppercase block">Withdrawable Balance</span>
                <span className="text-xl font-black text-white block mt-0.5">₹{balance.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Withdrawal Amount (INR)</label>
                <input
                  type="number"
                  min="100"
                  max={balance}
                  required
                  placeholder="e.g. 1000"
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all"
                />
                <span className="text-[8px] text-gray-600">Minimum withdrawal amount is ₹100.</span>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">UPI ID (VPA)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. username@okhdfc"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-700"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-gaming-purple hover:bg-gaming-purple/85 rounded-xl transition-all cursor-pointer uppercase shadow-md shadow-gaming-purple/20"
                >
                  Cashout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
