import { observer } from 'mobx-react-lite';
import { Col, Button, FormControl } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import TextareaField from '../TextareaField';
import DateTooltip from './DateTooltip';
import { notesStore } from '../../store';
import { Note as NoteType, NoteFormValues } from '../../types';

type propTypes = {
  note: NoteType;
};

const Note = observer((props: propTypes) => {
  const { note } = props;
  const { id, title, body, createdAt, updatedAt } = note;
  const initialValues: NoteFormValues = {
    title: title || '',
    body: body,
  };

  const handleDelete = (): void => notesStore.remove(id);

  const onSubmit = (values: NoteFormValues): void => {
    const editedNote: NoteType = {
      id, createdAt,
      ...values,
      updatedAt: new Date(),
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

          {updatedAt
            ? <DateTooltip date={updatedAt} subDate={createdAt} />
            : <DateTooltip date={createdAt} />
          }

          <Button variant='primary' type='submit'>Update</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Form>
      </Formik>
    </Col >
  );
});

export default Note;