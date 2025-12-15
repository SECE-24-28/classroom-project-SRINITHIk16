import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rechargeHistory, setRechargeHistory] = useState([
    { id: 1, number: '9876543210', amount: 299, plan: 'Unlimited', date: '2024-12-10', status: 'Success' },
    { id: 2, number: '9876543210', amount: 199, plan: 'Data Pack', date: '2024-12-05', status: 'Success' },
    { id: 3, number: '9876543211', amount: 399, plan: 'Premium', date: '2024-12-01', status: 'Failed' },
  ]);

  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', price: 99, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day' },
    { id: 2, name: 'Standard Plan', price: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day' },
    { id: 3, name: 'Premium Plan', price: 299, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day' },
    { id: 4, name: 'Unlimited Plan', price: 399, validity: '28 days', data: 'Unlimited', calls: 'Unlimited', sms: 'Unlimited' },
  ]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addRecharge = (recharge) => {
    setRechargeHistory(prev => [{ ...recharge, id: Date.now() }, ...prev]);
  };

  const updatePlan = (planId, updatedPlan) => {
    setPlans(prev => prev.map(plan => plan.id === planId ? { ...plan, ...updatedPlan } : plan));
  };

  const deletePlan = (planId) => {
    setPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  const addPlan = (newPlan) => {
    setPlans(prev => [...prev, { ...newPlan, id: Date.now() }]);
  };

  const value = {
    user,
    rechargeHistory,
    plans,
    login,
    logout,
    addRecharge,
    updatePlan,
    deletePlan,
    addPlan,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};