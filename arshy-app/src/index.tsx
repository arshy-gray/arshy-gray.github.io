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
import ProjectTitle from './components/contents/projectTitle/ProjectTitle';
// import CheckboxGroup, { ChkItemProps } from './components/basic/checkboxGroup/CheckboxGroup';
// import RadioGroup, { RadioItemProps } from './components/basic/radioGroup/RadioGroup';
// import { ui } from 'assets/style';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* <Wrapper isVisible>
      <Header />
      <Intro isAniActive></Intro>
    </Wrapper> */}
    {/* <div style={{ background: '#01d3ce' }}> */}
      <ProjectTitle
        titleType="thumb"
        title="프로젝트 썸네일 타이틀"
        summary="프로젝트 썸네일 개요를 입력하세요"
      />
      <ProjectTitle
        titleType="popup"
        title="프로젝트 팝업 타이틀"
        summary="프로젝트 팝업 개요를 입력하세요"
      />
    {/* </div> */}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
