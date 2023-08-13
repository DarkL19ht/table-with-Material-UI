import * as React from "react";
import { Form, Formik, useFormik } from "formik";
import basicSchema from "../schemas";
import axios from "../../src/axiosinstance";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleApiError } from "../errorHandling";
import toastr from "toastr";




const DataForm = ({ isEdit, singleUser }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.populate.value);

    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        setError(null);

        try {
            const timeout = 5000; // 10 seconds
            const response = await axios.post("/products", values, { timeout });

            if (response && response.status === 200) {
                toastr.success("Registration successful", "Success");
            } else {
                toastr.error("An error occurred", "Error");
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const updateTable = async (values, id= singleUser.id) => {
        setError(null);

        try {
            const timeout = 5000; // 10 seconds
            const response = await axios.put(`/products/${id}`, values, {
                timeout
            });

            if (response && response.status === 200) {
                toastr.success("Update successful", "Success");
            } else {
                toastr.error("An error occurred", "Error");
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    // console.log({ singleUser });
    //   console.log({ singleUser });
    // console.log({ productList });
  

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
        onSubmit: isEdit ? updateTable : onSubmit
    });

    return (
        <Formik>
            <Form onSubmit={handleSubmit} autoComplete="off">
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
                    type="number"
                    placeholder={
                        isEdit
                            ? productList[0][singleUser.id - 1].price
                            : "Enter your Price"
                    }
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
                    className={
                        errors.image && touched.image ? "input-error" : ""
                    }
                />
                {errors.image && touched.image && (
                    <p className="error">{errors.image}</p>
                )}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={() => {
                        if (isEdit) {
                            updateTable(singleUser.id - 1);
                        }
                    }}
                >
                    {isEdit ? "Update" : "Submit"}
                </button>
            </Form>
        </Formik>
    );
};
export default DataForm;
