import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/general.css';
import { Analytics } from './pages/analytics';
import { Add } from './pages/add_data';
import { Typography, AppBar, Toolbar, Stack, Button, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});



export default function App() {
  const theme1 = useTheme();
  return (
    <>
      <ThemeProvider theme={ darkTheme }>
        <CssBaseline />
        <AppBar sx={{
          bgcolor:'grey.900'
        }} enableColorOnDark={ true }>
          <Toolbar sx={{
            height:'80px'
          }}>
            <Typography
              variant='h4'
              component='div'
              color='primary'
              sx={{ flexGrow: 1 }}
              fontFamily={'Trebuchet MS'}
            >Journey</Typography>
            <Stack
              direction='row'
              spacing='4'
            >
              <Link to='/journey/'><Button
                color='primary'
                size='large'
                sx={{
                  minWidth:150,
                  fontSize:'20px',
                  minHeight:'5rem'
                }}
              >Add</Button></Link>
              <Link to='/journey/analytics'><Button 
                color='primary'
                size='large'
                sx={{
                  minWidth:150,
                  fontSize:'20px',
                  minHeight:'5rem'
                }}
              >Analytics</Button></Link>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      
      
      <div class='content'>
        <Routes>
          <Route path='/journey/' element={<Add />}></Route>
          <Route path='/journey/analytics' element={<Analytics />}></Route>
        </Routes>
      </div>
    </>
  )
}


