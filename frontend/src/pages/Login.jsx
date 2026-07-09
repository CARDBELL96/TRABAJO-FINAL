import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('frank@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "TaskFlow | Iniciar sesión";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <form onSubmit={handleLogin} className="form" style={{width: '100%'}}>
          <h1>TaskFlow</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={{width: '100%'}}>Ingresar</button>

          <Link to="/register">Crear cuenta</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;