'use strict';

(function () {
  const SKY_HEIGHT = 120;
  const MIN_GUEST = 1;
  const MAX_GUEST = 5;
  const MIN_ROOM = 1;
  const MAX_ROOM = 4;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const TITLES = [`Отличный вид из окна`, `Метро в 5 минутах ходьбы`, `В доме есть вкусная пекарня`, `Соседи драчуны`, `Есть подземный паркинг`];
  const PRICES = [`5000`, `8500`, `6200`, `3400`, `1500`, `1750`, `2100`];
  const DESCRIPTIONS = [`Немного воняет носками, но в целом нормально`, `Можно выспаться`, `Есть аквариум - без рыб, почистите как раз`, `Можно лежать на печи, она теплая`];
  const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const FOTOS_LIST = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const QUANTITY_ADVERTAISEMENTS = 8;

  const avatarImgArray = window.rndFunction.shuffle(window.rndFunction.getAvatarArray(QUANTITY_ADVERTAISEMENTS));

  const getAdvertaisement = function () {
    const locationX = window.rndFunction.getRandomInteger(window.position.PIN_WIDTH_HALF, window.position.MAX_WIDTH) - window.position.PIN_WIDTH_HALF;
    const locationY = window.rndFunction.getRandomInteger(window.position.PIN_HEIGHT + SKY_HEIGHT, window.position.MAX_HEIGHT) - window.position.PIN_HEIGHT;

    const advertaisement = {
      author: {
        avatar: `img/avatars/user0${avatarImgArray.pop()}.png`
      },
      offer: {
        title: window.rndFunction.getRndI(TITLES),
        address: `${locationX}, ${locationY}`,
        price: window.rndFunction.getRndI(PRICES),
        type: window.rndFunction.getRndI(TYPES),
        rooms: window.rndFunction.getRandomInteger(MIN_ROOM, MAX_ROOM),
        guests: window.rndFunction.getRandomInteger(MIN_GUEST, MAX_GUEST),
        checkin: window.rndFunction.getRndI(CHECKIN_TIMES),
        checkout: window.rndFunction.getRndI(CHECKOUT_TIMES),
        features: window.rndFunction.getRndArray(window.rndFunction.shuffle(FEATURES_LIST)),
        description: window.rndFunction.getRndI(DESCRIPTIONS),
        photos: window.rndFunction.getRndArray(window.rndFunction.shuffle(FOTOS_LIST))
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return advertaisement;
  };
  window.advertaisement = {
    getAdvertaisement,
    FEATURES_LIST,
    QUANTITY_ADVERTAISEMENTS
  };
}());
