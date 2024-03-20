
import React, {useContext} from 'react';
 import { Stack,Card,CardMedia,Typography} from '@mui/material';
 import { CircularProgressbar } from 'react-circular-progressbar';
 import 'react-circular-progressbar/dist/styles.css';
//  import lamp from './images/'
 import lamp from '../images/street-lamp.png';

 import DataContext from '../UseContext/DataContext';

 function Light_Intensity({filteredData}) {
  
  const {handleClickOpen1,customStyles}=useContext(DataContext)
  return (

    <>

    <Card sx={{maxWidth: 345,height:200, backgroundColor:'rgb(92,129,122,0.6)',padding:'10px'}} onClick={handleClickOpen1}>
    <Stack direction="row" spacing={5} justifyContent="space-around"  alignItems="center" sx={{marginTop:'10px'}}>
    <CardMedia
        component="img"
        image={lamp}
        alt="Paella dish"
        sx={{ width: 100, height: 100 }}
      />

      <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={filteredData.length > 0 ? filteredData[0].field4: 'N/A'}
        text={`${filteredData.length > 0 ? filteredData[0].field4: 'N/A'}%`}
         background
         backgroundPaddi
         styles={customStyles}
      />
      
      </div>
    </Stack>
    <Stack justifyContent="center"  alignItems="center" sx={{ height:'80px'}}>
    <Typography variant="h5" component="div" sx={{fontWeight:'bold',color:'white'}}>
         Light Intensity
    </Typography>
    </Stack>
    </Card>

 </>
  );
}


 export default Light_Intensity
