import React,{useContext}from 'react';
import { Stack, Box,Card,Typography} from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BatteryGauge from 'react-battery-gauge';

import DataContext from '../UseContext/DataContext';


function Battery({ field3, filteredData }) {
 const {customStyles}=useContext(DataContext)

  return (
    <>
     <Stack>
      <Box>
        <>     
    <Card sx={{maxWidth: 345,height:200, backgroundColor:'rgb(92,129,122,0.6)',padding:'10px'}}>
    <Stack direction="row" spacing={5} justifyContent="space-around"  alignItems="center" sx={{marginTop:'10px'}}>
    <BatteryGauge value={filteredData.length > 0 ? filteredData[0].field3 : 'N/A'} animated='true ' size='100' orientation='vertical' />
      <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={filteredData.length > 0 ? filteredData[0].field3 : 'N/A'}
        text={`${filteredData.length > 0 ? filteredData[0].field3 : 'N/A'}%`}     
        background
        backgroundPadding={6}
        styles={customStyles}
      />
      </div>
    </Stack>
    <Stack justifyContent="center"  alignItems="center" sx={{ height:'80px'}}>
    <Typography variant="h5" component="div" sx={{fontWeight:'bold',color:'white'}}>
         Battery Level
    </Typography>
    </Stack>
    </Card>
          </>
      </Box>
    </Stack>
    </>
   
  );
}

export default  Battery
