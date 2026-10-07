import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

  _handleSubmit() {
    if (this._handleConfirm) {
      this._handleConfirm();
    }
  }
}
