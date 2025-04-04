import { Box } from "@mui/material";
import TodayTasks from "./DashboardWidgets/TodayTasks";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid2';
import TaskProgresses from "./DashboardWidgets/TaskProgresses";
import TaskCalendar from "./DashboardWidgets/TaskCalendar";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import TodayNotifications from "./DashboardWidgets/Notfications";
import TaskDialog from "./AddTaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';



export default function Dashboard({session, setSession}){
    const [todayTasks, setTodayTasks] = useState([])
    const [taskProgress, setTaskProgress] = useState([])
    const [notifications, setNotifications] = useState([])
    const [formOpen, setFormOpen] = useState(false)
    const navigate = useNavigate()
    
   
    useEffect(() =>{
        const sessionTemp = localStorage.getItem('session')
        if(sessionTemp){
            setSession(JSON.parse(sessionTemp))
        }
        else{
            navigate('/signin/')
        }
    },[])
    
    

    useEffect(() =>{   
        console.log(session)     
            if(session && session.accessToken){
                fetch('http://localhost:8000/api/tasks/schedules/today/', {
                    headers : {
                        "Authorization" : `Bearer ${session.accessToken}`
                    }
                }).then(res => res.json()).then(data => {
                    setTodayTasks(data)
                })


                fetch('http://localhost:8000/api/tasks/progress/', {
                    headers : {
                        "Authorization" : `Bearer ${session.accessToken}`
                    }
                }).then(res => res.json()).then(data => {
                    setTaskProgress(data)
                })


                fetch('http://localhost:8000/api/accounts/notifications/', {
                    headers : {
                        "Authorization" : `Bearer ${session.accessToken}`
                    }
                }).then(res => res.json()).then(data => {
                    setNotifications(data)
                })    
            }
        
        
        
    },[session])

    return(
        <>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TaskDialog session={session} formOpen={formOpen} onClose={() => setFormOpen(false)}  />
        </LocalizationProvider>
        <Grid sx={{padding : '2rem'}} container spacing={2}>
            <Grid size={12}>
            <TodayTasks todayTasks={todayTasks} />
            </Grid>
            <Grid size={6} spacing={2} container>
                <TaskProgresses taskProgress = {taskProgress} />
                <TodayNotifications todayNotifications={notifications} />
            </Grid>
            <Grid size={6}>
                <TaskCalendar session={session} />
            </Grid>
            <Grid size={8}>
               
            </Grid>
        </Grid>

<SpeedDial
ariaLabel="SpeedDial basic example"
sx={{ position: 'absolute', bottom: '32px', right: '32px' }}
onClick={() => setFormOpen(true)}
icon={<AddIcon  />}
>

</SpeedDial>
</>
        
        
    )
}



