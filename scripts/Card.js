export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick() {
    this._card.remove();
  }

  getView() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(".card__image");
    this._cardTitle = this._card.querySelector(".card__title");
    this._likeButton = this._card.querySelector(".card__like-button");
    this._deleteButton = this._card.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
