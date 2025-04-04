import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Card, Typography, Box, Stack } from '@mui/material';
import ContainerHeader from '../ContainerHeader';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { Icon } from '@iconify/react';



function TaskProgressItem({icon, title, progress}){
{/* <ListItemAvatar>
      <Avatar>
          <Icon icon={icon} width="32" height="32" />
        </Avatar>
      </ListItemAvatar> */}
  
  return(
      <ListItem alignItems='center'>
      
      <Stack sx={{ width: '100%', padding : '5px'}} spacing={'12px'}>
      <ListItemText primary={title}/>
      
      <LinearProgress variant="determinate" value={progress} />
    </Stack>
      <Typography sx={{padding : '5px'}}>{`${progress.toFixed(2)}%`}</Typography>
    </ListItem>
  )
}

export default function TaskProgresses({taskProgress}) {

    
  return (
    <Card sx={{padding : '1rem', width : '100%'}} variant='outlined'>
        <ContainerHeader icon="fa-calendar" heading="Task Progress" button={{text : "See All", Click : () =>{}}}/>
       
          {taskProgress.length > 0 ?     <List sx={{ width: '100%', height : '83vh', overflowY : 'auto', bgcolor: 'background.paper' }}>
      {taskProgress.map(item => 
        <TaskProgressItem icon={item.icon} title={item.task} progress={item.progress} />
      )}
      
    </List>
   
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
