import React, { forwardRef } from 'react';
import Section, { ExportSectionProps } from '../../components/layout/section/Section';
import HistoryGroup from '../../components/contents/historyGroup/HistoryGroup';

export interface ExportHistoryProps {
  footPrintLen?: number;
}

interface HistoryProps extends ExportSectionProps, ExportHistoryProps {}


/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/templates-contact--contact)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | isAniActive | boolean | true, false | 애니메이션 활성화 여부 |
 * | footPrintTopLen | number |  | 애니메이션 활성화 여부 |
 * | footPrintBtmLen | number |  | 애니메이션 활성화 여부 |
 */

const History = forwardRef<HTMLDivElement, HistoryProps>(
  ({ isAniActive, footPrintLen, ...rest }, ref) => {
    const footPrintMax = 5;
    const footPrintEl = (footPrintMax : number) => {
      const elements = [];
      for (let i = 1; i <= footPrintMax; i++) {
        elements.push(<span key={i} className={`el_0${i}`}></span>);
      }
      return elements;
    };
    
    return (
      <Section
        pageName="history"
        isAniActive={isAniActive}
        isSectionTitle
        SectionDesc="웹분야 관련 학업 ・ 자격증 ・ 근무 경력입니다."
        bgElement={
          <>
            <div className="el_foot_print_top">{footPrintEl(footPrintMax)}</div>
            <div className="el_foot_print_btm">{footPrintEl(footPrintMax)}</div>
            <span className="el_person"></span>
          </>
        }
        articleTitle="연혁"
        footPrintLen={footPrintMax}
        {...rest}
      >
        <HistoryGroup isAniActiveHistory={isAniActive} />
      </Section>
    );
  },
);

export default History;
