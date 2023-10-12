// CompanyPageLayout.tsx

import React, { FC, ReactNode, useState, useEffect } from 'react';

import CompanyNavbar from '../components/companynavsidebar/CompanyNavbar';
import CompanySidebar from '../components/companynavsidebar/CompanySidebar';

interface CompanyPageLayoutProps {
  children: ReactNode;
}

const CompanyPageLayout: FC<CompanyPageLayoutProps> = ({ children }) => {
  // Initialize the show state with the value from localStorage or default to true
  const [show, setShow] = useState<boolean>(() => {
    const storedShow = localStorage.getItem('sidebar_show');
    return storedShow === 'false' ? false : true;
  });

  // Update the show state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar_show', show.toString());
  }, [show]);

  return (
    <div className="container-fluid">
      <CompanyNavbar />

      <div className="row">
        <div className={show ? 'col-lg-2 col-md-2 col-sm-2' : 'col-lg-1 col-md-1 col-sm-1'}>
          <CompanySidebar show={show} setShow={setShow} />
        </div>

        <div className={show ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-11 col-sm-11'}>{children}</div>
      </div>
    </div>
  );
};

export default CompanyPageLayout;
