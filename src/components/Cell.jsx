export const DollarCell = ({cell}) => {
  if (cell.value) {
    return (
      '$' +
      cell.value
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .slice(0, -3)
    );
  }
  return null;
};

export const DateCell = ({cell}) => {
  if (cell.value) {
    return formatDate(new Date(cell.value));
  }
  return null;
};

function formatDate(date) {
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day} ${year}`;
}
