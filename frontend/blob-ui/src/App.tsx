import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, ConfigProvider } from "antd";
import Home from "./pages/Home/Home";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <Home />
    </ConfigProvider>
  );
}

export default App;
