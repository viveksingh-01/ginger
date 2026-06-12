import Input from '@/shared/components/Input';
import { setAuth } from '@/store/authSlice';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import type { ILoginPayload } from '../models/payload';
import type IAuthResponse from '../models/response';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginPayload>();

  const onSubmit = async (formData: ILoginPayload) => {
    try {
      const { data }: IAuthResponse = await login(formData);
      dispatch(setAuth(data));
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-lg mx-auto px-6 py-6 flex flex-col">
        {/* Header */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            or{' '}
            <span className="text-ginger font-medium cursor-pointer" onClick={() => navigate('/auth/signup')}>
              create an account
            </span>
          </p>
          <div className="w-10 h-0.5 bg-black mt-4"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mt-8 border border-gray-300 bg-white">
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

            {/* Password */}
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                }}
                render={({ field }) => (
                  <Input
                    label="Password"
                    type="password"
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

          {/* CTA */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Logging in</span>
                </div>
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
