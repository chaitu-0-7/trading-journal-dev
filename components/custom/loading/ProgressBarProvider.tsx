'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const TopProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#0049B7"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
