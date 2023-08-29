'use client';

import { type ReactNode } from 'react';

import { Transition } from '@headlessui/react';

type TTransitionWrapperProps = {
  children: ReactNode;
  isVisibility: boolean;
};

export const TransitionWrapper = ({
  children,
  isVisibility,
}: TTransitionWrapperProps) => {
  return (
    <Transition
      show={isVisibility}
      enter='transition-opacity duration-300'
      enterFrom='opacity-100'
      enterTo='opacity-0'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-0'
      leaveTo='opacity-100'
    >
      {children}
    </Transition>
  );
};
