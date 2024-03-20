import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import {apiKey,apiUrl} from '../Api'
import {  Stack } from '@mui/material';

function Timer() {
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  

  const onStart = async (value) => {
    try {
      
      console.log(value)
      const response = await fetch(`${apiUrl}?api_key=${apiKey}&field6=${value}`, {method: 'POST'});
      
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  

  
  const onEnd = async (value) => {
    try {
      
      console.log(value)
      const response = await fetch(`${apiUrl}?api_key=${apiKey}&field6=${value}`, {method: 'POST'});
    // console.log(response)
    } catch (err) {
      console.error(err);
    }
  };
  const date = new Date();
  const Hr = date.getHours().toString().padStart(2, '0');
  const Min = date.getMinutes().toString().padStart(2, '0');
  
  const currentTime = `${Hr}:${Min}`;
  // const start= "14:48"
  // const end= "14:49"
  if (currentTime === startTime) {
    onStart(1);
  }
  if (currentTime === endTime) {
    onEnd(0);
  }
 

 
  return (
    <Stack justifyContent="center"  alignItems="center"  sx={{ borderRadius:'20px', height:'200px',width:'250px'}}>
      <TextField
        type="time"
        id="Start_Time"
        label="Start-Time"
        InputLabelProps={{ shrink: true }}
        // variant="outlined"
        sx={{width:"200px",marginBottom:'20px',borderRadius:'20px',border:'5px'}}
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        format="L HH:mm"
        
      />
         
        <TextField
          type="time"
          label="End_Time"
          InputLabelProps={{ shrink: true }}
          // variant="outlined"
          sx={{ width:"200px",borderRadius:'20px',border:'10px'}}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          format="L HH:mm"
        />
      
    </Stack>
  );
}

export default Timer;