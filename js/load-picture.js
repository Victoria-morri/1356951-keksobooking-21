'use strict';
const FILE_TYPE = `image/`;

const onAvatarAd = function () {
  adImage(formFileField, formFilePreview);
};

const onPhotoAd = function () {
  removePhoto();
  const img = document.createElement(`img`);
  img.style.width = 70 + `px`;
  img.style.height = 70 + `px`;
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
  formFilePreview.src = `img/muffin-grey.svg`;
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
