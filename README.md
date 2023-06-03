# arshy-gray Portfolio

## 실행방법

``` 
# 패키지 파일 설치
$ yarn

# 빌드
$ gulp 

# 로컬 서버 실행
$ gulp server 
```

## Release
### [2023년] - 고도화 진행중
1. Intro 페이지 구성 변경(기존 내용 삭제 -> 연락처 정보 추가)
2. Gulp 셋팅
   * 로컬 서버, reload 환경 구축
3. css, js 파일 캐싱 방지 : timestamp 추가
4. css -> SCSS 변환 및 폴더 구조화
5. Project 리스트 'Company' 필터 추가
6. Project 팝업 내 탭 콘텐츠 텍스트 출력 방식 변경
   * 일반 텍스트 -> 멀티 리스트
7. 불필요한 js 삭제 -> css 구현
   * fullpage
   * smooth-scroll
8. UI/UX 최적화
   * Project 팝업
      + 모바일 레이아웃 변경(상세 내용 하단 -> 상단)
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
3. 직접 구현
   * fullpage
   * parallax
   * Splash : 로딩 진행율
   * Project : 이미지 슬라이더
   * Project, Portfolio : JSON 데이터 Ajax 요청 및 처리
   * Skill : 막대그래프
4. 오픈소스 활용
   * Portfolio : 리스트 필터
   * imagesloaded
   * masonry
   * 마우스 방향감지
   * smooth-scroll
