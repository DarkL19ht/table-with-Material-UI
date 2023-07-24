import * as React from 'react';
import {Button, AppBar, CssBaseline, Toolbar, Container} from '@mui/material';
import logo from "../src/assets/logo.png";
import "./App.css"
import {useDispatch, useSelector } from 'react-redux';
import {handleClose } from './redux/counter';
import DataTable from "./components/Table"
import AddMember from "./components/Add"
                    

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <img 
            src={logo} 
            alt='logo' 
            className='etranzact'
          />
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="m" sx={{m: "auto"}} >
            <AddMember />
            <DataTable />
          </Container>
        </div>
      </main>
    </>
  )
}

export default App
