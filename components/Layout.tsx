import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import Flags from "country-flag-icons/react/3x2";

import { localeToLang, text } from "../config/text";
import { Message } from "./Message";
import { useNotifications } from "./Notifications";

const MenuLink: React.FC<{ icon?: string; to: string }> = ({
  children,
  icon,
  to,
}) => {
  // const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <Link href={to}>
      <span className="inline-block cursor-pointer">
        {icon && (
          <span className="inline-block w-6 pr-1">
            <img src={`icon-${icon}.png`} />
          </span>
        )}
        <a className={`inline-block ${isActive ? "font-bold" : ""}`}>
          {children}
        </a>
      </span>
    </Link>
  );
};

const Layout: React.FC<{
  smallPadding?: boolean;
}> = ({ children, smallPadding = false }) => {
  const { locale, pathname } = useRouter();
  const { menu: words, title } = text[localeToLang(locale)];

  const { notifications } = useNotifications();
  return (
    <div className={`${smallPadding ? "p-2 sm:p-4" : "p-4"}`}>
      <div className="fixed flex flex-col items-center justify-center w-full">
        {notifications.map((n) => (
          <Message key={n.id} notification={n} />
        ))}
      </div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="max-w-lg mx-auto">
        <header className="flex justify-center pb-4 mb-8 border-gray-300 border-dotted md:justify-end">
          <nav className="flex flex-row items-end space-x-12">
            <div className="space-x-3 md:space-x-6">
              <MenuLink icon="invite" to="/invite">
                {words.invite}
              </MenuLink>
              <MenuLink icon="info" to="/info">
                {words.info}
              </MenuLink>
              <MenuLink icon="registration" to="/registration">
                {words.registration}
              </MenuLink>
            </div>

            <div className="flex flex-row items-center mb-1">
              {locale === "cs" && (
                <Link href={pathname} locale="en">
                  <Flags.GB title="English" className="h-3 cursor-pointer" />
                </Link>
              )}
              {locale === "en" && (
                <Link href={pathname} locale="cs">
                  <div className="flex flex-col items-center justify-center text-xs text-gray-600 cursor-pointer">
                    <Flags.SK className="inline-block h-3 shadow-lg" />
                    <span
                      className="inline-block mb-1"
                      style={{ lineHeight: 0, marginBottom: 2, marginTop: 6 }}
                    >
                      +
                    </span>
                    <Flags.CZ className="inline-block h-3 shadow-lg" />
                  </div>
                </Link>
              )}
            </div>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
