import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulación de registro y login exitoso
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  const styles = {
    container: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
    formContainer: { padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    title: { textAlign: 'center', marginBottom: '1.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' },
    link: { textAlign: 'center', marginTop: '1rem' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Crear Cuenta en TaskFlow</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <input type="text" placeholder="Nombre completo" required style={styles.input} />
          <input type="email" placeholder="Correo electrónico" required style={styles.input} />
          <input type="password" placeholder="Contraseña" required style={styles.input} />
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
        <div style={styles.link}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;