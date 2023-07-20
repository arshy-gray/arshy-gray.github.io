import { css } from 'styled-components';
import { ui } from '../../assets/style';
import { rgba } from 'polished';

export const CssIntro = (isAniActive?: boolean) => css`
  background-repeat: no-repeat;
  background-image: url(${ui.img_url}/intro/bg_intro_moon.png),
    url(${ui.img_url}/intro/bg_intro_back.jpg); // 달, 야경
  background-position: calc(50% + 600px) 65px, center;
  background-size: auto, cover;
  background-attachment: fixed;

  // 메인카피
  .intro_atc,
  .intro_ctt {
    height: 100%;
  }
  .intro_atc {
    text-align: center;
  }
  // 연락처 그룹
  .contact_group {
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
  }
  // Intro 로고
  .name {
    margin-top: 10vh;
    a {
      padding: 0 10%;
    }
    img {
      ${ui.ani_direction_init}
      animation-name: ${ui.toL};
    }
  }
  // 헨드폰번호
  .tel_num {
    display: inline-block;
    width: 100%;
    max-width: 480px;
    margin: 20px auto 0;
    padding: 20px 15% 0;
    border-top: 3px solid ${ui.color.theme.main};
    box-sizing: border-box;
    a img {
      width: 100%;
    }
  }
  .tel_num,
  .mail {
    a {
      ${ui.ani_direction_init}
      animation-name: ${ui.toR};
    }
  }
  // 메일 주소
  .mail a {
    display: inline-block;
    color: ${ui.color.theme.intro_sub};
    animation-delay: 0.2s;
  }
  // 깃허브
  .gitHub {
    flex: 1;
    ${ui.flex('center', 'flex-end')}
    a {
      display: inline-block;
      padding: 20px 50px;
      color: ${rgba(ui.color.dft.brightest, 0.8)};
      background: ${rgba(ui.color.dft.brightest, 0.2)};
      border-radius: 31px;
      ${ui.ani_direction_init}
      ${ui.natural_effect}
      animation-name: ${ui.toB};
      &:hover {
        background: ${rgba(ui.color.dft.brightest, 0.3)};
        color: ${ui.color.dft.brightest};
        text-shadow: 0 0 white;
      }
    }
  }
  // 섹션 활성화
  ${isAniActive &&
  css`
    .name img {
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
  // 반응형
  ${ui.respond(
    ui.break_points.pc_dft,
    `
      background-position: calc(100% - 50px) 40px, center;
      background-size: 100px, cover;
    `,
  )}
  ${ui.respond(
    ui.break_points.mobile_high,
    `
      // 연락처 그룹
      .contact_group {
        margin: 0 14%;
        width: auto;
        max-width: 100%;
      }
      // 깃허브
      .gitHub {
        a {
          padding: 15px 30px;
        }
      }
    `,
  )}
  ${ui.respond(
    ui.break_points.mobile_mid,
    `
      // 연락처 그룹
      .intro_ctt {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
      }
    `,
  )}
`;
