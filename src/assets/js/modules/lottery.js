export const lottery = () => {
  /**
   * @type {Element | null}
   */
  const triggerButton = document.querySelector('[data-lottery="trigger"]');
  /**
   * @type {Element | null}
   */
  const resultNumberArea = document.querySelector('[data-lottery="number"]');
  /**
   * @type {Element | null}
   */
  const resultStringArea = document.querySelector('[data-lottery="string"]');

  if (!triggerButton || !resultNumberArea || !resultStringArea) return;

  class FetchError extends Error {
    constructor(message) {
      super(message);
      this.name = "FetchError";
    }
  }

  class NoDataError extends Error {
    constructor(message) {
      super(message);
      this.name = "NoDataError";
    }
  }

  const promiseReturnNumber = () => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const generateNumber = () => {
          const min = 1;
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

  const fetchReturnString = async (number) => {
    const filename = number !== 5 ? "lottery.json" : "lotteryDummy.json";
    const response = await fetch(`../../dist/assets/json/${filename}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new FetchError("fetch error");
    }
  };

  // くじの抽選結果を返す関数
  const getLotteryResult = async () => {
    try {
      const resultNumber = await promiseReturnNumber();
      resultNumberArea.innerHTML = await resultNumber;
      const resultJson = await fetchReturnString(resultNumber);
      if (resultJson[resultNumber] === undefined) {
        throw new NoDataError("no data error");
      }
      resultStringArea.innerHTML = await resultJson[resultNumber];
    } catch (e) {
      const getErrorMessage = (e) => {
        if (e instanceof FetchError) {
          return "通信が失敗しました。";
        } else if (e instanceof NoDataError) {
          return "抽選結果のデータに抽選結果の数字がありませんでした。";
        } else {
          return "予期しないエラーが発生しました。";
        }
      };
      const errorMessage = await getErrorMessage(e);
      resultStringArea.innerHTML = await errorMessage;
    } finally {
      console.log("end");
    }
  };

  // ボタンをクリックしたら抽選が始まる
  triggerButton.addEventListener("click", () => {
    getLotteryResult();
  });
};
