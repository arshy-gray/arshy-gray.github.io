import { css } from 'styled-components';
import { ITwoDepthStyle } from './style';
import { break_points } from './layout';
import { respond } from './global';

export const font: ITwoDepthStyle = {
  title: {
    lg: css`
      font-size: 50px;
      font-weight: bold;
    `,
    md: css`
      font-size: 35px;
      font-weight: bold;
      ${respond(break_points.tablet, 'font-size:30px')}
    `,
    sm: css`
      font-size: 22px;
      font-weight: bold;
      ${respond(break_points.tablet, 'font-size:18px')}
      ${respond(break_points.mobile_mid, 'font-size:18px')}
    `,
  },
  content: {
    xl: css`
      font-size: 17px;
      ${respond(break_points.tablet, 'font-size:15px')}
    `,
    lg: css`
      font-size: 16px;
    `,
    md: css`
      font-size: 15px;
    `,
    dft: css`
      ${respond(break_points.tablet, 'font-size:12px')}
      ${respond(break_points.mobile_mid, 'font-size:11px')}
    `,
    sm: css`
      font-size: 13px;
    `,
  },
};
