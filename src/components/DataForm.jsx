import * as React from "react";
// import TextField from '@mui/material/TextField';
// import {useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
// import {Button, AppBar, CssBaseline, Toolbar, Container} from '@mui/material';
// import Users from "../data/Users"
import { useFormik } from "formik";
import basicSchema from "../schemas";
import axios from "axios";
import { useState } from "react";
import httpClient from "../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { handlePopulate } from "../redux/populate";

// const onSubmit = async (values, actions) => {
//   console.log(values)
//   console.log(actions)
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm()
// }

const DataForm = ({ isEdit, singleUser }) => {
    const dispatch = useDispatch();
    const { firstName, lastName, age, occupation, stateOfOrigin } = useSelector(
        (state) => state.populate
    );
    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        setError(null);
        const response = await HTTP.post("/data", values).catch((err) => {
            if (err && err.response) setError(err.response.data.message);
        });

        console.log("Response: ", response);

        if (response && response.status === 201) {
            alert("Registration successful ...");
        } else {
            alert("eRROR");
        }
    };

    console.log({ singleUser });
    // const onSubmit = () => {
    //   axios.post("http://localhost:3001/register", {
    //     firstname,
    //     lastname,
    //       age,
    //       occupation,
    //       stateOfOrigin
    //   })
    // }

    // const [error, setError] = useState(null)
    // const onSubmit = async (values) => {

    //   setError(null)
    //   const response = await axios
    //     .post("http://localhost:3001/register", values)
    //     .catch((err) => {
    //       if(err && err.response) setError(err.response.data.message);
    //     })

    //     console.log("Response: ", response)

    //     if (response && response.status === 200){
    //       alert("Welcome ...")
    //     }else {
    //       alert("Unable to register")
    //     }
    // }

    const {
        values,
        errors,
        isSubmitting,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: singleUser,
        validationSchema: basicSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    console.log(firstName);
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h2> {isEdit ? "Update" : "Create"} </h2>

            <label htmlFor="firstName">Firstname</label>
            <input
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="firstName"
                type="text"
                placeholder="Enter your Firstname"
                className={
                    errors.firstName && touched.firstName ? "input-error" : ""
                }
            />
            {errors.firstName && touched.firstName && (
                <p className="error">{errors.firstName}</p>
            )}

            <label htmlFor="lastName">Lastname</label>
            <input
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="lastName"
                type="text"
                placeholder="Enter your lastname"
                className={
                    errors.lastName && touched.lastName ? "input-error" : ""
                }
            />
            {errors.lastName && touched.lastName && (
                <p className="error">{errors.lastName}</p>
            )}

            <label htmlFor="age">Age</label>
            <input
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                id="age"
                type="number"
                placeholder="Enter your age"
                className={errors.age && touched.age ? "input-error" : ""}
            />
            {errors.age && touched.age && <p className="error">{errors.age}</p>}

            <label htmlFor="occupation">Occupation</label>
            <input
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
                id="occupation"
                type="text"
                placeholder="Occupation"
                className={
                    errors.occupation && touched.occupation ? "input-error" : ""
                }
            />
            {errors.occupation && touched.occupation && (
                <p className="error">{errors.occupation}</p>
            )}

            <label htmlFor="stateOfOrigin">State of Origin</label>
            <input
                value={values.stateOfOrigin}
                onChange={handleChange}
                onBlur={handleBlur}
                id="stateOfOrigin"
                type="text"
                placeholder="State Of Origin"
                className={
                    errors.stateOfOrigin && touched.stateOfOrigin
                        ? "input-error"
                        : ""
                }
            />
            {errors.stateOfOrigin && touched.stateOfOrigin && (
                <p className="error">{errors.stateOfOrigin}</p>
            )}
            <button disabled={isSubmitting} type="submit">
                {isEdit ? "Update" : "Submit"}
            </button>
        </form>
    );
};
export default DataForm;
