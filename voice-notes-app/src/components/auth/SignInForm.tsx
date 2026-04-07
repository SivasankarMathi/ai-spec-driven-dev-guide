import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail } from '../../utils/validation';
import AuthCard from './AuthCard';
import FormGroup from '../ui/FormGroup';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import OAuthButtons from './OAuthButtons';
import styles from './auth.module.css';

export default function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = !password ? 'Password is required' : null;

    const newErrors = { email: emailErr, password: passErr };
    setErrors(newErrors);

    if (emailErr || passErr) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/home');
    } else {
      setErrors({ email: null, password: result.error || 'Login failed' });
    }
  };

  return (
    <AuthCard title="Sign In To Your Account">
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <FormGroup
          label="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder="Enter your email"
        />
        <FormGroup
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder="Enter password"
          isPassword
          link={{ text: 'Forgot password?', onClick: () => console.log('Forgot password clicked') }}
        />
        <Button type="submit" variant="primary" loading={loading}>
          Sign in
        </Button>
      </form>

      <div className={styles.authCard__footer}>
        <p>
          Don&apos;t have an account yet?{' '}
          <Link to="/auth/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>

      <Divider text="Or" />
      <OAuthButtons />
    </AuthCard>
  );
}
