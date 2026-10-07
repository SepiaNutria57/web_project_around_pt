import Api from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "53d26151-bb21-4420-b180-1a781168f2c4",
    "Content-Type": "application/json",
  },
});

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
  userAvatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
const confirmationPopup = new PopupWithConfirmation(
  "#delete-confirmation-popup"
);

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (formData) => {
    const submitButton = document.querySelector(
      "#edit-profile-form .popup__button"
    );
    submitButton.textContent = "Salvando...";

    return api
      .setUserInfo({
        name: formData.name,
        about: formData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  }
);

const avatarPopup = new PopupWithForm(
  "#avatar-popup",
  (formData) => {
    const submitButton = document.querySelector(
      "#avatar-form .popup__button"
    );
    submitButton.textContent = "Salvando...";

    return api
      .setUserAvatar({
        avatar: formData.avatar,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          avatar: userData.avatar,
        });
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  }
);

const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        (data) => imagePopup.open(data),
        (cardId, isLiked) => {
          return isLiked
            ? api.deleteLike(cardId)
            : api.putLike(cardId);
        },
        (cardInstance) => {
          confirmationPopup.open(() => {
            api
              .deleteCard(cardInstance._id)
              .then(() => {
                cardInstance.remove();
                confirmationPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
        currentUserId
      );

      cardsSection.addItem(card.getView());
    },
  },
  ".cards__list"
);

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (formData) => {
    const submitButton = document.querySelector(
      "#new-card-form .popup__button"
    );
    submitButton.textContent = "Salvando...";

    return api
      .addCard({
        name: formData["place-name"],
        link: formData.link,
      })
      .then((cardData) => {
        cardsSection.addItem(
          new Card(
            cardData,
            "#card-template",
            (data) => imagePopup.open(data),
            (cardId, isLiked) =>
              isLiked ? api.deleteLike(cardId) : api.putLike(cardId),
            (cardInstance) => {
              confirmationPopup.open(() => {
                api
                  .deleteCard(cardInstance._id)
                  .then(() => {
                    cardInstance.remove();
                    confirmationPopup.close();
                  })
                  .catch((err) => console.log(err));
              });
            },
            currentUserId
          ).getView()
        );
        newCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Criar";
      });
  }
);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-edit");

const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-form");

const editFormValidator = new FormValidator(validationConfig, editForm);
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardForm
);
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarForm
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
  newCardForm.reset();
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

let currentUserId = null;

api
  .getAppInfo()
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardsSection._items = cards;
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
