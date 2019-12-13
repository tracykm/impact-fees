import styled from "styled-components";

// can't figure out how to get a class on the base "tr" or "td" to target properly
const TableStyles = styled.div`
  .pagination {
    padding: 0.5rem;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    background: #1b1d20;
    width: 100%;
    z-index: 2;

    .btn-group,
    .selectpicker,
    .form-control {
      height: 2em;
    }
  }

  svg {
    opacity: 0.5;
    font-size: 0.7em;
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
      text-align: center;
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
