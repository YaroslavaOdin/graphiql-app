import * as Yup from 'yup';

export const validationSchemaRegister = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

export type validationSchemaTypeRegister = Yup.InferType<typeof validationSchemaRegister>;

export type validationSchemaTypeSignIn = Yup.InferType<typeof validationSchemaSignIn>;
