import React from 'react';
import Sidebar from '../components/Sidebar';
import Creator from '../components/creatorDashboard';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      <Creator/>
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};