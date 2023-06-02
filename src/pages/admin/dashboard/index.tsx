import * as React from 'react';
import withAuth from 'src/pages/withAuth';
import UserAndPremiunAccountChart from 'src/views/charts/UserAndPremiunAccountChart';


 const DashboardPage = () => {
  return (
    <div>
      <UserAndPremiunAccountChart/>
    </div>
  );
}

export default withAuth(DashboardPage)
