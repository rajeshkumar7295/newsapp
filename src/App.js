
import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
const App=() => {
   const [progress, setProgress] = useState(0)

    return (
      <>
        <Router>
          <LoadingBar
            color='#f01405'
            progress={progress}
            
          />
          <Navbar />

          <Routes>
            <Route exact path='/' element={
              <News  setProgress= {setProgress} key="general" pageSize={5} category="general" />

            } ></Route>
            <Route exact path='/business' element={
              <News  setProgress= {setProgress} key="business" pageSize={5} category="business" />

            } ></Route>
            <Route exact path='/entertainment' element={
              <News  setProgress= {setProgress} key="entertainment" pageSize={5} category="entertainment" />

            } ></Route>
            <Route exact path='/general' element={
              <News  setProgress= {setProgress} key="general" pageSize={5} category="general" />

            } ></Route>
            <Route exact path='/health' element={
              <News  setProgress= {setProgress} key="health" pageSize={5} category="health" />

            } ></Route>

            <Route exact path='/science' element={
              <News  setProgress= {setProgress} key="science " pageSize={5} category="science" />

            } >

            </Route>
            <Route exact path='/sports' element={
              <News  setProgress= {setProgress} key="sports" pageSize={5} category="sports" />

            } ></Route>
            <Route exact path='/technology' element={
              <News  setProgress= {setProgress} key="technology" pageSize={5} category="technology" />

            } >

            </Route>
          </Routes>
        </Router>

      </>
    )
  }

export default App;
