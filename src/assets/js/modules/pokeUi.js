import { getDisplayText } from "./getDisplayText.js";

/**
 * @function ボタンの活性非活性を切り替える関数
 * @param {HTMLinputElement} inputElement
 * @param {HTMLButtonElement} buttonElement
 * @returns {void}
 */
export const toggleButtonActivate = (inputElement, buttonElement) => {
  const wordCount = inputElement.value.length;
  if (wordCount === 0) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

/**
 * @function 道具ボックスを非活性にする関数
 * @param {number} index
 * @returns {void}
 */
export const deactiveToolBlock = (index) => {
  const selectBox = document.querySelector(`[data-eievui-select="${index}"]`);
  const selectButton = document.querySelector(`[data-eievui-tool="${index}"]`);
  selectBox.disabled = true;
  selectButton.disabled = true;
};

/**
 * @function ゲーム画面を作成する関数
 * @param {obj} eeveelutionObj
 * @param {number} index
 * @returns {void}
 */
export const createScreen = (screenBlock, eeveelutionObj, toolObj, index) => {
  const screen = document.createElement("div");
  screen.dataset.eievuiScreen = index;

  const statusBlockElement = createStatusBlockElement(eeveelutionObj, index);
  const toolBlockElement = createToolBlockElement(toolObj, index);
  screen.appendChild(statusBlockElement);
  screen.appendChild(toolBlockElement);
  screenBlock.appendChild(screen);
};

/**
 * @function 進化した時の表示を変更する関数
 * @param {number} currentIndex
 * @param {obj} eeveelutionObj
 * @returns {void}
 */
export const updateScreen = (currentIndex, eeveelutionObj) => {
  const descriptionElement = document.querySelector(
    `[data-eievui-description="${currentIndex}"]`
  );
  const nameElement = document.querySelector(
    `[data-eievui-name="${currentIndex}"]`
  );
  const imageElement = document.querySelector(
    `[data-eievui-image="${currentIndex}"]`
  );

  const { nameText, evolve } = getDisplayText(eeveelutionObj);
  const { imagePass } = eeveelutionObj;
  descriptionElement.innerHTML = evolve;
  nameElement.innerHTML = nameText;
  imageElement.src = imagePass;
};

/**
 * @function toolBlockElementを作成する関数
 * @param {obj} toolObj
 * @returns {HTMLDivElement}
 */
const createToolBlockElement = (toolObj, index) => {
  const optionArray = [];
  const toolBlockElement = document.createElement("div");
  const toolSelectElement = document.createElement("select");
  const toolButton = document.createElement("button");
  toolButton.type = "button";
  toolButton.innerHTML = "道具を使う";
  toolButton.dataset.eievuiTool = index;
  const battleButton = document.createElement("button");
  battleButton.type = "button";
  battleButton.innerHTML = "バトルをする";
  battleButton.dataset.eievuiBattle = index;
  for (let key in toolObj) {
    const option = document.createElement("option");
    option.value = key;
    option.innerHTML = toolObj[key];
    optionArray.push(option);
    toolSelectElement.appendChild(option);
  }
  toolSelectElement.size = Object.keys(toolObj).length;
  toolSelectElement.dataset.eievuiSelect = index;
  toolBlockElement.appendChild(toolSelectElement);
  toolBlockElement.appendChild(toolButton);
  toolBlockElement.appendChild(battleButton);
  return toolBlockElement;
};

/**
 * @function statusBlockElementを作成する関数
 * @param {obj} eeveelutionObj
 * @param {number} index
 * @returns {HTMLDivElement}
 */
const createStatusBlockElement = (eeveelutionObj, index) => {
  const { nameText, levelText, giveName } = getDisplayText(eeveelutionObj);
  const statusBlockElement = document.createElement("div");

  const descriptionDisplayElement = document.createElement("p");
  descriptionDisplayElement.innerHTML = giveName;
  descriptionDisplayElement.dataset.eievuiDescription = index;

  const nameDisplayElement = document.createElement("p");
  nameDisplayElement.innerHTML = nameText;
  nameDisplayElement.dataset.eievuiName = index;

  const levelDisplayElement = document.createElement("p");
  levelDisplayElement.innerHTML = levelText;
  levelDisplayElement.dataset.eievuiLevel = index;

  const imageElement = document.createElement("img");
  imageElement.src = eeveelutionObj.imagePass;
  imageElement.dataset.eievuiImage = index;

  statusBlockElement.appendChild(descriptionDisplayElement);
  statusBlockElement.appendChild(nameDisplayElement);
  statusBlockElement.appendChild(levelDisplayElement);
  statusBlockElement.appendChild(imageElement);

  return statusBlockElement;
};
