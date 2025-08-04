import LoginForm from '@/components/auth/LoginForm';
import styles from './page.module.scss';

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;