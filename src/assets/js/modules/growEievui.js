export const growEievui = () => {
  /**
   * @class イーブイクラス
   */
  class Eievui {
    /**
     * イーブイのステータス
     * @param {string} name
     */
    constructor(name) {
      this.name = name;
      this.imagePass = "../../dist/assets/images/eevee_icon.png";
      this.breed = "イーブイ";
      this.level = 10;
      this.friendshipLevel = 9;
    }
  }

  /**
   * @class ブースタークラス
   */
  class Booster extends Eievui {
    /**
     * イーブイのステータス
     * @param {string} name
     */
    constructor(name, level, friendshipLevel) {
      super(name, level, friendshipLevel);
      this.imagePass = "../../dist/assets/images/flareon_icon.png";
      this.breed = "ブースター";
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
    const evolve = `おめでとう！${name}は${breed}に進化した！`;
    const textObj = {
      nameText,
      levelText,
      giveName,
      levelUp,
      friendshipLevelUp,
      evolve,
    };
    return textObj;
  };

  const createEvolvedPoke = (eeveelutionObj, usedTool) => {
    const { name, level, friendshipLevel } = eeveelutionObj;
    switch (usedTool) {
      case "fire":
        return new Booster(name, level, friendshipLevel);
    }
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

  /**
   * @function ゲーム画面を作成する関数
   * @param {obj} eeveelutionObj
   * @param {number} index
   * @returns {void}
   */
  const createScreen = (eeveelutionObj, toolObj, index) => {
    const screen = document.createElement("div");
    screen.dataset.eievuiScreen = index;

    const statusBlockElement = createStatusBlockElement(eeveelutionObj, index);
    const toolBlockElement = createToolBlockElement(toolObj, index);
    screen.appendChild(statusBlockElement);
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

    const toolButtons = document.querySelectorAll("[data-eievui-tool]");
    if (toolButtons.length === 0) return;

    toolButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const getUsedTool = (e) => {
          const currentIndex = Number(e.target.dataset.eievuiTool);
          const select = document.querySelector(
            `[data-eievui-select="${currentIndex}"]`
          );
          const options = select.children;
          const selectedindex = select.selectedIndex;
          const selectValue = options[selectedindex].value;
          return selectValue;
        };
        const usedTool = getUsedTool(e);
        const newPoke = createEvolvedPoke(eievui, usedTool);
        console.log(newPoke);
      });
    });
  });
};
