import styled from 'styled-components';

const TableStyles = styled.div`
  padding: 1rem;
  .pagination {
    padding: 0.5rem;
    font-size: 16px;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-top: 5rem;

    thead {
      /* position: fixed !important; */
      top: 0;
      background-color: #282c34;
    }
    tbody {
      font-family: monospace;
      text-align: right;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default TableStyles;
