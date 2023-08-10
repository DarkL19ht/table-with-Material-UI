import * as yup from 'yup';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.

const basicSchema = yup.object().shape({
  firstName: yup.string().min(2).required('Required'),
  age: yup.number().positive().integer().required('Required'),
  lastName: yup.string().min(2).required('Required'),
  occupation: yup.string().required('Required'),
  stateOfOrigin: yup.string().required('Required'),
});

export default basicSchema;
