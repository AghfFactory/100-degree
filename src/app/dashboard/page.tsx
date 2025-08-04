'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Image from 'next/image';

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/auth');
  }, [user, router]);

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome, {user.name.title} {user.name.first} {user.name.last}!
      </h1>
      
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <Image
            src={user.picture.large}
            alt={`${user.name.first}'s profile picture`}
            width={150}
            height={150}
            className={styles.avatar}
            priority
          />
        </div>
        
        <div className={styles.userDetails}>
          <h2>Personal Information</h2>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email:</span>
            <span>{user.email}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Username:</span>
            <span>{user.login.username}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Cell:</span>
            <span>{user.cell}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date of Birth:</span>
            <span>{formatDate(user.dob.date)} (Age {user.dob.age})</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Member Since:</span>
            <span>{formatDate(user.registered.date)}</span>
          </div>
          
          <h2 className={styles.sectionTitle}>Location</h2>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Address:</span>
            <span>
              {user.location.street.number} {user.location.street.name},<br />
              {user.location.city}, {user.location.state}<br />
              {user.location.country}, {user.location.postcode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;