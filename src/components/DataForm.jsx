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
    // const { title, price, description, category, image } = useSelector(
    //     (state) => state.populate
    // );
    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        setError(null);
        const response = await HTTP.post("/products", values).catch((err) => {
            if (err && err.response) setError(err.response.data.messdescription);
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
    //     title,
    //     price,
    //       description,
    //       category,
    //       image
    //   })
    // }

    // const [error, setError] = useState(null)
    // const onSubmit = async (values) => {

    //   setError(null)
    //   const response = await axios
    //     .post("http://localhost:3001/register", values)
    //     .catch((err) => {
    //       if(err && err.response) setError(err.response.data.messdescription);
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

    
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h2> {isEdit ? "Update" : "Create"} </h2>

            <label htmlFor="=title">Title</label>
            <input
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                id="title"
                type="text"
                placeholder="Enter your Title"
                className={
                    errors.title && touched.title ? "input-error" : ""
                }
            />
            {errors.title && touched.title && (
                <p className="error">{errors.title}</p>
            )}

            <label htmlFor="price">Price</label>
            <input
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                id="price"
                type="text"
                placeholder="Enter your Price"
                className={
                    errors.price && touched.price ? "input-error" : ""
                }
            />
            {errors.price && touched.price && (
                <p className="error">{errors.price}</p>
            )}

            <label htmlFor="description">description</label>
            <input
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                id="description"
                type="number"
                placeholder="Enter your description"
                className={errors.description && touched.description ? "input-error" : ""}
            />
            {errors.description && touched.description && <p className="error">{errors.description}</p>}

            <label htmlFor="category">category</label>
            <input
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                id="category"
                type="text"
                placeholder="category"
                className={
                    errors.category && touched.category ? "input-error" : ""
                }
            />
            {errors.category && touched.category && (
                <p className="error">{errors.category}</p>
            )}

            <label htmlFor="image">Image</label>
            <input
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                id="image"
                type="text"
                placeholder="Image url "
                className={
                    errors.image && touched.image
                        ? "input-error"
                        : ""
                }
            />
            {errors.image && touched.image && (
                <p className="error">{errors.image}</p>
            )}
            <button disabled={isSubmitting} type="submit">
                {isEdit ? "Update" : "Submit"}
            </button>
        </form>
    );
};
export default DataForm;
