import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Insert from './components/Insert';
import List from './components/List';

const App = () => {
  return (
    <>
    <Header />
    <Container className='mt-5'>
      <Insert />
      <List />
    </Container>
    </>
  );
};

export default App;
