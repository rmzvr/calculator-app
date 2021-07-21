const SLIDER = document.querySelector('.slider');
const ROOT_ELEMENT = document.documentElement;
const BODY = document.body;
const CALC_DISPLAY = document.querySelector('.calc__display');
const CALC_BODY = document.querySelector('.calc__body');
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
  let themeProperties = Object.entries(obj).find(i => i[1] === val);
  let themeName = themeProperties[0];
  return themeName;
}

function getCurrentThemeName() {
  let currentBodyBackgroundColor = getComputedStyle(BODY).backgroundColor;
  let currentThemeName = getObjectKeyByValue(themesMainBackgroundColors, currentBodyBackgroundColor);
  return currentThemeName;
}

function setCurrentThemePositionInSwitcher() {
  let currentThemeName = getCurrentThemeName();
  let currentThemePosition = getObjectKeyByValue(themes, currentThemeName);
  SLIDER.value = currentThemePosition;
}

function switchTheme() {
  let currentThemePosition = SLIDER.value;
  let currentThemeName = themes[currentThemePosition];
  ROOT_ELEMENT.setAttribute('data-theme', currentThemeName);
  BODY.style.backgroundColor = themesMainBackgroundColors[currentThemeName];
}

function renderInitialZeroOnDisplay() {
  CALC_DISPLAY.innerText = 0;
}

function deleteLastCharacter() {
  CALC_DISPLAY.innerText = CALC_DISPLAY.innerText.substr(0, CALC_DISPLAY.innerText.length - 1);
}

function cleanDisplay() {
  CALC_DISPLAY.innerText = '';
}

function characterIsOperator(character) {
  let arithmeticOperators = ['+', '-', '*', '/'];
  let result = arithmeticOperators.some(operator => operator == character);
  return result;
}

function renderCharacterOnDisplay(character) {
  CALC_DISPLAY.innerText += character;
}

function renderExpressionResultOnDisplay(result) {
  CALC_DISPLAY.innerText = +result.toFixed(2);
}

setCurrentThemePositionInSwitcher();
SLIDER.addEventListener('change', switchTheme);
CALC_BODY.addEventListener('click', event => {
  const KEY_VALUE = event.target.innerText;
  if (event.target.classList.contains('calc__body')) return;

  if (KEY_VALUE === 'DEL') {
    if (CALC_DISPLAY.innerText == 0) return;
    deleteLastCharacter();
    if (!CALC_DISPLAY.innerText) renderInitialZeroOnDisplay();
    return;
  }

  ;

  if (KEY_VALUE === 'RESET') {
    cleanDisplay();
    renderInitialZeroOnDisplay();
    return;
  }

  ;

  if (KEY_VALUE === '=') {
    if (CALC_DISPLAY.innerText == 0) return;
    const EXPRESSION = CALC_DISPLAY.innerText;
    let result = eval(EXPRESSION);
    renderExpressionResultOnDisplay(result);
    return;
  }

  ;
  if (CALC_DISPLAY.innerText.length > 10) return;
  if (CALC_DISPLAY.innerText == 0) cleanDisplay();
  let renderedCharacters = CALC_DISPLAY.innerText.split('');
  let lastWellBeCheckedCharacter = renderedCharacters[renderedCharacters.length - 1];
  let isLastRenderedCharacterOperator = characterIsOperator(lastWellBeCheckedCharacter);
  let isRecentlyCharacterOperator = characterIsOperator(KEY_VALUE);
  if (isLastRenderedCharacterOperator && isRecentlyCharacterOperator) return;
  renderCharacterOnDisplay(KEY_VALUE);
});