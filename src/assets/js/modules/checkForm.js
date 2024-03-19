export const checkForm = () => {
  /**
   * バリデーションチェックをする関数
   * @returns {void}
   */
  const checkValidation = () => {
    /**
     * @type {HTMLInputElement | null} 名字のinput要素
     */
    const familyNameControl = document.getElementById("family-name");
    /**
     * @type {HTMLInputElement | null} 名前のinput要素
     */
    const firstNameControl = document.getElementById("first-name");
    /**
     * @type {HTMLInputElement | null} 名字のカナinput要素
     */
    const familyKanaControl = document.getElementById("family-name-kana");
    /**
     * @type {HTMLInputElement | null} 名前のカナinput要素
     */
    const firstKanaControl = document.getElementById("first-name-kana");
    /**
     * @type {HTMLInputElement |null} 電話番号のinput要素
     */
    const phoneControl = document.getElementById("phone");
    /**
     * @type {HTMLInputElement | null} メールアドレス①のinput要素
     */
    const mailControl1 = document.getElementById("mail1");
    /**
     * @type {HTMLInputElement | null} メールアドレス②のinput要素
     */
    const mailControl2 = document.getElementById("mail2");
    /**
     * @type {HTMLSelectElement | null} 都道府県を選択するselect要素
     */
    const addressControl1 = document.getElementById("prefecure");
    /**
     * @type {HTMLSelectElement | null} 市区町村を選択するselect要素
     */
    const addressControl2 = document.getElementById("city");

    /**
     * @type {Array<HTMLInputElement | HTMLSelectElement | null>}
     */
    const controlArray = [
      familyNameControl,
      firstNameControl,
      familyKanaControl,
      firstKanaControl,
      phoneControl,
      mailControl1,
      mailControl2,
      addressControl1,
      addressControl2,
    ];

    /**
     * エラーメッセージが格納されたオブジェクトを返す関数
     * @param {String} id フォームコントロール要素のid
     * @returns {Object} エラーメッセージが格納されたオブジェクト
     */
    const getErrorMsg = (id) => {
      switch (id) {
        case "family-name": {
          const patternMismatchText = "日本語で入力してください。";
          return {
            patternMismatchText,
          };
        }
        case "first-name": {
          const patternMismatchText = "日本語で入力してください。";
          return {
            patternMismatchText,
          };
        }
        case "family-name-kana": {
          const patternMismatchText = "カナで入力してください。";
          return {
            patternMismatchText,
          };
        }
        case "first-name-kana": {
          const patternMismatchText = "カナで入力してください。";
          return {
            patternMismatchText,
          };
        }
        case "phone": {
          const patternMismatchText =
            "ハイフンなしの半角数字でご記入ください。";
          return {
            patternMismatchText,
          };
        }
        case "mail1": {
          const patternMismatchText =
            "半角英数字または記号で入力してください。";
          const typeMismatchText = "メールアドレスの形式で入力してください";
          return {
            patternMismatchText,
            typeMismatchText,
          };
        }
        case "mail2": {
          const patternMismatchText =
            "半角英数字または記号で入力してください。";
          const typeMismatchText = "メールアドレスの形式で入力してください";
          return {
            patternMismatchText,
            typeMismatchText,
          };
        }
        default: {
          return {};
        }
      }
    };

    controlArray.forEach((control) => {
      if (!control) return;
      const errorMsg = control.nextElementSibling;
      if (!errorMsg) return;
      const { patternMismatchText, typeMismatchText } = getErrorMsg(control.id);
      const { minLength, maxLength } = control;
      control.addEventListener("input", () => {
        const {
          patternMismatch,
          typeMismatch,
          valueMissing,
          tooShort,
          tooLong,
          valid,
        } = control.validity;
        if (patternMismatch) {
          errorMsg.textContent = patternMismatchText;
        } else if (typeMismatch) {
          errorMsg.textContent = typeMismatchText;
        } else if (valueMissing) {
          errorMsg.textContent = "必須項目です。";
        } else if (tooShort) {
          const { value } = control;
          errorMsg.textContent = `${minLength}文字以上でご記入ください。現在${value.length}文字です。`;
        } else if (tooLong) {
          const { value } = control;
          errorMsg.textContent = `${maxLength}文字内でご記入ください。現在${value.length}文字です。`;
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
     * @type {HTMLButtonElement | null} フォームの送信ボタン
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

    formControls.forEach((control) => {
      control.addEventListener("input", () => {
        toggleButtonClickable(formControls, submitButton);
      });
    });
  };

  checkValidation();
  toggleButtonClickable();
};
