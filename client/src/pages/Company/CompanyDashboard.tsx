import React from 'react';

import CompanyPageLayout from '../../layouts/CompanyPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';

const CompanyDashboard = () => {
  return (
    <CompanyPageLayout>
      <CardLayout>
        <h1>Company dashboard</h1>
        <p>This is a demo description</p>
      </CardLayout>
    </CompanyPageLayout>
  );
};

export default CompanyDashboard;
