import { openModal } from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");

    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick() {
    this._card.remove();
  }

  _handleImageClick() {
    this._imagePopupImage.src = this._link;
    this._imagePopupImage.alt = this._name;
    this._imagePopupCaption.textContent = this._name;

    openModal(this._imagePopup);
  }

  getView() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(".card__image");
    this._cardTitle = this._card.querySelector(".card__title");
    this._likeButton = this._card.querySelector(".card__like-button");
    this._deleteButton = this._card.querySelector(".card__delete-button");

    this._imagePopup = document.querySelector("#image-popup");
    this._imagePopupImage =
      this._imagePopup.querySelector(".popup__image");
    this._imagePopupCaption =
      this._imagePopup.querySelector(".popup__caption");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
