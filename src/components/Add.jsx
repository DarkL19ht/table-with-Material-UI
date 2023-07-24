import * as React from 'react';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { handleOpen, handleClose } from '../redux/counter';
import {Button, AppBar, CssBaseline, Toolbar, Container} from '@mui/material';
import {useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import DataForm from "./DataForm"

import style from "../style/";


const boxSX = {
    "&:hover": {
      border: "1px solid lightblue",
      backgroundColor: '#00308F'
    },
  };

  
  
  
  function AddMember() {
    const { open } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    
    
    return (
      <div>
        <Button onClick={(e) => {
          e.preventDefault()
          dispatch(handleOpen())
          }} sx={{...boxSX ,bgcolor: "primary.main", color: "common.white", ml: "70%", mt: "5%", mb: "5%"}}>
          <AddIcon />
          New Member
        </Button>
        <Modal
          open={open}
          onClose={(e) => {
            // e.preventDefault()
            dispatch(handleClose())
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <DataForm />
            <Button onClick={(e) => {
              e.preventDefault()
              dispatch(handleClose()
              )}} sx={{ml: "80%"}}>Close </Button>
          </Box>
        </Modal>
      </div>
    );
  }

  export default AddMember