'use strict';
(function () {
  var ESC_KEYCODE = 27;

  function getRandomInt(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  function getRandom(elements) {
    return elements[getRandomInt(0, elements.length - 1)];
  }
  function shuffleArray(array) {
    var resultArray = [];
    for (var i = 0; i < array.length; i++) {
      var elementOfArray = getRandom(array);
      if (resultArray.indexOf(elementOfArray) !== -1) {
        elementOfArray = getRandom(array);
        i--;
      } else {
        resultArray.push(elementOfArray);
      }
    }
    return resultArray;
  }

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    shuffleArray: shuffleArray,
    createElement: createElement
  };
})();

