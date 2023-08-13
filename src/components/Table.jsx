import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "../../src/axiosinstance";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleOpen, handleClose } from "../redux/counter";
import { useDispatch, useSelector } from "react-redux";
import { handlePopulate, updateProduct } from "../redux/populate";

import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import DataForm from "./DataForm";
import style from "../style/";

const boxSX = {
    "&:hover": {
        border: "1px solid lightblue",
        backgroundColor: "#00308F"
    }
};

export default function DataTable() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [singleUser, setSingleUser] = useState({});
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const [error, setError] = useState(null);

    const { open } = useSelector((state) => state.counter);

    const fetchData = async () => {
        setError(null);
        const response = await axios.get("/products");

        if (response && response.status === 200) {
            setColumns(Object.keys(response.data[0]));
            setRecords(response.data);
        } else {
            alert("eRROR");
        }
    };

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

    const handleDelete = (id) => {
        const conf = window.confirm("Do you want to delete");
        if (conf && records) {
            deleteData(id);
            fetchData();
        }
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

    return (
        <>
            <div>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(handleOpen());
                        setIsEdit(false);
                    }}
                    sx={{
                        ...boxSX,
                        bgcolor: "primary.main",
                        color: "common.white",
                        ml: "70%",
                        mt: "5%",
                        mb: "5%"
                    }}
                >
                    <AddIcon />
                    New Product
                </Button>
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

            <TableContainer component={Paper} sx={{ width: "90%", m: "auto" }}>
                <Table
                    sx={{
                        minWidth: "95%",
                        height: "50px",
                        width: "90%",
                        m: "auto"
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((c, i) => (
                                <TableCell key={i}>{c}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {records.map((d, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                                className="myTableCell"
                            >
                                <TableCell align="left">{d.id}</TableCell>
                                <TableCell>{d.title}</TableCell>
                                <TableCell>{d.price}</TableCell>
                                <TableCell>{d.description}</TableCell>
                                <TableCell>{d.category}</TableCell>
                                <TableCell>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 53,
                                            width: 35,
                                            maxHeight: { xs: 53, md: 50 },
                                            maxWidth: { xs: 35, md: 50 }
                                        }}
                                        alt="Product Image"
                                        src={d.image}
                                    />
                                </TableCell>
                                <TableCell>{d.rating.rate}</TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        p: 1,
                                        m: 1,
                                        bgcolor: "background.paper",
                                        borderRadius: 1,
                                        borderBottom: 0,
                                        flexWrap: "nowrap"
                                    }}
                                >
                                    <Button
                                        direction="row"
                                        onClick={() => {
                                            // setUpdate();
                                            dispatch(handleOpen());
                                            handleUpdate(d.id);
                                        }}
                                        sx={{
                                            ...boxSX,
                                            bgcolor: "primary.main",
                                            color: "common.white",
                                            pl: "10%",
                                            pr: "10%",
                                            mt: "5%",
                                            mb: "5%",
                                            mr: "5%",
                                            fontSize: "10px"
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleDelete(d.id);
                                        }}
                                        sx={{
                                            ...boxSX,
                                            bgcolor: "error.main",
                                            color: "common.white",
                                            pl: "7.5%",
                                            pr: "10.5%",
                                            mt: "5%",
                                            mb: "5%",
                                            fontSize: "10px"
                                        }}
                                    >
                                        <DeleteIcon />
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
