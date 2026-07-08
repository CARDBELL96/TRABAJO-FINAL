import Card from '../components/Card';

const Dashboard = () => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
  };

  return (
    <div style={styles.grid}>
      <Card title="Proyectos Activos" value="12" />
      <Card title="Tareas Pendientes" value="54" />
      <Card title="Tareas Completadas (Semana)" value="23" />
      <Card title="Miembros del Equipo" value="8" />
    </div>
  );
};

export default Dashboard;