import React,{createContext,useState,useEffect} from 'react'

// For Chart_Bar
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chart from 'react-apexcharts'

import {  buildStyles } from 'react-circular-progressbar';

const DataContext = createContext({})
export const DataProvider = ({children}) => {
//  import 


  
  
  const [Mode, setMode] = useState(null)
  const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
   
  };
  const handleCloses = () => {
    setOpen(false);
    setOpen1(false);
  };
  const handleClickOpen1=()=>{
     setOpen1(true);
  }
  
  const [options, setOptions] = useState({
    xaxis: {
      categories: [],                // X-Axis
    },
  });
  const [field2Data, setField2Data] = useState([]);  //y Axis 
  const [field4Data, setField4Data] = useState([]);
 

useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.thingspeak.com/channels/2445759/feeds.json?api_key=XFJE4OQF8R6ZPGNA&results");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();

      const field2Details = jsonData.feeds.map(value => value.field2);
      setField2Data(field2Details);


      const field4Details = jsonData.feeds.map(value => value.field4);
      setField4Data(field4Details);

    


      // Automatically generate categories based on data length
      const categories = Array.from({ length: field2Details.length }, (_, index) => index * 10);
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: categories,
        },
      }));
      
       // Automatically generate categories based on data length
     
       const categorie = Array.from({ length: field4Details.length }, (_, index) => index * 10);
       setOptions(prevOptions => ({
         ...prevOptions,
         xaxis: {
           ...prevOptions.xaxis,
           categorie: categorie,
         },
       }));
    
    } catch (error) {
      console.log(error)
    }
  };

  fetchData();
}, []);

const customStyles = buildStyles({
  backgroundColor: 'transparent',
  textColor: '#fff',
  pathColor: '#fff',
  trailColor: 'transparent',
  background: {
    fill: '#ccc',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    textshadow: '0px 0px 15px white',
  },
});

  return (
    <>
     {/* For Solar Status  */}
       
     <Dialog
        onClose={handleCloses}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Solar Status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloses}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Chart options={options} series={[{ data: field2Data }]} type="area" width={500} />
        </DialogContent>
      </Dialog>

      {/* For Light_INtensity  */}
     
      <Dialog
        onClose={handleCloses}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Light Intensity
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloses}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Chart options={options} series={[{ data: field4Data }]} type="area" width={500} />
        </DialogContent>
      </Dialog>

    <DataContext.Provider value={{Mode,setMode,handleClickOpen,handleCloses,handleClickOpen1,open,customStyles}}>
        {children}
    </DataContext.Provider>
    </>
  )
}

export default DataContext