"use client";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { createRoot, Root } from "react-dom/client";
import ProfileAlert from "./profilealert";

const MySwal = withReactContent(Swal);

let reactRoot: Root | null = null;
let currentSwal: any = null;

async function checkUnsavedChanges(): Promise<boolean> {
  const usernameAux = localStorage.getItem("usernameaux");
  const emailAux = localStorage.getItem("emailaux");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const currency = localStorage.getItem("currency")
  const currenyAux = localStorage.getItem("currencyaux")

  const hasChanges = (usernameAux !== username) || (emailAux !== email || (currenyAux !== currency));

  if (hasChanges) {
    const previousSwal = currentSwal;
    
    const result = await Swal.fire({
      title: 'Unsaved Changes',
      text: 'You have unsaved changes. If you close without saving, your changes will be lost. Are you sure you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0067FE',
      cancelButtonColor: '#666',
      confirmButtonText: 'Yes, close',
      cancelButtonText: 'Keep editing',
      background: '#080D33',
      color: '#ffffff',
      customClass: {
        popup: 'border-2 border-[#0067FE] rounded-3xl',
        confirmButton: 'rounded-2xl px-6 py-2',
        cancelButton: 'rounded-2xl px-6 py-2'
      }
    });
    
    if (!result.isConfirmed && previousSwal) {
      setTimeout(() => {
        openProfile();
      }, 100);
    }
    
    return result.isConfirmed;
  }
  
  return true;
}

function saveChanges() {
  const usernameAux = localStorage.getItem("usernameaux");
  const emailAux = localStorage.getItem("emailaux");
  const currencyAux = localStorage.getItem("currencyaux");
  
  if (usernameAux !== null) {
    localStorage.setItem("username", usernameAux);
  }
  
  if (emailAux !== null) {
    localStorage.setItem("email", emailAux);
  }

  if (currencyAux != null) {
    localStorage.setItem("currency", currencyAux);
  }
}

export async function openProfile(): Promise<string> {
  const swalInstance = MySwal.fire({
    html: `<div id="react-alert-root"></div>`,
    background: "#080D33",
    width: '720px',
    confirmButtonColor: "#0067FE",
    confirmButtonText: "Save",
    showCloseButton: true,
    allowOutsideClick: () => false,
    allowEscapeKey: () => false,
    customClass: {
      confirmButton:
        "text-5xl bg-[#0067FE] text-white py-2 px-20 rounded-3xl",
    },
    buttonsStyling: false,
    preConfirm: async () => {
      const result = await Swal.fire({
        title: 'Save Changes?',
        text: 'Are you sure you want to save these changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0067FE',
        cancelButtonColor: '#666',
        confirmButtonText: 'Yes, save',
        cancelButtonText: 'Cancel',
        background: '#080D33',
        color: '#ffffff',
        customClass: {
          popup: 'border-2 border-[#0067FE] rounded-3xl',
          confirmButton: 'rounded-2xl px-6 py-2',
          cancelButton: 'rounded-2xl px-6 py-2'
        }
      });

      if (result.isConfirmed) {
        saveChanges();
        await Swal.fire({
          title: 'Saved!',
          text: 'Your changes have been saved successfully.',
          icon: 'success',
          confirmButtonColor: '#0067FE',
          confirmButtonText: 'OK',
          background: '#080D33',
          color: '#ffffff',
          timer: 2000,
          customClass: {
            popup: 'border-2 border-[#0067FE] rounded-3xl',
            confirmButton: 'rounded-2xl px-6 py-2'
          }
        });
        
        return true;
      } else {
        setTimeout(() => {
          openProfile();
        }, 100);
        return false;
      }
    },

    didOpen: () => {
      const rootEl = document.getElementById("react-alert-root");
      if (rootEl) {
        reactRoot = createRoot(rootEl);
        reactRoot.render(<ProfileAlert />);

        const popupEl = document.querySelector('.swal2-popup') as HTMLElement | null;
        if (popupEl) {
          popupEl.style.background = '#080D33';
          popupEl.style.border = '5px solid #0067FE';
          popupEl.style.borderRadius = '5rem';
          popupEl.style.boxShadow = '0 0px 100px rgba(0,103,254)';
          popupEl.style.padding = '1.5rem';
          popupEl.style.maxWidth = '48vw';
          popupEl.style.width = '100%';
        }
        const closeButton = document.querySelector('.swal2-close') as HTMLElement | null;
        if (closeButton) {
          closeButton.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const canClose = await checkUnsavedChanges();
            if (canClose) {
              if (reactRoot) {
                reactRoot.unmount();
                reactRoot = null;
              }
              Swal.close();
            }
          };
        }
      }
    },

    willClose: () => {
      if (reactRoot) {
        reactRoot.unmount();
        reactRoot = null;
      }
    }
  });

  currentSwal = swalInstance;
  
  return swalInstance.then(() => 'Dashboard');
}