
export const getErrorMsg = (err) => {
  try {
    return err.message ? err.message : JSON.stringify(err, null, 2);
  } catch (errors) {
    return errors;
  }
};

export const convertUTCDateToLocalDate = (date) => {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}