function filterData(data) {
  // filter empty data
  let newData = data.map((item) => {
    const filterLists = item.Nodes.filter((item) => {
      return item.Link.Url !== '';
    });
    const newObj = {
      BlockId: item.BlockId,
      Nodes: filterLists,
    };
    return newObj;
  });

  // [Nav] lala bear nav id list
  const navIdList = [144, 357, 358, 359, 360];

  // [Products] lala bear products id list
  const pdIdList = [
    31, 42, 53, 64, 220, 231, 242, 88, 99, 110, 121, 289, 300, 311, 673, 684,
    695, 706, 717, 728, 739, 750, 761, 772, 783, 794, 805, 816, 827,
  ];

  // [Nav] final nav new data
  let navData = {};

  // [Nav] nav now id
  let navBlockId = null;

  // [Nav] filter nav data from newData
  let navAry = newData.filter((item) => {
    return navIdList.includes(parseInt(item.BlockId));
  });

  navAry.length !== 0 && newNavData();

  function newNavData() {
    navBlockId = parseInt(navAry[0].BlockId);
    let navObj = navAry[0].Nodes;

    // [Nav] sticker
    navData.stickerImg = {
      url: navObj[0].Link.Url,
      imgSrc: navObj[0].Img.Src,
    };

    // [Nav] main active link
    navData.mainActiveUrl = navObj[1].Link.Url;

    // [Nav] other link & brands link
    navData.otherLink = [...navObj]
      .filter((item) => item.Id > 5)
      .map(({ Id, Link: { Url, Text } }) => {
        const obj = {
          id: Id,
          url: Url,
          text: Text,
        };
        return obj;
      });
  }

  // [Products] filter products data without nav data
  let pdData = newData.filter((item) => {
    return parseInt(item.BlockId) !== navBlockId;
  });

  // [Products] new data & defined BlockId by firstId
  let productsData = pdData.map((item) => {
    const blockId = parseInt(item.BlockId);
    const firstId = pdIdList.find(
      (item) => blockId >= item && blockId < item + 10,
    );
    const newObj = {
      BlockId: firstId,
      Nodes: [],
    };
    newObj.Nodes = item.Nodes.map(
      ({
        Id,
        Link: { Url, Text, Text1, Text2, Text3 },
        Img: { Src, Title },
      }) => {
        const obj = {
          id: Id,
          url: Url,
          productName: Text,
          productTitle: Text2,
          marketPrice: Text3,
          discountPrice: Text1,
          imgSrc: Src,
          imgTitle: Title,
        };
        return obj;
      },
    );
    return newObj;
  });
  return [navData, productsData];
}

export default filterData;
