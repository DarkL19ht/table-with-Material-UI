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
import { handlePopulate } from "../redux/populate";

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
    const { firstName, lastName, age, occupation, stateOfOrigin } = useSelector(
        (state) => state.counter
    );
    const [error, setError] = useState(null);

    const { open } = useSelector((state) => state.counter);

    const fetchData = async () => {
        setError(null);
        const response = await axios.get("/data");

        // console.log("Response: ", response);
        // console.log("ResponseData: ", response.data);
        // console.log("ResponseDataIndex: ", response.data[0].firstName);
        // console.log(JSON.parse(response.data))

        if (response && response.status === 200) {
            setColumns(Object.keys(response.data[0]));
            setRecords(response.data);
        } else {
            alert("eRROR");
        }
    };

    useEffect(() => {
        fetchData(); // Call the async function from useEffect
    }, []);

    const deleteData = async (id) => {
        await axios.delete(`/data/${id}`);
        fetchData();
    };

    const handleDelete = (id) => {
        const conf = window.confirm("Do you want to delete");
        if (conf && records[records.length - 1].firstName) {
            deleteData(id);
        }
    };

    // Updating single user

    const getSingleData = async (id) => {
        axios.get(`/data/${id}`).then((res) => setSingleUser(res.data));
    };
    const handleUpdate = (id) => {
        getSingleData(id);
        setIsEdit(true);
    };

    return (
        <>
            <div>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(handleOpen());
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
                    New Member
                </Button>
                <Modal
                    open={open}
                    onClose={(e) => {
                        // e.preventDefault()
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

            <TableContainer component={Paper} sx={{ width: "70%", m: "auto" }}>
                <Table
                    sx={{
                        minWidth: "90%",
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
                            {/* <TableCell align="right">
                            lijknm
                        </TableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* {console.log(records[records.length - 1])} */}
                        {records.map((d, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                            >
                                {/* {console.log(d.firstName)} */}
                                <TableCell align="left">{d.id}</TableCell>
                                <TableCell>{d.firstName}</TableCell>
                                <TableCell>{d.lastName}</TableCell>
                                <TableCell>{d.age}</TableCell>
                                <TableCell>{d.occupation}</TableCell>
                                <TableCell>{d.stateOfOrigin}</TableCell>
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
                                        flexWrap: "nowrap"
                                    }}
                                >
                                    <Button
                                        direction="row"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(handleOpen());
                                            dispatch(handlePopulate(records));
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
                                        // onClick={(e) => {
                                        //     e.preventDefault();

                                        //     handleDelete(
                                        //         records.findIndex(
                                        //             (el) =>
                                        //                 el.firstName == d.firstName
                                        //         )
                                        //     );
                                        // }}
                                        onClick={() => handleDelete(d.id)}
                                        sx={{
                                            ...boxSX,
                                            bgcolor: "error.main",
                                            color: "common.white",
                                            pl: "7.5%",
                                            pr: "7.5%",
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
