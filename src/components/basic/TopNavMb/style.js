// top nav  ( mb )
import tw, { styled } from 'twin.macro';

export const SNavContainer = styled.div`
  ${tw`sticky top-0 z-50 overflow-scroll bg-white shadow-sm h-9`}
`;

export const SListContainer = styled.ul`
  ${tw`flex`}
`;

export const SHashLink = styled.li`
  ${tw`flex-[100px] shrink-0 p-1`}
  button {
    ${tw`w-full rounded-md py-1 text-center text-sm`}
  }
`;
