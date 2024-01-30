export const lottery = () => {
  /**
   * 抽選を開始するボタン要素
   * @type {Element | null}
   */
  const triggerButton = document.querySelector('[data-lottery="trigger"]');
  /**
   * 抽選結果の数字を表示するための要素
   * @type {Element | null}
   */
  const resultNumberArea = document.querySelector('[data-lottery="number"]');
  /**
   * 抽選結果を表示させるための要素
   * @type {Element | null}
   */
  const resultStringArea = document.querySelector('[data-lottery="string"]');

  if (!triggerButton || !resultNumberArea || !resultStringArea) return;

  /**
   * 通信エラー
   */
  class FetchError extends Error {
    /**
     * @param {string} message エラーメッセージ
     */
    constructor(message) {
      super(message);
      this.name = "FetchError";
    }
  }

  /**
   * 検索結果がないエラー
   */
  class NoDataError extends Error {
    /**
     * @param {string} message エラーメッセージ
     */
    constructor(message) {
      super(message);
      this.name = "NoDataError";
    }
  }

  /**
   * @function
   * @returns {Promise<number>}
   */
  const promiseReturnNumber = () => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        /**
         * ランダムな整数を生成する関数
         * @function
         * @returns {number} ランダムな整数
         */
        const generateNumber = () => {
          /**
           * @type {number} 最小の整数
           */
          const min = 1;
          /**
           * @type {number} 最大の整数
           */
          const max = 5;
          return Math.floor(Math.random() * (max - min + 1) + min);
        };
        const result = generateNumber();
        if (typeof result === "number") {
          resolve(result);
        } else {
          reject();
        }
      }, 1000);
    });
  };

  /**
   * @async
   * @function
   * @param {number} 整数パラメータ
   * @returns {Promise<any>} Promiseオブジェクトはjsonデータを表す
   * @throws {FetchError} 通信エラー
   */
  const fetchReturnString = async (number) => {
    /**
     * @type {string} ファイル名
     */
    const filename = number !== 5 ? "lottery.json" : "lotteryDummy.json";
    /**
     * @type {Response} responseオブジェクト
     */
    const response = await fetch(`../../assets/json/${filename}`);
    if (!response.ok) {
      throw new FetchError("fetch error");
    }
    const json = await response.json();
    return json;
  };

  /**
   * くじの抽選結果を表示させる関数
   * @async
   * @function
   * @throws {NoDataError} No Data エラー
   */
  const displayLotteryResult = async () => {
    try {
      /**
       * @type {number} ランダムな整数
       */
      const resultNumber = await promiseReturnNumber();
      resultNumberArea.innerHTML = resultNumber.toString();

      /**
       * @type {Object} json
       */
      const resultJson = await fetchReturnString(resultNumber);
      if (resultJson[resultNumber] === undefined) {
        throw new NoDataError("no data error");
      }
      resultStringArea.innerHTML = await resultJson[resultNumber];
    } catch (e) {
      /**
       * エラーの種類に応じて適切なエラー文言を取得する関数
       * @param {Object} エラーオブジェクト
       * @returns {string} ユーザーに提示するエラー文言
       */
      const getErrorMessage = (e) => {
        if (e instanceof FetchError) {
          return "通信が失敗しました。";
        } else if (e instanceof NoDataError) {
          return "抽選結果のデータに抽選結果の数字がありませんでした。";
        } else {
          return "予期しないエラーが発生しました。";
        }
      };
      /**
       * @type {string} ユーザーに提示するエラー文言
       */
      const errorMessage = await getErrorMessage(e);
      resultStringArea.innerHTML = await errorMessage;
    }
  };

  // ボタンをクリックしたら抽選が始まる
  triggerButton.addEventListener("click", () => {
    displayLotteryResult();
  });
};
