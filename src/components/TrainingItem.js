import React from 'react';
import PropTypes from 'prop-types';
import TrainingModel from '../model/TrainingModel';
import moment from 'moment';

export default function TrainingItem(props) {
  const { date, distance } = props.item;

  return (
    <table>
        <thead>
          <tr>
            <td>{moment(date).format('DD.MM.YY')}</td>
            <td>{distance.toFixed(1)}</td>
            <td className='change' title='Change' onClick={props.onEdit}>Edit</td>
            <td className='delete' title='Delete' onClick={props.onRemove}>X</td>
          </tr>
        </thead>
    </table>
    )
}

TrainingItem.propTypes = {
  item: PropTypes.instanceOf(TrainingModel).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}