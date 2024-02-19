export const growEievui = () => {
  class Eievui {
    constructor(name) {
      this.name = name;
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
  if (!nameInput || !nameButton) return;

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

  nameInput.addEventListener("input", () => {
    toggleButtonActivate(nameInput, nameButton);
  });

  nameButton.addEventListener("click", () => {
    const name = nameInput.value;
    const eievui = new Eievui(name);
    console.log(eievui);
  });
};
