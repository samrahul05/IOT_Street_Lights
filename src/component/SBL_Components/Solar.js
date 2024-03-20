


import React, {useContext,} from 'react';
import { Stack, Card, CardMedia, Typography } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import solar from '../images/solar.png';

//useCmponent import
import DataContext from '../UseContext/DataContext';

function Solar({ filteredData }) {

const{handleClickOpen,customStyles}=useContext(DataContext)

  

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 200, backgroundColor: 'rgb(92,129,122,0.6)', padding: '10px' }} onClick={handleClickOpen}>
        <Stack direction="row" spacing={5} justifyContent="space-evenly" alignItems="center" sx={{ marginTop: '10px' }}>
          <CardMedia
            component="img"
            image={solar}
            alt="Solar Panel"
            sx={{ width: 100, height: 100 }}
          />
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={filteredData.length > 0 ? filteredData[0].field2 : 'N/A'}
              text={`${filteredData.length > 0 ? filteredData[0].field2 : 'N/A'}%`}
              background
              backgroundPadding={6}
              styles={customStyles}
            />
          </div>
        </Stack>
        <Stack justifyContent="center" alignItems="center" sx={{ height: '80px' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            Solar Status
          </Typography>
        </Stack>
      </Card>

    </>
  );
}

export default Solar;

