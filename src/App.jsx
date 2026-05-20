
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Dashboard user={user} />
      )}

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;

