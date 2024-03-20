import React, { useEffect, useState,useContext } from 'react';
import { Stack, Box, Container } from '@mui/material';
import { getUsers} from '../service/api';
import {  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import Light from './images/02.jpg';
import {apiKey,apiUrl} from './Api'
import Solar from '../component/SBL_Components/Solar'
import Battery from '../component/SBL_Components/Battery'
import Light_intensity from '../component/SBL_Components/Light_Intensity'

import Mta from './MTA'


function AllUsers() {
  const [users, setUsers] = useState([]);
  const [thingspeaks, setThingspeaks] = useState([]);
  const [userStatus, setUserStatus] = useState({}); // State to keep track of each user's status
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [toggle,setToggle ] = useState(false);
  
  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, thingspeaksResponse] = await Promise.all([
        getUsers(),
        axios.get("https://api.thingspeak.com/channels/2429034/feeds.json?api_key=FIS83WOQZLWPNBVG&results"),
      ]);

      setUsers(usersResponse.data);
      // console.log(usersResponse.data);
      setThingspeaks(thingspeaksResponse.data.feeds);
      
      // console.log(thingspeaksResponse.data.feeds);
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
      // Retry mechanism: Retry posting data after a delay
      setTimeout(() => {
     
        postDataToThingSpeak(data);
      }, 5000); // Retry after 5 seconds
    }
     
    const value = data === 0;
    setToggle(value);
  }

    const customStyles = buildStyles({
     
      backgroundColor: 'transparent',
      textColor: "#fff", 
      pathColor: "#fff",
      trailColor: "transparent", 
      background: {
        fill: '#ccc',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 26,
        textshadow:'0px 0px 15px white'
      },
    });

    

  return (
    <Container sx={{  wieght:"100hv" , height: '100vh' }}>
     <Stack>
      <Box>
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

  const filteredData = Array.from(latestFeedMap.values());
  const userState = userStatus[user.DeviceId] || false;

  return (
    <Container key={index} sx={{maxWidth:'xl',height:"100vh"}}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{ height: '450px' }}
      >
        {/* For Solar_Status */}
        <Solar filteredData={filteredData} field2={user.field2} /> {/* Pass field2 from user object */}
        
        {/* For Battery_Status */}
        <Battery filteredData={filteredData} field2={user.field2} />

        {/* For Light_intensity */}
        <Light_intensity filteredData={filteredData} field4={user.field4} />
      </Stack>
      
      {/* MTA */}
      <Mta />
    </Container>
  );
})}

          </>
        </>
      </Box>
    </Stack>
    </Container>
   
  );
}

export default AllUsers
