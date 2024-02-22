/**
 * @class イーブイクラス
 */
export class Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   */
  constructor(key, name) {
    this.key = key;
    this.name = name;
    this.imagePass = "./assets/images/eevee_icon.png";
    this.breed = "イーブイ";
    this.level = 10;
    this.friendshipLevel = 9;
  }
}

/**
 * @class ブースタークラス
 */
export class Booster extends Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   * @param {number} level
   * @param {number} friendshipLevel
   *
   */
  constructor(key, name, level, friendshipLevel) {
    super(key, name, level, friendshipLevel);
    this.imagePass = "./assets/images/flareon_icon.png";
    this.breed = "ブースター";
  }
}

/**
 * @class サンダースクラス
 */
export class Thunders extends Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   * @param {number} level
   * @param {number} friendshipLevel
   */
  constructor(key, name, level, friendshipLevel) {
    super(key, name, level, friendshipLevel);
    this.imagePass = "./assets/images/jolteon_icon.png";
    this.breed = "サンダース";
  }
}
/**
 * @class シャワーズクラス
 */
export class Showers extends Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   * @param {number} level
   * @param {number} friendshipLevel
   */
  constructor(key, name, level, friendshipLevel) {
    super(key, name, level, friendshipLevel);
    this.imagePass = "./assets/images/vaporeon_icon.png";
    this.breed = "シャワーズ";
  }
}
/**
 * @class リーフィアクラス
 */
export class Leafia extends Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   * @param {number} level
   * @param {number} friendshipLevel
   *
   */
  constructor(key, name, level, friendshipLevel) {
    super(key, name, level, friendshipLevel);
    this.imagePass = "./assets/images/leafeon_icon.png";
    this.breed = "リーフィア";
  }
}
/**
 * @class グレイシアクラス
 */
export class Glacia extends Eievui {
  /**
   * ポケモンのステータス
   * @param {number} key
   * @param {string} name
   * @param {number} level
   * @param {number} friendshipLevel
   */
  constructor(key, name, level, friendshipLevel) {
    super(key, name, level, friendshipLevel);
    this.imagePass = "./assets/images/glaceon_icon.png";
    this.breed = "グレイシア";
  }
}
