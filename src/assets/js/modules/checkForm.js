export const checkForm = () => {
  /**
   * 送信ボタンの活性非活性を切り替える関数
   * @returns {void}
   */
  const toggleButtonClickable = () => {
    /**
     * @type {HTMLButtonElement || null} フォームの送信ボタン
     */
    const submitButton = document.querySelector('[data-form="submit"]');
    if (!submitButton) return;

    /**
     * @type {Array<HTMLInputElement>} input要素が格納されている配列
     */
    const inputs = document.querySelectorAll('[data-form="input"]');

    /**
     * @type {Array<HTMLSelectElement>} select要素が格納されている配列
     */
    const selects = document.querySelectorAll('[data-form="select"]');

    /**
     * @type {Array<HTMLElement>} フォームコントロールが格納されている配列
     */
    const formControls = [...inputs, ...selects];
    if (formControls.length === 0) return;

    /**
     * 入力必須のフォームコントロールが全て入力されているかどうかを返す関数
     * @param {Array<HTMLElement>} formControlsRequierd
     * @returns {Boolean}
     */
    const checkAllEntered = (formControls) => {
      const isAllEntered = formControls.every(
        (element) => element.validity.valid
      );
      return isAllEntered;
    };

    /**
     * 送信ボタンの活性非活性を引き換える関数
     * @param {Boolean} isAllEntered
     * @param {HTMLButtonElement} submitButton
     */
    const toggleButtonClickable = (formControls, submitButton) => {
      const isAllEntered = checkAllEntered(formControls);
      if (isAllEntered) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    };

    formControls.forEach((htmlElement) => {
      htmlElement.addEventListener("input", () => {
        toggleButtonClickable(formControls, submitButton);
      });
    });
  };

  toggleButtonClickable();
};
