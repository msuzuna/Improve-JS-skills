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
  const screenBlock = document.querySelector('[data-eievui-screen="wrapper"]');
  if (!nameInput || !nameButton || !screenBlock) return;

  /**
   * @type {number}
   */
  let index = 0;

  /**
   * @function
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

  const getDisplayText = (eveelutionObj) => {
    const { name, level } = eveelutionObj;
    const nameText = `名前：${name}`;
    const levelText = `レベル：${level}`;
    return [nameText, levelText];
  };

  const createScreen = (eeveelutionObj, index) => {
    const [nameText, levelText] = getDisplayText(eeveelutionObj);
    const screen = document.createElement("div");
    screen.dataset.eievuiScreen = index;

    const nameDisplayElement = document.createElement("p");
    nameDisplayElement.innerHTML = nameText;
    nameDisplayElement.dataset.eievuiName = index;

    const levelDisplayElement = document.createElement("p");
    levelDisplayElement.innerHTML = levelText;
    levelDisplayElement.dataset.eievuiLevel = index;

    const imageElement = document.createElement("img");
    imageElement.src = eeveelutionObj.imagePass;
    imageElement.dataset.eievuiImage = index;

    screen.appendChild(nameDisplayElement);
    screen.appendChild(levelDisplayElement);
    screen.appendChild(imageElement);
    screenBlock.appendChild(screen);
  };

  nameInput.addEventListener("input", () => {
    toggleButtonActivate(nameInput, nameButton);
  });

  nameButton.addEventListener("click", () => {
    const name = nameInput.value;
    const eievui = new Eievui(name);
    createScreen(eievui, index);
    index += 1;
  });
};
