import { css } from 'styled-components';
import { ui } from '../../assets/style';
import * as Sprite from './vendors/SpriteContact';

export const CssContact = (isAniActive?: boolean) => css`
  background-image: url(${ui.img_url}/contact/bg_contact_center.png),
    url(${ui.img_url}/contact/bg_contact_back2.png), url(${ui.img_url}/contact/bg_contact_back2.png),
    url(${ui.img_url}/contact/bg_contact_back.jpg);
  background-position: center, -300px calc(100% + 300px), calc(100% + 280px) -200px, center;
  background-size: auto, auto, auto, cover;
  background-repeat: no-repeat, no-repeat, no-repeat, repeat;
  background-attachment: scroll, fixed, fixed, fixed;
  overflow: hidden;
  .wrap_cen {
    display: table;
  }
  // 배경요소
  .bg_el span {
    // 상단 꽃
    &.el_flower_left {
      top: calc(50% - 489px);
      left: calc(50% - 627px);
      animation: ${ui.shake} 3s ease-in-out infinite;
      ${ui.imgsprite(Sprite.bg_contact_flower_left)};
    }
    // 하단 꽃
    &.el_flower_right {
      top: calc(50% - 12px);
      left: calc(50% + 466px);
      animation: ${ui.shake} 3s ease-in-out 1.5s infinite;
      ${ui.imgsprite(Sprite.bg_contact_flower_right)};
    }
    // 나비
    &.el_butterfly {
      top: calc(50% - 230px);
      left: calc(50% + 50px);
      animation: ${ui.nabi} 4s ease-in-out infinite;
      transform-origin: 38px 107px;
      ${ui.imgsprite(Sprite.bg_contact_butterfly)};
    }
  }
  // 연락처 그룹
  .contact_group {
    @include pos-abs-lt(50%);
    ${ui.position('absolute', '50%', '', '', '50%')}
    margin-top: -69px;
    width: 290px;
    text-align: center;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }
  // 공통
  .name,
  .tel_num,
  .mail,
  .gitHub {
    a {
      ${ui.ani_direction_init}
    }
  }
  // 이름로고
  .name {
    a {
      animation-name: ${ui.toL};
    }
    img {
      width: 220px;
    }
  }
  // 전화번호, 메일
  .tel_num,
  .mail {
    a {
      animation-name: ${ui.toR};
    }
  }
  .tel_num {
    img {
      width: 100%;
      max-width: 285px;
    }
    a {
      animation-delay: 0.3s;
    }
  }
  .mail a {
    color: ${ui.color.dft.lighter};
    animation-delay: 0.4s;
  }
  // 메일, 깃허브
  .mail,
  .gitHub {
    &:hover a {
      text-decoration: underline;
    }
  }
  .gitHub {
    margin-top: 30px;
    a {
      color: ${ui.color.dft.brightest};
      animation-name: ${ui.toB};
      animation-delay: 0.5s;
    }
  }
  // 섹션 활성화
  ${isAniActive &&
  css`
    .name a {
      animation-name: ${ui.fromL};
    }
    .tel_num,
    .mail {
      a {
        animation-name: ${ui.fromR};
      }
    }
    .gitHub a {
      animation-name: ${ui.fromB};
    }
  `}
`;
