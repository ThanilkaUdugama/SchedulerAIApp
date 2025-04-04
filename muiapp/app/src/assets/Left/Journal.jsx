import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

const Journal = ({ session }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredRecord, setFilteredRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [trigger, setTrigger] = useState(false)

  // Your API base URL
  const API_BASE_URL = 'http://localhost:8000/api/assistant/journal';


  useEffect(() =>{
    setTrigger(trigger => !trigger)
  },[session])

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTrigger(trigger => !trigger)
  };

  const fetchRecord = async (formattedDate) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${formattedDate.split('-').join('/')}/`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${session.accessToken}`, // You might need to modify how you get the access token
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.record) {
          setFilteredRecord(data);
          setIsUpdating(true);
        } else {
          setFilteredRecord(null);
          setIsUpdating(false);
        }
      } else {
        setFilteredRecord(null);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error('Error fetching record:', error);
      setFilteredRecord(null);
    }
  };

  const handleOpenDialog = () => {
    setNewContent(filteredRecord ? filteredRecord.record : '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewContent('');
  };

  const handleSave = async () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const payload = {
      date: formattedDate,
      record: newContent,
    };

    try {
      let response;
      if (isUpdating) {
        // Update existing record
        response = await fetch(`${API_BASE_URL}/`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        
      } else {
        // Create new record
        response = await fetch(`${API_BASE_URL}/`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setTrigger(trigger => !trigger)
        }
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Something went wrong');
    }
  };

  useEffect(() =>{
    if(session && session.accessToken){
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchRecord(formattedDate);
    }
    
  },[trigger, session])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select a Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ marginBottom: 2 }}
        />
      </LocalizationProvider>

      {filteredRecord ? (
        <Paper sx={{ padding: 2, width: '60%' }}>
          <Typography variant="h6" gutterBottom>
            
          </Typography>
          <Typography>{filteredRecord.record}</Typography>
          <Button variant="outlined" onClick={handleOpenDialog} sx={{ marginTop: 2 }}>
            Edit Journal
          </Button>
        </Paper>
      ) : (
        <Typography>No journal entry found for this date.</Typography>
      )}

      <Button variant="contained" onClick={handleOpenDialog} sx={{ marginTop: 2 }}>
        Create Journal Entry
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isUpdating ? 'Update Journal' : 'Create Journal'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            fullWidth
            rows={4}
            label="Journal Content"
            variant="outlined"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {isUpdating ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Journal;
