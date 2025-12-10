import './App.css';

function App() {
  return (
    <div className="Todo-App">
      <div className='Card-1'>
      <h1>Sign-Up</h1>
      <input 
        type="text"
        placeholder="Enter email"
      />
      <br></br>
      <input 
        type="password"
        placeholder="Enter password"
      />
      <br></br>
    <button>Enter</button>
    </div>
    <div className='Card-2'>
      <h1>Sign-In</h1>
      <input 
        type="text"
        placeholder="Enter a email"
      />
       <br></br>
      <input 
        type="text"
        placeholder="Enter a username"
      />
       <br></br>
      <input 
        type="password"
        placeholder="Enter a password"
      />
       <br></br>
    <button>Enter</button>
    </div>
    </div>
  );
}

export default App;

