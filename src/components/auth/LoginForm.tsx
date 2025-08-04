'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormData } from '@/lib/validation';
import { fetchUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useState } from 'react';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: '09'
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const user = await fetchUser();
      login(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setApiError('Failed to login. Please try again.');
      setError('root', {
        type: 'manual',
        message: 'Login failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="Iranian Mobile Number"
        placeholder="09123456789"
        error={errors.phone?.message}
        {...register('phone')}
        autoComplete="tel-national"
        inputMode="numeric"
      />

      {apiError && (
        <p className={styles.apiError}>{apiError}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;