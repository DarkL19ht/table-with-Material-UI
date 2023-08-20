import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.

const basicSchema = yup.object().shape({
    title: yup.string().min(2).required("Required"),
    rating: yup.number().positive().integer().required("Required"),
    price: yup.string().min(2).required("Required"),
    description: yup.string().required("Required"),
    category: yup.string().required("Required")
});

export default basicSchema;
