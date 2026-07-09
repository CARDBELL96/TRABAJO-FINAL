import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "TaskFlow | Registrarse";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(nombre, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta.');
    }
  };

  return (
    <div className="login-wrapper"> {/* Reutiliza la clase del login para centrado */}
      <div className="card login-card"> {/* Reutiliza la clase de card para el estilo */}
        <h1>Crear Cuenta</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleRegister} className="form" style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ width: '100%' }}>
            Registrarse
          </button>
        </form>
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;