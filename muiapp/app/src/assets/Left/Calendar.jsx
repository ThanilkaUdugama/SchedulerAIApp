import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

const localizer = momentLocalizer(moment);


const Calendar = ({session}) => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month')
  const [viewDate, setViewDate] = useState(new Date());

  const theme = useTheme()

  useEffect(() =>{
    if(session && session.accessToken){
      fetch('http://localhost:8000/api/tasks/schedules/', {
        headers : {
            "Authorization" : `Bearer ${session.accessToken}`
        }
    }).then(res => res.json()).then(data => {
        setEvents(data.map(item => ({title : item.heading, color : item.task__taskjob__theme_color , start : new Date(...item.date.split('-').map((number, index) => index == 1 ? number - 1 : number), ...item.startTime.split(':')), end : new Date(...item.date.split('-').map((number, index) => index == 1 ? number - 1 : number), ...item.endTime.split(':'))})))
    })
    }

    
    
  },[session])


  useEffect(() =>{
    const element = document.querySelector('.rbc-calendar');
    if(theme.palette.mode == 'dark'){
        

        element.style.setProperty('--container-color', '#0a0a0a');
        element.style.setProperty('--border-color', '#1f1f1f');
        
    }
    else{
        
        element.style.setProperty('--container-color', '');
        element.style.setProperty('--border-color', '#ddd');
    }
    
    

  },[theme, view])



  useEffect(() => {
    setEvents([
      {
        start: new Date(),
        end: new Date(),
        title: 'Web Development',
      },
    ]);
  }, []);

  return (
    <Box sx={{height : '200vh', padding : '32px'
    }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
        onSelectEvent={event => alert(event.title)}
        onView={setView}
        view={view}
        date={viewDate}
        onNavigate={(date) => setViewDate(date)}
        

        eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
              color: 'white',
              borderRadius: '4px',
              padding: '5px',
            },
          })}

        style={{
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}


          
      />
    </Box>
  );
};

export default Calendar;



