import {
  logoWhite,
  iconFbWhiteFill,
  iconIgWhiteFill,
  iconYtWhiteFill,
  iconLineWhiteFill,
  qrCode,
  qrCodeWebp,
} from '../../assets/base';

function Header2() {
  return (
    <header className="relative z-50 hidden h-10 bg-pcRed text-xs text-white md:block">
      <div className="m-auto flex h-full w-full max-w-[1200px] justify-between gap-x-2 px-2 lg:gap-x-3 lg:px-3">
        {/*左欄*/}
        <div className="flex items-center gap-x-0">
          <a href="">
            <img
              className="h-[22px] w-[160px]"
              src={logoWhite}
              alt="icon PChome 24h"
            />
          </a>
        </div>
        {/*右欄*/}
        <ul className="flex items-center gap-x-2 lg:gap-x-3">
          <li className="group relative hidden h-full cursor-pointer items-center gap-x-2 lg:flex lg:gap-x-3">
            <span className="block h-1/2 w-[1px] bg-[#9c9c9c]" />
            APP下載
            <a
              href=""
              className="absolute right-0 top-full hidden w-[150px] shadow-lg group-hover:block"
            >
              <picture>
                <source srcSet={qrCodeWebp} type="image/webp" />
                <img
                  className="h-[150px] w-[150px]"
                  src={qrCode}
                  alt="QR Code"
                />
              </picture>
            </a>
            <span className="block h-1/2 w-[1px] bg-[#9c9c9c]" />
          </li>
          <li className="flex items-center gap-x-3">
            <span>追蹤我們：</span>
            <a href="">
              <img
                src={iconFbWhiteFill}
                alt="icon Facebook"
                className="h-[28px] w-[28px] hover:opacity-75"
              />
            </a>
            <a href="">
              <img
                src={iconIgWhiteFill}
                className="h-[28px] w-[28px] hover:opacity-75"
                alt="icon Instagram"
              />
            </a>
            <a href="">
              <img
                src={iconYtWhiteFill}
                className="h-[28px] w-[28px] hover:opacity-75"
                alt="icon Youtube"
              />
            </a>
            <a href="">
              <img
                src={iconLineWhiteFill}
                className="h-[28px] w-[28px] hover:opacity-75"
                alt="icon Line"
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header2;
