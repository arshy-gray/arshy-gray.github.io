import React, { forwardRef } from 'react';
import { StyledSplash } from './StyledSplash';
import ContactGroup from '../../components/contents/contactGroup/ContactGroup';

interface SplashProps {
  isHide?: boolean;
  isProgressDone?: boolean;
  progressBarLeftH?: number;
  progressBarRightH?: number;
  progressTxt?: number;
}

/**
 * ## [Storybook](http://localhost:6006/?path=/story/templates-splash--progress-0)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | isHide (boolean) | true, false | 컴포넌트 숨김처리 여부 |
 * | isProgressDone (boolean) | true, false | 본문 이미리 로딩 완료 여부 |
 * | progressBarLeftH (number) | 0 ~ 100 | 로딩 진행율 왼쪽 원형 라인 ( 51% - 100% ) |
 * | progressBarRightH (number) | 0 ~ 100 | 로딩 진행율 오른족 원형 라인 ( 0% - 50% ) |
 * | progressTxt (number) | 0 ~ 100 | 로딩 진행율 텍스트 ( 51% - 100% ) |
 */

const Splash = forwardRef<HTMLDivElement, SplashProps>(
  ({ isHide, isProgressDone, progressBarLeftH, progressBarRightH, progressTxt, ...rest }, ref) => {
    // %로 표현
    const leftHeight = `${progressBarLeftH}%`;
    const rightHeight = `${progressBarRightH}%`;

    return (
      <StyledSplash
        id="#splash"
        className={['progress_box', isHide && 'off', isProgressDone && 'progress-complete'].join(
          ' ',
        )}
        ref={ref}
        {...rest}
      >
        <div className="progress">
          <ContactGroup />
          <div className="progress-bar">
            <div className="bar_box">
              <span className="bar_L" style={{ height: leftHeight }}>
                <span className="bar"></span>
              </span>
              <span className="bar_R" style={{ height: rightHeight }}>
                <span className="bar"></span>
              </span>
            </div>
          </div>
          <p className="progress-txt">{progressTxt}%</p>
        </div>
      </StyledSplash>
    );
  },
);

export default Splash;
