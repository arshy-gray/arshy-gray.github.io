import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';

interface CommonProps {
  $isScroll?: boolean;
}

export interface HeaderProps extends CommonProps {
  $isHide?: boolean;
}

export interface MenuItemProps extends CommonProps {
  $isActive?: boolean;
}

export const StyledMenuItem = styled.li<MenuItemProps>`
  padding: 0 0.3%;
  a {
    display: block;
    padding: 5px;
    ${ui.font('13px', '', ui.color.dft.brightest)}
  }
  ${(props) =>
    props.$isActive &&
    css`
      a {
        color: ${ui.color.theme.sub};
      }
    `}

  // 헤더 배경, 로고 활성화
  ${(props) =>
    props.$isScroll &&
    css`
      a {
        color: ${ui.color.dft.dark};
      }
      ${props.$isActive &&
      css`
        a {
          color: ${ui.color.theme.main};
        }
      `}
    `}
`;

export const StyledHeader = styled.header<HeaderProps>`
  ${ui.position('fixed', '10px', '0', '', '0')}
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 99999;
  .wrap_cen {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2px 20px;
    box-sizing: border-box;
    border-radius: 25px;
    ${ui.natural_effect}
    transition-property: background-color;
  }
  .logo {
    visibility: hidden;
    width: 50px;
    padding: 8px 0;
    box-sizing: border-box;
    a {
      display: block;
    }
  }
  // gnb
  .gnb_menu {
    ${ui.flex('flex-end')}
    flex: 1;
    ul {
      ${ui.flex('flex-end', 'center')}
    }
  }

  // 헤더 배경, 로고 활성화
  ${(props) =>
    props.$isScroll &&
    css`
      .wrap_cen {
        background: rgba(255, 255, 255, 0.95);
      }
      .logo {
        visibility: visible;
      }
    `}

  // 프로젝트 상세 팝업 오픈시 숨김
    ${(props) =>
    props.$isHide &&
    css`
      display: none;
    `}
`;
