import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Card, Stack } from '@mui/material';
import ContainerHeader from '../ContainerHeader';
import { useNavigate } from 'react-router-dom';

function NotifcationItem({icon, title, timeStamp}){
    const navigate = useNavigate()
    return(
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <i class={`fa-solid ${icon} fa-md`}></i>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={timeStamp}/>
      </ListItem>
    )
}

export default function TodayNotifications({todayNotifications}) {

    function formatTimestamp(isoTimestamp) {
        const date = new Date(isoTimestamp);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "PM" : "AM";
    
        return `${hours}:${minutes} ${ampm} ${year}-${month}-${day}`;
    }
    
  return (
    <Card sx={{padding : '1rem', width : '100%'}} variant='outlined'>
        <ContainerHeader icon="fa-calendar" heading="Notifications" button={{text : "See All", Click : () =>{}}}/>
    
    {todayNotifications.length > 0 ? 
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

      {todayNotifications.map(item => 
        <NotifcationItem icon={item.icon} title={item.notification} timeStamp={formatTimestamp(item.created_at)} />
      )}
    </List>
    :
    
      <Stack alignItems={'center'} sx={{padding : "64px 32px", gap : '16px'}}>
        <div style={{height : '64px', color : 'var(--mui-palette-primary-mainChannel)'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-2h2v-7q0-.825.213-1.625T6.85 6.85l1.5 1.5q-.175.4-.262.813T8 10v7h6.2L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4l-3.65-3.6zm14-3.85l-2-2V10q0-1.65-1.175-2.825T12 6q-.65 0-1.25.2t-1.1.6L8.2 5.35q.5-.4 1.075-.7T10.5 4.2v-.7q0-.625.437-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10zM12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m.825-12.025"/></svg>
        </div>
        <p style={{color : 'var(--mui-palette-text-secondary)'}}>
        No Notifications
        </p>
      </Stack>
  }
    </Card>
  );
}
