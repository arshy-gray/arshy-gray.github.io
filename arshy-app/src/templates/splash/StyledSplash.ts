import styled, { css } from 'styled-components';
import { ui } from '../../assets/style';

interface SyledSplashProps {
  $isHide?: boolean;
  $isProgressDone?: boolean;
}

const progressBarWid: string = '303px';
const progressBarH: string = '297px';

export const StyledSplash = styled.div<SyledSplashProps>`
  // 진행률 표시
  @include pos-fix(0, 0, 0, 0);
  ${ui.position('fixed', '0', '0', '0', '0')};
  color: ${ui.color.dft.brightest};
  text-align: center;
  background-image: url(${ui.img_url}/splash/bg_splash_moon.png),
    url(${ui.img_url}/splash/bg_splash_cloud.png), url(${ui.img_url}/splash/bg_splash.jpg);
  background-position: calc(50% - 15px) -50px, center top, center bottom;
  background-size: auto, auto, cover;
  background-repeat: no-repeat;
  transition: 0.5s opacity 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  // 진행률 박스
  .progress {
    position: relative;
    display: inline-block;
    ${ui.size(progressBarWid, progressBarH)}
    margin-top: 128px;
  }
  .contact_group {
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .mail a {
    color: ${ui.color.theme.intro_sub};
  }
  .gitHub {
    margin-top: 13px;
    a {
      opacity: 0.75;
    }
  }
  .name {
    img {
      width: 220px;
      pointer-events: none;
      cursor: default;
    }
  }
  .tel_num {
    margin-top: 5px;
    a {
      width: 260px;
      display: inline-block;
    }
  }
  // 진행율 막대 표시
  .progress-bar {
    ${ui.position('abssolute', '0', '0', '0', '0')};
    .bar_L,
    .bar_R {
      ${ui.size('50%', '0')};
      padding-bottom: 2px;
      overflow: hidden;
      .bar {
        ${ui.size(progressBarWid, progressBarH)}
        border: 1px solid ${ui.color.theme.main};
        border-radius: 50%;
      }
    }
    .bar_L {
      transform: translateY(2px);
    }
    .bar_L,
    .bar_L .bar {
      ${ui.position('absolute', '', '', '0', '0')};
    }
    .bar_R,
    .bar_R .bar {
      ${ui.position('absolute', '0', '0', '', '')};
    }
  }
  .bar_box {
    ${ui.size('100%')};
  }
  // 미지원 환경 안내 텍스트
  .no-browser-txt,
  .no-js-txt {
    display: none;
  }
  // 로딩 진행율 텍스트
  .progress-txt {
    margin-top: 10px;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }

  // no-js
  .no-js & {
    .bar_box,
    .progress-txt,
    .no-browser-txt {
      display: none;
    }

    // 자바스크립트 비활성화 안내 문구
    .no-js-txt {
      position: relative;
      display: block;
      margin-top: 25px;
      padding: 0 20px;
      text-align: center;
      a {
        color: ${ui.color.theme.sub};
      }
      strong {
        color: ${ui.color.theme.history};
      }
    }
  }
  // 로딩 완료
  ${(props) =>
    props.$isProgressDone &&
    css`
      opacity: 0;
    `}
  // 숨김
  ${(props) =>
    props.$isHide &&
    css`
      display: none;
    `}
`;
