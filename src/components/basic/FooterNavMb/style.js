// footer nav mb
import tw, { styled } from 'twin.macro';

export const SNavContainer = styled.div`
  ${tw`fixed bottom-0 left-0 right-0 z-[80] block`}
  ${tw`md:(hidden)`}
  ${tw`before:(fixed top-0 left-0 right-0 bottom-0 z-[99] bg-black bg-opacity-70)`}
  ${(props) => (props.isOpen ? tw`before:block` : tw`before:hidden`)}
  .footer__container {
    ${tw`absolute bottom-0 left-0 z-[1000] h-[72px] pt-1 pb-0.5 block w-full`}
    background: linear-gradient(360deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  }
`;

// 底部按鈕
export const SNavBtn = styled.button``;

// 按鈕 icon
export const SNavIcon = styled.p`
  ${tw`flex flex-col items-center justify-center text-white`}
  img {
    ${tw`h-[48px] w-[48px]`}
  }
  span {
    ${tw`h-[16px] leading-[16px] text-xs mt-0.5 `}
  }
`;

// 收合面版
export const SBoard = styled.div`
  ${tw`fixed bottom-0 left-0 right-0 z-[999]`}
`;

// 選單 container
export const SListContainer = styled.div`
  ${tw`absolute bottom-0 left-0 z-[90] w-full translate-y-full`}
  ${tw`pt-[40px] pb-[78px] px-[24px] space-y-5`}
  background: linear-gradient(360deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
`;

// 面版關閉按鈕
export const SBtnClose = styled.div`
  ${tw`flex flex-col items-center gap-1.5 text-center text-white`}
  span {
    ${tw`font-semibold font-montserrat text-xs`}
  }
`;

// 分會場選單 ul
export const SListUl = styled.ul`
  ${tw`flex w-full flex-wrap justify-center opacity-0 translate-y-[20%]`}
  li {
    ${tw`mb-4 w-1/3 px-[10px]`}
  }
  a {
    ${tw`block rounded-full py-1.5 text-center text-[15px] font-bold tracking-wide `}
    ${tw`text-white active:border-[#fffb6e] active:text-[#fffb6e]`}
    ${tw`border border-solid border-white bg-black bg-opacity-50`}
  }
`;
