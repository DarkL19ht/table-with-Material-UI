import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import basicSchema from "../schemas";
import axios from "../../src/axiosinstance";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen, handleClose } from "../redux/counter";
import * as yup from "yup";

import { handleApiError } from "../errorHandling";
import toastr from "toastr";

const DataForm = ({ isEdit, singleUser }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.populate.value);
    const [loading, setLoading] = useState(false);

    const _onSubmit = async (values) => {
        console.log("creating", values);
        setLoading(true);
        try {
            const timeout = 5000;
            const response = await axios.post("/products", values, { timeout });

            if (response && response.status === 200) {
                dispatch(handleClose());
                toastr.success("Registration successful", "Success");
            } else {
                dispatch(handleClose());
                toastr.error("Registration not successful", "Error");
            }
        } catch (error) {
            handleApiError(error);
            dispatch(handleClose());
            toastr.error("An error occurred", "Error");
        } finally {
            setLoading(false);
        }
    };

    const updateTable = async (values, id = singleUser.id) => {
        setLoading(true);

        try {
            const timeout = 5000;
            const response = await axios.put(`/products/${id}`, values, {
                timeout
            });

            if (response && response.status === 200) {
                dispatch(handleClose());
                toastr.success("Update successful", "Success");
            } else {
                dispatch(handleClose());
                toastr.error("An error occurred", "Error");
            }
        } catch (error) {
            handleApiError(error);
            dispatch(handleClose());
        }
    };

    if (loading) return <h2>Loading -----</h2>;

    return (
        <Formik
            initialValues={{
                title: "",
                price: "",
                description: "",
                category: "",
                image: ""
            }}
            validationSchema={yup.object().shape({
                title: yup.string().min(2).required("Required"),
                price: yup.number().positive().integer().required("Required"),
                image: yup.string().min(2).required("Required"),
                description: yup.string().required("Required"),
                category: yup.string().required("Required")
            })}
            onSubmit={(values, { setSubmitting }) => {
                isEdit ? updateTable() : _onSubmit();
                console.log({ values });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h2> {isEdit ? "Update" : "Create"} </h2>
                    <label htmlFor="=title">Title</label>
                    <Field
                        type="text"
                        name="title"
                        placeholder={
                            isEdit
                                ? productList[0][singleUser.id - 1].title
                                : "Enter your Title"
                        }
                    />
                    <ErrorMessage
                        className="error"
                        name="title"
                        component="div"
                    />

                    <label htmlFor="=price">Price</label>
                    <Field
                        type="number"
                        name="price"
                        placeholder={
                            isEdit
                                ? productList[0][singleUser.id - 1].price
                                : "Enter Price"
                        }
                    />
                    <ErrorMessage
                        className="error"
                        name="price"
                        component="div"
                    />

                    <label htmlFor="description">Description</label>
                    <Field
                        type="text"
                        name="description"
                        placeholder={
                            isEdit
                                ? productList[0][singleUser.id - 1].description
                                : "Enter Description"
                        }
                    />
                    <ErrorMessage
                        className="error"
                        name="description"
                        component="div"
                    />

                    <label htmlFor="=category">Category</label>
                    <Field
                        type="text"
                        name="category"
                        placeholder={
                            isEdit
                                ? productList[0][singleUser.id - 1].category
                                : "Enter category"
                        }
                    />
                    <ErrorMessage
                        className="error"
                        name="category"
                        component="div"
                    />

                    <label htmlFor="image">Image</label>
                    <Field
                        type="text"
                        name="image"
                        placeholder={
                            isEdit
                                ? productList[0][singleUser.id - 1].image
                                : "Image Url"
                        }
                    />
                    <ErrorMessage
                        className="error"
                        name="image"
                        component="div"
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isEdit ? "Update" : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>

       
    );
};
export default DataForm;
