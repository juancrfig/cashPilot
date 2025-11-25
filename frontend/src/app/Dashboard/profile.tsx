"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createRoot, type Root } from "react-dom/client";

const MySwal = withReactContent(Swal);

let reactRoot: Root | null = null;

export async function openProfile(): Promise<string> {
  return MySwal.fire({
    html: `<div id="react-alert-root"></div>`,
    background: "#080D33",
    width: '720px',
    confirmButtonColor: "#3085d6",

    didOpen: () => {
      const rootEl = document.getElementById("react-alert-root");
      if (rootEl) {
        reactRoot = createRoot(rootEl);
        reactRoot.render(
          <div className="text-left mb-6">
            <h1 className="text-5xl ml-5 mb-4 text-white">Name</h1>
            <input
              placeholder="Your Name"
              type="text"
              className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
            />
            <h1 className="text-5xl ml-5 mb-4 text-white">Email</h1>
            <input
              placeholder="name@email.com"
              type="email"
              className={`mb-2 placeholder:opacity-40 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all`}
            />
            <h1 className="text-5xl ml-5 mb-4 text-white">Currency</h1>
            <select
              className="mb-2 placeholder:opacity-90 text-5xl w-[41vw] py-3 px-6 bg-[#12193A] rounded-4xl transition-all"
            >
              <option value="">COP</option>
              <option value="op1">EUR</option>
              <option value="op2">DOL</option>
            </select>
          </div>
        );
        const popupEl = document.querySelector('.swal2-popup') as HTMLElement | null;
        if (popupEl) {
          popupEl.style.background = '#080D33';
          popupEl.style.border = '5px solid #0067FE';
          popupEl.style.borderRadius = '5rem';
          popupEl.style.boxShadow = '0 0px 100px rgba(0,103,254)';
          popupEl.style.padding = '1.5rem';
          popupEl.style.maxWidth = '50vw';
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