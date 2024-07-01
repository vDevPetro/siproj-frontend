import styled from "styled-components";
 
export const Container = styled.div`

body {
  background-color: #f8f9fa;
}

.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 50px;
}

.h1 {
  color: #043a00;
}

.form-group {
  color: #043a00;
  font-weight: bold;
}

label {
  color: #043a00;
}

.form-control {
  border-radius: 0.5rem;
  border-color: rgb(92, 95, 89, 0.25);
  margin-bottom: 1rem;
}

button[type="submit"], button[type="button"] {
  background-color: #008542;
  border: none;
  border-radius: 5px;
  color: white;
}

button[type="submit"]:hover, button[type="button"]:hover {
  background-color: #16971f;
}

#main {
  background-color: #f8f9fa;
  padding: 20px;
}

.pagetitle h1 {
  font-size: 24px;
  font-weight: bold;
}

.card {
  background-color: #fff;
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
}

.card-body {
  padding: 1.5rem;
}

.card-body .form-group {
  margin-bottom: 1rem;
}

.card-body .form-group label {
  font-weight: bold;
}

.card-body .form-control {
  border-radius: 0.25rem;
}

button[type="submit"] {
  margin-top: 20px;
}


`;