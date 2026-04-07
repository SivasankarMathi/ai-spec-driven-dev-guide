import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validation';
import AuthCard from './AuthCard';
import FormGroup from '../ui/FormGroup';
import Button from '../ui/Button';
import styles from './auth.module.css';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    const newErrors = { name: nameErr, email: emailErr, password: passErr, confirmPassword: confirmErr };
    setErrors(newErrors);

    if (nameErr || emailErr || passErr || confirmErr) return;

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate('/onboarding');
    } else {
      setErrors({ ...newErrors, email: result.error || 'Registration failed' });
    }
  };

  return (
    <AuthCard title="Create A New Account">
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <FormGroup
          label="Name"
          name="name"
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder="Enter name"
        />
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
          label="Create Password"
          name="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder="Enter password"
          isPassword
        />
        <FormGroup
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
          placeholder="Enter password"
          isPassword
        />
        <Button type="submit" variant="primary" loading={loading}>
          Sign up
        </Button>
      </form>

      <div className={styles.authCard__footer}>
        <p>
          Already have an account?{' '}
          <Link to="/auth/signin" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
