import { Stack, Avatar, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import SpeedDial from '@mui/material/SpeedDial';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Chip from '@mui/material/Chip';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
  } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';


 

export default function Roadmap({data}){

  const navigate = useNavigate()

    function formatTime(time) {
        const date = new Date('1970-01-01T' + time + 'Z'); // Use a base date to parse the time
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
      }
    

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{padding : '16px', justifyContent : 'space-between'}}>
            <Stack spacing={2} direction={'row'}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
          </Stack>
        
        </GridToolbarContainer>
    
      );

      const getChipColor = (status) => {
        switch (status) {
          case "complete":
            return "rgba(130, 206, 157, 0.8)"; // #82CE9D
          case "incomplete":
            return "rgba(255, 159, 140, 0.8)"; // #FF9F8C
          default:
            return "rgba(124, 113, 241, 0.8)"; // #7C71F1
        }
      };
      

    const columns = [

      {
        field: 'index',
        headerName: '',
        align : 'center',
        headerAlign : 'center',
       
      },
      // {
      //   field: 'icon',
      //   headerName: '',
      //   align : 'center',
      //   headerAlign : 'center',
      //   renderCell : (params) =>{
      //     return <div style={{display : 'flex', alignItems : 'center', height : '100%', justifyContent : 'center'}}><Icon icon={params.value} width="32" height="32" /></div>
      //   }
      // },

      

      {
        field: 'heading',
        headerName: 'Session',
        align : 'center',
        headerAlign : 'center',
        flex : 1
      },
        
        {
          field: 'date',
          headerName: 'Date',
          align : 'center',
          headerAlign : 'center',
          flex : 1
        },


        {
          field: 'link',
          headerName: '',
          align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (param) =>{
            return <Button endIcon={<RemoveRedEyeIcon />} variant="contained" onClick={() => navigate(param.value)}>VIEW</Button>
          }
        },

        

        
      ];
      
      

    return (
        <>
         
        <Stack sx={{padding : '32px'}} spacing={'32px'}>
           <Stack direction={'row'} alignItems={'center'} spacing={'16px'} textTransform={'uppercase'}>
            <Avatar sx={{height : '2rem', width : '2rem', backgroundColor : '#7C71F1', color : '#fff'}}>
            <i class={`fa-solid fa-home fa-xs`}></i>
            </Avatar>
            <Typography>ROADMAP</Typography>
            </Stack>


        <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        density="comfortable"        
        slots={{ toolbar: CustomToolbar }}
        pageSize={2} 
        page={0} 
        rowsPerPageOptions={[2]}
        disableRowSelectionOnClick
      />
    </Box>
        </Stack>


</>
    )
}