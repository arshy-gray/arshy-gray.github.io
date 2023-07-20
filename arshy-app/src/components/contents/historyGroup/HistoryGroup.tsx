import React, { forwardRef } from 'react';
import { StyledHistoryGroup } from './StyledHistoryGroup';

export interface HistoryGroupProps {
  isAniActiveHistory?: boolean;
}

interface HistoyItemsProps {
  type: 'edu' | 'license' | 'company';
  date: string;
  title: string;
  titleDesc?: string;
  desc?: string;
}

/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/components-contents-contactgroup--contact-group)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | value | description |
 * | :--- | :--- | :--- |
 * | isAniActiveHistory (boolen) |  | history 섹션 애니메이션 활성화 여부 |
 */

const HistoryGroup = forwardRef<HTMLUListElement, HistoryGroupProps>(
  ({ isAniActiveHistory, ...rest }, ref) => {
    const HistoryItems: HistoyItemsProps[] = [
      {
        type: 'edu',
        date: '2007-03 ~ 2011-02',
        title: '조선대학교 졸업',
        desc: '컴퓨터공학과',
      },
      { type: 'license', date: '2010-05', title: '정보처리기사 취득' },
      { type: 'license', date: '2011-07', title: '컴퓨터그래픽스운용기능사 취득' },
      { type: 'license', date: '2015-04', title: '웹디자인기능사 취득' },
      {
        type: 'company',
        date: '2015-07 ~ 2017-01',
        title: '(주)렛츠온 근무',
        titleDesc: '웹에이젼시',
        desc: 'UI Deviloper & Designer',
      },
      {
        type: 'company',
        date: '2017-05 ~ 2020-01',
        title: '(주)로지포커스 근무',
        titleDesc: 'IoT 물류사',
        desc: 'UI Deviloper',
      },
      {
        type: 'company',
        date: '2020-04 ~ 2020-06',
        title: '(주)위메프 근무',
        titleDesc: 'E-Commerce',
        desc: 'UI Deviloper',
      },
    ];

    const historyItemLen: number = HistoryItems.length;

    const historyNames = (historyName: string) => {
      switch (historyName) {
        case 'edu':
          return '학교';
        case 'license':
          return '자격증';
        default:
        case 'company':
          return '회사';
      }
    };

    return (
      <StyledHistoryGroup
        className="history_group"
        $isAniActiveHistory={isAniActiveHistory}
        $historyItemLen={historyItemLen}
        ref={ref}
        {...rest}
      >
        {HistoryItems.map((info, idx) => (
          <li key={idx} className={`history_${info.type}`}>
            <div className="history_ico">
              <span className="txt">{historyNames(info.type)}</span>
            </div>
            <i className="history_point">
              <em></em>
            </i>
            <ul className="history_info">
              <li className="date">{info.date}</li>
              <li className="title">{info.title}</li>
              {info.titleDesc && <li className="title_desc">{info.titleDesc}</li>}
              {info.desc && <li className="desc">{info.desc}</li>}
            </ul>
          </li>
        ))}
      </StyledHistoryGroup>
    );
  },
);

export default HistoryGroup;
