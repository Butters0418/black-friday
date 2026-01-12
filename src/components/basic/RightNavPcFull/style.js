// 桌機右選(滿版)
import tw, { styled } from 'twin.macro';

export const SNavContainer = styled.div`
  ${tw`fixed z-50 top-0 bottom-0 right-0 w-[120px] p-[5px] bg-rightNavBg bg-opacity-75`}
`;

// 選單內容 (列表+按鈕)
export const SFlexContainer = styled.div`
  ${tw`flex h-full flex-col items-center justify-center duration-300`}
`;

// 選單列表
export const SListUl = styled.ul`
  ${tw`text-center`}
  li:nth-of-type(1) {
    ${tw`mb-3`}
    a {
      ${tw`block text-center`}
    }
    img {
      ${tw`inline-block h-24 w-24`}
    }
  }
`;

// 各錨點按鈕
export const SHashLink = styled.li`
  button {
    ${tw`relative flex justify-center items-center flex-wrap w-full py-2 text-[15px] font-medium  leading-[1.2] after:block duration-100 whitespace-nowrap`}
    ${tw`after:(mx-auto mt-3 w-16 h-[1px] bg-rightNavText)`}
    ${(props) =>
      props.isActive ? tw`text-rightNavActive` : tw`text-rightNavText`}
    p {
      ${tw`flex w-full justify-center`}
    }
    img {
      ${tw`w-4 h-4 mr-0.5 mt-[1px]`}
    }
  }
`;

// 回上方按鈕
export const SBackTopBtn = styled.button`
  ${tw`mt-[7vh] block w-full`}
  ${tw`2xl:(mt-[14vh])`}
  span {
    ${tw`flex flex-col items-center justify-center text-[15px] font-medium leading-[1.2] text-rightNavText`}
  }
`;
