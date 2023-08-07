"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const _Header = () => {
    if (session) {
      return (
        <>
          <div>Sing in as {session.user?.email}</div>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    } else {
      return (
        <>
          <div>Not signed in</div>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      );
    }
  };
  return <_Header />;
};

export default Header;
