import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, CreditCard, History, User, Plus, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user, rechargeHistory, addRecharge } = useApp();
  const [quickRecharge, setQuickRecharge] = useState({
    number: '',
    amount: ''
  });

  const handleQuickRecharge = (e) => {
    e.preventDefault();
    if (quickRecharge.number && quickRecharge.amount) {
      const newRecharge = {
        number: quickRecharge.number,
        amount: parseInt(quickRecharge.amount),
        plan: 'Quick Recharge',
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      addRecharge(newRecharge);
      setQuickRecharge({ number: '', amount: '' });
      alert('Recharge successful!');
    }
  };

  const stats = [
    {
      title: 'Total Recharges',
      value: rechargeHistory.length,
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      color: 'bg-primary/10'
    },
    {
      title: 'This Month',
      value: rechargeHistory.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length,
      icon: <CreditCard className="h-8 w-8 text-secondary" />,
      color: 'bg-secondary/10'
    },
    {
      title: 'Total Spent',
      value: `₹${rechargeHistory.reduce((sum, r) => sum + r.amount, 0)}`,
      icon: <History className="h-8 w-8 text-success" />,
      color: 'bg-success/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your mobile recharges and view your history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-dark">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Recharge */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold text-dark mb-6 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Quick Recharge
              </h2>
              <form onSubmit={handleQuickRecharge} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={quickRecharge.number}
                    onChange={(e) => setQuickRecharge({...quickRecharge, number: e.target.value})}
                    className="input-field"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={quickRecharge.amount}
                    onChange={(e) => setQuickRecharge({...quickRecharge, amount: e.target.value})}
                    className="input-field"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn-primary">
                  Recharge Now
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t">
                <Link to="/recharge-plans" className="w-full btn-outline block text-center">
                  View All Plans
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Recharges */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Recent Recharges
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rechargeHistory.slice(0, 5).map((recharge) => (
                      <tr key={recharge.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{recharge.number}</td>
                        <td className="py-3 px-4">{recharge.plan}</td>
                        <td className="py-3 px-4 font-semibold">₹{recharge.amount}</td>
                        <td className="py-3 px-4">{recharge.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            recharge.status === 'Success' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-danger/10 text-danger'
                          }`}>
                            {recharge.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {rechargeHistory.length > 5 && (
                <div className="mt-4 text-center">
                  <button className="text-primary hover:text-primary/80 font-medium">
                    View All History
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/recharge-plans" className="card text-center hover:shadow-xl transition-shadow">
              <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Browse Plans</p>
            </Link>
            <div className="card text-center hover:shadow-xl transition-shadow cursor-pointer">
              <CreditCard className="h-8 w-8 text-secondary mx-auto mb-2" />
              <p className="font-medium">Payment Methods</p>
            </div>
            <div className="card text-center hover:shadow-xl transition-shadow cursor-pointer">
              <History className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-medium">Full History</p>
            </div>
            <div className="card text-center hover:shadow-xl transition-shadow cursor-pointer">
              <User className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-medium">Profile Settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;