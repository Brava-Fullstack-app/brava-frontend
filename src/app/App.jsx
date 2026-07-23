import { useState } from 'react';
import Input from '../shared/components/atoms/Input/Input';

export default function App() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="tu@email.com"
        icon="bi-envelope"
        clearable
        onClear={() => setFormData({ ...formData, email: '' })}
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="1234Brava"
        icon="bi-lock"
        helperText="Mínimo 6 carácteres"
        clearable
        onClear={() => setFormData({ ...formData, password: '' })}
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
  );
}