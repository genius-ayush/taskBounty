import React from 'react';
import Sidebar from '../components/Sidebar';
import Creator from '../components/creator/CreatorNavbar';
import UserNavbar from '../components/user/UserNavbar';
import Provider from '../provider';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <Provider>
    <div className="flex min-h-screen w-full">
      <UserNavbar/>
      <div className="wrapper w-full">{props.children}</div>
    </div>
    </Provider>
  );
};