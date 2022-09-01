import { observer } from 'mobx-react-lite';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
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
      createdAt: new Date(),
    };

    notesStore.insert(note);
    formikBag.resetForm();
  };

  const containerClasses: string = cx(styles.container, 'p-3 rounded-2');
  const titleContainerClasses: string = cx(styles.input_container, 'mb-3');
  const titleClasses: string = cx(styles.input, 'shadow-none');
  const bodyContainerClasses: string = cx(styles.input_container, 'pb-4 mb-2 p-relative');
  const bodyClasses: string = cx(styles.body, styles.input, 'shadow-none');

  return (
    <Row className='mb-5'>
      <Col md={8} className='m-auto'>
        <Formik
          initialValues={initialValues}
          validationSchema={INSERT_NOTE_SCHEMA}
          onSubmit={onSubmit}
        >
          <Form className={containerClasses}>
            <InputGroup className={titleContainerClasses}>
              <InputGroup.Text className={styles.label}>Title</InputGroup.Text>
              <FormControl as={Field} name='title' className={titleClasses} />
            </InputGroup>
            <InputGroup className={bodyContainerClasses}>
              <InputGroup.Text className={styles.label}>Body</InputGroup.Text>
              <FormControl as={TextareaField} name='body' className={bodyClasses} />
              <ErrorMessage name='body' component='span' className={styles.error} />
            </InputGroup>
            <Button variant='warning' className='w-100' type='submit'>Submit</Button>
          </Form>
        </Formik>
      </Col>
    </Row>
  );
});

export default Insert;
