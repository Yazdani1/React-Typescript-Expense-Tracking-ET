import { FC, ReactNode } from "react";

import NavbarHome from "../components/Navbar/NavbarHome";

interface HomePageLayoutProps {
  children: ReactNode;
}

const HomePageLayout: FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <NavbarHome />
      <div className="container">{children}</div>
    </div>
  );
};

export default HomePageLayout;
