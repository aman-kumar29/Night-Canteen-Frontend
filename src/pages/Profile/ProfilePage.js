import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Typography, message } from 'antd'; // Importing Ant Design's Button and Input
import ChangePassword from '../../components/ChangePassword/ChangePassword.js';

const { Title } = Typography;

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { user, updateProfile } = useAuth();

  // Initialize form values with user data
  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('address', user.address || '');
    }
  }, [user, setValue]);

  // Handle form submission
  const submit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <center>
          <Title level={4}>Update Profile</Title>
        </center>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="flex sm:px-4 lg:px-8 flex-col space-y-2">
            <Input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 5, message: 'Name must be at least 5 characters' },
              })}
              placeholder="Name"
              defaultValue={user?.name || ''}
              status={errors.name ? 'error' : ''}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex sm:px-4 lg:px-8 flex-col space-y-2">
            <Input
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' },
              })}
              placeholder="Address"
              defaultValue={user?.address || ''}
              status={errors.address ? 'error' : ''}
              className="w-full"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div className="flex sm:px-4 lg:px-8 flex-col space-y-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4"
              loading={loading} // Show loading spinner when updating
            >
              Update
            </Button>
          </div>
        </form>

        <ChangePassword className="mt-6" />
      </div>
    </div>
  );
}
