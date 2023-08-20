import * as React from "react";
import MUIDataTable from "mui-datatables";
import { Modal, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleOpen, handleClose } from "@/redux/counter";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import toastr from "toastr";
import { handlePopulate } from "@/redux/populate";
import axios from "@/axiosinstance";

import style from "../style/";
import DataForm from "./DataForm";

export default function DataTable() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [singleUser, setSingleUser] = useState({});
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { open } = useSelector((state) => state.counter);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/products");
            console.log({ response });
            if (response?.data) {
                setColumns(Object.keys(response.data[0]));
                setRecords(response.data);
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(columns);
    const setUpdate = () => {
        dispatch(handlePopulate(records));
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (records.length > 1) {
        setUpdate();
    }

    const deleteData = async (id) => {
        await axios.delete(`/products/${id}`);
    };

    const handleDelete = (title, id) => {
        Swal.fire({
            title: "You won't be able to revert this!",

            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter the title"
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.value == title && result.isConfirmed) {
                deleteData(id);
                fetchData();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else if (result.value != title && result.value) {
                toastr.error("Title doesn't match!", "Error");
            } else {
                toastr.error("Delete failed!", "Error");
            }
        });
    };

    // Updating single user

    const getSingleData = async (id) => {
        await axios
            .get(`/products/${id}`)
            .then((res) => setSingleUser(res.data));
    };

    const handleUpdate = async (id) => {
        await getSingleData(id);
        setIsEdit(true);
    };

    const productData = records.map((data) => {
        const result = [
            data.id,
            data.title,
            data.price,
            data.description,
            data.category,
            data.image,
            data.rating.rate
        ];

        return result;
    });

    const options = {
        filterType: "checkbox",
        filter: true,
        search: true,
        selectableRows: "multiple",
        responsive: "standard",
        customToolbar: () => {
            return (
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(handleOpen());
                        setIsEdit(false);
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    style={{
                        marginLeft: "70%",
                        marginTop: "5%",
                        marginBottom: "5%"
                    }}
                >
                    New Product
                </Button>
            );
        },
        customBodyRenderLite: (dataIndex, rowIndex) => {
            return {
                style: { textAlign: "right" } // Aligns all cells to center
            };
        }
    };

    if (isLoading) return <h2>Loading ....</h2>;

    const productColumns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            fontStyle: "italic",

                            marginLeft: "2.5%"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            name: "title",
            label: "TITLE",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            textAlign: "right",

                            margin: "auto"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            name: "price",
            label: "PRICE",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            textAlign: "right",

                            marginLeft: "15%"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            name: "description",
            label: "DESCRIPTION",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            textAlign: "left"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            name: "category",
            label: "CATEGORY",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            textAlign: "right",

                            marginLeft: "5%"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            name: "image",
            label: "IMAGE",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <img
                        src={value}
                        alt="Profile"
                        style={{
                            width: "50%",
                            height: "50%",
                            marginLeft: "17.5%"
                        }}
                    />
                )
            }
        },
        {
            name: "rating",
            label: "RATING",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <span
                        style={{
                            textAlign: "right",

                            marginLeft: "35%"
                        }}
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            // name: "actions",
            // label: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta) => {
                    const rowIndex = tableMeta.rowIndex;
                    const data = records[rowIndex];
                    return (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    dispatch(handleOpen());
                                    handleUpdate(data.id);
                                }}
                                style={{ fontSize: "10px", marginRight: "5%" }}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    handleDelete(data.title, data.id);
                                }}
                                style={{ fontSize: "10px" }}
                            >
                                <DeleteIcon />
                                Delete
                            </Button>
                        </div>
                    );
                }
            }
        }
    ];

    return (
        <>
            <div style={{ marginTop: "2.5%" }}>
                <Modal
                    open={open}
                    onClose={(e) => {
                        dispatch(handleClose());
                    }}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <DataForm isEdit={isEdit} singleUser={singleUser} />
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(handleClose());
                            }}
                            sx={{ ml: "80%" }}
                        >
                            Close{" "}
                        </Button>
                    </Box>
                </Modal>
            </div>

            <MUIDataTable
                title={"PRODUCT LIST"}
                data={productData}
                columns={productColumns}
                options={options}
            />
        </>
    );
}
