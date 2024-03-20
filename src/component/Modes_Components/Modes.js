import { Box } from '@mui/material'
import React,{useContext, useState} from 'react'
import {apiKey,apiUrl} from '../Api'
import DataProvider from '../UseContext/DataContext';

const Modes = () => {
  
  const {setMode} =useContext(DataProvider) ;


  const handleClose = async (value) => {
    
    setMode(value);

    const response = await fetch(`${apiUrl}?api_key=${apiKey}&field5=${value}`, {method: 'POST'});  
    console.log(response)    
    console.log("Mode Value", value);
  };




  return (
    <Box sx={{
   
      borderRadius:'10px',
       padding:'10px',
      
              }}>
  <div class="main">
        <div class="up">
          <button className="card1"  onClick={() => handleClose(0)} sx={{ fontWeight: 'bold',}}>
               <lord-icon
                 src="https://cdn.lordicon.com/mebvgwrs.json"
                 trigger="hover"
                 style={{width:"60px",height:"60px"}}>
               </lord-icon>
          </button>

          <button className="card2" onClick={() => handleClose(1)} sx={{fontWeight: 'bold',}}>
               <lord-icon
                  src="https://cdn.lordicon.com/lzgqzxrq.json"
                  trigger="hover"
                  style={{width:"60px",height:"60px"}}>
               </lord-icon>         
          </button> 
        </div>

        <div class="down">
          <button className="card3"  onClick={() => handleClose(2)} sx={{ fontWeight: 'bold', }}>
               <lord-icon
                  src="https://cdn.lordicon.com/emxcwxfr.json"
                  trigger="hover"
                  style={{width:"60px",height:"60px"}}>
               </lord-icon>
          </button>
       </div>
  </div>
     </Box>
  )
}

export default Modes
