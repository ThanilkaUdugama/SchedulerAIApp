import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Avatar, Box, ListItemText, Typography, Container } from '@mui/material';
import i18n from "i18n-iso-countries";
import k from 'i18n-iso-countries/langs/en.json';
import moment from 'moment-timezone';
import Flag from 'react-world-flags';

i18n.registerLocale(k);

function EditProfile({ session, setSessionTrigger }) {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    country: null,
    timezone: null,
    profile: null
  });

  const [countries, setCountries] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [viewMode, setViewMode] = useState(true); // Preview mode initially

  useEffect(() => {
    const allCountries = Object.keys(i18n.getNames('en')).map((code) => ({
      code,
      label: i18n.getName(code, 'en'),
    }));
    setCountries(allCountries);

    const allTimezones = moment.tz.names().map((tz) => ({
      label: tz,
    }));
    setTimezones(allTimezones);
  }, []);

  useEffect(() => {
    if (session && session.accessToken) {
      fetch('http://localhost:8000/api/accounts/profile/', {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setProfile({
            full_name: data.full_name || '',
            email: data.email || '',
            country: countries.find(c => c.label === data.country) || null,
            timezone: timezones.find(t => t.label === data.timezone) || null,
            profile: data.profile || null
          });
        })
        .catch(error => console.error('Error fetching user profile:', error));
    }
  }, [session, countries, timezones]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (_, value) => {
    setProfile(prev => ({ ...prev, country: value }));
  };

  const handleTimezoneChange = (_, value) => {
    setProfile(prev => ({ ...prev, timezone: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(prev => ({ ...prev, profile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', profile.full_name);
    formData.append('country', profile.country?.label || '');
    formData.append('timezone', profile.timezone?.label || '');
    if (profile.profile instanceof File) {
      formData.append('profile', profile.profile);
    }

    try {
      const response = await fetch('http://localhost:8000/api/accounts/change/1/', {
        method: 'PATCH',
        body: formData,
        headers: {
          "Authorization": `Bearer ${session.accessToken}`
        }
      });

      if (response.ok) {
        setSessionTrigger(trigger => !trigger);
        setViewMode(true); // Switch back to preview mode after save
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '2rem' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {/* Avatar and Profile Image */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={
              profile.profile instanceof File
                ? URL.createObjectURL(profile.profile)
                : profile.profile || ''
            }
            sx={{ width: 80, height: 80 }}
          />
          {!viewMode ? (
            <Button variant="contained" component="label">
              Change Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
          ) : null}
        </Box>

        {/* Full Name */}
        <TextField
          label="Full Name"
          name="full_name"
          value={profile.full_name}
          onChange={handleChange}
          fullWidth
          required
          disabled={viewMode}
        />

        {/* Email (non-editable) */}
        <TextField
          label="Email"
          value={profile.email}
          fullWidth
          disabled
        />

        {/* Country */}
        <Autocomplete
          value={profile.country}
          onChange={handleCountryChange}
          disableClearable
          options={countries}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          renderOption={(props, option) => (
            <li {...props}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  marginRight: 1,
                  overflow: 'hidden',
                  borderRadius: '50%',
                }}
              >
                <Flag code={option.code} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Avatar>
              <ListItemText primary={option.label} />
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="Country" fullWidth />}
          disabled={viewMode}
        />

        {/* Timezone */}
        <Autocomplete
          options={timezones}
          getOptionLabel={(option) => option.label}
          value={profile.timezone}
          onChange={handleTimezoneChange}
          renderInput={(params) => <TextField {...params} label="Timezone" />}
          disabled={viewMode}
        />

        {/* Edit and Save Buttons */}
        {viewMode ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setViewMode(false)}
          >
            Edit
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => setViewMode(true)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default EditProfile;
