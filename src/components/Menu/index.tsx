import { observer } from 'mobx-react-lite';
import { Dropdown } from 'react-bootstrap';
import { notesStore } from '../../store';

const Menu = observer(() => {

  const handleClear = (): void => notesStore.clear();
  const handleFetch = (): void => notesStore.fetch();

  return (
    <Dropdown className='text-end mt-2 mb-2'>
      <Dropdown.Toggle variant='outline-warning'>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu variant='dark'>
        <Dropdown.Item onClick={handleClear}>Clear notes</Dropdown.Item>
        <Dropdown.Item onClick={handleFetch}>Load test notes</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default Menu;
