import { Stack, Avatar, Typography, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import SpeedDial from '@mui/material/SpeedDial';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Chip from '@mui/material/Chip';


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



 

export default function Timeline({data}){

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
          field: 'date',
          headerName: 'Date',
          align : 'center',
          headerAlign : 'center',
          flex : 1
        },

        {
            field: 'heading',
            headerName: 'Session',
            align : 'center',
            headerAlign : 'center',
            flex : 1
          },

        {
            field: 'startTime',
            headerName: 'Start Time',
            align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell: (param) => {
            return formatTime(param.value)
          }
            
          },

          {
            field: 'endTime',
            headerName: 'End Time',
            align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell: (param) => {
            return formatTime(param.value)
          }
            
          },

        {
            field: 'status',
            headerName: 'Status',
            align : 'center',
          headerAlign : 'center',
            flex : 1,
            renderCell : (param) =>{
                return <Chip sx={{backgroundColor : getChipColor(param.value), color : '#fff', fontWeight : 500}} label={param.value.toUpperCase()} />
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
            <Typography>TIMELINE</Typography>
            </Stack>


        <Box sx={{ width: '100%' }}>
      <DataGrid
      density="comfortable"
        rows={data}
        columns={columns}
       
        onRowClick={(params) => {
            navigate(`/tasks/${params.row.id}/`)
        }}
        slots={{ toolbar: CustomToolbar }}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
        </Stack>


</>
    )
}