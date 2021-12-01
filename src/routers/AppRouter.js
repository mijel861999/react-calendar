import React from 'react'; 

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Pages
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route 
            exact 
            path='/'
            element={ <CalendarScreen /> }
          />
          <Route 
            exact 
            path='/login'
            element={ <LoginScreen /> }
          />
        </Routes>
    </BrowserRouter>
  )
}
