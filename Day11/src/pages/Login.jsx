import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation
    if (value && name !== 'role') {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
    } else if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) return 'Password must contain uppercase and lowercase letters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'role') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Mock authentication
      const userData = {
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role
      };
      
      login(userData);
      navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-accent/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.email ? 'border-danger focus:ring-danger' : 'focus:ring-primary'}`}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-danger' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                Sign up here
              </Link>
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;