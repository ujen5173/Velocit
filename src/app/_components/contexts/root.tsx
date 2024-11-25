"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { bricolage } from "~/app/utils/font";

export const DEFAULT_CURRENCY: Currency = {
  label: "रु Nepali Rupee (NPR)",
  value: "NPR",
};

export interface Currency {
  label: string;
  value: string;
}

type RootContextProps = {
  currentCurrency: {
    label: string;
    value: string;
  };
  setCurrentCurrency: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
  user: Session | null;
  setUser: React.Dispatch<React.SetStateAction<Session | null>>;
};

export const Context = createContext<RootContextProps>({
  user: null,
  currentCurrency: DEFAULT_CURRENCY,
  setCurrentCurrency: () => {
    // do nothing
  },
  setUser: () => {
    return null;
  },
});

export const useUser = () => {
  const ctx = useContext(Context);
  return ctx;
};

const RootContext = ({
  session,
  currency,
  children,
}: {
  currency: RootContextProps["currentCurrency"];
  session: Session | null;
  children: ReactNode;
}) => {
  const [user, setUser] = useState<Session | null>(session);
  const [currentCurrency, setCurrentCurrency] =
    useState<RootContextProps["currentCurrency"]>(currency);

  return (
    <SessionProvider>
      <ProgressBar
        height="4px"
        color="#db2777"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <Context.Provider
        value={{
          currentCurrency,
          setCurrentCurrency,
          user: user,
          setUser: setUser,
        }}
      >
        <main className={bricolage.className}>{children}</main>
      </Context.Provider>
    </SessionProvider>
  );
};

export default RootContext;
