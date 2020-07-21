import React, { useState } from 'react';
import TrainingModel from '../model/TrainingModel';
import AddForm from './AddForm';
import List from './List';
import moment from 'moment';

export default function TrainingBase(props) {
  const [ trainings, setTrainings ] = useState([]);
  const [ editingID, setEditingID ] = useState();
  const [ form, setForm ] = useState({ date: '', distance: '' });

  const handleChange = (name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const handleSubmit = () => {
    const { distance } = form;
    const mDate = moment(form.date, 'DD.MM.YY', true);
    if (!mDate.isValid()) return;
    const date = mDate.toDate();

    if (editingID) {
      const oldDate = trainings.find((o) => o.id === editingID).date;
      setTrainings((prevTrainings) => prevTrainings.map((o) => {
        if (o.date.valueOf() === oldDate.valueOf()) return new TrainingModel(date, Number(distance));
        return o;
      }));
    } else {
      if (trainings.find((o) => o.date.valueOf() === date.valueOf())) {
        setTrainings((prevTrainings) => prevTrainings.map((o) => {
          if (o.date.valueOf() === date.valueOf()) return new TrainingModel(date, Number(distance) + o.distance);
          return o;
        }));
      } else {
        setTrainings((prevTrainings) => [...prevTrainings, new TrainingModel(date, Number(distance))]);
      }
    }
    
    setForm({ date: '', distance: '' });
    setEditingID(null);
  }

  const handleRemove = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((o) => o.id !== id));
  }

  const handleEdit = (id) => {
    const training = trainings.find((o) => o.id === id);
    setEditingID(training.id);
    setForm({ date: moment(training.date).format('DD.MM.YY'), distance: training.distance });
  }

  return (
    <>
      <AddForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <List trainings={trainings} onRemove={handleRemove} onEdit={handleEdit} />
    </>  
  )
}