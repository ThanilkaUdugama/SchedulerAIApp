import { Stack, Avatar, Typography, Box, Button } from "@mui/material";
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

import { useParams} from 'react-router-dom';
import Timeline from "./TaskWidgets/Timeline";
import Roadmap from "./TaskWidgets/Roadmap";

  



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
          field: 'task',
          headerName: 'Task',
          align : 'center',
          headerAlign : 'center',
          flex : 1
        },
        {
          field: 'startDate',
          headerName: 'Start Date',
          align : 'center',
          headerAlign : 'center',
          flex : 1
        },

        {
            field: 'endDate',
            headerName: 'End Date',
            align : 'center',
          headerAlign : 'center',
          flex : 1
            
          },
        {
          field: 'progress',
          headerName: 'Progress',
          align : 'center',
          headerAlign : 'center',
          flex : 1,
          renderCell : (params) =>{
            return `${params.value.toFixed(2)}%`
          }
        },

        {
            field: 'remaining',
            headerName: 'Remaining',
            align : 'center',
          headerAlign : 'center',
            flex : 1
          },
      ];


export default function Task({session}){
  const { id } = useParams(); 
  const [data, setData] = useState([])
  

  useEffect(() =>{
          if(session && session.accessToken){
              fetch(`http://localhost:8000/api/tasks/${id}/`, {
                  headers : {
                      "Authorization" : `Bearer ${session.accessToken}`
                  }
              }).then(res => res.json()).then(data => {
                  if(!data.success) navigate('/tasks/')
                  setData(data.data)

                  console.log(data)
              })
          }
      },[session])

    return (
      <>
      <Roadmap data = {data} />
        <Timeline data = {data} />
        

      </>
    )

  }