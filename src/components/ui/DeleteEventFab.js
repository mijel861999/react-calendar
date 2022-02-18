import React from 'react';
import { useDispatch } from 'react-redux';

import { startEventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch( startEventDeleted() );
  }

  return (
    <button
      onClick={ handleDelete }
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa fa-trash"></i> 
      <span>Borrar evento</span>
    </button>
  )
}
