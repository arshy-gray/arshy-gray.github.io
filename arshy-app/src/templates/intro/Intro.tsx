import React, { forwardRef } from 'react';
import Section, { ExportSectionProps } from '../../components/layout/section/Section';
import ContactGroup from '../../components/contents/contactGroup/ContactGroup';

export interface IntroProps extends ExportSectionProps {}

/**
 * ## [Storybook](http://localhost:6006/?path=/story/components-layout-section--section)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | isAniActive | boolean | true, false | 애니메이션 활성화 여부 |
 */

const Intro = forwardRef<HTMLDivElement, IntroProps>(({ isAniActive, ...rest }, ref) => {
  return (
    <Section
      pageName="intro"
      isFullpage
      isAniActive={isAniActive}
      bgElement={
        <>
          <span className="el01"></span>
          <span className="el02"></span>
          <span className="el03"></span>
        </>
      }
      articleTitle="소개"
      {...rest}
    >
      <ContactGroup />
    </Section>
  );
});

export default Intro;
