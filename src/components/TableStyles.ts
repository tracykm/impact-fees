import styled from "styled-components";

const TableStyles = styled.div`
  .pagination {
    padding: 0.5rem;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    background: #1b1d20;
    width: 100%;
  }

  table {
    a {
      color: inherit;
      width: 100%;
      height: 100%;
      display: block;
    }

    border-spacing: 0;
    border: 1px solid black;
    margin-bottom: 2rem;

    thead {
      background-color: #1b1d20;
      position: sticky;
      top: 0;
      display: block;
      z-index: 5;
    }
    tbody {
      font-family: monospace;
      text-align: right;
    }

    td:nth-child(3) {
      position: sticky;
      left: 0;
      background-color: #25282e;
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
