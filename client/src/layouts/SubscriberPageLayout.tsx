import { ReactNode, FC } from "react";

import Navbar from "../components/Navbar/Navbar";

interface SubscriberPageLayoutProps {
  children: ReactNode;
}

const SubscriberPageLayout: FC<SubscriberPageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default SubscriberPageLayout;
