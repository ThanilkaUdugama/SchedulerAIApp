import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
  InputAdornment,
  Autocomplete,
  Box,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const colorOptions = [
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Yellow', value: '#FFFF00' },
    { label: 'Purple', value: '#800080' },
    { label: 'Orange', value: '#FFA500' },
    { label: 'Pink', value: '#FFC0CB' },
    { label: 'Brown', value: '#A52A2A' },
    { label: 'Black', value: '#000000' },
    { label: 'White', value: '#FFFFFF' },
  ];


export default function TaskDialog({ formOpen, onClose, session }) {
  const navigate = useNavigate()
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [themeColor, setThemeColor] = useState(colorOptions[0]);
  const [allocatedTime, setAllocatedTime] = useState({
    Monday: { checked: false, start: "00:00", end: "00:00" },
    Tuesday: { checked: false, start: "00:00", end: "00:00" },
    Wednesday: { checked: false, start: "00:00", end: "00:00" },
    Thursday: { checked: false, start: "00:00", end: "00:00" },
    Friday: { checked: false, start: "00:00", end: "00:00" },
  });

  const [errors, setErrors] = useState({})

  const today = new Date();

  useEffect(() =>{
       setTaskDescription("")
       setDeadline(null)
       setStartDate(null)
       setThemeColor(colorOptions[0])
       setAllocatedTime({
        Monday: { checked: false, start: "00:00", end: "00:00" },
        Tuesday: { checked: false, start: "00:00", end: "00:00" },
        Wednesday: { checked: false, start: "00:00", end: "00:00" },
        Thursday: { checked: false, start: "00:00", end: "00:00" },
        Friday: { checked: false, start: "00:00", end: "00:00" },
      })
  },[formOpen])

  const handleCheckboxChange = (day) => {
    setAllocatedTime((prev) => ({
      ...prev,
      [day]: { ...prev[day], checked: !prev[day].checked },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAllocatedTime((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSubmit = () => {
    const start_date = new Date(startDate).toISOString().split('T')[0]
    const end_date = new Date(deadline).toISOString().split('T')[0]
    const data = {
        prompt : taskDescription,
        start_date : start_date,
        end_date : end_date,
        theme_color : themeColor.value,
        allocated_time : allocatedTime
    }

    fetch('http://localhost:8000/api/tasks/jobs/', {
        method: 'POST', // The HTTP method
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(data), // Convert the data to a JSON string
    })
        .then(response => {
            if (response.ok) {
                onClose();
                navigate('/tasks/')
                return
            }
            response.json().then(data => setErrors(data));
            
        })
        
    
        
    // console.log({ taskDescription, startDate, deadline, themeColor, allocatedTime });
    
  };

  return (
    <Dialog open={formOpen} onClose={onClose} sx={{ "& .MuiDialog-paper": { overflowX : 'hidden', width : '100vw'} }}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent sx={{overflowX : 'hidden'}} dividers>
        <Stack spacing={2}>
        <TextField
          label="Task Description"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={taskDescription}
          helperText={errors.prompt}
          error={errors.prompt}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          fullWidth
          helperText={errors.start_date}
          error={errors.start_date}
          renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
          shouldDisableDate={(date) => date < today}
        />
        
        <DatePicker
          label="Deadline"
          value={deadline}
          disabled={startDate == null}
          onChange={(newValue) => setDeadline(newValue)}
          fullWidth
          shouldDisableDate={(date) => date <= startDate}
          helperText={errors.end_date}
          error={errors.end_date}
          renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
        />
        
        <Autocomplete
      value={themeColor}
      onChange={(_, newValue) => setThemeColor(newValue)}
      options={colorOptions}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Select Color" />}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Color Circle */}
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: option.value,
                border: '1px solid #ccc',
              }}
            />
            {/* Color Name */}
            <Typography>{option.label}</Typography>
          </Stack>
        </li>
      )}
    />


        <h4>Allocated Time</h4>
        <p style={{color : 'var(--mui-palette-error-main)', fontSize : '0.75rem'}}>{errors.allocated_time}</p>
        <Stack spacing={0.1}>
        {Object.keys(allocatedTime).map((day) => (
          <Grid container spacing={2} alignItems="center" key={day}>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allocatedTime[day].checked}
                    onChange={() => handleCheckboxChange(day)}
                    
                  />
                }
                label={day}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="time"
                label="Start Time"
                error = {errors.allocated_time}
                disabled={!allocatedTime[day].checked}
                value={allocatedTime[day].start}
                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                fullWidth
                
                
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="time"
                label="End Time"
                error={errors.allocated_time}
                disabled={!allocatedTime[day].checked}
                value={allocatedTime[day].end}
                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        </Stack>

</Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
