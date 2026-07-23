import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../shared/components/atoms/Input/Input';
import Button from '../../../../shared/components/atoms/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import styles from './RegisterForm.module.scss';

function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/calendar');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        id="name"
        name="name"
        label="Nombre y apellidos"
        required
        type="text"
        icon="bi-person"
        placeholder="e.g.: Judy Mendoza Díaz"
        value={formData.name}
        onChange={handleChange}
        clearable
        onClear={() => setFormData((prev) => ({ ...prev, name: '' }))}
      />

      <Input
        id="email"
        name="email"
        label="Correo electrónico"
        required
        type="email"
        icon="bi-envelope"
        placeholder="judy@brava.com"
        value={formData.email}
        onChange={handleChange}
        clearable
        onClear={() => setFormData((prev) => ({ ...prev, email: '' }))}
      />

      <Input
        id="password"
        name="password"
        label="Nueva contraseña"
        required
        type="password"
        icon="bi-lock"
        placeholder="1234Brava"
        value={formData.password}
        onChange={handleChange}
        error={error}
        clearable
        onClear={() => setFormData((prev) => ({ ...prev, password: '' }))}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>
    </form>
  );
}

export default RegisterForm;