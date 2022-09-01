import { Col, Container, Row } from 'react-bootstrap';
import Menu from '../Menu';
import styles from './Header.module.scss';

const Header = () => {

  return (
    <Container as='header' className={styles.header} fluid>
      <Row>
        <Col xs='2' className='m-auto'>
          <h1>Notes</h1>
        </Col>
        <Col xs='2' className='m-auto'>
          <Menu />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
