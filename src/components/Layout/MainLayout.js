import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import theme from '../../styles/theme';
import { 
  FiHome, 
  FiThermometer, 
  FiBell, 
  FiSettings, 
  FiToggleLeft, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiUser
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background};
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${theme.colors.primary};
  color: white;
  box-shadow: ${theme.shadows.large};
  border: none;
  cursor: pointer;
  animation: float 3s infinite ease-in-out;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  width: 16rem;
  background-color: white;
  box-shadow: ${theme.shadows.medium};
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};  
  transition: transform 0.3s ease;
  
  @media (min-width: ${theme.breakpoints.md}) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  animation: fadeIn 0.5s ease-in-out;
`;

const LogoImage = styled.img`
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.primary};
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.textLight};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const Navigation = styled.nav`
  padding: 1rem 0.5rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: ${theme.fontSizes.sm};
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
  color: ${({ active }) => active ? theme.colors.primary : theme.colors.textLight};
  background-color: ${({ active }) => active ? `${theme.colors.primary}10` : 'transparent'};
  font-weight: ${({ active }) => active ? '500' : 'normal'};
  
  &:hover {
    background-color: ${({ active }) => active ? `${theme.colors.primary}15` : '#f5f5f5'};
    transform: translateX(5px);
  }
  
  span {
    margin-left: 0.75rem;
  }
`;

const ProfileSection = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${theme.colors.border};
  padding: 1rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProfileName = styled.h2`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileRole = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textLight};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 9999px;
  color: ${theme.colors.textLight};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary};
    background-color: #f5f5f5;
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow: auto;
  transition: margin-left 0.3s ease;
  margin-left: ${({ sidebarOpen }) => sidebarOpen ? '16rem' : '0'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const menuItems = [
    { icon: <FiHome size={20} />, text: 'Dashboard', path: '/dashboard' },
    { icon: <FiThermometer size={20} />, text: 'Environment', path: '/environment' },
    { icon: <FiToggleLeft size={20} />, text: 'Controls', path: '/controls' },
    { icon: <FiBell size={20} />, text: 'Notifications', path: '/notifications' },
    { icon: <FiSettings size={20} />, text: 'Settings', path: '/settings' },
  ];

  return (
    <LayoutContainer>
      {/* Mobile menu button */}
      <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MobileMenuButton>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen}>
        {/* Sidebar header */}
        <SidebarHeader>
          <LogoContainer>
            <LogoImage 
              src="/logo.png" 
              alt="Smart Greenhouse"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32x32/4CAF50/FFFFFF?text=GH';
              }}
            />
            <LogoText>Smart Greenhouse</LogoText>
          </LogoContainer>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </CloseButton>
        </SidebarHeader>

        {/* Navigation links */}
        <Navigation>
          <NavList>
            {menuItems.map((item, index) => (
              <NavItem key={index} className={`animate-slideInLeft delay-${index}00`}>
                <NavLink
                  to={item.path}
                  active={location.pathname === item.path ? 1 : 0}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Navigation>

        {/* User profile section */}
        {currentUser && (
          <ProfileSection>
            <ProfileContainer>
              <ProfileImage
                src={currentUser.avatar || "https://i.pravatar.cc/150?img=12"}
                alt={currentUser.name}
              />
              <ProfileInfo>
                <ProfileName>{currentUser.name}</ProfileName>
                <ProfileRole>{currentUser.role}</ProfileRole>
              </ProfileInfo>
              <LogoutButton
                onClick={handleLogout}
                title="Logout"
              >
                <FiLogOut size={18} />
              </LogoutButton>
            </ProfileContainer>
          </ProfileSection>
        )}
      </Sidebar>

      {/* Main content */}
      <MainContent sidebarOpen={sidebarOpen}>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
