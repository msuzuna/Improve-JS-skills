export const checkForm = () => {
  /**
   * バリデーションチェックをする関数
   * @returns {void}
   */
  const ckeckValidation = () => {
    /**
     * @type {HTMLInputElement || null} 名字のinput要素
     */
    const familyNameControl = document.getElementById("family-name");
    /**
     * @type {HTMLInputElement || null} 名前のinput要素
     */
    const firstNameControl = document.getElementById("first-name");
    /**
     * @type {Array<HTMLInputElement || null>}
     */
    const nameControls = [familyNameControl, firstNameControl];

    nameControls.forEach((nameControl) => {
      if (!nameControl) return;

      nameControl.addEventListener("input", () => {
        const errorMsg = nameControl.nextElementSibling;
        if (!errorMsg) return;
        const { patternMismatch, valueMissing, tooLong, valid } =
          nameControl.validity;
        if (patternMismatch) {
          errorMsg.textContent = "日本語で入力してください。";
        } else if (valueMissing) {
          errorMsg.textContent = "必須項目です。";
        } else if (tooLong) {
          errorMsg.textContent = `${nameControl.maxLength}文字内でご記入ください。現在${nameControl.value.length}文字です。`;
        } else if (valid) {
          errorMsg.textContent = "";
        }
      });
    });

    /**
     * @type {HTMLInputElement || null} 名字のカナinput要素
     */
    const familyKanaControl = document.getElementById("family-name-kana");
    /**
     * @type {HTMLInputElement || null} 名前のカナinput要素
     */
    const firstKanaControl = document.getElementById("first-name-kana");
    /**
     * @type {Array<HTMLInputElement || null>}
     */
    const kanaControls = [familyKanaControl, firstKanaControl];

    kanaControls.forEach((kanaControl) => {
      if (!kanaControl) return;
      kanaControl.addEventListener("input", () => {
        const errorMsg = kanaControl.nextElementSibling;
        if (!errorMsg) return;
        const { patternMismatch, tooLong, valid } = kanaControl.validity;
        if (patternMismatch) {
          errorMsg.textContent = "カナで入力してください。";
        } else if (tooLong) {
          errorMsg.textContent = `${kanaControl.maxLength}文字内でご記入ください。現在${kanaControl.value.length}文字です。`;
        } else if (valid) {
          errorMsg.textContent = "";
        }
      });
    });
  };

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

  ckeckValidation();
  toggleButtonClickable();
};
