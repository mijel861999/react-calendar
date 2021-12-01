import React from 'react'; 

//Librerías
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

//Components
import { Navbar } from '../ui/Navbar';

//CSS
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer( moment ); //or globallizeLocalizer

const events = [{
  title: 'Cum del jefe',
  start: moment().toDate(),
  end: moment().add( 2, 'hours' ).toDate(),
  bgcolor: '#fafafa'
}]

export const CalendarScreen = () => {
  return(
    <div className="calendar-screen">
      <Navbar />

      <Calendar 
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}
