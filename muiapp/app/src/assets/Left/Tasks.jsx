import { Stack, Avatar, Typography, Box, Button, Skeleton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react"
import ContainerHeader from "./ContainerHeader";
import TaskCalendar from "./DashboardWidgets/TaskCalendar";
import SpeedDial from '@mui/material/SpeedDial';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TaskDialog from "./AddTaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Icon } from '@iconify/react';


import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
  } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";



  

export default function Tasks({session}){
    const [tasks, setTasks] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [trigger, setTrigger] = useState(false)

    const navigate = useNavigate()

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{padding : '16px', justifyContent : 'space-between'}}>
            <Stack spacing={2} direction={'row'}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
          </Stack>
          <Button onClick={() => setFormOpen(true)} startIcon={<AddIcon />} variant="contained" sx={{justifySelf : 'end'}}>ADD TASK</Button>
        </GridToolbarContainer>
    
      );


    useEffect(() =>{
      console.log('trgids')
        if(session && session.accessToken){
            fetch('http://localhost:8000/api/tasks/', {
                headers : {
                    "Authorization" : `Bearer ${session.accessToken}`
                }
            }).then(res => res.json()).then(data => {
                
                setTasks(data.data)
                setReload(data.reload)
            })
        }
    },[session, trigger]);

    useEffect(() => {
      const interval = setInterval(() => {
        console.log(reload)
        if (reload) {
          if(reload == false) clearInterval(interval);
          setTrigger(tr => !tr);
        }
      }, 3000);
  
      
      return () => clearInterval(interval);
    }, [reload]);
   

    const columns = [
        // {
        //   field: 'icon',
        //   headerName: '',
        //   align : 'center',
        //   headerAlign : 'center',
        //   justifyContent : 'center',
        //   renderCell : (params) =>{
            
        //     return params.value !== undefined ? <div style={{display : 'flex', alignItems : 'center', height : '100%', justifyContent : 'center'}}><Icon icon={params.value} width="32" height="32" /></div> : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        //   }
        // },
        {
          field: 'task',
          headerName: 'Task',
          align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (params) =>{
            return params.value ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          }
        },
        {
          field: 'startDate',
          headerName: 'Start Date',
          align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (params) =>{
            return params.value ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          }
        },

        {
            field: 'endDate',
            headerName: 'End Date',
            align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (params) =>{
            return params.value ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          }
            
          },
        {
          field: 'progress',
          headerName: 'Progress',
          align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (params) =>{
            return params.value !== undefined ?  `${params.value.toFixed(2)}%` : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          }
        },

        {
            field: 'remaining',
            headerName: 'Remaining',
            align : 'center',
          headerAlign : 'center',
            flex : 1,
            renderCell : (params) =>{
              return params.value ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            }
          },
      ];
      
      

    return (
        <>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TaskDialog session={session} formOpen={formOpen} onClose={() => setFormOpen(false)}  />
        </LocalizationProvider>
        <Stack sx={{padding : '32px'}} spacing={'32px'}>
           <Stack direction={'row'} alignItems={'center'} spacing={'16px'} textTransform={'uppercase'}>
            <Avatar sx={{height : '2rem', width : '2rem', backgroundColor : '#7C71F1', color : '#fff'}}>
            
            <i class={`fa-solid fa-home fa-xs`}></i>
            </Avatar>
            <Typography>Tasks</Typography>
            </Stack>


        <Box sx={{width: '100%' }}>
      <DataGrid
        rows={tasks}
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
        density="comfortable"
        disableRowSelectionOnClick
      />
    </Box>
        </Stack>

<SpeedDial
ariaLabel="SpeedDial basic example"
sx={{ position: 'absolute', bottom: '32px', right: '32px' }}
onClick={() => setFormOpen(true)}
icon={<AddIcon/>}
>

</SpeedDial>
</>
    )
}