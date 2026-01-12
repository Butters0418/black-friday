// 拉拉熊取 id 資料
function getDataById(data, ...args) {
  let pdObj = [];
  args.forEach((el) => {
    const obj = data.filter((item) => item.BlockId === el)[0];
    obj !== undefined && (pdObj = pdObj.concat(obj.Nodes));
  });
  return pdObj;
}

export default getDataById;
