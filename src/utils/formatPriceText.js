function formatPriceText(String) {
  let resultString = String;
  // eslint-disable-next-line no-useless-escape
  let pattern = /[^0-9xX\$\/]+/g;
  if (pattern.test(resultString)) {
    const ChStringArray = resultString.match(pattern);
    ChStringArray.forEach((element) => {
      const regex = new RegExp(element);
      resultString = resultString.replace(
        regex,
        `<span class='chi'>${element}</span>`,
      );
    });
  }
  // 檢驗字串是否包函 $
  if (/\$/g.test(String)) {
    resultString = resultString.replace(/\$/g, "<span class='dollar'>$</span>");
  } else {
    resultString = resultString.replace(/^/, "<span class='dollar'>$</span>");
  }
  return resultString;
}

export default formatPriceText;
