import React, { forwardRef } from 'react';
import HistoryGroup from '../../components/contents/historyGroup/HistoryGroup';
import { StyledHistory } from './StyledHistory';

interface HistoryProps {
  isAniActive?: boolean;
}

/**
 * ## [Storybook](http://localhost:6006/?path=/story/templates-history--history)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | isAniActive | boolean | true, false | 애니메이션 활성화 여부 |
 */

const History = forwardRef<HTMLDivElement, HistoryProps>(({ isAniActive, ...rest }, ref) => {
  const footPrintLen = 5; // 발자국 요소 개수(모션 dealy에 사용)
  const footPrintEl = (footPrintMax: number) => {
    const elements = [];
    for (let i = 1; i <= footPrintMax; i++) {
      elements.push(<span key={i} className={`el_0${i}`}></span>);
    }
    return elements;
  };

  return (
    <StyledHistory
      pageName="history"
      isAniActive={isAniActive}
      $isAniActive={isAniActive}
      $footPrintLen={footPrintLen}
      isSectionTitle
      SectionDesc="웹분야 관련 학업 ・ 자격증 ・ 근무 경력입니다."
      bgElement={
        <>
          <div className="el_foot_print_top">{footPrintEl(footPrintLen)}</div>
          <div className="el_foot_print_btm">{footPrintEl(footPrintLen)}</div>
          <span className="el_person"></span>
        </>
      }
      articleTitle="연혁"
      ref={ref}
      {...rest}
    >
      <HistoryGroup isAniActiveHistory={isAniActive} />
    </StyledHistory>
  );
});

export default History;
