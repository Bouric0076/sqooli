
"use client";
import React from 'react';
import { Toaster, toast } from 'sonner';


function MyToaster() {
    return (
    <Toaster
      position='top-right'      // top-left, top-center, bottom-right, etc.
      richColors                // better success/error/info colors
      closeButton
      expand={true}
      visibleToasts={5}
      offset={20}               // distance from screen edge
      toastOptions={{
        duration: 4000,
        className: 'custom-toast',
        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          minWidth: '320px',
        },
      }}
    />
    );
}

export default MyToaster;