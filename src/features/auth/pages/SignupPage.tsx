import { setAuth } from '@/store/authSlice';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../../shared/components/Input';
import { signup } from '../api/auth';
import type { ISignupPayload } from '../models/payload';
import type IAuthResponse from '../models/response';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignupPayload>();

  const onSubmit = async (formData: ISignupPayload) => {
    try {
      const { data }: IAuthResponse = await signup(formData);
      dispatch(setAuth(data));
      navigate('/');
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-lg mx-auto px-6 py-6 flex flex-col">
        {/* Header */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            or{' '}
            <span className="text-ginger font-medium cursor-pointer" onClick={() => navigate('/auth/login')}>
              login to your account
            </span>
          </p>
          <div className="w-10 h-0.5 bg-black mt-4"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mt-8">
            <div className="border border-gray-300 bg-white">
              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Enter a valid 10-digit phone number',
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Phone number"
                    value={field.value || ''}
                    onChange={field.onChange}
                    error={errors.phone?.message}
                  />
                )}
              />

              {/* Name */}
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                }}
                render={({ field }) => (
                  <Input
                    label="Name"
                    value={field.value || ''}
                    onChange={field.onChange}
                    error={errors.name?.message}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="email"
                    label="Email"
                    value={field.value || ''}
                    onChange={field.onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              {/* Password */}
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={errors.password?.message}
                    />
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating your account</span>
                </div>
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>
          </div>

          {/* Terms */}
          <div className="mt-4 text-xs text-gray-600 leading-5">
            By creating an account, I accept the <span className="font-semibold text-black">Terms & Conditions</span> &{' '}
            <span className="font-semibold text-black">Privacy Policy</span>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignupPage;
