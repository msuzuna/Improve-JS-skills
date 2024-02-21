import { getDisplayText } from "./getDisplayText.js";
import {
  Eievui,
  Booster,
  Showers,
  Thunders,
  Leafia,
  Glacia,
} from "./pokeClass.js";

import {
  toggleButtonActivate,
  deactiveToolBlock,
  createScreen,
  updateScreen,
} from "./pokeUi.js";

export const growEievui = () => {
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

  const handler = {
    set: function (target, prop, value, reciever) {
      Reflect.set(target, prop, value, reciever);
      const { key } = target;
      if (prop === "level") {
        const { levelText, levelUp } = getDisplayText(target);
        const descriptionElement = document.querySelector(
          `[data-eievui-description="${key}"]`
        );
        const levelElement = document.querySelector(
          `[data-eievui-level="${key}"]`
        );
        descriptionElement.innerHTML = levelUp;
        levelElement.innerHTML = levelText;
      }
      return true;
    },
  };

  /**
   * @function 進化後のポケモンを生成する関数
   * @param {obj} eeveelutionObj
   * @param {string} usedTool
   * @returns
   */
  const createEvolvedPoke = (eeveelutionObj, usedTool) => {
    const { key, name, level, friendshipLevel } = eeveelutionObj;
    switch (usedTool) {
      case "fire":
        return new Booster(key, name, level, friendshipLevel);
      case "warter":
        return new Showers(key, name, level, friendshipLevel);
      case "thunder":
        return new Thunders(key, name, level, friendshipLevel);
      case "grass":
        return new Leafia(key, name, level, friendshipLevel);
      case "ice":
        return new Glacia(key, name, level, friendshipLevel);
    }
  };

  const changeName = (eeveelutionObj, newPoke) => {
    const { name, breed } = eeveelutionObj;
    if (name === breed) {
      newPoke.name = newPoke.breed;
    }
  };

  const battle = (pxy) => {
    pxy.level += 1;
  };

  nameInput.addEventListener("input", () => {
    toggleButtonActivate(nameInput, nameButton);
  });

  nameButton.addEventListener("click", () => {
    const name = nameInput.value;
    const eievui = new Eievui(index, name);
    const pxy = new Proxy(eievui, handler);
    createScreen(screenBlock, eievui, toolObj, index);
    index += 1;

    const toolButtons = document.querySelectorAll("[data-eievui-tool]");
    if (toolButtons.length !== 0) {
      toolButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const currentIndex = Number(e.target.dataset.eievuiTool);
          const getUsedTool = (currentIndex) => {
            const select = document.querySelector(
              `[data-eievui-select="${currentIndex}"]`
            );
            const options = select.children;
            const selectedindex = select.selectedIndex;
            const selectValue = options[selectedindex].value;
            return selectValue;
          };
          const usedTool = getUsedTool(currentIndex);
          const newPoke = createEvolvedPoke(eievui, usedTool);
          changeName(eievui, newPoke);
          deactiveToolBlock(currentIndex);
          updateScreen(currentIndex, newPoke);
        });
      });
    }

    const battleButtons = document.querySelectorAll("[data-eievui-battle]");
    if (battleButtons.length !== 0) {
      battleButtons.forEach((button) => {
        button.addEventListener("click", () => {
          battle(pxy);
        });
      });
    }
  });
};
