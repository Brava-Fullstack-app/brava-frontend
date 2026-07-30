import { render } from '@testing-library/react';
import { useContext } from 'react';
import { AuthProvider } from '../../store/AuthProvider';
import AuthContext from '../../store/AuthContext';

vi.mock('../../features/auth/services/authApi');

import { authApi } from '../../features/auth/services/authApi';

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('login persiste token y usuario en localStorage', async () => {
    authApi.login.mockResolvedValue({
      data: { token: 'abc123', name: 'Paciente', email: 'test@test.com' },
    });

    let loginRef;
    function TestComponent() {
      const auth = useContext(AuthContext);
      loginRef = auth.login;
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await loginRef({ email: 'test@test.com', password: '123456' });

    expect(localStorage.getItem('token')).toBe('abc123');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      name: 'Paciente',
      email: 'test@test.com',
    });
  });

  it('logout limpia localStorage y resetea el estado', () => {
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify({ name: 'Paciente', email: 'test@test.com' }));

    let logoutRef, tokenRef, userRef;
    function TestComponent() {
      const auth = useContext(AuthContext);
      logoutRef = auth.logout;
      tokenRef = auth.token;
      userRef = auth.user;
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(tokenRef).toBe('abc123');
    expect(userRef).toEqual({ name: 'Paciente', email: 'test@test.com' });

    logoutRef();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('recupera sesion desde localStorage al iniciar', () => {
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify({ name: 'Paciente', email: 'test@test.com' }));

    let tokenRef, userRef;
    function TestComponent() {
      const auth = useContext(AuthContext);
      tokenRef = auth.token;
      userRef = auth.user;
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(tokenRef).toBe('abc123');
    expect(userRef).toEqual({ name: 'Paciente', email: 'test@test.com' });
  });
});