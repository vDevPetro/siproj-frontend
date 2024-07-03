import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface NavLinkProps {
  to: string;
  eventKey?: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, eventKey, children }) => {
  return (
    <LinkContainer to={to}>
      <Nav.Link eventKey={eventKey}>{children}</Nav.Link>
    </LinkContainer>
  );
};

export default NavLink;
