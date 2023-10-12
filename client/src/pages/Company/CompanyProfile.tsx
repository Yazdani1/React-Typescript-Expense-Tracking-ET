import React from 'react';

import CompanyPageLayout from '../../layouts/CompanyPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';

const CompanyProfile = () => {
  return (
    <CompanyPageLayout>
      <CardLayout>
        <div>
          <h2>Company Profile</h2>
          <p>Test project</p>
        </div>

      </CardLayout>
    </CompanyPageLayout>
  );
};

export default CompanyProfile;
