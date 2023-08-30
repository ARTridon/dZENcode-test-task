'use client';

import { Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Button } from '@/ui/Button';

type TAlerProps = {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: ReactNode;
  handler: () => void;
};

export const Alert = ({
  isOpen,
  close,
  title,
  children,
  handler,
}: TAlerProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto '
        onClose={close}
      >
        <div className='min-h-screen flex items-center justify-center '>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='bg-white rounded max-w-md w-full  text-left shadow-xl transform transition-all divide-y'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900 p-4'
              >
                {title}
              </Dialog.Title>
              <div className='mt-2 p-4'>{children}</div>

              <div className='mt-4 flex items-center gap-3 justify-end bg-green-500 p-4'>
                <Button
                  type='button'
                  variant={'outline'}
                  onClick={close}
                  className='uppercase'
                >
                  close
                </Button>
                <Button type='button' onClick={handler} className='uppercase'>
                  delete
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
