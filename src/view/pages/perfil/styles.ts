import styled from "styled-components";

export const Container = styled.div`

font-family: Nunito;
  padding: 2rem 0;

.profile-card {
  border-radius: 1.5rem;
  padding: 1.5rem 1.25rem;
  background: #fff;
  box-shadow:  7px 7px 28px #d4d9d1,
              -7px -7px 28px #ffffff;
}

.bi {
  cursor: pointer;
}

input:focus {
  border-color: #acc4a9;
  box-shadow: 0 0 0 0.2rem rgba(50, 205, 50, 0.1);
}

.select:focus {
  border-color: #acc4a9;
  box-shadow: 0 0 0 0.2rem rgba(50, 205, 50, 0.1);
}

button[type="submit"] {
  background-color: #008542;
  border: none;
  border-radius: 5px;
}

button[type="submit"]:hover {
  background-color: #004f28;;
}

`;