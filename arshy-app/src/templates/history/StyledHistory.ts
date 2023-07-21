import styled, { css } from 'styled-components';
import { ui } from '../../assets/style';
import Section from '../../components/layout/section/Section';
import * as SpriteHistory from '../../assets/img-sprite/vendors/SpriteHistory';

export interface StyledHistoryProps {
  $isAniActive?: boolean;
  $footPrintLen: number;
}

// 섹션 활성화시 상단 발자국 요소 parallex
const ParallexFootPrintCss = (itemNAme: string, itemLen: number | 5) => {
  let cssRules = '';

  for (let i = 1; i <= itemLen; i++) {
    const aniDelaySec: string = itemNAme === 'top' ? `${i * 0.5 - 0.5}s` : `${i * 0.5 + 5.5}s`;

    cssRules += `
      .el_0${i} {
        animation-delay: ${aniDelaySec};
      }
    `;
  }

  return cssRules;
};

export const StyledHistory = styled(Section)<StyledHistoryProps>`
  background-image: url(${ui.img_url}/history/bg_history_left.png),
    url(${ui.img_url}/history/bg_history_right.png), url(${ui.img_url}/history/bg_history_back.png),
    url(${ui.img_url}/history/bg_history_back.png);
  background-position: left calc(50% + 20px), right calc(50% + 20px), -300px -500px,
    calc(100% + 300px) calc(100% + 500px);
  background-color: ${ui.color.theme.history};
  background-repeat: no-repeat;
  background-attachment: fixed;

  // 배경요소
  // 사람
  .bg_el span {
    &.el_person {
      opacity: 0;
      top: auto;
      bottom: 0;
      left: calc(50% - 430px);
      ${ui.imgsprite(SpriteHistory.bg_history_person)};
    }

    // 섹션 활성화
    ${(props) =>
      props.$isAniActive &&
      css`
        // 배경요소
        // 사람
        &.el_person {
          animation: ${ui.show} 2s ${ui.ani_timing} 8s forwards;
        }
      `}
  }

  // parallex images
  [class*='foot_print'] {
    [class*='el'] {
      opacity: 0;
      ${ui.imgsprite(SpriteHistory.bg_history_footprint)};

      ${(props) =>
        props.$isAniActive &&
        css`
          animation: ${ui.show} 0.7s ${ui.ani_timing} forwards;
        `}
    }
  }
  // 상단 발자국 요소
  .el_foot_print_top {
    position: absolute;
    left: calc(50% + 150px);
    .el_01 {
      top: 20px;
      left: 166px;
      transform: rotate(25deg);
    }
    .el_02 {
      top: 90px;
      left: 170px;
      transform: rotate(35deg);
    }
    .el_03 {
      top: 120px;
      left: 100px;
      transform: rotate(45deg);
    }
    .el_04 {
      top: 185px;
      left: 110px;
      transform: rotate(55deg);
    }
    .el_05 {
      top: 190px;
      left: 20px;
      transform: rotate(60deg);
    }

    ${(props) => props.$isAniActive && ParallexFootPrintCss('top', props.$footPrintLen || 5)}
  }

  // 하단 발자국 요소
  .el_foot_print_btm {
    ${ui.position('absolute', '', '', '250px', 'calc(50% - 350px)')}
    .el_01 {
      top: 20px;
      left: 200px;
      transform: rotate(60deg);
    }
    .el_02 {
      top: 90px;
      left: 170px;
      transform: rotate(55deg);
    }
    .el_03 {
      top: 95px;
      left: 90px;
      transform: rotate(45deg);
    }
    .el_04 {
      top: 165px;
      left: 90px;
      transform: rotate(35deg);
    }
    .el_05 {
      top: 165px;
      left: 15px;
      transform: rotate(30deg);
    }

    // 섹션 활성화
    ${(props) => props.$isAniActive && ParallexFootPrintCss('bottom', props.$footPrintLen || 5)}
  }
  ${ui.respond(
    ui.break_points.tablet,
    `
      background-position: -280px calc(50% + 20px), calc(100% + 280px) calc(50% + 20px), -300px -500px,
      calc(100% + 300px) calc(100% + 500px);
  `,
  )}
  ${ui.respond(
    ui.break_points.mobile_high,
    `
      background-position: -350px calc(50% + 20px), calc(100% + 350px) calc(50% + 20px), -300px -500px,
      calc(100% + 300px) calc(100% + 500px);
  `,
  )}
  ${ui.respond(
    ui.break_points.mobile_mid,
    `      
      // 배경 요소
      .bg_el {
        display: none;
      }
  `,
  )}
`;
