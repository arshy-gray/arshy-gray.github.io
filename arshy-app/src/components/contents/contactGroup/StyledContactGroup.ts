import styled from 'styled-components';
import { ui } from '../../../assets/style';

export const StyledContactGroup = styled.ul`
  ${ui.flex('center', 'center', 'column')};
  .name,
  .tel_num {
    a {
      ${ui.imgfix};
    }
  }
  .mail,
  .gitHub {
    a {
      display: inline-block;
    }
  }
`;
