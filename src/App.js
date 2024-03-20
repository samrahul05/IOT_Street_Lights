
import { Box } from '@mui/material';
import './App.css'
import AddUser from './component/AddUser';
import AllUsers from './component/AllUsers';

import {BrowserRouter,Route,Routes} from 'react-router-dom'

// sx={{backgroundColor:'rgb(92,129,122,0.6)'}}


function App() {
  return (
    <Box className="App">
        <BrowserRouter>
        
          <Routes>
            <Route path='/' element={ <AllUsers/> }/>
            <Route path='/adduser' element={ <AddUser/>  }/>     
          </Routes>
        </BrowserRouter>             
     </Box>
  );
}

export default App;
