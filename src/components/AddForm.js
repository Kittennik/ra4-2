import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Validation from './Validation';

export default function AddForm(props) {
  const { form, onSubmit, onChange } = props;
  const [validateErr, setValidateErr] = useState({
        date: false,
        distance: false,
      });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValidateErr((prevValidateErr) => ({ ...prevValidateErr, [name]: false }));
    onChange( name, value );
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
  
   const handleSubmit = (event) => {
    event.preventDefault();
    if (form.date && form.distance) {
      if (!validateErr.date && !validateErr.distance) {
        onSubmit();
       }
    }
  }

  return (
        <form className="form-add">
          <label>Дата (ДД.ММ.ГГ)
            <input name="date" value={form.date} onChange={handleChange} onBlur={checkValue} />
            {validateErr.date && <Validation msg={'Введите дату в формате ДД.ММ.ГГ'} />}
          </label>
          <label>Пройдено км
            <input name="distance" value={form.distance} onChange={handleChange} onBlur={checkValue}/>
            {validateErr.distance && <Validation msg={'Введите дистанцию (допускаются только числовые значения)'} />}
          </label>
          <input type="button" value="OK" onClick={handleSubmit} />
        </form>
      );
}

AddForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}