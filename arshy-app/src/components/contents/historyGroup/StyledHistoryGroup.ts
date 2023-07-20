import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';
import * as SpriteHistory from '../../../assets/img-sprite/vendors/SpriteHistory';

export interface StyledHistoryGroupProps {
  $isAniActiveHistory?: boolean;
  $historyItemLen: number;
}

// 리스트별
const ParallexIcoCss = (itemLen: number) => {
  const breakPoints: string[] = ['auto', ui.break_points.mobile_mid];
  let cssRules = '';

  Array.from(breakPoints).forEach((breakPoint, idx) => {
    for (let i = 1; i <= itemLen; i++) {
      if (breakPoint === 'auto') {
        cssRules += `
        &:nth-child(${i}) .history_ico {
          animation-delay: ${(i * 0.5 + 2).toFixed(4)}s;
        }
        `;
      } else {
        cssRules += `
      ${ui.respond(
        breakPoint,
        `
          &:nth-child(${i}) .history_ico {
            animation-delay: ${(i * 0.6).toFixed(4)}s;
          }
        `,
      )}
        `;
      }
    }
  });
  return cssRules;
};

export const StyledHistoryGroup = styled.ul<StyledHistoryGroupProps>`
  margin-top: 40px;
  li {
    clear: both;
    position: relative;
  }
  > li {
    padding: 35px 0 10px 0;
    > ul {
      overflow: hidden;
    }
    &:nth-child(odd) {
      right: calc(50% - 1px);
      border-right: 1px solid ${ui.color.dft.brightest};
      ul li {
        float: right;
      }
    }
    &:nth-child(even) {
      left: 50%;
      text-align: left;
      border-left: 1px solid ${ui.color.dft.brightest};
      ul li {
        float: left;
      }
    }
    .history_ico {
      opacity: 0;
      position: absolute;
      top: 20px;
      text-align: center;
      backface-visibility: hidden;
      .txt {
        ${ui.blind}
      }
    }
    // 섹션 활성화
    ${(props) =>
      props.$isAniActiveHistory &&
      css`
        .history_ico {
          animation: ${ui.rotationY} 0.5s ease-in-out forwards;
        }
        ${ParallexIcoCss(props.$historyItemLen || 7)}
      `}
    // 학업
    &.history_edu .history_ico {
      ${ui.imgsprite(SpriteHistory.ico_history_edu)}
    }
    // 자격증
    &.history_license .history_ico {
      ${ui.imgsprite(SpriteHistory.ico_history_license)};
    }
    // 근무경력
    &.history_company .history_ico {
      ${ui.imgsprite(SpriteHistory.ico_history_company)};
    }
    // 리스트 포인트 요소
    .history_point {
      position: relative;
      display: block;
      margin: 4px 0;
      padding: 2px;
      border: 1px solid ${ui.color.dft.darkest};
      border-radius: 7px;
      em {
        display: block;
        ${ui.size('9px')}
        background: ${ui.color.dft.darkest};
        border-radius: 9px;
      }
    }
    // 리스트 콘텐츠
    .history_info {
      position: relative;
      > li {
        margin-bottom: 1px;
      }
      .date {
        margin-top: 10px;
        color: ${ui.color.dft.brightest};
        background: ${ui.color.dft.darkest};
        padding: 5px 15px;
        overflow: hidden;
      }
      // 히스토리 설명 1
      .title {
        ${ui.font('15px', '', ui.color.dft.dark)}
        overflow: hidden;
        animation-fill-mode: forwards;
      }
      // 히스토리 설명 1 부설명
      .title_desc {
        ${ui.font('13px', '', ui.color.title.main)}
        font-weight: 300;
        overflow: hidden;
        animation-fill-mode: forwards;
      }
      // 히스토리 설명 2
      .desc {
        ${ui.font('13px', '14px', ui.color.title.sub)}
        overflow: hidden;
        animation-fill-mode: forwards;
      }
    }
    // 홀수 아이템
    &:nth-child(odd) {
      .history_ico {
        float: left;
        left: calc(100% + 20px);
      }
      .history_info .date {
        border-radius: 20px 0 20px 20px;
      }
      .history_point {
        float: right;
        left: 7.5px;
      }
      .history_info {
        right: 5px;
      }
    }
    // 짝수 아이템
    &:nth-child(even) {
      .history_ico {
        float: right;
        left: -82px;
      }
      .history_info .date {
        border-radius: 0 20px 20px 20px;
      }
      .history_point {
        float: left;
        right: 8.5px;
      }
    }
  }
  ${ui.respond(
    ui.break_points.mobile_mid,
    `
      > li {
        padding: 0;
        &:before,
        &:last-child:after {
          ${ui.pseudo_init('none')};
          ${ui.size('1px', '20px')};
          margin: 5px auto;
          background: ${ui.color.dft.brightest};
        }
        // 홀짝 요소 리셋
        &:nth-child(odd) ul li,
        &:nth-child(even) ul li {
          float: none;
          display: block;
        }
        &:nth-child(odd),
        &:nth-child(odd) .history_info {
          right: auto;
        }
        &:nth-child(even),
        &:nth-child(even) .history_info {
          left: auto;
        }
        &:nth-child(odd),
        &:nth-child(even) {
          .history_ico {
            float: none;
            left: auto;
          }
          .history_info .date {
            border-radius: 20px;
          }
        }
        &:nth-child(odd) .history_point {
          clear: both;
          float: none;
          top: -64px;
          left: auto;
          width: 9px;
          margin: 0 auto;
        }
        &:nth-child(even) .history_point {
          clear: both;
          float: none;
          top: -64px;
          right: auto;
          width: 9px;
          margin: 0 auto;
        }
        // 히스토리 리스트 아이콘
        .history_ico {
          position: relative;
          width: 100%;
          margin: 0 auto;
        }
        // 리스트 콘텐츠
        .history_info {
          text-align: center;
          .date {
            display: inline-block;
          }
        }
      }
    `,
  )}
`;
