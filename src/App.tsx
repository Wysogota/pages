import { Container } from 'react-bootstrap';
import Insert from './components/Insert';
import List from './components/List';

const App = () => {
  return (
    <Container>
      <h1>Notes</h1>
      <Insert />
      <List />
    </Container>
  );
};

export default App;
