const SLIDER=document.querySelector(".slider"),ROOT_ELEMENT=document.documentElement,BODY=document.body,CALC_DISPLAY=document.querySelector(".calc__display"),CALC_BODY=document.querySelector(".calc__body");let themes={1:"neutral",2:"light",3:"dark"},themesMainBackgroundColors={neutral:"rgb(58, 71, 100)",light:"rgb(230, 230, 230)",dark:"rgb(22, 6, 40)"};const getObjectKeyByValue=(e,t)=>Object.entries(e).find(e=>e[1]===t)[0];function getCurrentThemeName(){var e=getComputedStyle(BODY).backgroundColor;return getObjectKeyByValue(themesMainBackgroundColors,e)}function setCurrentThemePositionInSwitcher(){var e=getCurrentThemeName(),e=getObjectKeyByValue(themes,e);SLIDER.value=e}function switchTheme(){var e=SLIDER.value,e=themes[e];ROOT_ELEMENT.setAttribute("data-theme",e),BODY.style.backgroundColor=themesMainBackgroundColors[e]}function renderInitialZeroOnDisplay(){CALC_DISPLAY.innerText=0}function deleteLastCharacter(){CALC_DISPLAY.innerText=CALC_DISPLAY.innerText.substr(0,CALC_DISPLAY.innerText.length-1)}function cleanDisplay(){CALC_DISPLAY.innerText=""}function characterIsOperator(t){return["+","-","*","/"].some(e=>e==t)}function renderCharacterOnDisplay(e){CALC_DISPLAY.innerText+=e}function renderExpressionResultOnDisplay(e){CALC_DISPLAY.innerText=+e.toFixed(2)}setCurrentThemePositionInSwitcher(),SLIDER.addEventListener("change",switchTheme),CALC_BODY.addEventListener("click",event=>{const KEY_VALUE=event.target.innerText;if(!event.target.classList.contains("calc__body")){if("DEL"===KEY_VALUE)return 0==CALC_DISPLAY.innerText?void 0:(deleteLastCharacter(),void(CALC_DISPLAY.innerText||renderInitialZeroOnDisplay()));if("RESET"===KEY_VALUE)return cleanDisplay(),void renderInitialZeroOnDisplay();if("="!==KEY_VALUE){if(!(10<CALC_DISPLAY.innerText.length)){0==CALC_DISPLAY.innerText&&cleanDisplay();let renderedCharacters=CALC_DISPLAY.innerText.split(""),lastWellBeCheckedCharacter=renderedCharacters[renderedCharacters.length-1],isLastRenderedCharacterOperator=characterIsOperator(lastWellBeCheckedCharacter),isRecentlyCharacterOperator=characterIsOperator(KEY_VALUE);isLastRenderedCharacterOperator&&isRecentlyCharacterOperator||renderCharacterOnDisplay(KEY_VALUE)}}else{if(0==CALC_DISPLAY.innerText)return;const EXPRESSION=CALC_DISPLAY.innerText;let result=eval(EXPRESSION);renderExpressionResultOnDisplay(result)}}});