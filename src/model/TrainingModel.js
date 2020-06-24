export default class TrainingModel {
  constructor(id, date, distance, kilometer = '') {
    this.id = id;
    this.date = date;
    this.distance = distance;
    this.kilometer = kilometer;
  }
}
