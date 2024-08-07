import styled from "styled-components";

export const Container = styled.div`
    body {
    background-color: #f2f2f2;
  }
  .form-label {
    color: #043a00;
    font-weight: 600;  
  }
  th.table-title {
    font-weight: 600;
    color: #021900;
  }
  .form-control {
    border-radius: 0.5rem;
    border-color: rgb(92, 95, 89, 0.25);
    margin-bottom: 1rem;
  }
  button[type="submit"]{
    background-color: #008542;
    border: none;
    border-radius: 5px;
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
  
  .nav-tabs .nav-link.active {
    color: #043a00 !important;
  }

  .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
    color: #21bb74 !important;
  }

  .nav-link {
    color: #198754 !important;
  }
  

  // Medium devices
  @media (min-width: 768px) {
    .card-body {
      margin: 0 1rem !important;
    }
  }

  // Large devices
  @media (min-width: 992px) {
    .card-body {
      margin: 0 3rem !important;
    }
  }

  @media (min-width: 1200px) { 
    .card-body {
      margin: 0 8rem !important;
    }
  }

`;