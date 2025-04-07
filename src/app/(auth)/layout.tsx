import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
