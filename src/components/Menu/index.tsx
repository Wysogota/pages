import { Dropdown } from 'react-bootstrap';

const Menu = () => {

  return (
    <Dropdown className='text-end'>
      <Dropdown.Toggle variant='warning'>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu variant='dark'>
        <Dropdown.Item>Clear notes</Dropdown.Item>
        <Dropdown.Item>Load test notes</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Menu;
