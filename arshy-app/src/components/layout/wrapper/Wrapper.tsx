import React, { forwardRef } from 'react';
import { StyledWrapper, StyledSkipNav } from './StyledWrapper';

export interface WrapperProps {
  isVisible?: boolean;
  skipNavHerf?: string;
  outerWrapperTopChildren?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * ## [Storybook](http://localhost:6006/?path=/story/components-layout-section--section)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | isVisible | boolean | - | opacity:1 적용 여부 |
 * | * skipNavHerf | string | - | 본문 바로가기 링크 |
 * | outerTopWrapperChildren | React.ReactNode | - | wrapper 외부 상단 마크업 자리 |
 * | * innerWrapperChildren | React.ReactNode | - | wrpper 내부 본문 마크업 자리 |
 */

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ isVisible, skipNavHerf = 'intro', outerWrapperTopChildren, children, ...rest }, ref) => {
    return (
      <>
        <StyledSkipNav id="#skip_nav">
          <a href={'#' + skipNavHerf}>
            <span>본문 바로가기</span>
          </a>
        </StyledSkipNav>
        {outerWrapperTopChildren}
        <StyledWrapper id="wrapper" className={`${isVisible && "on"}`} ref={ref} {...rest}>
          {children}
        </StyledWrapper>
      </>
    );
  },
);

export default Wrapper;
