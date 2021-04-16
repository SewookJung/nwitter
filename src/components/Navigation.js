import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaTwitter } from 'react-icons/fa';
import Colors from 'components/styles/Colors';

const Nav = styled.nav`
  padding: 20px 40px;
  border-right: ${Colors.Border};
  grid-row: 1/3;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  font-size: 30px;

  &:first-child {
    font-size: 40px;
    color: ${Colors.Twitter};
    margin-bottom: 40px;
  }

  &:not(first-child) {
    font-size: 17px;
    font-weight: 600;
    color: #2c3e50;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  transition: color ease-in-out 0.2s;

  > svg {
    margin-right: 20px;
    font-size: 25px;
  }
  &:hover {
    color: #1da1f2;
  }
`;

const Navigation = () => (
  <Nav>
    <ul>
      <Li>
        <Link to="/">
          <FaTwitter />
        </Link>
      </Li>
      <Li>
        <NavLink to="/">
          <BiHome />
          <span>Home</span>
        </NavLink>
      </Li>
      <Li>
        <NavLink to="/profile">
          <CgProfile />
          <span>Profile</span>
        </NavLink>
      </Li>
    </ul>
  </Nav>
);
export default Navigation;
