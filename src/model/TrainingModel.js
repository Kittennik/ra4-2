import {nanoid} from 'nanoid';

export default class TrainingModel {
  constructor(date, distance) {
    this.id = nanoid();
    this.date = date;
    this.distance = distance;
  }
}
