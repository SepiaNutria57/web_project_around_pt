import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./utils.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsContainer = document.querySelector(".cards__list");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.querySelector("#edit-profile-form");

const nameInput = editForm.querySelector(
  ".popup__input_type_name"
);
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(
  ".profile__description"
);

const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(
  ".popup__close"
);
const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardForm.querySelector(
  ".popup__input_type_url"
);

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(
  ".popup__close"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(
  validationConfig,
  editForm
);

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardForm
);

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  editFormValidator.resetValidation();
  openModal(editPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

function handleOpenNewCardModal() {
  newCardForm.reset();
  newCardFormValidator.resetValidation();

  openModal(newCardPopup);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const card = new Card(
    cardData,
    "#card-template"
  );

  const cardElement = card.getView();

  cardsContainer.prepend(cardElement);

  closeModal(newCardPopup);

  newCardForm.reset();
  newCardFormValidator.resetValidation();
}

function handleClosePopup(event) {
  const popup = event.currentTarget.closest(".popup");

  closeModal(popup);
}

editButton.addEventListener("click", handleOpenEditModal);

editCloseButton.addEventListener("click", handleClosePopup);

editPopup.addEventListener("mousedown", handleOverlayClick);

editForm.addEventListener(
  "submit",
  handleProfileFormSubmit
);

addButton.addEventListener(
  "click",
  handleOpenNewCardModal
);

newCardCloseButton.addEventListener(
  "click",
  handleClosePopup
);

newCardPopup.addEventListener(
  "mousedown",
  handleOverlayClick
);

newCardForm.addEventListener(
  "submit",
  handleNewCardFormSubmit
);

imagePopupCloseButton.addEventListener(
  "click",
  handleClosePopup
);

imagePopup.addEventListener(
  "mousedown",
  handleOverlayClick
);

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

initialCards.forEach((cardData) => {
  const card = new Card(
    cardData,
    "#card-template"
  );

  const cardElement = card.getView();

  cardsContainer.append(cardElement);
});
