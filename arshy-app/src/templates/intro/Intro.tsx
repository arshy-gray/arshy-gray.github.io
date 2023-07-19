import React, { forwardRef } from 'react';
import Section, { ExportSectionProps } from '../../components/layout/section/Section';
import ContactGroup from '../../components/contents/contactGroup/ContactGroup';

export interface IntroProps extends ExportSectionProps {}

/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/templates-intro--intro)
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
      articleTitle="소개"
      {...rest}
    >
      <ContactGroup />
    </Section>
  );
});

export default Intro;
