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

  nameInput.addEventListener("input", () => {
    toggleButtonActivate(nameInput, nameButton);
  });

  nameButton.addEventListener("click", () => {
    const name = nameInput.value;
    const eievui = new Eievui(index, name);
    createScreen(screenBlock, eievui, toolObj, index);
    index += 1;

    const toolButtons = document.querySelectorAll("[data-eievui-tool]");
    if (toolButtons.length === 0) return;

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
        deactiveToolBlock(currentIndex);
        updateScreen(currentIndex, newPoke);
      });
    });
  });
};
