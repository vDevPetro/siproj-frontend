import styled from "styled-components";

export const Container = styled.div`
  .card {
    border: none;
    border-radius: 2rem;
    box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
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
`;