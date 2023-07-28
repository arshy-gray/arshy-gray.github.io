import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import Splash from './templates/splash/Splash';
// import Wrapper from './components/layout/wrapper/Wrapper';
// import Header from './components/layout/header/Header';
// import Intro from './templates/intro/Intro';
// import History from './templates/history/History';
// import Contact from './templates/contact/Contact';
// import ContactGroup from './components/contents/contactGroup/ContactGroup';
// import HistoryGroup from './components/contents/historyGroup/HistoryGroup';
import CheckboxGroup, { ChkItemProps } from './components/basic/checkboxGroup/CheckboxGroup';
import RadioGroup, { RadioItemProps } from './components/basic/radioGroup/RadioGroup';
// import { ui } from 'assets/style';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const radioItems: ChkItemProps[] = [
  { label: 'one', value: 'one' },
  { label: 'two', value: 'two' },
  { label: 'three', value: 'three' },
];
const chkItems: ChkItemProps[] = [
  { label: 'one1', value: 'one1' },
  { label: 'two1', value: 'two1' },
  { label: 'three1', value: 'three1' },
];

root.render(
  <React.StrictMode>
    {/* <Wrapper isVisible>
      <Header />
      <Intro isAniActive></Intro>
    </Wrapper> */}
    <div style={{ background: '#01d3ce' }}>
      <RadioGroup
        itemType="button"
        legend="운영중인 사이트"
        name="linked"
        className="filter-group filter-type-linked filter-chk"
        isAniActive
        radioItems={radioItems}
      />
      <RadioGroup
        itemType="default"
        legend="운영중인 사이트"
        name="linked2"
        className="filter-group filter-type-linked filter-chk"
        isAniActive
        radioItems={chkItems}
      />
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
