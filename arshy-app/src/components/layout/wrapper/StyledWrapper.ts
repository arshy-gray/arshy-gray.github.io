import styled, { css } from 'styled-components';
import { ui } from '../../../assets/style';
import { rgba } from 'polished';

export interface WrapperProps {
  isVisible?: boolean;
}

export const StyledSkipNav = styled.nav`
  ${ui.position('absolute', '0', '', '', '0')}
  z-index: 1;
  a {
    display: inline-block;
    padding: 5px 15px;
    color: ${ui.color.dft.brightest};
    background: ${rgba(ui.color.dft.darkest, 0.8)};
    transform: translateY(-32px);
    &:focus {
      transform: translateY(0);
    }
  }
`;

export const StyledWrapper = styled.div<WrapperProps>`
  position: relative;
  z-index: 0;
  width: 100%;
  min-width: 1400px;
  overflow: hidden;
  opacity: 0;
  ${ui.natural_effect}
  transition-property: opacity;
  ${(props) =>
    props.isVisible &&
    css`
      opacity: 1;
    `}
  .wrap_cen {
    position: relative;
    margin: 0 auto;
    ${ui.size('1400px', '100%')}
    ${ui.clearfix}
  }
`;
