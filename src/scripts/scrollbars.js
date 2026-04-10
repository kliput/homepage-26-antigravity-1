import { OverlayScrollbars } from "overlayscrollbars";

function initScrollbars(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    OverlayScrollbars(el, {
      scrollbars: {
        visibility: "auto",
        autoHide: "move",
        autoHideDelay: 800,
        autoHideSuspend: false,
        dragScroll: true,
        theme: "os-theme-custom",
      },
    });
  });
}

initScrollbars(".overlayscrollbar-element");
