"use client";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { createRoot, Root } from "react-dom/client";
import ProfileAlert from "./profilealert";

const MySwal = withReactContent(Swal);

let reactRoot: Root | null = null;

export async function openProfile(): Promise<string> {
  return MySwal.fire({
    html: `<div id="react-alert-root"></div>`,
    background: "#080D33",
    width: '720px',
    confirmButtonColor: "#0067FE",
    confirmButtonText: "Save",
    customClass: {
      confirmButton:
        "text-5xl bg-[#0067FE] text-white py-2 px-20 rounded-3xl",
    },
    buttonsStyling: false,

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
      }
    },

    willClose: () => {
      if (reactRoot) {
        reactRoot.unmount();
        reactRoot = null;
      }
    }
  }).then(() => 'Dashboard');
}
