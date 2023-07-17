import React, { forwardRef } from 'react';
import { StyledSection } from './StyledSection';

export interface SectionProps {
  pageName: string;
  isFullpage?: boolean;
  isPageOn?: boolean;
  isAniActive?: boolean;
  isSectionTitle?: boolean;
  SectionDesc?: React.ReactNode;
  bgElement?: React.ReactNode;
  articleTitle: React.ReactNode;
  isFooter?: boolean;
  children: React.ReactNode;
}

/**
 * ## [Storybook]()
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | * pageName | string | intro, project, history, contact, ... | page 이름 |
 * | isFullpage | boolean | ture, false | fullpage 여부 |
 * | isPageOn | boolean | ture, false | page 활성화 여부 |
 * | isAniActive | boolean | ture, false | 애니메이션 활성화 여부 |
 * | isSectionTitle | boolean | ture, false | 섹션 타이틀 노출 여부 |
 * | SectionDesc | React.ReactNode | 순수 텍스트 or 줄바꿈시 <br /> 포함 | 섹션 설명 |
 * | bgElement | React.ReactNode | - | 배경 요소 마크업 |
 * | * articleTitle | React.ReactNode | - | article 제목 (미노출) |
 * | isFooter | boolean | ture, false | footer 포함 여부 |
 * | children | React.ReactNode | - | article 콘텐츠 |
 */

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      pageName,
      isFullpage,
      isPageOn,
      isAniActive,
      isSectionTitle,
      SectionDesc,
      bgElement,
      articleTitle,
      isFooter,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledSection
        id={'#' + pageName}
        className={[isFullpage && 'fullPage', isPageOn && 'on', isAniActive && 'active'].join(' ')}
        ref={ref}
        {...rest}
      >
        <h2 className={isSectionTitle ? 'sect_tit' : 'hidden'}>{pageName.toUpperCase()}</h2>

        {SectionDesc && <p className="sect_desc">{SectionDesc}</p>}

        {bgElement && <div className="bg_el">{bgElement}</div>}

        <div className="wrap_cen">
          <article className={pageName + '_atc'}>
            <h3 className="hidden">{articleTitle}</h3>

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
