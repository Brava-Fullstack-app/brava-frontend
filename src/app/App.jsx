import { useEffect } from 'react';
import { loginUser } from '../features/auth/services/authApi';

function App() {
  useEffect(() => {
  console.log('useEffect ejecutado');
  loginUser({ email: 'judy@test.com', password: '123456' })
    .then((data) => console.log('Login OK:', data))
    .catch((error) => console.error('Login FALLÓ:', error));
}, []);

  return (
    <div>
      <h1>Brava - Test de conexión</h1>
    </div>
  );
}

export default App;