'use client';

import { FC } from "react"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

type Page = {
  link: string;
  title: string
}

const pages: Page[] = [
  {
    link: '/',
    title: 'Tasks'
  },
  {
    link: '/faq',
    title: 'FAQ'
  },
  {
    link: '/terms-of-service',
    title: 'Terms of service'
  }
]

const Header: FC = () => {
  const session = useSession();

  return (
    <header className="w-full flex justify-between py-4 border-b-2 px-1 sm:px-5">
      <nav className="w-max flex justify-center gap-x-4 items-center grow-1">
        {pages.map(({ link, title }) => <Link key={link} href={link}>{title}</Link>)}
      </nav>
      {session.data?.user ? <Button onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}>Sign Out</Button> : <Button asChild><Link href='/sign-in'>Sign In</Link></Button>}
    </header>
  )
}

export default Header