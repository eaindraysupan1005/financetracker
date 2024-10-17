// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  // You can fetch the username from an API or auth context later
  const username = 'JohnDoe';

  return (
    <div>
      <Navbar username={username} />
      {/* Other components go here */}
    </div>
  );
};

export default App;
