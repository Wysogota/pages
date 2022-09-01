import { observer } from 'mobx-react-lite';
import { Col, Button, FormControl, ButtonGroup } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import cx from 'classnames';
import TextareaField from '../TextareaField';
import DateTooltip from './DateTooltip';
import { notesStore } from '../../store';
import { Note as NoteType, NoteFormValues } from '../../types';
import styles from './Note.module.scss';

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

  const noteClasses: string = cx(styles.note, 'p-3 rounded-2');
  const titleClasses: string = cx(styles.input, 'mb-2');
  const bodyClasses: string = cx(styles.body, styles.input, 'mb-1');

  return (
    <Col as='article' sm={6} md={4} lg={3} className='p-2'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className={noteClasses}>
          <FormControl as={Field} name='title' placeholder='Enter title' className={titleClasses} />
          <FormControl as={TextareaField} name='body' className={bodyClasses} />

          {updatedAt
            ? <DateTooltip date={updatedAt} subDate={createdAt} />
            : <DateTooltip date={createdAt} />
          }

          <ButtonGroup className='w-100 pt-3'>
            <Button variant='warning' type='submit'>Update</Button>
            <Button variant='danger' onClick={handleDelete}>Delete</Button>
          </ButtonGroup>

        </Form>
      </Formik>
    </Col>
  );
});

export default Note;