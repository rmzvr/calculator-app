const ROOT_ELEMENT = document.documentElement;
const SLIDER = document.querySelector('.slider');
const DISPLAY = document.querySelector('.calc__display');
const KEYPAD = document.querySelector('.calc__keypad');

let themes = {
    1: 'neutral',
    2: 'light',
    3: 'dark'
}

let specialCharacters = ['.', '+', '-', '*', '/'];

if (sessionStorage.getItem('theme') == null) {
    sessionStorage.setItem('theme', SLIDER.value);
}

switchTheme();

SLIDER.addEventListener('change', () => {
    sessionStorage.setItem('theme', SLIDER.value);
    switchTheme();
});

KEYPAD.addEventListener('click', event => {
    const KEY = event.target;
    const KEY_TYPE = KEY.dataset.type;
    const KEY_VALUE = event.target.textContent;
    const DISPLAY_TEXT = DISPLAY.textContent;

    if (event.target.classList.contains('calc__keypad')) return;

    if (KEY_TYPE === 'delete') {
        if (DISPLAY_TEXT == '0') return;

        deleteLastCharacter();

        if (!DISPLAY.innerText) renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_TYPE === 'reset') {
        cleanDisplay();
        renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_TYPE === 'equal') {
        if (DISPLAY_TEXT == '0') return;

        let result = calculateExpression(DISPLAY_TEXT);
        renderResultOfExpression(result);
        return;
    };



    if (DISPLAY_TEXT.length > 10) return;

    if (DISPLAY_TEXT == '0') cleanDisplay();

    if (DISPLAY_TEXT == '0' && KEY_VALUE == '.') {
        renderCharacter(0);
        renderCharacter(KEY_VALUE);
        return;
    }

    if (specialCharacters.find(char => char === KEY_VALUE)) {
        if (!DISPLAY_TEXT || DISPLAY_TEXT == '0') {
            renderInitialZeroOnDisplay();
            return;
        }

        let allRenderedCharacters = DISPLAY.innerText.split('');
        let lastRenderedCharacter = allRenderedCharacters[allRenderedCharacters.length - 1];

        if (Number.isInteger(+lastRenderedCharacter)) {
            renderCharacter(KEY_VALUE);
            return;
        };

        deleteLastCharacter();
        renderCharacter(KEY_VALUE);
        return;
    }

    renderCharacter(KEY_VALUE);
});




window.addEventListener('keydown', event => {
    const KEY = event.key;
    const DISPLAY_TEXT = DISPLAY.textContent;

    if (KEY === '/') event.preventDefault();

    if (KEY === 'Backspace') {
        if (DISPLAY_TEXT == '0') return;

        deleteLastCharacter();

        if (!DISPLAY.innerText) renderInitialZeroOnDisplay();
    }

    if (KEY === '=' || KEY === 'Enter') {
        if (DISPLAY_TEXT == '0') return;

        let result = calculateExpression(DISPLAY_TEXT);
        renderResultOfExpression(result);
    };

    if (DISPLAY_TEXT.length > 10) return;

    if (DISPLAY_TEXT == '0' && KEY == '.') {
        renderCharacter(KEY);
    }

    if (specialCharacters.find(char => char === KEY)) {
        let allRenderedCharacters = DISPLAY.innerText.split('');
        let lastRenderedCharacter = allRenderedCharacters[allRenderedCharacters.length - 1];

        if (Number.isInteger(+lastRenderedCharacter)) {
            renderCharacter(KEY);
            return;
        };

        deleteLastCharacter();
        renderCharacter(KEY);
    }

    if (Number.isInteger(+KEY)) {
        if (DISPLAY_TEXT == '0') cleanDisplay();
        renderCharacter(KEY);
    }
});







function switchTheme() {
    ROOT_ELEMENT.setAttribute('data-theme', themes[sessionStorage.getItem('theme')]);
    SLIDER.value = sessionStorage.getItem('theme');
}

function renderInitialZeroOnDisplay() {
    DISPLAY.textContent = 0;
}

function deleteLastCharacter() {
    DISPLAY.textContent = DISPLAY.textContent.substr(0, DISPLAY.textContent.length - 1);
}

function cleanDisplay() {
    DISPLAY.textContent = '';
}

function renderCharacter(character) {
    DISPLAY.textContent += character;
}

function calculateExpression(expression) {
    return eval(expression);
}

function renderResultOfExpression(result) {
    DISPLAY.textContent = +result.toFixed(2);
}