import React, { ReactNode, FC } from 'react';

import InstructorSidebar from '../components/InstructorSidebar/InstructorSidebar';

interface InstructorPageLayoutProps {
  children: ReactNode;
}

const InstructorPageLayout: FC<InstructorPageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-lg-2">
          <InstructorSidebar />
        </div>
        <div className="col-xl-10 col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default InstructorPageLayout;
