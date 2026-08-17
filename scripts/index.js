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

initialCards.forEach((card) => {
  console.log(card.name);
});

// Elementos do pop-up de edição
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

// Elementos do perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Elementos do formulário
const formElement = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Abre um modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Fecha um modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Preenche o formulário com os dados atuais do perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Preenche o formulário e abre o pop-up
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// Manipula o envio do formulário
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}

// Abre o pop-up ao clicar em "Editar perfil"
editButton.addEventListener("click", handleOpenEditModal);

// Fecha o pop-up ao clicar no X
closeButton.addEventListener("click", () => {
  closeModal(editPopup);
});

// Envia o formulário
formElement.addEventListener("submit", handleProfileFormSubmit);
