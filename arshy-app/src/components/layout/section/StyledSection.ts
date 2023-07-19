import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';
import { rgba } from 'polished';
import { CssIntro } from '../../../templates/intro/StyledIntro';

interface SyledSectionProps {
  $pageName: string;
  $isFullpage?: boolean;
  $isAniActive?: boolean;
  $isSectionTitle?: boolean;
}

const StyleBySection = (sectionName: string, isAniActive?: boolean) => {
  switch (sectionName) {
    case 'intro':
      return CssIntro(isAniActive);
    // case 'project':
    //   return CssProject;
    // case 'history':
    //   return CssHistory;
    // case 'contact':
    //   return CssContact;

    default: return false;
  }
};

export const StyledSection = styled.section<SyledSectionProps>`
  position: relative;
  padding: 90px 0;
  min-height: 750px;
  box-sizing: border-box;
  ${ui.clearfix}
  // fullpage 
  ${(props) =>
    props.$isFullpage &&
    css`
      height: 100vh;
    `}
  // 배경 요소
  .bg_el {
    ${ui.position('absolute', '0', '', '', '0')}
    ${ui.size('100%')};
    z-index: 0;
    span {
      ${ui.position('absolute', '0', '', '', '0')}
    }
    img {
      position: relative;
      width: auto;
    }
  }
  // 섹션 공통
  .sect_tit,
  .sect_desc {
    position: relative;
    z-index: 1;
    ${ui.ani_direction_init}
    animation-name: ${ui.toT};
  }
  // 섹션 설명
  .sect_desc {
    margin-top: 10px;
    ${ui.font('', '18px', ui.color.dft.brightest)}
    text-align: center;
    animation-delay: 0.2s;
  }
  // 섹션 타이틀
  .sect_tit {
    ${(props) =>
      props.$isSectionTitle
        ? css`
            ${ui.font('50px', '42px', ui.color.dft.brightest)}
            text-align: center;
            font-weight: bold;
          `
        : css`
            ${ui.blind}
          `}
  }
  // 섹션 활성화시
  ${(props) =>
    props.$isAniActive &&
    css`
      // 섹션 타이틀
      .sect_tit,
      .sect_desc {
        animation-name: ${ui.fromT};
      }
      // 섹션 설명
      .sect_desc {
        opacity: 0.9;
      }
    `}
  // article
    .atc_tit {
    ${ui.blind}
  }
  // 푸터
  .main_footer {
    ${ui.position('absolute', '', '0', '30px', '0')}
    padding: 5px 0;
    background: ${rgba(ui.color.dft.brightest, 0.1)};
    p {
      color: color(dft, light);
      text-align: center;
    }
  }

  ${(props) => StyleBySection(props.$pageName, props.$isAniActive)}
`;
