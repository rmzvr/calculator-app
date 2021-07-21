const SLIDER = document.querySelector('.slider');
const ROOT_ELEMENT = document.documentElement;
const CALC_DISPLAY = document.querySelector('.calc__display');
const CALC_BODY = document.querySelector('.calc__body');

let themes = {
    1: 'neutral',
    2: 'light',
    3: 'dark'
}

function switchTheme() {
    ROOT_ELEMENT.setAttribute('data-theme', themes[sessionStorage.getItem('theme')]);
    SLIDER.value = sessionStorage.getItem('theme');
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

function isCharacterRepeatOneAfterAnoter(character) {
    let characters = ['.', '+', '-', '*', '/'];

    let result = characters.some(char => char == character);
    return result;
}

function renderCharacterOnDisplay(character) {
    CALC_DISPLAY.innerText += character;
}

function renderExpressionResultOnDisplay(result) {
    CALC_DISPLAY.innerText = +result.toFixed(2);
}

if (sessionStorage.getItem('theme') == null) {
    sessionStorage.setItem('theme', SLIDER.value);
}

switchTheme();

SLIDER.addEventListener('change', () => {
    sessionStorage.setItem('theme', SLIDER.value);
    switchTheme();
});

CALC_BODY.addEventListener('click', event => {
    const KEY_VALUE = event.target.innerText;

    if (event.target.classList.contains('calc__body')) return;

    if (KEY_VALUE === 'DEL') {
        if (CALC_DISPLAY.innerText == 0) return;

        deleteLastCharacter();

        if (!CALC_DISPLAY.innerText) renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_VALUE === 'RESET') {
        cleanDisplay();
        renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_VALUE === '=') {
        if (CALC_DISPLAY.innerText == 0) return;

        const EXPRESSION = CALC_DISPLAY.innerText;
        let result = eval(EXPRESSION);

        renderExpressionResultOnDisplay(result);
        return;
    };

    if (CALC_DISPLAY.innerText.length > 10) return;
    if (CALC_DISPLAY.innerText == 0) cleanDisplay();

    let renderedCharacters = CALC_DISPLAY.innerText.split('');
    let lastWellBeCheckedCharacter = renderedCharacters[renderedCharacters.length - 1];
    let isLastRenderedCharacterRepeat = isCharacterRepeatOneAfterAnoter(lastWellBeCheckedCharacter);
    let isRecentlyCharacterRepeat = isCharacterRepeatOneAfterAnoter(KEY_VALUE);

    if (isLastRenderedCharacterRepeat && isRecentlyCharacterRepeat) return;

    renderCharacterOnDisplay(KEY_VALUE);
});