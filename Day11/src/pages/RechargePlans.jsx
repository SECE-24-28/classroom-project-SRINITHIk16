import { useState } from 'react';
import { Search, Filter, CreditCard, Clock, Wifi, Phone, MessageSquare, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RechargePlans = () => {
  const { plans, addRecharge, user, loading, error } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.price.toString().includes(searchTerm);
    
    const matchesNetwork = selectedNetwork === 'all' || 
                          plan.name.toLowerCase().includes(selectedNetwork.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'budget') matchesFilter = plan.price <= 199;
    if (selectedFilter === 'premium') matchesFilter = plan.price >= 300;
    
    return matchesSearch && matchesNetwork && matchesFilter;
  });

  const handleRecharge = async (plan) => {
    if (!phoneNumber) {
      alert('Please enter phone number');
      return;
    }

    const newRecharge = {
      number: phoneNumber,
      amount: plan.price,
      plan: plan.name,
    };
    
    try {
      await addRecharge(newRecharge);
      setSelectedPlan(null);
      setPhoneNumber('');
      alert(`Recharge successful! ₹${plan.price} recharged for ${phoneNumber}`);
    } catch (error) {
      alert('Recharge failed. Please try again.');
    }
  };

  const handlePlanSelect = (plan) => {
    if (!user) {
      alert('Please login to proceed with recharge');
      window.location.href = '/login';
      return;
    }
    setSelectedPlan(plan);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600">
            Find the best recharge plans for all major networks
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plans by name or price..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="input-field md:w-48"
              >
                <option value="all">All Networks</option>
                <option value="airtel">Airtel</option>
                <option value="jio">Jio</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Plans
              </button>
              <button
                onClick={() => setSelectedFilter('budget')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'budget' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Budget
              </button>
              <button
                onClick={() => setSelectedFilter('premium')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'premium' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Premium
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="card hover:shadow-xl transition-shadow duration-300 relative">
              {plan.price >= 300 && (
                <div className="absolute -top-2 -right-2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-dark mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary mb-1">₹{plan.price}</div>
                <p className="text-gray-600 text-sm">{plan.validity}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <Wifi className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">{plan.data}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">{plan.calls}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MessageSquare className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">{plan.sms}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">Validity: {plan.validity}</span>
                </div>
              </div>

              <button
                onClick={() => handlePlanSelect(plan)}
                className="w-full btn-primary"
              >
                {user ? 'Recharge Now' : 'Login to Recharge'}
              </button>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No plans found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Recharge Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-dark mb-4">Confirm Recharge</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-dark">{selectedPlan.name}</h4>
                <p className="text-2xl font-bold text-primary">₹{selectedPlan.price}</p>
                <p className="text-sm text-gray-600">{selectedPlan.validity}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-field"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRecharge(selectedPlan)}
                  className="flex-1 btn-primary"
                >
                  Confirm Recharge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RechargePlans;