import { ITwoDepthStyle } from './style';
import { break_points } from './layout';
import { respond } from './global';

export const font: ITwoDepthStyle = {
  title: {
    lg: `
      font-size: 50px;
      font-weight: bold;
    `,
    md: `
      font-size: 35px;
      font-weight: bold;
      ${respond(break_points.tablet, 'font-size:30px')}
    `,
    sm: `
      font-size: 22px;
      font-weight: bold;
      ${respond(break_points.tablet, 'font-size:18px')}
      ${respond(break_points.mobile_mid, 'font-size:18px')}
    `,
  },
  content: {
    xl: `
      font-size: 17px;
      ${respond(break_points.tablet, 'font-size:15px')}
    `,
    lg: `
      font-size: 16px;
    `,
    md: `
      font-size: 15px;
    `,
    dft: `
      ${respond(break_points.tablet, 'font-size:12px')}
      ${respond(break_points.mobile_mid, 'font-size:11px')}
    `,
    sm: `
      font-size: 13px;
    `,
  },
};
