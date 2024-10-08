import React from 'react';
import Sidebar from '../components/Sidebar';
import CreatorNavbar from '../components/creator/CreatorNavbar';
import Provider from '../provider';
import { ThemeProvider } from '@/components/theme-provider';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
      <Provider>
    <div className="flex min-h-screen w-full">
      <CreatorNavbar/>
      <div className="wrapper w-full">{props.children}</div>
    </div>
      </Provider>
  );
};