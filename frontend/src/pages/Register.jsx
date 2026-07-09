import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulación de registro y login exitoso
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleRegister} className="form" style={{width: '100%'}}>
          <input type="text" placeholder="Nombre completo" required />
          <input type="email" placeholder="Correo electrónico" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit" style={{width: '100%'}}>
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