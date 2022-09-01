import { observer } from 'mobx-react-lite';
import { Col, Button, FormControl } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { formatDistanceToNow } from 'date-fns';
import TextareaField from '../TextareaField';
import Tooltip from '../Tooltip';
import { notesStore } from '../../store';
import { Note as NoteType, NoteFormValues } from '../../types';

type NoteProps = {
  note: NoteType;
};

const Note = observer((props: NoteProps) => {
  const { note } = props;
  const { id, title, body, date } = note;

  const initialValues: NoteFormValues = {
    title: title || '',
    body: body,
  };

  const handleDelete = (): void => notesStore.remove(id);

  const onSubmit = (values: NoteFormValues): void => {
    const editedNote: NoteType = {
      id,
      ...values,
      date: new Date(),
    };
    notesStore.edit(editedNote);
  };

  return (
    <Col>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <FormControl as={Field} name='title' />
          <FormControl as={TextareaField} name='body' style={{ height: '10rem' }} />

          <Tooltip tooltip={date.toLocaleString()}>
            <time dateTime={date.toLocaleString()}>
              Created {formatDistanceToNow(date)} ago
            </time>
          </Tooltip>

          <Button variant='primary' type='submit'>Submit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Form>
      </Formik>

    </Col >
  );
});

export default Note;