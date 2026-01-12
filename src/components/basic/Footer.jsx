import {
  iconFbWhite,
  iconIgWhite,
  iconLineWhite,
  iconYtWhite,
  iconFooterArrowWhite,
} from '../../assets/base';
function Footer({ hasLeftNav }) {
  return (
    <footer className="relative z-10 bg-black">
      {/* 上 宣告 */}
      <div className="relative z-20 px-2 py-5 text-white sm:px-5 sm:py-8 lg:p-14">
        <div className="mx-auto max-w-[920px]">
          <div className="flex flex-col items-center justify-between px-3 lg:flex-row">
            <ul className="mb-5 hidden items-center justify-center md:flex lg:mb-0">
              <li className="flex items-center justify-center">
                追蹤我們
                <img
                  src={iconFooterArrowWhite}
                  className="ml-2"
                  alt="arrow right"
                />
              </li>
              <li className="mx-2">
                <a href="" aria-label="Facebook 連結">
                  <img
                    src={iconFbWhite}
                    className="h-[30px] w-[30px]"
                    alt="icon Facebook"
                  />
                </a>
              </li>
              <li className="mx-2">
                <a href="" aria-label="Instagram 連結">
                  <img
                    src={iconIgWhite}
                    className="h-[30px] w-[30px]"
                    alt="icon Instagram"
                  />
                </a>
              </li>
              <li className="mx-2">
                <a href="" aria-label="Youtube 連結">
                  <img
                    src={iconYtWhite}
                    className="h-[30px] w-[30px]"
                    alt="icon Youtube"
                  />
                </a>
              </li>
              <li className="mx-2">
                <a href="" aria-label="Line 連結">
                  <img
                    src={iconLineWhite}
                    className="h-[30px] w-[30px]"
                    alt="icon Line"
                  />
                </a>
              </li>
            </ul>
            <p className="text-center text-sm font-normal leading-6 lg:text-left">
              此頁面僅為個人示意作品，商品顏色、價位、贈品如與官網不符，以官網標示為準！
            </p>
          </div>
        </div>
      </div>
      {/* 下 seo */}
      <div
        className={`px-2 pt-6 sm:px-5 sm:pt-10 md:px-10 md:py-0 ${
          hasLeftNav ? 'pb-10' : 'pb-4'
        }`}
      ></div>
    </footer>
  );
}

export default Footer;
