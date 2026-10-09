import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    const image = this._popup.querySelector(".popup__image");
    const caption = this._popup.querySelector(".popup__caption");

    image.src = data.link;
    image.alt = data.name;
    caption.textContent = data.name;

    super.open();
  }
}
