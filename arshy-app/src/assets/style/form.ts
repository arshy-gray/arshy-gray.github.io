import { css } from 'styled-components';
import { rgba } from 'polished';
import { ui } from './index';

//= form
export const fieldsetComn = (isAniActive: boolean): any => css`
  flex-wrap: wrap;
  ~ &:not(:first-of-type) {
    margin-top: 15px;
  }
  // 1차 필터
  &[class*='st_button'] {
    ${ui.flex('center', 'center')}
  }
  // 1차 필터 외
  &[class*='st_checked'] {
    ${ui.flex('', 'center')}
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 5px 15px;
    background: ${rgba(ui.color.theme.project_sub, 0.2)};
    border-radius: 10px;
    ${ui.ani_direction_init};
    ${isAniActive
      ? css`
          animation-name: ${ui.fromB};
        `
      : css`
          animation-name: ${ui.toB};
        `}
  }

  ${ui.respond(
    ui.break_points.table,
    `
      flex-wrap: wrap;
      &[class*='st_button'] {
        border: solid ${ui.color.theme.project_sub};
        border-width: 1px 0;
      }
  `,
  )}
`;

export const chkComn: any = (isAniActive: boolean): any => css`
  margin: 4px 0;
  text-align: center;
  ${ui.ani_direction_init}

  ${isAniActive
    ? css`
        animation-name: ${ui.fromB};
      `
    : css`
        animation-name: ${ui.toB};
      `}

  input {
    ${ui.position('absolute', '', '', '', '')}
    opacity: 0;
    &:checked + span {
      color: ${ui.color.dft.brightest};
    }
    &:disabled + span {
      &:hover {
        cursor: not-allowed;
      }
    }
    &:not(:disabled) + span {
      &:hover,
      &:focus {
        color: ${ui.color.dft.brightest};
      }
    }
  }
  span {
    display: inline-block;
    vertical-align: top;
    color: ${ui.color.theme.project_sub};
    box-sizing: border-box;
    cursor: pointer;
    ${ui.natural_effect}
    transition-property: color, border-color;
  }
  ${ui.respond(
    ui.break_points.tablet,
    `
      span {
        color: ${ui.color.dft.brightest};
        border: 0;
      }
  `,
  )}
`;

export const dftChkComn = (dftBdColor: string, chkBdColor: string, chkBgColor: string): any => css`

  &:not(:last-of-type) {
    margin-right: 25px;
  }
  input {
    + span {
      position: relative;
      line-height: 1;
      ${ui.pseudo_init(
        'before',
        'inline-block',
        `
        margin-right: 8px;
        ${ui.size('22px')}
        vertical-align: middle;
        border: 1px solid ${dftBdColor};
      `,
      )}
      ${ui.pseudo_init(
        'after',
        '',
        `
        opacity: 0;
        ${ui.position('absolute', '4px', '', '', '4px')}
        ${ui.size('16px')}
        transform: scale(0);
        transition: 0.08s cubic-bezier(0.51, -0.19, 0.17, 0.82);
        transition-property: opacity, transform;
      `,
      )}
    }
    &:checked + span {
      &:before {
        border-color: ${chkBdColor};
      }
      &:after {
        background-color: ${chkBgColor};
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;
