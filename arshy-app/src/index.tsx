import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import Splash from './templates/splash/Splash';
import Section from './components/layout/section/Section';
import ContactGroup from './components/contents/contactGroup/ContactGroup';
import { ui } from 'assets/style'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <div id="#wrapper">
      <Section
        pageName="contact"
        isFullpage
        isSectionTitle
        isAniActive
        SectionDesc="연락 가능한 핸드폰 및 이메일과 깃허브 주소입니다."
        bgElement={
          <>
            <span className="el01"></span>
            <span className="el02"></span>
            <span className="el03"></span>
          </>
        }
        articleTitle="연락처"
        isFooter
        children={<ContactGroup />}
      ></Section>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
