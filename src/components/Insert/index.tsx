import { observer } from 'mobx-react-lite';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuid } from 'uuid';
import { notesStore } from '../../store';
import TextareaField from '../TextareaField';
import { Note, NoteFormValues } from '../../types';
import styles from './Insert.module.scss';
import { INSERT_NOTE_SCHEMA } from '../../utils/validationSchemas';

const initialValues: NoteFormValues = {
  title: '',
  body: '',
};

const Insert = observer(() => {

  const onSubmit = (values: NoteFormValues, formikBag: any): void => {
    const note: Note = {
      ...values,
      id: uuid(),
      date: new Date(),
    };

    notesStore.insert(note);
    formikBag.resetForm();
  };

  return (
    <Row>
      <Col>
        <Formik
          initialValues={initialValues}
          validationSchema={INSERT_NOTE_SCHEMA}
          onSubmit={onSubmit}
        >
          <Form>
            <InputGroup className='mb-3'>
              <InputGroup.Text className={styles.label}>Title</InputGroup.Text>
              <FormControl as={Field} name='title' />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text className={styles.label}>Body</InputGroup.Text>
              <FormControl as={TextareaField} name='body' />
              <ErrorMessage name='body' component='span' />
            </InputGroup>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Formik>
      </Col>
    </Row>
  );
});

export default Insert;
