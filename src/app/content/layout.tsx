"use client";

import { useSession } from "next-auth/react";
import React from "react";

import About from "../components/about";

// Content that requires authentication
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const _Body = () => {
    if (session) return children;
    return <About />;
  };

  return <_Body />;
};

export default Layout;
