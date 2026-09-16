export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscape);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscape);
}

export function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

export function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
