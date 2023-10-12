import React, { ReactNode, FC } from 'react';

import EmployerSidebar from '../components/EmployerSidebar/EmployerSidebar';

interface EmployerPageLayoutProps {
  children: ReactNode;
}

const EmployerPageLayout: FC<EmployerPageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-lg-2">
          <EmployerSidebar />
        </div>
        <div className="col-xl-10 col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default EmployerPageLayout;
