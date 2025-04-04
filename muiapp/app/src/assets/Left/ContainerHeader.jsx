import { Box, Stack, Button, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';

export default function ContainerHeader({icon, heading, button}){
    return(
        <Stack direction={'row'} sx={{justifyContent : 'space-between', alignItems : 'center', marginBottom : '1rem'}}>
        <Stack direction={'row'} alignItems={'center'} spacing={'16px'} textTransform={'uppercase'}>
            <Avatar sx={{height : '2rem', width : '2rem', backgroundColor : '#7C71F1', color : '#fff'}}>
            <i class={`fa-solid ${icon} fa-xs`}></i>
            </Avatar>
            <Typography>{heading}</Typography>
        </Stack>
        <Button variant="outlined" onClick={button.Click} sx={{borderRadius : '2rem'}}>{button.text}</Button>
        </Stack>
    )
}


