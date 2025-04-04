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
import Section from "./TaskContentComponents/Section";

  


export default function TaskContent({session}){
  const { Id } = useParams(); 
  const [data, setData] = useState([])
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')

  function changeStatus(){
    if(session && session.accessToken){
      fetch(`http://localhost:8000/api/tasks/schedules/${Id}/status/`, {
          headers : {
              "Authorization" : `Bearer ${session.accessToken}`
          },
      }).then(res => res.json()).then(data => {
          setStatus(data.status)
          
      })
  }
  }

  

  useEffect(() =>{
          if(session && session.accessToken){
              fetch(`http://localhost:8000/api/tasks/schedules/${Id}/`, {
                  headers : {
                      "Authorization" : `Bearer ${session.accessToken}`
                  }
              }).then(res => res.json()).then(data => {
                  
                  setData(JSON.parse(data.content))
                  setStatus(data.status)
                  setTitle(data.title)
                  
              })
          }
      },[session])

    return (
      <Stack padding={"32px"}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <div></div>
        <h2 style={{fontWeight : 600,}}>{title}</h2>
        {status && <Button  sx ={{width : 'fit-content', height : 'fit-content'}} variant="contained" onClick={changeStatus}>{status == "remaining" ? "Completed" : "Remaining"}</Button>}
        </Stack>
        <div>
        {data.map((section, index) => <Section id={Id} section={section} index={index} session={session} />)}
        </div>
           
      </Stack>
    )

  }