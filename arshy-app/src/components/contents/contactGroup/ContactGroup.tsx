import React, { forwardRef } from 'react';
import { StyledContactGroup } from './StyledContactGroup';

interface ContactGroupProps {
  isTabIndex?: boolean;
}

/**
 * ## [Storybook]()
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | isTabIndex (boolen) |  | tabindex='0' 설정 유무 |
 */

const ContactGroup = forwardRef<HTMLUListElement, ContactGroupProps>(
  ({ isTabIndex, ...rest }, ref) => {
    return (
      <StyledContactGroup className="contact_group" ref={ref} {...rest}>
        <li className="name">
          <a href="#intro" {...(isTabIndex && { tabIndex: 0 })}>
            <img
              src="assets/images/common/name.png"
              alt="Song Aeri, Intro 페이지로 가기"
            />
          </a>
        </li>
        <li className="tel_num">
          <a href="tel:010-6331-0512">
            <img src="assets/images/common/tel_num.png" alt="전화걸기" />
          </a>
        </li>
        <li className="mail">
          <a href="mailto:arshy.gray@gmail.com" title="메일 보내기(새창)">
            arshy.gray@gmail.com
          </a>
        </li>
        <li className="gitHub">
          <a
            href="https://github.com/arshy-gray"
            target="_blank"
            title="깃허브 바로가기(새창)"
            rel="noopener noreferrer"
          >
            https://github.com/arshy-gray
          </a>
        </li>
      </StyledContactGroup>
    );
  },
);

export default ContactGroup;
