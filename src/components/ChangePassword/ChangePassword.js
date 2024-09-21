import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'antd'; // Using Ant Design's Input and Button
import { useAuth } from '../../hooks/useAuth.js';
const { Title } = Typography;
export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();

  const submit = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto mt-8">
      <center>
        <Title level={4}>Channge Password</Title>
      </center>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        {/* Current Password */}
        <div className="flex flex-col space-y-2 py-3">
          <Input.Password
            placeholder="Current Password"
            {...register('currentPassword', {
              required: 'Current password is required',
            })}
            status={errors.currentPassword ? 'error' : ''}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col space-y-2">
          <Input.Password
            placeholder="New Password"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 5,
                message: 'New password must be at least 5 characters',
              },
            })}
            status={errors.newPassword ? 'error' : ''}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col space-y-2">
          <Input.Password
            placeholder="Confirm Password"
            {...register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: (value) =>
                value !== getValues('newPassword')
                  ? 'Passwords do not match'
                  : true,
            })}
            status={errors.confirmNewPassword ? 'error' : ''}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit" // `htmlType="submit"` to work properly in form
          className="w-full mt-4"
        >
          Change
        </Button>
      </form>
    </div>
  );
}
