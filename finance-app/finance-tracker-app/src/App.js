// import logo from './logo.svg';

// import { Route, Routes } from 'react-router-dom';
// import LayoutWithHeader from './components/Layout/LayoutWithHeader';
// import Home from './components/Layout/Home';

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
import './App.css';
import React from 'react';
import Navbar from './components/Common/Navbar';

const App = () => {
  const username = 'Eaindray Su Pan';

  return (
    <div className="App">
      <Navbar username={username}/>
       {/* <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/create-concert" element={<CreateConcert />} />
        <Route path="/list-concert" element={<ListConcert />} />
      </Routes> */}
    </div>
  );
};

export default App;
