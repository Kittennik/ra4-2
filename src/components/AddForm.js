import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Validation from './Validation';

export default function AddForm(props) {
  const { valueForm } = props;
  const [validateErr, setValidateErr] = useState({
    date: false,
    distance: false,
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValidateErr((prevValidateErr) => ({ ...prevValidateErr, [name]: false }));
    props.onFormChange({ name, value });
  };
  const checkValue = (evt) => {
    const { name, value } = evt.target;
    let regexpDate;

    if (name === 'date') {
      regexpDate = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d\d$/;
    } else if (name === 'distance') {
      regexpDate = /^\d+([.]\d+)?(км)?$/g;
    }

    if (!value.match(regexpDate)) {
      setValidateErr((prevValidateErr) => ({ ...prevValidateErr, [name]: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valueForm.date && valueForm.distance) {
      if (!validateErr.date && !validateErr.distance) {
        const numberDistance = parseFloat(valueForm.distance);
        const strKilometer = valueForm.distance.replace(numberDistance, '');

        props.onFormSubmit({
          date: valueForm.date,
          distance: numberDistance,
          kilometer: strKilometer,
        });
      }
    }
  };

  return (
    <form className="form-add">
      <label>Дата (ДД.ММ.ГГ)
        <input name="date" value={valueForm.date} onChange={handleChange} onBlur={checkValue} />
        {validateErr.date && <Validation msg={'Введите дату в формате ДД.ММ.ГГ'} />}
      </label>
      <label>Пройдено км
        <input name="distance" value={valueForm.distance} onChange={handleChange} onBlur={checkValue}/>
        {validateErr.distance && <Validation msg={'Введите дистанцию (допускаются только числовые значения)'} />}
      </label>
      <input type="button" value="OK" onClick={handleSubmit} />
    </form>
  );
}

AddForm.propTypes = {
  valueForm: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
};
