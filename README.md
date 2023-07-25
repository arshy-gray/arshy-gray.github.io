# arshy-gray Portfolio

## 실행방법

``` 
# node version : v16.15.1

## 패키지 파일 설치
$ yarn

## 빌드
$ gulp 

## 로컬 서버 실행
$ gulp server 
```

## Release
### [2023년] - React 변환중 // develop-react 브랜치 > arshy-app 폴더 (https://github.com/arshy-gray/arshy-gray.github.io/tree/develop-react/arshy-app)
1. Gulp 셋팅 및 SCSS 변환
   * 로컬 서버, reload 환경 구축
   * css -> SCSS 변환 및 파일&폴더 구조 변경
   * css 압축 및 소스맵 적용
   * 이미지 스프라이트 생성 및 적용
2. github pages 배포 자동화
3. 소스코드 최적화
   * 캐싱 방지
      + timestamp 추가
   * 불필요한 js 삭제 -> css 구현
      + fullpage
      + smooth-scroll
   * SCSS, js 레거시 제거 및 코드 클렌징
4. SCSS 최적화 및 고도화
   * 기본 mixin, extend, variables, function 등 적용
   * 페럴렉스 모션 및 레이아웃 관련 모듈화
   * 웹폰트 깜박임 현상 개선
5. js 최적화 및 고도화
   * script 태그 async, defre 속성 적용
   * 함수 및 이벤트 호출 위치 변경
   * setTimeout 함수 debouncing 및 throttling 적용
6. [Project] 고도화
   * 필터 추가
        - Company(회사별)
        - Business(사업별)
   * 리스트 무한 스크롤링 구현
   * 팝업 내 탭 콘텐츠 텍스트 출력 방식 변경
        - 일반 텍스트 -> 멀티 리스트
7. UI/UX 최적화 및 고도화
   * Project 팝업
      + 모바일 레이아웃 변경(상세 내용 하단 -> 상단)
      + 사이즈 및 스크롤 방식 변경(전체 스크롤 -> 콘텐츠 내 스크롤)
   * 기타 디자인 고도화

### [2020년]
1. 페이지 구성 변경 (Splash, Intro - Project(기존 Portfolio) - History - Contact)
2. Github 연동 및 Github Pages 호스팅
4. Project : 리스트 'LINKED' 필터 추가
3. Project : 팝업 고도화
   * 탭 콘텐츠(프로젝트 상세 설명) 추가
   * 디자인 고도화

### [2017년]
1. 신규 구축 (Splash, Intro - Project - Portfolio - History - Skill - Contact)
2. 로컬 내 Apache 환경에서 작업 및 서버 호스팅
3. 기능 구현
   * fullpage
   * parallax
   * Splash : 로딩 진행율
   * Project : 이미지 슬라이더
   * Project, Portfolio : JSON 데이터 Ajax 요청 및 처리
   * Portfolio : 리스트 필터
   * Skill : 막대그래프
4. 오픈소스 활용
   * imagesloaded
   * masonry
   * 마우스 방향감지
   * smooth-scroll
