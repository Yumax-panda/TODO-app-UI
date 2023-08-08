"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const _Header = () => {
    if (session) {
      return <button onClick={() => signOut()}>Sign out</button>;
    } else {
      return <button onClick={() => signIn()}>Sign in</button>;
    }
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/content/dashboard'>Dashboard</Link>
          </li>
          <li>
            <_Header />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
