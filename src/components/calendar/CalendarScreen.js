import React, { useState } from 'react'; 

//Librerías
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';

//Components
import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { CalendarEvent } from '../calendar/CalendarEvent';
import { CalendarModal } from '../calendar/CalendarModal';

//Helpers
import { messages } from '../../helpers/calendar-messages-es';

//CSS
import 'react-big-calendar/lib/css/react-big-calendar.css';

///Actions
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';

//configuraciones de moment
moment.locale('es');

const localizer = momentLocalizer( moment ); //or globallizeLocalizer

const events = [{
  title: 'Cum del jefe',
  start: moment().toDate(),
  end: moment().add( 2, 'hours' ).toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar el pastel para el cum del jefe',
  user: {
    _id: '123',
    name: 'Miguel',
  }
}]

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );
  

  const onDoubleClick = ( e ) => {
    dispatch( uiOpenModal() )
  }
  
  const onSelectEvent = ( e ) => {
    console.log(e); 
    dispatch( eventSetActive(events) );
  }

  const onViewChange = ( e ) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.6,
      display: 'block',
      color: 'white',
    } 
    
    return{
      style
    }
  };

  return(
    <div className="calendar-screen">
      <Navbar />
      
      <Calendar 
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      <CalendarModal /> 
    </div>
  )
}
