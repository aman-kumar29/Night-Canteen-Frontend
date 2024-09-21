import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Input as AntInput, Button as AntButton, Typography } from 'antd'; // Import Ant Design components
import { useAuth } from '../../hooks/useAuth';
import { EMAIL } from '../../constants/patterns';

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');
  
  // Local state for form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Local state for error messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      returnUrl ? navigate(returnUrl) : navigate('/');
    }
  }, [user, returnUrl, navigate]);

  // Function to validate form inputs
  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!EMAIL.value.test(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  // Handle form submission
  const handleClick = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Login
        </Title>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <AntInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            status={emailError ? 'error' : ''}
            className="w-full"
          />
          {emailError && (
            <div className="text-red-500 text-sm mt-1">
              {emailError}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <AntInput.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            status={passwordError ? 'error' : ''}
            className="w-full"
          />
          {passwordError && (
            <div className="text-red-500 text-sm mt-1">
              {passwordError}
            </div>
          )}
        </div>

        <AntButton
          type="primary"
          className="w-full mt-4"
          onClick={handleClick}
        >
          Login
        </AntButton>

        <div className="mt-4 text-center text-gray-600">
          New user? &nbsp;
          <Link
            to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}
            className="text-blue-500 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
