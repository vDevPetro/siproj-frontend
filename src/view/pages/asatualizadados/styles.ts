import styled from "styled-components";
 
export const Container = styled.div`

span {
  font-family: Open Sans !important;
}

body {
  background-color: #f2f2f2;
}

.h1 {
  color: #043a00;
}

.form-label {
  color: #043a00;
  font-weight: 600;
}

label {
  color: #043a00;
  margin-bottom: 0;
}

select:focus {
  border-color: #acc4a9;
  box-shadow: 0 0 0 0.2rem rgba(50, 205, 50, 0.1);
}

.form-control {
  border-radius: 0.5rem;
  border-color: rgb(92, 95, 89, 0.25);
  margin-bottom: 1rem;
}
  
button[type="submit"] {
  background-color: #008542;
  border: none;
  border-radius: 5px;
}

button[type="submit"]:hover {
  background-color: #004f28;;
}

// Small devices 
  @media (min-width: 576px) {
    .card-body {
      margin: 0 0.2rem !important;
    }
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
      margin: 0 4rem !important;
    }
  }

`;