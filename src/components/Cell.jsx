export const DollarCell = ({ cell }) => {
  // if(cell.row.original.)
  const id = cell.column.id.split(".");
  const notes =
    (cell.row.original[id[0]] && cell.row.original[id[0]][id[1] + "Notes"]) ||
    "";

  return `${formatMoney(cell.value)} ${notes}`;
};

export function formatMoney(value) {
  if (value === undefined) return "";
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

  // var day = date.getDate();
  // var year = String(date.getFullYear()).slice(2);
  var monthIndex = date.getMonth();

  return `${monthNames[monthIndex]} ${date.getFullYear()}`;
}
