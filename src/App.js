import React from "react";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import "./App.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token } = useAuth();

  return <>{token ? <HomePage /> : <Login />}</>;
}

export default App;
