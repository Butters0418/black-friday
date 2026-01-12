// 桌機左選
import tw, { styled } from 'twin.macro';

export const SNavContainer = styled.div`
  ${tw`fixed left-0 z-50 hidden w-[120px] duration-300 text-left`}
  ${tw`md:(block)`}
  ${(props) =>
    props.isScrollTop
      ? tw`2xl:top-[20px] top-[20px]`
      : tw`2xl:top-20 top-[60px]`}
  ${(props) => (props.isOpen ? tw`` : tw`pointer-events-none`)}
`;

// 收合按鈕
export const SButton = styled.button`
  ${tw`pointer-events-auto h-10 w-10 rounded-lg bg-[rgba(0,0,0,0.7)] duration-200 hover:bg-opacity-80 flex justify-center items-center`}
`;

// 選單列表
export const SListContainer = styled.div`
  ${tw`w-full mt-2 text-sm duration-200`}

  ${(props) => (props.isOpen ? '' : tw`-translate-x-full`)}

  ul {
    ${tw`grid w-full gap-0 rounded-[8px] overflow-hidden`}
    ${tw`border border-solid border-leftNavBg`}
    li {
      ${tw`h-[32px]`}
      ${tw`bg-leftNavBg border-solid border-leftNavBg border-t`}
      a {
        ${tw`flex items-center justify-center w-full h-full text-leftNavText font-[14px] font-medium duration-200`}
        ${tw`hover:(bg-leftNavTextBgHover text-leftNavTextHover)`}
      }
    }
  }
`;

// 左選單貼紙
export const SSticker = styled.a`
  ${tw`mb-0.5 block relative z-10`}
  >img {
    ${tw`object-cover duration-200 hover:brightness-105`}
  }
`;

export const SListWrap = styled.div`
  ${tw`relative -mt-[20px] space-y-[6px] overflow-hidden rounded-[8px] px-[6px] pb-[6px] pt-[32px] bg-no-repeat`}
`;

// 左選上欄
export const STopList = styled.div`
  a {
    ${tw`relative flex flex-col h-[40px] items-center justify-center text-[18px] font-medium duration-200 text-leftNavActivityText`}
  }
  a:hover {
    ${tw`text-leftNavActivityTextHover`}
  }
  a::after {
    ${tw`content-[attr(after)] absolute bottom-0 left-1/2 -translate-x-1/2 bg-leftNavActivityText`}
    ${tw`mx-auto block h-[1px] w-[98px]`}
  }
  a:nth-last-of-type(1)::after {
    ${tw`hidden`}
  }
`;

// 左選中欄
export const SMainList = styled.ul`
  ${tw`grid-cols-2`}
  li {
    &:nth-of-type(2n + 1) {
      ${tw`border-r`}
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      ${tw`border-t-0`}
    }
  }
`;

// 左選下欄
export const SSubList = styled.ul`
  ${tw`grid-cols-1`}
  li {
    &:nth-of-type(1) {
      ${tw`border-t-0`}
    }
  }
`;
