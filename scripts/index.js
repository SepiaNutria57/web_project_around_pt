import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });

    editProfilePopup.close();
  }
);

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (formData) => {
    const card = new Card(
      {
        name: formData["place-name"],
        link: formData.link,
      },
      "#card-template",
      (cardData) => imagePopup.open(cardData)
    );

    cardsSection.addItem(card.getView());
    newCardPopup.close();
  }
);

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (cardData) => imagePopup.open(cardData)
      );

      cardsSection.addItem(card.getView());
    },
  },
  ".cards__list"
);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editFormValidator = new FormValidator(
  validationConfig,
  editForm
);

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardForm
);

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  editForm.querySelector(".popup__input_type_name").value =
    currentUserInfo.name;
  editForm.querySelector(".popup__input_type_description").value =
    currentUserInfo.job;

  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

cardsSection.renderItems();
