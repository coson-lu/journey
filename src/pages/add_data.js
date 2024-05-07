import '../css/add.css';
import { Typography, Box, TextField, Stack, ThemeProvider, createTheme, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



export function Add() {
  const [activity, setActivity] = useState('')
  const [time, setTime] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(activity, time)
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleSubmit(event);
      }
    };
  }, []);
	return (
		<>
      {/* Text Boxes */}
      <ThemeProvider theme={ darkTheme }>
        <CssBaseline />
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack direction='row' spacing={ 2 }>
                <TextField
                  label="Activity"
                  variant="outlined"
                  color='primary'
                  autoFocus={ true }
                  onChange={(e) => setActivity(e.target.value)}
                  sx={{
                    minWidth:'70rem'
                  }}
                  className='text-field'
                ></TextField>
                <TextField
                  label="Time"
                  variant="outlined"
                  color='primary'
                  onChange={(e) => setTime(e.target.value)}
                  className='text-field'
                ></TextField>
                <Button variant="outlined" endIcon={<SendIcon />} className='text-field' type='submit'>Enter</Button>
            </Stack>
          </form>
        </Box>
      </ThemeProvider>
		</>
	)
}