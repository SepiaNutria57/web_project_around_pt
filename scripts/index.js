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

// Elementos do perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Elementos do pop-up de edição
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");

// Elementos do formulário de edição
const formElement = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Elementos do pop-up de novo cartão
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");

// Elementos do formulário de novo cartão
const cardForm = document.querySelector("#new-card-form");
const cardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Container dos cartões
const cardsContainer = document.querySelector(".cards__list");

// Template dos cartões
const cardTemplate = document.querySelector("#card-template");

// Elementos do pop-up de imagem
const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Abre um modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Fecha um modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Preenche o formulário de perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Abre o pop-up de edição de perfil
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// Manipula o envio do formulário de perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}

// Manipula o clique no botão de curtir
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Manipula o clique no botão de excluir
function handleDeleteButtonClick(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// Manipula o clique na imagem
function handleImageClick(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImage.src = link;
  imagePopupImage.alt = name;

  openModal(imagePopup);
}

// Cria um cartão a partir do template
function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;

  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButtonClick);

  deleteButton.addEventListener("click", handleDeleteButtonClick);

  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

// Adiciona um cartão ao início do container
function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);

  container.prepend(cardElement);
}

// Abre o pop-up de edição
editButton.addEventListener("click", handleOpenEditModal);

// Fecha o pop-up de edição
editCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

// Envia o formulário de edição
formElement.addEventListener("submit", handleProfileFormSubmit);

// Abre o pop-up de novo cartão
addButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

// Fecha o pop-up de novo cartão
newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

// Manipula o envio do formulário de novo cartão
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);

  closeModal(newCardPopup);

  cardForm.reset();
}

// Envia o formulário de novo cartão
cardForm.addEventListener("submit", handleCardFormSubmit);

// Fecha o pop-up da imagem
imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

// Renderiza os cartões iniciais
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});
