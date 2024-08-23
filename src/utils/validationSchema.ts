import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export type validationSchemaType = Yup.InferType<typeof validationSchema>
