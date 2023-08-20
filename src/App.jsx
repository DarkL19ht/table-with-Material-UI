import * as React from "react";
import { AppBar, CssBaseline, Toolbar, Container } from "@mui/material";
import logo from "@/assets/logo.png";
import "./App.css";
import DataTable from "@/components/Table";

function App() {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <img src={logo} alt="logo" className="etranzact" />
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container maxWidth="m" sx={{ m: "auto" }}>
                        <DataTable />
                    </Container>
                </div>
            </main>
        </>
    );
}

export default App;
