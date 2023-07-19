import { css } from 'styled-components';
import { IStyle } from './style';

//= function
export const half = (number: number): number => {
  return (number - (number % 2)) / 2;
};

//= variables
export const ani_timing: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const img_url: string = process.env.PUBLIC_URL + '/assets/images';

//= extend, mixin
//== parallex
export const ani_direction_init: any = css`
  position: relative;
  animation: 0.7s ${ani_timing} both;
`;

export const natural_effect: any = css`
  transition: 0.3s 0s ${ani_timing};
`;

//== box
export const size = (width: string = '', height: string = width): any => {
  return css`
    width: ${width};
    height: ${height};
  `;
};

//== 글꼴
// font style
export const font = (
  font_size: string = '',
  line_height: string = '',
  color: string = '',
): any => {
  return css`
    ${font_size && 'font-size:' + font_size};
    ${line_height && 'line-height:' + line_height};
    ${color && 'color:' + color};
  `;
};

// 높이 고정 문자 수직 중앙 정렬
export const vt_m = (height: string, line_height: string = height): any => {
  return css`
    ${height && `height:` + height};
    ${line_height && `line-height:` + line_height};
  `;
};

// 말줄임처리
export const ellipsis = (count: number = 1): any => {
  let ellipsis_st: any = ``;

  if (count === 1)
    ellipsis_st = css`
      white-space: nowrap;
    `;
  else
    ellipsis_st = css`
      display: -webkit-box;
      -webkit-line-clamp: ${count};
      -webkit-box-orient: vertical;
    `;

  return css`
    text-overflow: ellipsis;
    overflow: hidden;
    ${ellipsis_st}
  `;
};

//== layout
export const blind: any = css`
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

export const clearfix: any = css`
  &:before,
  &:after {
    content: '';
    display: table;
  }
  &:after {
    clear: both;
  }
`;

export const imgfix: any = css`
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
): any => {
  return css`
    position: ${position};
    ${top && `top:` + top};
    ${right && `right:` + right};
    ${bottom && `bottom:` + bottom};
    ${left && `left:` + left};
  `;
};

// absolute 중앙 정렬
export const absolute_center = (width: string = '', height: string = width): any => {
  const wid_num: number = Number(width.slice(0, -2));
  const wid_unit: string = width.slice(-2);
  const h_num: number = Number(height.slice(0, -2));
  const h_unit: string = width.slice(-2);

  return css`
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
export const flex = (
  hrzt_align: string = '',
  vtc_align: string = '',
  direction: string = '',
): any => {
  let align_st: any = ``;

  if (direction === 'column' || direction === 'column-reverse')
    align_st = css`
      align-items: ${hrzt_align};
      justify-content: ${vtc_align};
    `;
  else
    align_st = css`
      align-items: ${vtc_align};
      justify-content: ${hrzt_align};
    `;

  return css`
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
export const scroll = (direction: string = 'x', hide: boolean = false): any => {
  let scroll_st: any = ``;

  // 스크롤 방향에 따른 스타일
  if (direction === 'y')
    scroll_st = css`
      overflow-x: hidden;
      overflow-y: auto;
    `;
  else
    scroll_st = css`
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: auto;
    `;

  return css`
    ${scroll_st}
    ${
      hide &&
      css`&::-webkit-scrollbar {
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
): any => {
  let pseudo_block: any = ``;
  const pseudo_st: any = css`
    content: ${content};
    display: ${display};
    ${style && style}
  `;

  if (pseudo === 'both')
    pseudo_block = css`
      &:before, &:after{
        ${pseudo_st}
      }
    `;
  else
    pseudo_block = css`
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
export const respond = (width: string, style: any): any => {
  return css`
    @media screen and (max-width: ${width}) {
      ${style}
    }
  `;
};

//== bugfix
// 아이폰x 제스처 공간
export const safe_area: IStyle = {
  after: css`
    &:after{
      content: '';
      display: block;
      height: env(safe-area-inset-bottom);
    }
  `,
  margin: css`
    margin-bottom: env(safe-area-inset-bottom);
  `,
  padding: css`
    padding-bottom: env(safe-area-inset-bottom);
  `,
};

// 사파리 border-radius overflow 버그 수정
export const backface: any = css`
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
`;
