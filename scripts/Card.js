export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
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

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this._id, this._isLiked)
      .then((cardData) => {
        this._setLikeState(cardData.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleDeleteButtonClick() {
    this._handleDeleteClick(this);
  }

  _setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked
    );
  }

  remove() {
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

    this._setLikeState(this._isLiked);

    if (this._ownerId !== this._userId && this._deleteButton) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._setEventListeners();

    return this._card;
  }
}
