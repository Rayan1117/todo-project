import './App.css';
import { useState } from 'react';

function App() {

  // States for Sign-In inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------------- SIGN-IN FETCH ----------------
  const handleSignIn = async () => {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();
    console.log(data);
    
    console.log(data.token);

    // store user info or token
    localStorage.setItem("token", JSON.stringify(data.token));
    document.location.href = "/home"
  };

  return (
    <div className="Todo-App">

      <div className='Card-1'>
        <h1>Sign-Up</h1>
        <input 
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input 
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSignIn}>Enter</button>
      </div>

    </div>
  );
}

export default App;
