/**
 * @function 表示する文言を取得する関数
 * @param {obj} eveelutionObj
 * @returns {obj}
 */
export const getDisplayText = (eveelutionObj) => {
  const { name, breed, level } = eveelutionObj;
  const nameText = `名前：${name}`;
  const levelText = `レベル：${level}`;
  const giveName = `${breed}に${name}と名前をつけた！`;
  const levelUp = `${name}はバトルで経験を積んだ！レベル${level}になった！`;
  const friendshipLevelUp = `${name}と仲良くなった！`;
  const evolve = `おめでとう！${breed}に進化した！`;
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
