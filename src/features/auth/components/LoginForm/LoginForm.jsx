import { useState } from 'react';
import Input from '../../../../shared/components/atoms/Input/Input';
import Button from '../../../../shared/components/atoms/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginForm.module.scss';

function LoginForm({ onSuccess, onError }) {
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email) {
      onError('Escribe el correo electrónico');
      return;
    }

    if (!formData.password) {
      onError('Escribe la contraseña');
      return;
    }

    try {
      await login(formData);
      onSuccess();
    } catch (err) {
      onError(err.response?.data?.message || 'Correo o contraseña incorrectos');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        id="email"
        name="email"
        label="Correo electrónico"
        required
        type="email"
        icon="bi-envelope"
        placeholder="nombre@gmail.com"
        value={formData.email}
        onChange={handleChange}
        clearable
        onClear={() => setFormData((prev) => ({ ...prev, email: '' }))}
      />

      <Input
        id="password"
        name="password"
        label="Contraseña"
        required
        type="password"
        icon="bi-lock"
        placeholder="1234Brava"
        value={formData.password}
        onChange={handleChange}
        clearable
        onClear={() => setFormData((prev) => ({ ...prev, password: '' }))}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}

export default LoginForm;