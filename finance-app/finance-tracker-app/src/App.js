import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutWithHeader from './components/Layout/LayoutWithHeader';
import Home from './components/Layout/Home';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/create-concert" element={<CreateConcert />} />
        <Route path="/list-concert" element={<ListConcert />} />
      </Routes>
    </div>
  );
}

export default App;
