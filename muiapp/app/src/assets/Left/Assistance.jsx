import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from '@mui/material';

// Assistance Component
const Assistance = ({session}) => {
  const [messages, setMessages] = useState([
    
  ]);
  const [input, setInput] = useState('');

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (input.trim()) {

      const formData = new FormData();
      formData.append('request', input);
      setMessages(messages => [...messages, {text : input, sender : "user"}])
      setInput('');
      if(session && session.accessToken){
        fetch('http://localhost:8000/api/assistant/chat/', {
          headers : {
              "Authorization" : `Bearer ${session.accessToken}`,
          },
          method : 'post',
          body : formData
      }).then(res => res.json()).then(data => {
        setMessages(messages => [...messages, {text : data.response, sender : "bot"}])
      })
      }
      // Simulate bot response (you can replace this with an API call)
    
    }
  };

  useEffect(() => {
    if(session && session.accessToken){
      fetch('http://localhost:8000/api/assistant/chat/', {
        headers : {
            "Authorization" : `Bearer ${session.accessToken}`,
        },
      }).then(res => res.json()).then(data => {
        data.forEach(item =>{
          setMessages(messages => [...messages, {text : item.request, sender : "user"}, {text : item.response, sender : "bot"}])
          
        })


      })
    }
    
  },[session])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position : 'relative'
    }}>
      

      <Box sx={{
        flex: 1,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor : 'transparent',
        boxShadow: 3,
      }}>
        <Stack padding={'1rem'} spacing={2} direction="column-reverse">
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                backgroundColor: message.sender === 'user' ? '#3f51b5' : '#e0e0e0',
                color: message.sender === 'user' ? 'white' : 'black',
                padding: 1,
                borderRadius: 1,
               
              }}
            >
              <Typography>{message.text}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

    
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        backgroundColor : 'transparent',

        position: 'sticky',
        bottom : '1rem',
        width : '100%',     
        paddingX : '7%'   
        
      }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          sx={{
            marginRight: 1,
            backgroundColor : 'black'
            
          }}
        />
        <IconButton
          color="white"
          onClick={handleSendMessage}
          disabled={!input.trim()}
          sx={{           
            backgroundColor : "var(--theme-primary)"
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Assistance;
