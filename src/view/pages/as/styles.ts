import styled from "styled-components";
 
export const Container = styled.div`
  body {
    background-color: #f2f2f2;
  }
  .form-group label {
    color: #043a00;
    font-weight: 600;
  }
  .form-control {
    border-radius: 0.5rem;
    border-color: rgb(92, 95, 89, 0.5);
    margin-bottom: 1rem;
  }
  button[type="submit"]{
    background-color: #008542;
    border: none;
    border-radius: 5px;
    color: white;
    width: 100%;
  }
  button[type="submit"]:hover {
    background-color: #004f28;
  }
  button[type="reset"]{
    width: 100%;
  }
  button[type="reset"]:hover {
    color: white;
    width: 100%
  }
  .table-container {
    margin-top: 30px;
  } 
`;