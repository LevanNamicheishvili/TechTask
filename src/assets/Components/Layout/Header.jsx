import React from "react";
import styled from "styled-components";
import Logo from "../../Images/Logo.png";
import Arrow from '../../Images/Group 213.svg';

const Header = () => {
    return (
        <HeaderContainer>
            <Nav>
                <LogoImage src={Logo} alt="Company Logo" />
                <ProfileSection>
                    <UserInfo>
                        <UserName>
                            პაატა კობახიძე
                        </UserName>
                        <UserTitle>
                            სამართლის ბაკალავრი
                        </UserTitle>
                    </UserInfo>
                    <ProfileDetails>
                        <Avatar>
                            <AvatarIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#115BA4" />
                            </AvatarIcon>
                        </Avatar>
                        <ArrowIcon src={Arrow} alt="Arrow" />
                    </ProfileDetails>
                </ProfileSection>
            </Nav>
        </HeaderContainer>
    );
};

// Styled Components
const HeaderContainer = styled.header`
    display: flex;
    height: 120px;
    padding: 37px 80px;
    background-color: #fff;
    box-shadow: 0 4px 21.9px rgba(17, 91, 164, 0.08); // Drop shadow applied here
`;

const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LogoImage = styled.img`
    height: 40px; // Adjust the height as needed
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const UserName = styled.div`
    font-size: 16px;
    font-weight: 400;
`;

const UserTitle = styled.div`
    font-size: 14px;
    color: #101C5C;
    opacity: 0.5;
`;

const ProfileDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.div`
    background-color: #C4C4C4;
    border-radius: 50%;
    overflow: hidden;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AvatarIcon = styled.svg`
    width: 56px;
    height: 56px;
`;

const ArrowIcon = styled.img`
    margin-left: -27px; 
    margin-top: 18px;
`;

export default Header;
