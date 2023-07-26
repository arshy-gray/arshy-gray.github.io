import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';

export interface StyledChkGroupProps {
  $itemLen: number;
  $isAniActive?: boolean;
}

// item별 parallex
const ParallexChkItemCss = (itemLen: number | 0) => {
  let cssRules = '';

  for (let i = 1; i <= itemLen; i++) {
    const aniDelaySec: string = `${i * 0.1 - 0.1}s`;

    cssRules += `
      &:nth-of-type(${i}) {
        animation-delay: ${aniDelaySec};
      }
    `;
  }

  return cssRules;
};

export const StyledChkGruop = styled.fieldset<StyledChkGroupProps>`
  ${(props) =>
    css`
      ${ui.fieldsetComn(props.$isAniActive || false)};
    `}
  label {
    ${(props) =>
      css`
        ${ui.chkComn(props.$isAniActive || false)};
      `}

    display: block;
    input {
      + span {
        &:before,
        &:after {
          border-radius: 5px;
          ${ui.backface}
        }
      }
    }

    &[class*='default'] {
      ${ui.dftChkComn(ui.color.theme.project_sub, ui.color.dft.brightest, ui.color.dft.brightest)}
    }

    ${(props) => ParallexChkItemCss(props.$itemLen)}
  }

  ${ui.respond(
    ui.break_points.tablet,
    `
      margin-top: 10px;
    `,
  )}
`;
