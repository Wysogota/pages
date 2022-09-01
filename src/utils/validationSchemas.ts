import * as yup from 'yup';

const TITLE_SCHEMA = yup.string();
const BODY_SCHEMA = yup.string().required();

export const INSERT_NOTE_SCHEMA = yup.object({
  title: TITLE_SCHEMA,
  body: BODY_SCHEMA,
});