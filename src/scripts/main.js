const SLIDER = document.querySelector('.slider');
const ROOT_ELEMENT = document.documentElement;
const BODY = document.body;
const CALC_DISPLAY = document.querySelector('.calc__display');
const CALC_BODY = document.querySelector('.calc__body');

let themes = {
    1: 'neutral',
    2: 'light',
    3: 'dark'
}

let themesMainBackgroundColors = {
    'neutral': 'rgb(58, 71, 100)',
    'light': 'rgb(230, 230, 230)',
    'dark': 'rgb(22, 6, 40)'
}

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

function hideInitialZeroOnDisplay() {
    if (CALC_DISPLAY.innerText) CALC_DISPLAY.classList.remove('null');
}

function showInitialZeroOnDisplay() {
    if (!CALC_DISPLAY.innerText) CALC_DISPLAY.classList.add('null');
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
        deleteLastCharacter();
        showInitialZeroOnDisplay();
        return;
    };

    if (KEY_VALUE === 'RESET') {
        cleanDisplay();
        showInitialZeroOnDisplay();
        return;
    };

    if (KEY_VALUE === '=') {
        if (!CALC_DISPLAY.innerText) return;

        const EXPRESSION = CALC_DISPLAY.innerText;
        let result = eval(EXPRESSION);

        renderExpressionResultOnDisplay(result);
        return;
    };

    if (CALC_DISPLAY.innerText.length <= 13) {
        let characters = CALC_DISPLAY.innerText.split('');
        let lastWellBeCheckedCharacter = characters[characters.length - 1];
        let lastCharacterIsOperator = characterIsOperator(lastWellBeCheckedCharacter);

        if (CALC_DISPLAY.innerText && lastCharacterIsOperator) {
            let currectCharacterIsOperator = characterIsOperator(KEY_VALUE);

            if (currectCharacterIsOperator) return;

            renderCharacterOnDisplay(KEY_VALUE);
            return;
        };

        renderCharacterOnDisplay(KEY_VALUE);
    };

    hideInitialZeroOnDisplay();
});

