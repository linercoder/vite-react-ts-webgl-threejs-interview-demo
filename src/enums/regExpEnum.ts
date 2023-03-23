export const regExpEnum = {
  /** 匹配数字字母下划线 */
  Match_Number_Letter_Underline: /^[A-Za-z\d_]+$/,

  /**  匹配正整数字 */
  Match_Number: /^[1-9][0-9]*$/g,

  /** 匹配中文 */
  Match_Chinese: /[\u4E00-\u9FFF]+/g,

  /** 匹配中文英文数字 */
  Match_Chinese_Char_Number: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/g,

  /** 匹配特殊字符 */
  Match_Special_Char: /[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]/g,
};
