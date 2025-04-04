import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AppSignInPage from './components/SignIn';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/SignUp';
import Dashboard from './assets/Left/Dashboard';
import Logo from './assets/Logo.svg'
import Tasks from './assets/Left/Tasks';
import Task from './assets/Left/Task';
import Calendar from './assets/Left/Calendar';
import { useEffect } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskContent from './assets/Left/TaskContent';
import Assistance from './assets/Left/Assistance';
import Journal from './assets/Left/Journal';
import EditProfile from './assets/Left/EditProfile';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon } from '@iconify/react';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'DASHBOARD',
    icon: <DashboardIcon />,
    pattern: '/',
  },

  {
    segment: 'tasks/',
    title: 'TASKS',
    icon: <AssignmentIcon />,
    pattern: '/tasks/',
  },

  {
    segment: 'calendar/',
    title: 'CALENDAR',
    icon: <CalendarMonthIcon />,
  },

  {
    segment: 'chat/',
    title: 'CHAT',
    icon: <HeadsetMicIcon />,
  },

  {
    segment: 'diary/',
    title: 'DIARY',
    icon: <BookIcon />,
  },

  {
    segment: 'profile/',
    title: 'PROFILE',
    icon: <AccountCircleIcon />,
  },
  
];

const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#7C71F1', 
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#7C71F1',
          color : 'white',
          '&:hover': {
            backgroundColor: '#5A4CC2', 
          },
        },
      },
    },
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function Wrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


function App() {
  const [session, setSession] = useState({auth : false});
  const [sessionTrigger, setSessionTrigger] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() =>{
    if(session && session.accessToken){
      fetch('http://127.0.0.1:8000/api/accounts/1/',
        { headers : {
          "Authorization" : `Bearer ${session.accessToken}`
      }}
      ).then(res => res.json()).then(data =>{
        {

          const Session = {user : {
            "email" : data.email,
            "name" : data.full_name,
            "image" : data.profile,
          },
          "accessToken" : session.accessToken,
          "refreshToken" : session.refreshToken
        }
        localStorage.setItem('session', JSON.stringify(Session))
        setSession(Session)
    
        }
      });
    }    
  }, [sessionTrigger])


  React.useEffect(() =>{
    const sessionTemp = localStorage.getItem('session')
    if(sessionTemp){
        setSession(JSON.parse(sessionTemp))
    }
    else{
        navigate('/signin/')
    }
  },[])

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        navigate('/signin/')
        setSession(null);
      },
      signOut: () => {
        navigate('/signin/')
        localStorage.removeItem('session')
        setSession(null);
      },
    };
  }, []);

  return (
    
    
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      authentication={authentication}
      branding={{logo : <img src={Logo} />, title : ''}}
      theme={demoTheme}
      router={{navigate : navigate, searchParams: searchParams}}
    >
    
      <Routes>
        <Route path="/signin/" element={<AppSignInPage setSession = {setSession} />
      } />
        <Route path="/signup/" element={<Signup />} />

        
        {/* <Route path="/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Dashboard setSession={setSession} session={session} />
      </DashboardLayout>} />

      <Route path="/tasks/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Tasks session={session} />
      </DashboardLayout>} />

      <Route path="/tasks/:id/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Task session={session} />
      </DashboardLayout>} />

      <Route path="/tasks/:taskId/:Id/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <TaskContent session={session} />
      </DashboardLayout>} />


      <Route path="/calendar/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Calendar session={session} />
      </DashboardLayout>} />

      <Route path="/profile/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <EditProfile session={session} setSessionTrigger = {setSessionTrigger} />
      </DashboardLayout>} />

      <Route path="/chat/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Assistance session={session}/>
      </DashboardLayout>} />

      <Route path="/diary/" element={<DashboardLayout defaultSidebarCollapsed = {true}>
          <Journal session={session}/>
      </DashboardLayout>} /> */}

      </Routes>
        
      
    </AppProvider>
  
  );
}

export default Wrapper;
