import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Typography, Input as AntInput, Button as AntButton } from 'antd'; // Import Ant Design components
import { useAuth } from '../../hooks/useAuth';
import { EMAIL } from '../../constants/patterns';

const { Title } = Typography;

export default function RegisterPage() {
  const auth = useAuth();
  const { user, register: registerUser } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');
  
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    if (user) {
      returnUrl ? navigate(returnUrl) : navigate('/');
    }
  }, [user, returnUrl, navigate]);

  const validateForm = () => {
    let valid = true;
    if (!name) {
      setNameError('Name is required');
      valid = false;
    } else if (name.length < 5) {
      setNameError('Name must be at least 5 characters');
      valid = false;
    } else {
      setNameError('');
    }

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
    } else if (password.length < 5) {
      setPasswordError('Password must be at least 5 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!address) {
      setAddressError('Address is required');
      valid = false;
    } else if (address.length < 10) {
      setAddressError('Address must be at least 10 characters');
      valid = false;
    } else {
      setAddressError('');
    }

    return valid;
  };

  const submit = async () => {
    if (validateForm()) {
      try {
        await registerUser({
          name,
          email,
          password,
          address
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Register
        </Title>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <AntInput
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              status={nameError ? 'error' : ''}
            />
            {nameError && (
              <div className="text-red-500 text-sm mt-1">
                {nameError}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <AntInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              status={emailError ? 'error' : ''}
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
            />
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">
                {passwordError}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <AntInput.Password
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              status={confirmPasswordError ? 'error' : ''}
            />
            {confirmPasswordError && (
              <div className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <AntInput
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              status={addressError ? 'error' : ''}
            />
            {addressError && (
              <div className="text-red-500 text-sm mt-1">
                {addressError}
              </div>
            )}
          </div>

          <AntButton
            type="primary"
            htmlType="submit"
            className="w-full mt-4"
          >
            Register
          </AntButton>

          <div className="mt-4 text-center text-gray-600">
            Already a user? &nbsp;
            <Link
              to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}
              className="text-blue-500 hover:underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
