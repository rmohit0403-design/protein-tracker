
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";




import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIAssistant from "./components/AIAssistant";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        
<Dashboard
  user={user}
  setUser={setUser}
/>


      )}
        <AIAssistant />
      <ToastContainer position="top-right" />
     
    </>
  );
}

export default App;

