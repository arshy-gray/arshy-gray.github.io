import { IStyle } from './style';
import { break_points } from './layout';
import { color } from './colors';
import { rgba } from 'polished';

//= function
export const half = (number: number): number => {
  return (number - (number % 2)) / 2;
};

//= variables
export const ani_timing: string = `cubic-bezier(0.4, 0, 0.2, 1)`;

//= extend, mixin
//== parallex
export const ani_direction_init: string = `
  position: relative;
  animation: 0.7s ${ani_timing} both;
`;

export const natural_effect: string = `
  transition: 0.3s 0s ${ani_timing};
`;

//== box
export const size = (width: string = '', height: string = width): string => {
  return `
    width: ${width};
    height: ${height};
  `;
};

//== 글꼴
// font style
export const font = (font_size?: string, line_height?: string, color?: string): string => {
  return `
    ${font_size && `font-size:` + font_size};
    ${line_height && `line-height:` + line_height};
    ${color && `color:` + color};
  `;
};

// 높이 고정 문자 수직 중앙 정렬
export const vt_m = (height: string, line_height: string = height): string => {
  return `
    ${height && `height:` + height};
    ${line_height && `line-height:` + line_height};
  `;
};

// 말줄임처리
export const ellipsis = (count: number = 1): string => {
  let ellipsis_st: string = ``;

  if (count === 1)
    ellipsis_st = `
      white-space: nowrap;
    `;
  else
    ellipsis_st = `
      display: -webkit-box;
      -webkit-line-clamp: ${count};
      -webkit-box-orient: vertical;
    `;

  return `
    text-overflow: ellipsis;
    overflow: hidden;
    ${ellipsis_st}
  `;
};

//== layout
export const blind: string = `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

export const clearfix: string = `
  &:before, &:after{
    content: '';
    display: table;
  }
  &:after{
    clear: both;
  }
`;

export const imgfix: string = `
 display: inline-block;
  img {
    vertical-align: top;
  }
`;

export const position = (
  position: string = 'absolute',
  top?: string,
  right?: string,
  bottom?: string,
  left?: string,
): string => {
  return `
    position: ${position};
    ${top && `top:` + top};
    ${right && `right:` + right};
    ${bottom && `bottom:` + bottom};
    ${left && `left:` + left};
  `;
};

// absolute 중앙 정렬
export const absolute_center = (width: string = '', height: string = width): string => {
  const wid_num: number = Number(width.slice(0, -2));
  const wid_unit: string = width.slice(-2);
  const h_num: number = Number(height.slice(0, -2));
  const h_unit: string = width.slice(-2);

  return `
    position: absolute;
    width: ${width};
    height: ${height};
    top: 50%;
    left: 50%;
    margin-top: ${half(h_num) + h_unit};
    margin-left: ${half(wid_num) + wid_unit};
  `;
};

/**
 * # flex
 * ### flex 레이아웃 가로 세로 정렬
 * ---------------------
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | hrzt_align(string) || direction 맞춤 속성 - row : justify-content, comumn : align-items |
 * | vtc_align(string) || direction 맞춤 속성 - row : align-items, comumn : justify-content |
 * | direction (string) | row, column, row-reverse, column-reverse | flex-derection |
 */
export const flex = (hrzt_align?: string, vtc_align?: string, direction?: string): string => {
  let align_st: string = ``;

  if (direction === 'column' || direction === 'column-reverse')
    align_st = `
      align-items: ${hrzt_align};
      justify-content: ${vtc_align};
    `;
  else
    align_st = `
      align-items: ${vtc_align};
      justify-content: ${hrzt_align};
    `;

  return `
    display: flex;
    flex-direction: ${direction};
    ${align_st}
  `;
};

/**
 * # scroll
 * ### 스크롤바 생성 및 숨김 여부
 * ---------------------
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | direction (string) | x, y | x: 가로방향, y: 세로방향 |
 * | hide(boolean) || 스크롤바 숨김 여부 |
 */
export const scroll = (direction: string = 'x', hide: boolean = false): string => {
  let scroll_st: string = ``;

  // 스크롤 방향에 따른 스타일
  if (direction === 'y')
    scroll_st = `
      overflow-x: hidden;
      overflow-y: auto;
    `;
  else
    scroll_st = `
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: auto;
    `;

  return `
    ${scroll_st}
    ${
      hide &&
      `&::-webkit-scrollbar {
        display: none;
      }`
    }
  `;
};

//== 가상클래스
/**
 * # pseudo_init
 * ### 가상클래스(before, after) 초기화
 * ---------------------
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | pseudo (string) | before, after, both | both : before, after 둘 다 사용시 |
 * | display(string) |||
 * | content(string) |||
 */
export const pseudo_init = (
  pseudo: string = 'before',
  display: string = 'block',
  content: string = '',
  style?: string,
): string => {
  let pseudo_block: string = ``;
  const pseudo_st: string = `
    content: ${content};
    display: ${display};
    ${style && style}
  `;

  if (pseudo === 'both')
    pseudo_block = `
      &:before, &:after{
        ${pseudo_st}
      }
    `;
  else
    pseudo_block = `
    &:${pseudo} {
       ${pseudo_st}
    }
  `;

  return pseudo_block;
};

//== 미디어쿼리
// 반응형
/**
 * # respond
 * ### 반응형 미디어쿼리 width : ui.break_points
 * ---------------------
 * | key | value |
 * | :--- | :--- |
 * | pc_wide(string) | 1619px |
 * | pc_dft(string) | 1399px |
 * | tablet(string) | 1023px |
 * | mobile_high(string) | 767px |
 * | mobile_mid(string) | 599px |
 * | mobile_low(string) | 399px |
 * | minimum(string) | 320px |
 */
export const respond = (width: string, style: string): string => {
  return `
    @media screen and (max-width: ${width}) {
      ${style}
    }
  `;
};

//== bugfix
// 아이폰x 제스처 공간
export const safe_area: IStyle = {
  after: `
    &:after{
      content: '';
      display: block;
      height: env(safe-area-inset-bottom);
    }
  `,
  margin: `
    margin-bottom: env(safe-area-inset-bottom);
  `,
  padding: `
    padding-bottom: env(safe-area-inset-bottom);
  `,
};

// 사파리 border-radius overflow 버그 수정
export const backface: string = `
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
`;

//== global
// 전체
export const globalStyle: string = `
  .hidden {
    ${blind}
  }
  .clearFix {
    ${clearfix}
  }
  .imgFix {
    ${imgfix}
  }
  #skip_nav {
    @include pos-abs-lt;
    z-index: 1;
    a {
      display: inline-block;
      padding: 5px 15px;
      color: ${color.dft.brightest};
      background: ${rgba(color.dft.darkest, 0.8)};
      transform: translateY(-32px);
      &:focus {
        transform: translateY(0);
      }
    }
  }
  #wrapper {
    position: relative;
    z-index: 0;
    width: 100%;
    min-width: 1400px;
    overflow: hidden;
    opacity: 0;
    ${natural_effect}
    transition-property: opacity;
    &.on {
      opacity: 1;
    }
  }
  .wrap_cen {
    position: relative;
    margin: 0 auto;
    ${size('1400px', '100%')}
    ${clearfix}
  }
  ${respond(
    break_points.pc_dft,
    `
    #wrapper {
      min-width: auto;
    }
    .wrap_cen {
      width: 1000px;
    }
  `,
  )}
  ${respond(
    break_points.mobile_high,
    `
    .wrap_cen {
      padding: 0;
    }
  `,
  )}
`;
