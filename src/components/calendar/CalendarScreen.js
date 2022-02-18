import React, { useEffect, useState } from 'react'; 

//Librerías
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';

//Components
import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { CalendarEvent } from '../calendar/CalendarEvent';
import { CalendarModal } from '../calendar/CalendarModal';

//Helpers
import { messages } from '../../helpers/calendar-messages-es';

//CSS
import 'react-big-calendar/lib/css/react-big-calendar.css';

///Actions
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent, eventStartLoadin } from '../../actions/events';

//configuraciones de moment
moment.locale('es');

const localizer = momentLocalizer( moment ); //or globallizeLocalizer

/*
const eventsExample = [{
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
*/

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );
  const { uid } = useSelector( state => state.auth );
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );

  useEffect(()=>{
    dispatch(eventStartLoadin() )
  }, [ dispatch ]);

  const onDoubleClick = ( e ) => {
    dispatch( uiOpenModal() )
  }
  
  const onSelectEvent = ( e ) => {
    dispatch( eventSetActive(e) );
  }

  const onViewChange = ( e ) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    //TODO: Hacer creación de pedido al presionar 
    dispatch(eventClearActiveEvent());
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: (uid === event.user._id ) ?  '#367CF7' : '#465660',
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
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />
      
      <AddNewFab />

      
      {
        activeEvent &&
          <DeleteEventFab />
      }
      
      
      <CalendarModal /> 
    </div>
  )
}
