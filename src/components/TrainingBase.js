import React, { useState } from 'react';
import moment from 'moment';
import shortid from 'shortid';
import AddForm from './AddForm';
import List from './List';
import TrainingModel from '../model/TrainingModel';

export default function TrainingBase() {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    id: '',
    date: '',
    distance: '',
  });

  const sortTrainings = trainings.sort((a, b) => moment(b.date, 'DD.MM.YY') - moment(a.date, 'DD.MM.YY'));

  const trainingsAddChange = (trainings, training) => {
    const changeTrainings = trainings;
    const findItem = changeTrainings.findIndex((item) => item.date === training.date);

    if (findItem === -1) {
      changeTrainings.push(training);
      return changeTrainings;
    }
  
    changeTrainings[findItem].distance += training.distance;
    changeTrainings[findItem].kilometer = changeTrainings[findItem].kilometer || training.kilometer;
  
    return changeTrainings;
  }

  const handleFormChange = (objValue) => {
    const { name, value } = objValue;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (objValue) => {
    const { date, distance, kilometer } = objValue;

    if (!form.id) {
      const training = new TrainingModel(shortid.generate(), date, distance, kilometer);

      setTrainings([...trainingsAddChange(trainings, training)]);
    } else {
      setTrainings((prevTrainings) => prevTrainings.map((itemTraining) => {
        if (itemTraining.id === form.id) {
          return new TrainingModel(form.id, date, distance, kilometer);
        }
        return itemTraining;
      }));
    }

    setForm({
      id: '',
      date: '',
      distance: '',
    });
  };

  const handleRemove = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((o) => o.id !== id));
  };

  const handleChange = (objValue) => {
    setForm({
      id: objValue.id,
      date: objValue.date,
      distance: `${objValue.distance}${objValue.kilometer}`,
    });
  };

  return (
    <>
      <AddForm
        valueForm={form}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <table>
        <thead>
          <tr>
            <td>Дата (ДД.ММ.ГГ)</td>
            <td>Пройдено км</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
          <List data={sortTrainings} onRemove={handleRemove} onChange={handleChange} />
        </tbody>
      </table>
    </>
  );
}