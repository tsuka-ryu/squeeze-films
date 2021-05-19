// import HomePage from '../../feature/home/HomePage';
import NavBar from '../../feature/nav/NavBar';
// import FilmsDashboard from '../../feature/films/filmDashboard/FilmDashboard';
import FilmDetailedPage from '../../feature/films/filmDetailed/FilmDetailedPage';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#F7F6F5',
  },
  container: {
    marginTop: '20px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <NavBar />
      <Container maxWidth='lg' className={classes.container}>
        <FilmDetailedPage />
      </Container>
    </div>
  );
}
