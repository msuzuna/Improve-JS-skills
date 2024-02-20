export const growEievui = () => {
  class Eievui {
    constructor(name) {
      this.name = name;
      this.imagePass = "../../dist/assets/images/eevee_icon.png";
      this.breed = "イーブイ";
      this.level = 10;
      this.friendshipLevel = 9;
    }
  }

  /**
   * @type {HTMLInputElement || null}
   */
  const nameInput = document.querySelector('[data-eievui-input="name"]');
  /**
   * @type {HTMLButtonElement || null}
   */
  const nameButton = document.querySelector('[data-eievui-button="name"]');
  /**
   * @type {HTMLDivElement || null}
   */
  const screenBlock = document.querySelector('[data-eievui-screen="wrapper"]');

  if (!nameInput || !nameButton || !screenBlock) return;

  /**
   * @type {number}
   */
  let index = 0;

  /**
   * @type {obj}
   */
  const toolObj = {
    fire: "ほのおのいし",
    warter: "みずのいし",
    thunder: "かみなりのいし",
    grass: "リーフのいし",
    ice: "こおりのいし",
  };

  /**
   * @function ボタンの活性非活性を切り替える関数
   * @param {HTMLinputElement} inputElement
   * @param {HTMLButtonElement} buttonElement
   * @returns {void}
   */
  const toggleButtonActivate = (inputElement, buttonElement) => {
    const wordCount = inputElement.value.length;
    if (wordCount === 0) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  /**
   * @function 表示する文言を取得する関数
   * @param {obj} eveelutionObj
   * @returns {obj}
   */
  const getDisplayText = (eveelutionObj) => {
    const { name, breed, level } = eveelutionObj;
    const nameText = `名前：${name}`;
    const levelText = `レベル：${level}`;
    const giveName = `${breed}に${name}と名前をつけた！`;
    const levelUp = `${name}はレベル${level}になった！`;
    const friendshipLevelUp = `${name}と仲良くなった！`;
    const textObj = {
      nameText,
      levelText,
      giveName,
      levelUp,
      friendshipLevelUp,
    };
    return textObj;
  };

  /**
   * @function toolBlockElementを作成する関数
   * @param {obj} toolObj
   * @returns {HTMLDivElement}
   */
  const createToolBlockElement = (toolObj) => {
    const optionArray = [];
    const toolBlockElement = document.createElement("div");
    const toolSelectElement = document.createElement("select");
    const toolButton = document.createElement("button");
    toolButton.type = "button";
    toolButton.innerHTML = "道具を使う";
    for (let key in toolObj) {
      const option = document.createElement("option");
      option.value = key;
      option.innerHTML = toolObj[key];
      optionArray.push(option);
      toolSelectElement.appendChild(option);
    }
    toolSelectElement.size = Object.keys(toolObj).length;
    toolBlockElement.appendChild(toolSelectElement);
    toolBlockElement.appendChild(toolButton);
    return toolBlockElement;
  };

  /**
   * @function ゲーム画面を作成する関数
   * @param {obj} eeveelutionObj
   * @param {number} index
   * @returns {void}
   */
  const createScreen = (eeveelutionObj, toolObj, index) => {
    const { nameText, levelText, giveName } = getDisplayText(eeveelutionObj);
    const screen = document.createElement("div");
    screen.dataset.eievuiScreen = index;

    const nameDisplayElement = document.createElement("p");
    nameDisplayElement.innerHTML = nameText;
    nameDisplayElement.dataset.eievuiName = index;

    const descriptionDisplayElement = document.createElement("p");
    descriptionDisplayElement.innerHTML = giveName;
    descriptionDisplayElement.dataset.eievuiDescription = index;

    const levelDisplayElement = document.createElement("p");
    levelDisplayElement.innerHTML = levelText;
    levelDisplayElement.dataset.eievuiLevel = index;

    const imageElement = document.createElement("img");
    imageElement.src = eeveelutionObj.imagePass;
    imageElement.dataset.eievuiImage = index;

    const toolBlockElement = createToolBlockElement(toolObj);

    screen.appendChild(descriptionDisplayElement);
    screen.appendChild(nameDisplayElement);
    screen.appendChild(levelDisplayElement);
    screen.appendChild(imageElement);
    screen.appendChild(toolBlockElement);
    screenBlock.appendChild(screen);
  };

  nameInput.addEventListener("input", () => {
    toggleButtonActivate(nameInput, nameButton);
  });

  nameButton.addEventListener("click", () => {
    const name = nameInput.value;
    const eievui = new Eievui(name);
    createScreen(eievui, toolObj, index);
    index += 1;
  });
};
