import React from "react";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./component/Home";
import Tableview from "./component/Tableview";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/tableview" element={<Tableview/>}></Route>
    </Routes>
    </BrowserRouter>
  )
};

export default App;
