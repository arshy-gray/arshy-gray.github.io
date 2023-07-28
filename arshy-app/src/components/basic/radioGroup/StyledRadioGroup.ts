import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';

export interface StyledRadioGroupProps {
  $itemLen: number;
  $isAniActive?: boolean;
}

// item별 parallex
const ParallexRadioItemCss = (itemLen: number | 0) => {
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

export const StyledRadioGruop = styled.fieldset<StyledRadioGroupProps>`
  ${(props) =>
    css`
      ${ui.fieldsetComn(props.$isAniActive || false)};
    `}
  label {
    ${(props) =>
      css`
        ${ui.chkRadioComn(props.$isAniActive || false)};
      `}

    &:focus {
      border-top: 3px solid color(dft, brightest);
    }
    input {
      + span {
        &:before,
        &:after {
          border-radius: 50%;
        }
      }
    }

    &[class*='default'] {
      ${ui.dftChkRadioComn(
        ui.color.theme.project_sub,
        ui.color.dft.brightest,
        ui.color.dft.brightest,
      )}
    }

    &[class*='button'] {
      width: 134px;
      margin-left: 4px;
      margin-right: 4px;
      span {
        border: 1px solid ${ui.color.theme.project_sub};
        border-radius: 12px;
        overflow: hidden;
        ${ui.backface};
        ${ui.pseudo_init(
          'before',
          'display',
          `
          ${ui.position('absolute', '0', '0', '', '0')}
          height: 2px;
          ${ui.natural_effect}
          transition-property: background-color;
        `,
        )};
      }
      input {
        + span {
          width: 100%;
          padding: 7px 0 10px 0;
        }
        &:checked + span {
          border-color: ${ui.color.dft.brightest};
          &:before {
            background: ${ui.color.dft.brightest};
          }
        }
      }
    }

    ${(props) => ParallexRadioItemCss(props.$itemLen)}
  }

  ${ui.respond(
    ui.break_points.tablet,
    `
      &[class*='button'] {
      width: auto;
        margin: 0 5px;
        input[type="radio"]:checked + span {
          color: ${ui.color.theme.sub};
          animation: none;
          &:before {
            background: transparent;
          }
        }
        span {
          border: 0;
        }
      }
    `,
  )}
`;
