// right nav (pc)
import tw, { styled } from 'twin.macro';

export const SNavContainer = styled.div`
  ${tw`fixed right-0 z-50 hidden w-[120px] duration-300 text-right`}
  ${tw`md:(block)`}
  ${(props) =>
    props.isScrollTop
      ? tw`2xl:top-[20px] top-[20px]`
      : tw`2xl:top-20 top-[60px]`}
  ${(props) => (props.isOpen ? tw`` : tw`pointer-events-none`)}
`;

// 收合按鈕
export const SButton = styled.button`
  ${tw`pointer-events-auto h-10 w-10 rounded-lg bg-gray-800 duration-200 hover:bg-opacity-80 inline-flex justify-center items-center`}
`;

// 下方面版
export const SListContainer = styled.div`
  ${tw`w-full bg-black bg-opacity-80 mt-2 p-[5px] text-sm text-white duration-200`}
  ${(props) => (props.isOpen ? '' : tw`translate-x-full`)}
`;

// 選單列表
export const SListUl = styled.ul`
  ${tw`text-center`}
  li:nth-last-of-type(1) {
    ${tw`mt-1`}
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
    ${tw`relative block w-full py-1 font-normal leading-[1.2] duration-100 `}
    ${(props) => (props.isActive ? tw`text-[#fff15d]` : tw`text-white`)}
  }
`;

// 回上方按鈕
export const SBackTopBtn = styled.button`
  ${tw`mt-5 block w-full`}
  span {
    ${tw`flex flex-col items-center justify-center text-[15px] font-medium leading-[1.2] text-white`}
  }
`;
