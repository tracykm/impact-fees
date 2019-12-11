export const DollarCell = ({ cell }) => {
  if (cell.value) {
    return formatMoney(cell.value);
  }
  return null;
};

export function formatMoney(value) {
  return (
    "$" +
    value
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .slice(0, -3)
  );
}

export const DateCell = ({ cell }) => {
  if (cell.value) {
    return formatDate(new Date(cell.value));
  }
  return null;
};

export function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = String(date.getFullYear()).slice(2);

  return `${monthNames[monthIndex]} ${date.getFullYear()}`;
}
