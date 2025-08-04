'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/auth');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to the Dashboard, {user.name.first}!
      </h1>
      <div className={styles.userCard}>
        <div className={styles.avatarPlaceholder} />
        <div className={styles.userInfo}>
          <h2>
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p>Phone: {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;