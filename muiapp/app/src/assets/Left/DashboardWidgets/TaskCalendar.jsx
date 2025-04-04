import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Card, Stack } from '@mui/material';
import ContainerHeader from '../ContainerHeader';
import { useNavigate } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';
import dayjs from 'dayjs';
import { CSSPlugin } from 'gsap/all';
import { useState } from "react";
import {Autocomplete, InputAdornment, TextField, Box} from '@mui/material';
import { Icon } from '@iconify/react';

gsap.registerPlugin(CSSPlugin)



export default function TaskCalendar({session}) {
  const date = new Date()
  const [selectedMonth, setSelectedMonth] = React.useState(date.getMonth() + 1)
  const [selecetdYear, setSelectedYear] =  React.useState(date.getFullYear())
  const [tasks, setTasks] = useState([])
  const [task , setTask] = useState({})
 
  const [taskCalendar, setTaskCalendar] = useState([])
  const colorCodes = {
    'complete' : '#82CE9D',
    'incomplete' : '#FF9F8C',
    'remaining' : '#aba4f7'
  }


  useEffect(() =>{
    if(session && session.accessToken){
      fetch(`http://localhost:8000/api/tasks/`, {
        headers : {
            "Authorization" : `Bearer ${session.accessToken}`
        }
      }).then(res => res.json()).then(data => {
          setTasks(data.data.map(item => ({label : item.task, value : item.id, icon : item.icon})))
          
          
      })
    }
  },[session])

  useEffect(() =>{
    if(tasks.length > 0){
      setTask(tasks[0])
    }
  }, [tasks])


  useEffect(() =>{
    if(!task){
      setTask(tasks[0])
    }
  }, [task])



  useEffect(() =>{
    
    if(session && session.accessToken && task){
      if(tasks.length > 0){
        fetch(`http://localhost:8000/api/tasks/schedules/calendar/${task.value}/${selecetdYear}/${selectedMonth}/`, {
          headers : {
              "Authorization" : `Bearer ${session.accessToken}`
          }
        }).then(res => res.json()).then(data => {
            setTaskCalendar(data)
        })
  
        fetch(`http://localhost:8000/api/tasks/schedules/calendar/${task.value}/${selecetdYear}/${selectedMonth}/`, {
          headers : {
              "Authorization" : `Bearer ${session.accessToken}`
          }
        }).then(res => res.json()).then(data => {
            setTaskCalendar(data)
        })
      }
      

      

      
    }
   
  },[selecetdYear, selectedMonth, session, task])

  useEffect(() =>{
    if(!document.querySelector('.MuiDayCalendar-monthContainer')) return
    const days = [...document.querySelector('.MuiDayCalendar-monthContainer').querySelectorAll('button.MuiPickersDay-root')]
    gsap.set(days, {backgroundColor : 'transparent', color : 'var(--mui-palette-text-disabled)'})
    taskCalendar.forEach(item =>{
      gsap.set(days[item.index - 1], {backgroundColor : colorCodes[item.status], color : 'black', cursor : 'not-allowed'} )
    })
    
  
  },[taskCalendar])


  

  return (
    <Card sx={{ padding: '1rem' }} variant="outlined">
      <ContainerHeader icon="fa-calendar" heading="Task Calendar" button={{ text: "See All", Click: () => {} }} />

      {tasks.length > 0 ? 

      <>
      <Autocomplete
      disableClearable
  disablePortal
  sx={{padding : '2rem 0'}}
  options={tasks}
  value = {task}
  onChange={(e, newValue) => {
    setTask(newValue)
  }}

  getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <li {...props}>
          <Box display="flex" gap={'1rem'} alignItems="center">
            <Icon icon={option.icon} width="32" height="32" />
            {option.label}
          </Box>
        </li>
      )}
   
  renderInput={(params) => <TextField slotProps={{
    input: {
      ...params.InputProps,
      startAdornment: <InputAdornment position="start"></InputAdornment>,
    },
  }} {...params} label="Task"></TextField>}
/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 

        shouldDisableDate={() => true}
        sx={{
          height : '83vh',
          width: '90%',
          '& .MuiDayCalendar-weekContainer': {
              justifyContent : 'space-around',
          },

          '& .MuiDayCalendar-header': {
              justifyContent : 'space-around'
          },

          

          
        }}
        onYearChange={
          (date) => {
            setSelectedYear(date.year())
            setSelectedMonth(date.month()+1)
          } 
        }

        onMonthChange={(date) => {
          setSelectedYear(date.year())
          setSelectedMonth(date.month()+1)
        } }
        
       
         
          
        />
      </LocalizationProvider>
      </>

      :
     <Stack alignItems={'center'} sx={{padding : "64px 32px", gap : '16px'}}>
       <div style={{height : '64px', color : 'var(--mui-palette-primary-mainChannel)'}}>
       <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a9 9 0 0 0-9 9v11l3-3l3 3l3-3l3 3l3-3l3 3V11a9 9 0 0 0-9-9m7 15.17l-1-1l-1.41 1.42L15 19.17l-1.59-1.58L12 16.17l-1.41 1.42L9 19.17l-1.59-1.58L6 16.17l-1 1V11c0-3.86 3.14-7 7-7s7 3.14 7 7zM11 10c0 1.11-.89 2-2 2s-2-.89-2-2s.9-2 2-2s2 .9 2 2m6 0c0 1.11-.89 2-2 2s-2-.89-2-2s.9-2 2-2s2 .9 2 2"/></svg>
       </div>
       <p style={{color : 'var(--mui-palette-text-secondary)'}}>
       No Tasks Created
       </p>
     </Stack>

}
    </Card>
  );
}
