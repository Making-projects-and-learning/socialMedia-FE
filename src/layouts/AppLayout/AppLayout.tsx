/** Components */
import { Navbar } from "../../components";

/** Material UI - Custom components */
import {
  AppWrapperContainer,
  ContentContainer,
  NavbarSectionContainer,
  ChatsSectionContainer,
} from "./styled";

/** Types */
type AppLayoutType = {
  children: JSX.Element;
};

const AppLayout = ({ children }: AppLayoutType) => {
  const renderNavbarSection = () => (
    <NavbarSectionContainer>
      <Navbar />
    </NavbarSectionContainer>
  );

  const renderChatsSection = () => (
    <ChatsSectionContainer>
      <h1>Chats/Groups</h1>
    </ChatsSectionContainer>
  );

  return (
    <AppWrapperContainer>
      {renderNavbarSection()}
      <ContentContainer>{children}</ContentContainer>
      {renderChatsSection()}
    </AppWrapperContainer>
  );
};

export default AppLayout;
