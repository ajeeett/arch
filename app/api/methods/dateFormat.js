import moment from 'moment';
// Converting date format
export const dateFormat = date => {
  const fields = date.split('T');
  const d = new Date(fields[0]);
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    d,
  );
  return `${da} ${mo} ${ye}`;
};

export const getMonthAndYear = () => {
  let date = new Date().toISOString();
  const fields = date.split('T');
  const d = new Date(fields[0]);
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    d,
  );
  return `${mo} ${ye}`;
};
export const getDate = dateStr => {
  const fields = dateStr.split('T');
  const d = new Date(fields[0]);
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    d,
  );
  return `${da}`;
};

export const getMonth = dateStr => {
  const d = new Date(dateStr);
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    d,
  );
  return `${mo}`;
};

export const getGreetingText = () => {
  var today = new Date();
  var curHr = today.getHours();
  if (curHr >= 6 && curHr < 12) {
    return 'Good Morning';
  } else if (curHr >= 12 && curHr < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

export const getDateWithDay = dateStr => {
  const date = moment(dateStr); // Thursday Feb 2015
  let day = date.format('ddd');
  return `${day}, ${date.format('DD MMM YYYY')}`;
};

export const getTodaysDate = () => {
  let date = new Date().toISOString();
  const fields = date.split('T');
  const d = new Date(fields[0]);
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    d,
  );
  return `${da} ${mo}`;
};

export const formatDateAndTime = dateStr => {
  if (dateStr != '' && dateStr != null) {
    let date = moment(dateStr).format('DD MMM');
    let year = moment(dateStr).format('YYYY');
    return `${date}, ${year}`;
  }
  return ' ';
};

export const checkIfDateIsUpcoming = dateStr => {
  if (dateStr != '') {
    let currentDate = moment().format('DD MMM YYYY');
    return new Date(dateStr) >= new Date(currentDate);
  }
  return false;
};

export const checkIfDateIsTodaysDate = dateStr => {
  if (dateStr != '') {
    let currentDate = moment().format('DD MM YYYY');
    return moment(dateStr).format('DD MM YYYY') == currentDate;
  }
  return false;
};
// export const getDateTimeAfterGivenDays = days => {
//   let currentTimestamp = moment();
//   return moment(currentTimestamp)
//     .add(days, 'days')
//     .toISOString();
// };
export const getCurrentTimeStamp = () => {
  return moment().toISOString();
};

export const checkIfTimestampPasses = dateStr => {
  return new Date(dateStr) < new Date();
};

export const calculateTimeDifferenceInHrs = dateStr => {
  let oldTime = new Date(dateStr).getTime();
  let currentTime = new Date().getTime();

  let diffTime = currentTime - oldTime;
  // let diffDays = diffTime / (1000 * 3600 * 24);
  let diffHours = diffTime / (1000 * 3600);

  return Math.floor(diffHours);
};
