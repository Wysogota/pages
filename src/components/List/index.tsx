import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';
import Note from '../Note';
import { notesStore } from '../../store';

const List = observer(() => {

  if (notesStore.isFetching)
    return (<div>Loading...</div>);

  return (
    <Row as='section'>
      {notesStore.notes
        .slice().sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
        .reverse()
        .map((note) =>
          <Note key={note.id} note={note} />
        )}
    </Row>
  );
});

export default List;
