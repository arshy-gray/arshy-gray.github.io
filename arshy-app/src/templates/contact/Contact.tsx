import React, { forwardRef } from 'react';
import { StyledContact } from './StyledContact';
import ContactGroup from '../../components/contents/contactGroup/ContactGroup';

export interface ContactProps {
  isAniActive?: boolean;
}

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
 */

const Intro = forwardRef<HTMLDivElement, ContactProps>(({ isAniActive, ...rest }, ref) => {
  return (
    <StyledContact
      pageName="contact"
      isFullpage
      isAniActive={isAniActive}
      isSectionTitle
      SectionDesc="연락 가능한 핸드폰 및 이메일과 깃허브 주소입니다."
      bgElement={
        <>
          <span className="el_flower_left"></span>
          <span className="el_flower_right"></span>
          <span className="el_butterfly"></span>
        </>
      }
      articleTitle="연락처"
      isFooter
      {...rest}
    >
      <ContactGroup />
    </StyledContact>
  );
});

export default Intro;
