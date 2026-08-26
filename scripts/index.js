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


/* =========================
   ELEMENTOS DO PERFIL
   ========================= */

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


/* =========================
   POP-UP EDITAR PERFIL
   ========================= */

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");

const formElement = document.querySelector("#edit-profile-form");

const nameInput = document.querySelector(
  ".popup__input_type_name"
);

const jobInput = document.querySelector(
  ".popup__input_type_description"
);


/* =========================
   POP-UP NOVO LOCAL
   ========================= */

const addButton = document.querySelector(".profile__add-button");

const newCardPopup = document.querySelector(
  "#new-card-popup"
);

const newCardCloseButton =
  newCardPopup.querySelector(".popup__close");

const cardForm = document.querySelector("#new-card-form");

const cardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);

const cardLinkInput = document.querySelector(
  ".popup__input_type_url"
);


/* =========================
   CARTÕES
   ========================= */

const cardsContainer = document.querySelector(
  ".cards__list"
);

const cardTemplate = document.querySelector(
  "#card-template"
);


/* =========================
   POP-UP DA IMAGEM
   ========================= */

const imagePopup = document.querySelector(
  "#image-popup"
);

const imagePopupCloseButton =
  imagePopup.querySelector(".popup__close");

const imagePopupImage =
  imagePopup.querySelector(".popup__image");

const imagePopupCaption =
  imagePopup.querySelector(".popup__caption");


/* =========================
   FUNÇÕES DOS POP-UPS
   ========================= */

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}


/* =========================
   EDITAR PERFIL
   ========================= */

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}


/* =========================
   CURTIR CARTÃO
   ========================= */

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle(
    "card__like-button_is-active"
  );
}


/* =========================
   EXCLUIR CARTÃO
   ========================= */

function handleDeleteButtonClick(evt) {
  const card = evt.target.closest(".card");

  card.remove();
}


/* =========================
   IMAGEM AMPLIADA
   ========================= */

function handleImageClick(name, link) {
  imagePopupCaption.textContent = name;

  imagePopupImage.src = link;

  imagePopupImage.alt = name;

  openModal(imagePopup);
}


/* =========================
   CRIAR CARTÃO
   ========================= */

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle =
    cardElement.querySelector(".card__title");

  const cardImage =
    cardElement.querySelector(".card__image");

  const likeButton =
    cardElement.querySelector(".card__like-button");

  const deleteButton =
    cardElement.querySelector(".card__delete-button");


  cardTitle.textContent = name;

  cardImage.src = link;

  cardImage.alt = name;


  likeButton.addEventListener(
    "click",
    handleLikeButtonClick
  );


  deleteButton.addEventListener(
    "click",
    handleDeleteButtonClick
  );


  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });


  return cardElement;
}


function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);

  container.prepend(cardElement);
}


/* =========================
   EVENTOS — EDITAR PERFIL
   ========================= */

editButton.addEventListener(
  "click",
  handleOpenEditModal
);

editCloseButton.addEventListener(
  "click",
  () => {
    closeModal(editPopup);
  }
);

formElement.addEventListener(
  "submit",
  handleProfileFormSubmit
);


/* =========================
   EVENTOS — NOVO LOCAL
   ========================= */

addButton.addEventListener(
  "click",
  () => {
    openModal(newCardPopup);
  }
);

newCardCloseButton.addEventListener(
  "click",
  () => {
    closeModal(newCardPopup);
  }
);


function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    cardsContainer
  );

  closeModal(newCardPopup);

  cardForm.reset();
}


cardForm.addEventListener(
  "submit",
  handleCardFormSubmit
);


/* =========================
   EVENTOS — IMAGEM
   ========================= */

imagePopupCloseButton.addEventListener(
  "click",
  () => {
    closeModal(imagePopup);
  }
);


/* =========================
   CARTÕES INICIAIS
   ========================= */

initialCards.forEach((card) => {
  renderCard(
    card.name,
    card.link,
    cardsContainer
  );
});
