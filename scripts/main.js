const SLIDER = document.querySelector('.slider');
const ROOT_ELEMENT = document.documentElement;
const BODY = document.body;
const CALC_DISPLAY = document.querySelector('.calc__display');
const CALC_BODY = document.querySelector('.calc__body');
CALC_DISPLAY.innerText = 'test';
let themes = {
  1: 'neutral',
  2: 'light',
  3: 'dark'
};
let themesMainBackgroundColors = {
  'neutral': 'rgb(58, 71, 100)',
  'light': 'rgb(230, 230, 230)',
  'dark': 'rgb(22, 6, 40)'
};

function getObjectKeyByValue(obj, val) {
  return Object.entries(obj).find(i => i[1] === val);
}

function getCurrentThemeName() {
  let currentBodyBackgroundColor = getComputedStyle(BODY).backgroundColor;
  let currentThemeName = getObjectKeyByValue(themesMainBackgroundColors, currentBodyBackgroundColor)[0];
  return currentThemeName;
}

function setCurrentThemePositionInSwitcher() {
  let currentThemeName = getCurrentThemeName();
  let currentThemePosition = getObjectKeyByValue(themes, currentThemeName)[0];
  SLIDER.value = currentThemePosition;
}

function switchTheme() {
  let currentThemePosition = SLIDER.value;
  let currentThemeName = themes[currentThemePosition];
  ROOT_ELEMENT.setAttribute('data-theme', currentThemeName);
  BODY.style.backgroundColor = themesMainBackgroundColors[currentThemeName];
}

setCurrentThemePositionInSwitcher();
SLIDER.addEventListener('change', switchTheme);