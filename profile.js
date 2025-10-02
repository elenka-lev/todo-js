/*Підключення календаря/connect calendar */
const today = new Date();
const picker = new Pikaday({
  field: document.getElementById("datepicker"),
  format: "DD.MM.YYYY",
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  toString(date, format) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  },
});


