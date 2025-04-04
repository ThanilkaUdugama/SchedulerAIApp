import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Card, Stack } from '@mui/material';
import ContainerHeader from '../ContainerHeader';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';



function TaskItem({icon, title, timePeriod, link}){
    const navigate = useNavigate()

  //   <ListItemAvatar>
  //   <Avatar>
  //   <Icon icon={icon} width="32" height="32" />
      
  //   </Avatar>
  // </ListItemAvatar>

    return(
        <ListItem>
        
        <ListItemText primary={title} secondary={timePeriod}/>
        <Button onClick={() => navigate(link)} sx={{borderRadius : '3rem'}} variant='contained'>Visit</Button>
      </ListItem>
    )
}

export default function TodayTasks({todayTasks}) {

    function convertTo12Hour(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = String(hours % 12 || 12).padStart(2, '0');
    
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
  return (
    <Card sx={{padding : '1rem'}} variant='outlined'>
        <ContainerHeader icon="fa-calendar" heading="Today Tasks" button={{text : "See All", Click : () =>{}}}/>
    
    {todayTasks.length > 0 ? 
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {todayTasks.map(item => 
        <TaskItem icon={item.icon} title={item.heading} timePeriod={`${convertTo12Hour(item.startTime)} - ${convertTo12Hour(item.endTime)}`} link={`/tasks/${item.task__id}/${item.id}/`} />
      )}      
    </List>
:
<Stack alignItems={'center'} sx={{padding : "64px 32px", gap : '16px'}}>
  <div style={{height : '64px', color : 'var(--mui-palette-primary-mainChannel)'}}>
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2q.425 0 .713.288T17 3v1.15q1.3.35 2.15 1.4T20 8v7.175q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V8q0-.825-.587-1.412T16 6H8.825l-1.25-1.275Q7.3 4.45 7.15 4.087T7 3.325V3q0-.425.288-.713T8 2h1q.425 0 .713.288T10 3v1h4V3q0-.425.288-.712T15 2zm-4 10l1.975 2H8.5q-.425 0-.712-.288T7.5 13t.288-.712T8.5 12zM5.175 5.175l1.4 1.4q-.275.275-.425.638T6 8v12h12v-1.975L20 20q0 .825-.587 1.413T18 22H6q-.825 0-1.412-.587T4 20V8q0-.825.313-1.55t.862-1.275m13.9 16.725L2.1 4.925q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L20.475 20.5q.275.275.287.688t-.287.712q-.275.275-.7.275t-.7-.275"/></svg>
  </div>
  <p style={{color : 'var(--mui-palette-text-secondary)'}}>
  No schedules for today
  </p>
</Stack>
}
    </Card>
  );
}
