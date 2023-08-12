import * as React from "react";
// import TextField from '@mui/material/TextField';
// import {useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
// import {Button, AppBar, CssBaseline, Toolbar, Container} from '@mui/material';
// import Users from "../data/Users"
import { useFormik } from "formik";
import basicSchema from "../schemas";
import axios from "axios";
import { useState, useEffect } from "react";
import httpClient from "../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { handlePopulate, updateProduct } from "../redux/populate";

// const onSubmit = async (values, actions) => {
//   console.log(values)
//   console.log(actions)
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm()
// }

const DataForm = ({ isEdit, singleUser }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.populate.value);

    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        setError(null);
        const response = await HTTP.post("/products", values).catch((err) => {
            if (err && err.response)
                setError(err.response.data.messdescription);
        });

        console.log("Response: ", response);

        if (response && response.status === 201) {
            alert("Registration successful ...");
        } else {
            alert("eRROR");
        }
    };

    const updateTable = async (values, id) => {
        setError(null);
        const response = await HTTP.put(`/products/${id}`, values).catch((err) => {
            if (err && err.response)
                setError(err.response.data.messdescription);
        });

        console.log("Response: ", response);

        if (response && response.status === 200) {
            alert("Update successful ...");
        } else {
            alert("eRROR");
        }
    };

    console.log({ singleUser });
    console.log({ productList });
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
        initialValues: productList,
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
                placeholder={
                    isEdit
                        ? productList[0][singleUser.id - 1].title
                        : "Enter your Title"
                }
                className={errors.title && touched.title ? "input-error" : ""}
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
                placeholder={
                    isEdit
                        ? productList[0][singleUser.id - 1].price
                        : "Enter your Price"
                }
                className={errors.price && touched.price ? "input-error" : ""}
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
                type="text"
                placeholder={
                    isEdit
                        ? productList[0][singleUser.id - 1].description
                        : "Enter your Description"
                }
                className={
                    errors.description && touched.description
                        ? "input-error"
                        : ""
                }
            />
            {errors.description && touched.description && (
                <p className="error">{errors.description}</p>
            )}

            <label htmlFor="category">category</label>
            <input
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                id="category"
                type="text"
                placeholder={
                    isEdit
                        ? productList[0][singleUser.id - 1].category
                        : "Category"
                }
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
                placeholder={
                    isEdit
                        ? productList[0][singleUser.id - 1].image
                        : "Image Url"
                }
                className={errors.image && touched.image ? "input-error" : ""}
            />
            {errors.image && touched.image && (
                <p className="error">{errors.image}</p>
            )}
            <button
                disabled={isSubmitting}
                type="submit"
                onClick={() => {
                    if (isEdit) {
                        dispatch(
                            updateProduct({
                                id: user.id,
                                firstName: newFirstName
                            })
                        );
                    }
                }}
            >
                {isEdit ? "Update" : "Submit"}
            </button>
        </form>
    );
};
export default DataForm;
