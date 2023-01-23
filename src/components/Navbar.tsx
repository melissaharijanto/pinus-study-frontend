import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Colors } from "../constants";
import SearchIcon from "@mui/icons-material/Search";
import LoginModal from "./authentication_modal/LoginModal";
import SignUpModal from "./authentication_modal/SignUpModal";

// STYLED COMPONENTS

const NavbarContainer = styled.div`
    background-color: ${Colors.dark_grey};
    color: white;
    width: calc(100% - 4rem);
    min-width: auto;
    max-width: auto;
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 1020;
    top: 0;
    font-family: "Poppins", sans-serif;
    border-bottom: solid;
    border-bottom-width: 2px;
    border-bottom-color: ${Colors.light_grey};
    box-shadow: 0 2px 7px 0 ${Colors.light_grey};
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const SubDivision = styled.div`
    display: flex;
    gap: 3rem;
    align-items: center;
`;

const Buttons = styled(SubDivision)`
    gap: 1rem;
`;

const LoginButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    font-weight: 500;
    border-radius: 30px;
    border-color: ${Colors.white};
    border-width: 1px;
    border-style: solid;
    color: ${Colors.white};
    text-decoration: "none";
`;

const SignUpButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    background-color: ${Colors.red};
    font-weight: 500;
    border-radius: 30px;
    color: white;
    text-decoration: "none";
`;

const SearchBarContainer = styled.span`
    padding: 0.6rem 1rem;
    background: ${Colors.white};
    border-radius: 25px;
    align-items: center;
    display: flex;
    gap: .5rem;
`;

const SearchBar = styled.input`
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    border: none;
    background: ${Colors.white};
    color: ${Colors.dark_grey};
    width: 30rem;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${Colors.light_grey};
        font-style: italic;
    }
`;

/**
 * Navbar component for the web forum.
 * 
 * @returns A React Component to show a fixed Navbar on top of every page. Navbar is
 * implemented in the App component.
 */
const NavigationBar = () => {

    // State to store the value of search query in module search bar
    const [query, setQuery] = useState("");
    const [showLogIn, setShowLogIn] = useState<Boolean>(false);
    const [showSignUp, setShowSignUp] = useState<Boolean>(false);

    const hideAllModals = () => {
        setShowLogIn(false);
        setShowSignUp(false);
    }

    const showSignUpModal = () => {
        setShowLogIn(false);
        setShowSignUp(true);
    }

    const showLogInModal = () => {
        setShowLogIn(true);
        setShowSignUp(false);
    }

    // Updates the query state upon data change in the module search bar
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    return (
        <NavbarContainer>
            { showLogIn? <LoginModal cancel={hideAllModals} showSignUpModal={showSignUpModal}/> : null }
            { showSignUp? <SignUpModal cancel={hideAllModals} showLogInModal={showLogInModal}/> : null }
            <SubDivision>
                <Link to="/">
                    <Logo src={logo} />
                </Link>
                <SearchBarContainer>
                    <SearchIcon color="disabled" />
                    <SearchBar
                        type="text"
                        value={query}
                        onChange={onChange}
                        placeholder="Search modules here..."
                    />
                </SearchBarContainer>
            </SubDivision>
            <Buttons>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <LoginButton onClick={() => {setShowLogIn(true)}}>Login</LoginButton>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <SignUpButton onClick={() => {setShowSignUp(true)}}>Sign Up</SignUpButton>
                </Link>
            </Buttons>
        </NavbarContainer>
    );
};

export default NavigationBar;