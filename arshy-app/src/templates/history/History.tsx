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
      $footPrintLen={footPrintEl(5).length}
      isSectionTitle
      SectionDesc="웹분야 관련 학업 ・ 자격증 ・ 근무 경력입니다."
      bgElement={
        <>
          <div className="el_foot_print_top">{footPrintEl(5)}</div>
          <div className="el_foot_print_btm">{footPrintEl(5)}</div>
          <span className="el_person"></span>
        </>
      }
      articleTitle="연혁"
      ref={ref}
      {...rest}
    >
      <HistoryGroup isAniActive={isAniActive} />
    </StyledHistory>
  );
});

export default History;
