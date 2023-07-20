import React, { forwardRef, useState, useEffect } from 'react';
import { StyledHeader, StyledMenuItem } from './StyledHeader';
import { img_url } from '../../../assets/style/global';

export interface HeaderrProps {
  isHide?: boolean;
  isScrollVal?: boolean;
  isActiveIdx?: number;
}

interface MenuItem {
  href: string;
  text: string;
}

/**
 * ## [Storybook](http://localhost:6006/?path=/story/components-layout-header--scroll-false)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | isHide | boolean | true, false | 요소 숨김 여부 |
 * | isScrollVal | boolean | true, false | 페이지 내 스크롤 여부(디자인 변경) |
 * | isActiveIdx | boolean | true, false | 활성화 메뉴 인덱스 |
 *
 * ---------------------
 *
 * ## MenuItem(li)
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | *href | string | - | 해시 링크 |
 * | *text | string | - | 메뉴명 |
 */

const Header = forwardRef<HTMLElement, HeaderrProps>(
  ({ isHide, isScrollVal, isActiveIdx, ...rest }, ref) => {
    const menuItems: MenuItem[] = [
      { href: '#intro', text: 'INTRO' },
      { href: '#project', text: 'PROJECT' },
      { href: '#history', text: 'HISTORY' },
      { href: '#contact', text: 'CONTACT' },
    ];

    const [isScroll, setIsScroll] = useState<boolean>(isScrollVal || false);
    const [isActive, setIsActive] = useState<number>(isActiveIdx || 0);

    const handleMenuItemClick = (index: number) => {
      setIsActive(index);
    };

    useEffect(() => {
      const handleScroll = () => {
        setIsScroll(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <StyledHeader
        className="page_hd"
        $isScroll={isScroll}
        $isHide={isHide || false}
        ref={ref}
        {...rest}
      >
        <div className="wrap_cen">
          <div className="logo_wrap">
            <h1 className="logo">
              <a href="#intro">
                <img src={`${img_url}/common/logo.png`} alt="Song Aeri, Intro 페이지로 가기" />
              </a>
            </h1>
          </div>
          <nav className="gnb_menu">
            <ul>
              {menuItems.map((item, idx) => (
                <StyledMenuItem
                  key={idx}
                  $isScroll={isScroll}
                  $isActive={isActive === idx}
                  onClick={() => handleMenuItemClick(idx)}
                >
                  <a href={item.href}>{item.text}</a>
                </StyledMenuItem>
              ))}
            </ul>
          </nav>
        </div>
      </StyledHeader>
    );
  },
);

export default Header;
