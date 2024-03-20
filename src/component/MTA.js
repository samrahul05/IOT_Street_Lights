import React, { useEffect, useState,useContext } from 'react';
import { Stack, Box, Container } from '@mui/material';
import { getUsers} from '../service/api';
import 'react-circular-progressbar/dist/styles.css';
import {apiKey,apiUrl,} from './Api'
import './MTA.css';
import axios from 'axios';
import Timer from '../component/Modes_Components/Timer';
import Modes from '../component/Modes_Components/Modes'
import OnOff from '../component/Modes_Components/OnoffSwitch';
import Automation from '../component/Modes_Components/Automation'
import DataProvider from './UseContext/DataContext';

function MTA() {

  const [users, setUsers] = useState([]);
  const [thingspeaks, setThingspeaks] = useState([]);
  const [userStatus, setUserStatus] = useState({}); 
  const [toggle,setToggle ] = useState(false);
  const {Mode} =useContext(DataProvider) ;
  

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, thingspeaksResponse] = await Promise.all([
        getUsers(),
        axios.get("https://api.thingspeak.com/channels/2429034/feeds.json?api_key=FIS83WOQZLWPNBVG&results"),
      ]);

      setUsers(usersResponse.data);
      
      setThingspeaks(thingspeaksResponse.data.feeds);
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postDataToThingSpeak = async (data) => {
    console.log(data); 
    try {
      const response = await fetch(`${apiUrl}?api_key=${apiKey}&field6=${data}`, {
        method: 'POST'

      });
      if (!response.ok) {
        throw new Error('Failed to post data to ThingSpeak');
      }
      console.log('Data posted successfully to ThingSpeak');
    } catch (error) {
      console.error('Error posting data to ThingSpeak:', error.message);
      
      setTimeout(() => {
     
        postDataToThingSpeak(data);
      }, 5000);
    }
    const value = data === 0;
    setToggle(value);
  }

   
    

  return (
    <>
     <Stack >
      <Box >
        <>
          <>
            {users.map((user, index) => {
              const latestFeedMap = new Map();
              thingspeaks.forEach((item) => {
                if (item.field1 === user.DeviceId) {
                  latestFeedMap.set(user.DeviceId, {
                    id: user.DeviceId,
                    field2: item.field2,
                    field3: item.field3,
                    field4: item.field4
                  });
                }
              });
             
            

              return (
  <Container>

 <Stack direction={'row'} spacing={6} justifyContent="space-evenly"  alignItems="center" sx={{backgroundColor: 'rgb(92,129,122,0.6)' ,padding:"10px"}} >
 
  
     <Modes/>

     <Box  sx={{
       
         width:'200px',
         alignItems:'center',
        
     }}>
     
            

            {Mode === 0 && (<OnOff/>)}
      
    {Mode == 1 && (<Timer/>)}


    {Mode == 2 && (<Automation/>)}


 </Box>
 </Stack>
  </Container>
              );
            })}
          </>
        </>
      </Box>
    </Stack>
    </>
   
  );
}

export default MTA
