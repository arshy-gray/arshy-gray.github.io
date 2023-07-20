import React, { forwardRef } from 'react';
import { StyledSection } from './StyledSection';
import { ExportHistoryProps } from '../../../templates/history/History'

export interface ExportSectionProps {
  isAniActive?: boolean;
}

interface SectionProps extends ExportSectionProps, ExportHistoryProps {
  pageName: string;
  isFullpage?: boolean;
  isSectionTitle?: boolean;
  SectionDesc?: React.ReactNode;
  bgElement?: React.ReactNode;
  articleTitle: React.ReactNode;
  isFooter?: boolean;
  children: React.ReactNode;
}

/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/components-layout-section--section)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | * pageName | string | intro, project, history, contact, ... | page 이름 |
 * | isFullpage | boolean | true, false | fullpage 여부 |
 * | isAniActive | boolean | true, false | 애니메이션 활성화 여부 |
 * | isSectionTitle | boolean | true, false | 섹션 타이틀 노출 여부 |
 * | SectionDesc | React.ReactNode | 순수 텍스트 or 줄바꿈시 br태그 포함 | 섹션 설명 |
 * | bgElement | React.ReactNode | - | 배경 요소 마크업 |
 * | * articleTitle | React.ReactNode | - | article 제목 (미노출) |
 * | isFooter | boolean | true, false | footer 포함 여부 |
 * | * children | React.ReactNode | - | article 콘텐츠 |
 */

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      pageName,
      isFullpage,
      isAniActive,
      isSectionTitle,
      SectionDesc,
      bgElement,
      articleTitle,
      isFooter,
      children,
      footPrintLen,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledSection
        id={pageName}
        $pageName={pageName}
        $isFullpage={isFullpage || false}
        $isAniActive={isAniActive || false}
        $isSectionTitle={isSectionTitle || false}
        $footPrintLen={footPrintLen || 5}
        ref={ref}
        {...rest}
      >
        <h2 className={'sect_tit'}>{pageName.toUpperCase()}</h2>

        {SectionDesc && <p className="sect_desc">{SectionDesc}</p>}

        {bgElement && <div className="bg_el">{bgElement}</div>}

        <div className="wrap_cen">
          <article className={pageName + '_atc'}>
            <h3 className="atc_tit">{articleTitle}</h3>

            <div className={pageName + '_ctt'}>{children}</div>
          </article>
        </div>

        {isFooter && (
          <footer className="main_footer">
            <p>COPYRIGHT ⓒ 2017 Song Aeri. All Right Reserved.</p>
          </footer>
        )}
      </StyledSection>
    );
  },
);

export default Section;
