'use client';

import { type FC, type ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { IoMdSettings } from 'react-icons/io';

import { useAvataGetAction } from '@/hooks/client-actions';
import { cn } from '@/utils/cn';

export const NavigationMenu = () => {
  const { data: session } = useSession();

  const { data } = useAvataGetAction({ id: session?.id as string });
  const avatar = data?.usersPermissionsUser.data.attributes.avatar;

  return (
    <aside className='max-w-[150px] w-full h-screen flex flex-col text-center shadow-2xl col-span-1 bg-white/80'>
      <div className='basis-[4em] grow-0 shrink-1'></div>

      <div className='px-[2em] shrink-1'>
        <Avatar
          avatarUrl={
            avatar?.data ? avatar.data!.attributes.url : '/avatar-mock.svg'
          }
        />
      </div>

      <div className='basis-20 grow-0 shrink-1'></div>

      <div className='basis-10 grow-0 shrink-1'>
        <Links />
      </div>

      <div className='basis-40 grow-0 shrink-1'></div>
    </aside>
  );
};

type TAvatarProps = {
  avatarUrl: string;
};

const Avatar: FC<TAvatarProps> = ({ avatarUrl }) => {
  return (
    <div className='w-full h-fit relative'>
      <Image
        className='rounded-full h-20 w-20 object-cover object-center'
        src={avatarUrl}
        alt='Avatar'
        width={80}
        height={80}
      />
      <div className='absolute  right-0 transform translate-y-1/5 w-10 h-10 bg-gray-200 shadow-2xl shadow-black flex items-center justify-center  rounded-full bottom-0'>
        <IoMdSettings />
      </div>
    </div>
  );
};

const Links = () => {
  return (
    <div className='w-full h-full flex flex-col font-bold text-lg gap-8'>
      <CustomLink href='/orders'>ORDERS</CustomLink>
      <CustomLink href='/products'>PRODUCTS</CustomLink>
      <CustomLink href='/'>USERS</CustomLink>
      <CustomLink href='/'>SETTINGS</CustomLink>
    </div>
  );
};

type CustomLinkProps = {
  href: string;
  children: ReactNode;
};

const CustomLink: FC<CustomLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className='w-full h-full'>
      <h1
        className={cn(
          isActive &&
            'underline underline-offset-8 decoration-green-500 decoration-solid decoration-4'
        )}
      >
        {children}
      </h1>
    </Link>
  );
};
