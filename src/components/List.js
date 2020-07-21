import React from 'react';
import PropTypes from 'prop-types';
import TrainingItem from './TrainingItem'

export default function List(props) {
  const { trainings } = props;

  const handleEdit = (id) => props.onEdit(id);
  const handleRemove = (id) => props.onRemove(id);

  const sortedTrainings = trainings.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) return 1;
    return -1;
  });

  return (
    <>
    <table>
        <thead>
          <tr>
            <td>Дата (ДД.ММ.ГГ)</td>
            <td>Пройдено км</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
      {sortedTrainings.map((o) => 
        <TrainingItem
        item={o}
        onEdit={() => handleEdit(o.id)}
        onRemove={() => handleRemove(o.id)}
        key={o.id}
        />
        )
      }
      </tbody>
      </table>
    </>
  );
}

List.propTypes = {
  trainings: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

