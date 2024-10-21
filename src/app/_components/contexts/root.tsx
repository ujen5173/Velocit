"use client";

import { type User } from "next-auth";
import { type ReactNode, createContext } from "react";
import Footer from "../_/Footer";
import Header from "../_/Header";

type RootContextProps = {
  user: User | null;
};

export const Context = createContext<RootContextProps>({
  user: null,
});

const RootContext = ({ children }: { children: ReactNode }) => {
  return (
    <Context.Provider value={{ user: null }}>
      <>
        <Header />
        {children}
        <Footer />
      </>
    </Context.Provider>
  );
};

export default RootContext;
