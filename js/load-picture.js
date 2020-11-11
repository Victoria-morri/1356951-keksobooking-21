'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const onAvatarAd = function () {
  let file = formFileField.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      formFilePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onPhotoAd = function () {
  const img = document.createElement(`img`);
  let photo = formPhotoField.files[0];
  let photoName = photo.name.toLowerCase();
  let matches = FILE_TYPES.some(function (it) {
    return photoName.endsWith(it);
  }
  );
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      img.src = reader.result;
      formPhotoPreview.appendChild(img);
    });
    reader.readAsDataURL(photo);
  }
};

const removePhotos = function () {
  const photos = window.loadPicture.formPhotoPreview.querySelectorAll(`img`);
  if (photos) {
    photos.forEach(function (it) {
      it.remove();
    });
  }
};

const formPhotoField = document.querySelector(`.ad-form__upload input[type=file]`);
const formPhotoPreview = document.querySelector(`.ad-form__photo`);
const formFileField = document.querySelector(`.ad-form__field input[type=file]`);
const formFilePreview = document.querySelector(`.ad-form-header__preview img`);

formPhotoField.addEventListener(`change`, onPhotoAd);
window.loadPicture = {
  onPhotoAd,
  onAvatarAd,
  removePhotos,
  formPhotoField,
  formFileField,
  formPhotoPreview,
  formFilePreview
};
