/**
 * @class イーブイクラス
 */
export class Eievui {
  /**
   * ポケモンのステータス
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.imagePass = "../../dist/assets/images/eevee_icon.png";
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
   * @param {string} name
   */
  constructor(name, level, friendshipLevel) {
    super(name, level, friendshipLevel);
    this.imagePass = "../../dist/assets/images/flareon_icon.png";
    this.breed = "ブースター";
  }
}

/**
 * @class サンダースクラス
 */
export class Thunders extends Eievui {
  /**
   * ポケモンのステータス
   * @param {string} name
   */
  constructor(name, level, friendshipLevel) {
    super(name, level, friendshipLevel);
    this.imagePass = "../../dist/assets/images/jolteon_icon.png";
    this.breed = "サンダース";
  }
}
/**
 * @class シャワーズクラス
 */
export class Showers extends Eievui {
  /**
   * ポケモンのステータス
   * @param {string} name
   */
  constructor(name, level, friendshipLevel) {
    super(name, level, friendshipLevel);
    this.imagePass = "../../dist/assets/images/vaporeon_icon.png";
    this.breed = "シャワーズ";
  }
}
/**
 * @class リーフィアクラス
 */
export class Leafia extends Eievui {
  /**
   * ポケモンのステータス
   * @param {string} name
   */
  constructor(name, level, friendshipLevel) {
    super(name, level, friendshipLevel);
    this.imagePass = "../../dist/assets/images/leafeon_icon.png";
    this.breed = "リーフィア";
  }
}
/**
 * @class グレイシアクラス
 */
export class Glacia extends Eievui {
  /**
   * ポケモンのステータス
   * @param {string} name
   */
  constructor(name, level, friendshipLevel) {
    super(name, level, friendshipLevel);
    this.imagePass = "../../dist/assets/images/glaceon_icon.png";
    this.breed = "グレイシア";
  }
}
