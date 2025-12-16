import { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

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
    // Airtel Plans
    { id: 1, name: 'Airtel Basic Plan', price: 99, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 89 },
    { id: 2, name: 'Airtel Smart Plan', price: 179, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 159 },
    { id: 3, name: 'Airtel Premium Plan', price: 299, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 269 },
    { id: 4, name: 'Airtel Max Plan', price: 449, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 399 },
    
    // Jio Plans
    { id: 5, name: 'Jio Basic Plan', price: 149, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 129 },
    { id: 6, name: 'Jio Standard Plan', price: 199, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 179 },
    { id: 7, name: 'Jio Premium Plan', price: 349, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 319 },
    { id: 8, name: 'Jio Ultra Plan', price: 599, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 549 },
    
    // Vi Plans
    { id: 9, name: 'Vi Starter Plan', price: 119, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 99 },
    { id: 10, name: 'Vi Smart Plan', price: 219, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 199 },
    { id: 11, name: 'Vi Premium Plan', price: 299, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 269 },
    { id: 12, name: 'Vi Max Plan', price: 479, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 429 },
    
    // BSNL Plans
    { id: 13, name: 'BSNL Basic Plan', price: 99, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 79 },
    { id: 14, name: 'BSNL Standard Plan', price: 187, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 167 },
    { id: 15, name: 'BSNL Premium Plan', price: 297, validity: '54 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 267 },
    { id: 16, name: 'BSNL Unlimited Plan', price: 399, validity: '28 days', data: 'Unlimited', calls: 'Unlimited', sms: 'Unlimited', subscriptionPrice: 359 },
    
    // Special Plans
    { id: 17, name: 'Student Special', price: 155, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 135 },
    { id: 18, name: 'Work From Home', price: 249, validity: '28 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 229 },
    { id: 19, name: 'Family Pack', price: 399, validity: '28 days', data: '4GB/day', calls: 'Unlimited', sms: '100/day', subscriptionPrice: 369 },
    { id: 20, name: 'Data Booster', price: 98, validity: '28 days', data: '6GB Total', calls: 'Existing Plan', sms: 'Existing Plan', subscriptionPrice: 88 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addRecharge = async (recharge) => {
    try {
      const newRecharge = await ApiService.createRecharge(recharge);
      setRechargeHistory(prev => [newRecharge, ...prev]);
      return newRecharge;
    } catch (err) {
      // Fallback to local storage
      const localRecharge = { ...recharge, id: Date.now(), status: 'Success', date: new Date().toISOString().split('T')[0] };
      setRechargeHistory(prev => [localRecharge, ...prev]);
      return localRecharge;
    }
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

  const addSubscription = async (subscription) => {
    try {
      const newSubscription = {
        ...subscription,
        id: Date.now(),
        status: 'Active',
        startDate: new Date().toISOString().split('T')[0],
        nextBilling: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      return newSubscription;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    rechargeHistory,
    plans,
    loading,
    error,
    login,
    logout,
    addRecharge,
    updatePlan,
    deletePlan,
    addPlan,
    addSubscription,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};