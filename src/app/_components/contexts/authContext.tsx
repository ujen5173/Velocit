"use client";
import NextNProgress from "nextjs-progressbar";
import { type ReactNode } from "react";

const AuthContext = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextNProgress />
      {children}
    </>
  );
};

export default AuthContext;
