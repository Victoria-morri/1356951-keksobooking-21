'use strict';
const FILE_TYPE = `image/`;
const PX = `px`;
const AVATAR_PATH = `img/muffin-grey.svg`;
const IMG_WIDTH = 70;
const IMG_HEIGHT = 70;

const onAvatarAd = function () {
  adImage(formFileField, formFilePreview);
};

const onPhotoAd = function () {
  removePhoto();
  const img = document.createElement(`img`);
  img.style.width = IMG_WIDTH + PX;
  img.style.height = IMG_HEIGHT + PX;
  img.alt = `Фотография помещения`;
  formPhotoPreview.appendChild(img);
  adImage(formPhotoField, img);
};

const adImage = function (picture, image) {
  let photo = picture.files[0];
  let photoType = photo.type.toLowerCase();
  let matches = photoType.startsWith(FILE_TYPE);
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      image.src = reader.result;
    });
    reader.readAsDataURL(photo);
  }
};

const removePhoto = function () {
  let image = formPhotoPreview.querySelector(`img`);
  if (image) {
    image.remove();
  }
};

const resetAvatar = function () {
  formFilePreview.src = AVATAR_PATH;
};

const formPhotoField = document.querySelector(`.ad-form__upload input[type=file]`);
const formPhotoPreview = document.querySelector(`.ad-form__photo`);
const formFileField = document.querySelector(`.ad-form__field input[type=file]`);
const formFilePreview = document.querySelector(`.ad-form-header__preview img`);

window.loadPicture = {
  resetAvatar,
  onPhotoAd,
  onAvatarAd,
  removePhoto,
  formPhotoField,
  formFileField,
  formFilePreview
};
