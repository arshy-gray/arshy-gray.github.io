/* Portfolio -------------- */
const projectElement = document.querySelector("#project"), // ㅍ프로젝트 섹션
  pjtGelleryElement = document.querySelector("#pjt_gellery"), // 갤러리 컨테이너
  loadMoreBtnElement = projectElement.querySelector("#load-more"); // 리스트 더보기 버튼

//Masonry 준비 및 옵션 설정
const msnry = new Masonry(pjtGelleryElement, {
  columnWidth: ".grid-sizer",
  gutter: ".gutter-sizer",
  itemSelector: ".pjt_item",
  percentPosition: true,
});

let pjtItemLen = 0, // 표시 된 전체 항목 수
  addItemLen = 10, // 한 번에 표시될 항목 수
  allData = [], // 모든 JSON 데이터
  filteredData = [], // 필터링 된 JSON 데이터;
  infinitSrcTimer; // 갤러리 무한 스크롤링 setTimeout Throttle에 사용

// 780이하 해상도 : 한 번에 표시 할 항목 수
if (window.innerWidth < 780) {
  addItemLen = 6;
}

// JSON을 검색하고 initGallery 함수를 실행
fetch("/src/json/project_detail.json")
  .then((response) => response.json())
  .then((data) => initGallery(data))
  .catch((error) => console.error(error));

// 갤러리 초기화
const initGallery = (data) => {
  // 취득한 JSON 데이터를 저장
  allData = data;

  // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
  filteredData = allData;

  projectElement.classList.add("is-loading");

  // 첫 번째 항목을 표시
  setTimeout(() => {
    addItems();
  }, 300);
};

// 항목을 생성하고 문서에 삽입
const addItems = async () => {
  let pjtCtt = [];
  // 추가 데이터의 배열
  const slicedData = filteredData.slice(pjtItemLen, pjtItemLen + addItemLen);

  // slicedData의 요소마다 DOM 요소를 생성
  for (const item of slicedData) {
    let itemHTML = "";

    // 리스트 썸네일
    itemHTML += '<li class="pjt_item ';

    // 썸네일 길이 : long
    if (item.images.thumb_h) itemHTML += "thumb_h_" + item.images.thumb_h + " ";

    itemHTML +=
      'is-loading">' + // masonry loding cloass
      '<div class="pjt_thumb">' +
      '<div class="img_box"><img src="' +
      item.images.thumb + // 썸네일 이미지
      '" alt=""/></div>' +
      '<div class="txt_box">' +
      "<h4>" +
      item.title + // 썸네일 타이틀
      "</h4>" +
      '<p class="pjt_intro">' +
      item.intro + // 사이트 간략 설명 (서브 타이틀)
      "</p>" +
      "<ul>" +
      '<li><span class="pjt_item_tit"><i class="fas fa-chart-bar" title="참여율"></i></span><span class="pf_item_ctt">' +
      item.part + // 썸네일 참여율
      "</span></li>" +
      '<li><span class="pjt_item_tit"><i class="fas fa-calendar-alt" title="프로젝트기간"></i></span><span class="pf_item_ctt">' +
      item.period + // 썸네일 프로젝트 기간
      "</span></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      // 썸네일 호버
      '<div class="pjt_hover">' +
      '<div class="btn_box"><ul>' +
      // 썸네일 호버 내 버튼
      '<li class="detail_btn"><button type="button" title="자세히보기"><i class="fa fa-search"></i></button></li>';

    // 사이트 링크 있을 때
    if (item.link) {
      // 사이트 링크 URL
      itemHTML += '<li class="siteLink_btn"><a href="' + item.link + '" title="새창';

      // 사이트 링크 툴팁
      if (item.linkTitle) itemHTML += " : " + item.linkTitle;

      itemHTML +=
        '" target="_blank"><i class="fa fa-link"></i><span>사이트 바로가기</span></a></li>';
    }

    itemHTML +=
      "</ul></div>" +
      "</div>" +
      // 프로젝트 레이어 팝업
      '<div class="pjt_detail">' +
      '<div class="pjt_layer">' +
      '<div class="pjt_layer_tit">' +
      '<h4 class="pjt_main_tit">' +
      item.title + // 타이틀
      "</h4>" +
      '<p class="pjt_intro">' +
      item.intro + // 사이트 간략 설명 (서브 타이틀)
      "</p>" +
      "</div>" +
      '<div class="pjt_layer_ctt">' +
      '<div class="pjt_info">' +
      '<div class="pjt_info_type">' +
      '<ul class="type_device">'; // 지원 기기

    // PC 버전 지원시 (only pc, responsive, pc&mobile)
    if (item.device !== "MOBILE" || item.device === "RESPONSIVE") {
      itemHTML += '<li><i class="fas fa-desktop" title="PC"></i></li>';
    }

    // 모바일 버전 지원시 (only mobile, responsive, pc&mobile)
    if (item.device !== "PC" || item.device === "RESPONSIVE") {
      itemHTML += '<li><i class="fas fa-mobile-alt" title="Mobile"></i></li>';
    }

    // 반응형 지원시 (responsive)
    if (item.device === "RESPONSIVE") {
      itemHTML +=
        '<li class="responsive"><i class="fas fa-sync-alt fa-sync" title="반응형"></i></li>';
    }

    itemHTML +=
      "</ul>" +
      '<ul class="type_browser">' + // 지원 브라우저
      '<li class="chrome"><i title="Chrome"></i></li>'; // 크롬 지원

    // ie 지원시
    if (item.browser.ie) {
      itemHTML +=
        '<li class="ie"><i title="Internet Explorer"></i><span class="browser_ver">' +
        item.browser.ie + // ie 버전
        "</span></li>";
    }

    // safari 지원
    if (item.browser.safari) {
      itemHTML += '<li class="safari"><i title="Safari"></i></li>';
    }

    itemHTML +=
      "</ul>" +
      "</div>" +
      '<div class="txt_basic_sub">' +
      '<ul class="pjt_ctt">' +
      "<li>" +
      '<span class="pjt_item_tit">프로젝트기간<i class="fas fa-calendar-alt"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.period + // 프로젝트 기간
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pjt_item_tit">구성원<i class="fas fa-users"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.member + // 프로젝트 구성원
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pjt_item_tit">주요역할<i class="fas fa-user-tag"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.main_role + // 주요역할
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pjt_item_tit">참여율<i class="fas fa-chart-bar"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.part + // 참여율
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pjt_item_tit">사용언어<i class="fas fa-code"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.language + // 사용언어
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pjt_item_tit">개발환경<i class="fas fa-laptop-code"></i></span>' +
      '<span class="pjt_item_ctt">' +
      item.task_environment + // 개발환경
      "</span>" +
      "</li>";

    // 사이트 링크 있을 때
    if (item.link) {
      itemHTML +=
        "<li>" +
        '<span class="pjt_item_tit">웹사이트<i class="fas fa-external-link-alt"></i></span>' +
        '<span class="pjt_item_ctt"><a href="' +
        item.link + // 사이트 링크 URL
        '" title="새창" target="_blank">' +
        item.link + // 사이트 링트 텍스트
        "</a>";

      // 사이트 링크 툴팁 있을 때
      if (item.linkTitle)
        itemHTML += ' <br /><em class="lint_desc"><b>(' + item.linkTitle + ")</b></em>";

      itemHTML += "</span></li>";
    }

    itemHTML +=
      "</ul>" +
      "</div>" +
      "</div>" +
      // 작업 상세 텝 메뉴
      '<div class="pjt_info_detail tab_wrap">' +
      '<ul class="txt_detail_tit tab_tit">';

    // 업무범위 있을 때
    if (item.work.scope) {
      itemHTML += '<li class="on"><i class="fas fa-tasks"></i>업무범위</li>';
    }

    // 주요기여 있을 때
    if (item.work.task) {
      itemHTML += '<li><i class="fas fa-graduation-cap"></i>주요기여</li>';
    }

    // 주요성과 있을 때
    if (item.work.result) {
      itemHTML += '<li><i class="fas fa-trophy"></i>주요성과</li>';
    }

    itemHTML += "</ul>" + '<ul class="txt_detail_ctt tab_ctt">';

    // 프로젝트 상세 설명 리스트 출력 함수
    const generateHTML = (item, className) => {
      let itemHTML = "";
      if (item && item.length > 0) {
        itemHTML += '<li class="' + className + '">';

        // 각 아이템별 빈 값, 빈 문자열일 경우 비노출
        item.forEach((workItem) => {
          // 메인 타이틀
          if (workItem.main_tit && workItem.main_tit.length > 0) {
            if (workItem.main_tit.Length !== 1 && workItem.main_tit[0] !== "")
              itemHTML += '<strong class="work_main_tit">' + workItem.main_tit + "</strong>";
          }
          // 서브타이틀
          if (workItem.sub_tit && workItem.sub_tit.length > 0) {
            workItem.sub_tit.forEach(function (subTitItem, sTitIdx) {
              if (workItem.sub_tit.Length !== 1 && workItem.sub_tit[0] !== "")
                itemHTML += '<em class="work_sub_tit">' + subTitItem + "</em>";

              // 번호 리스트
              if (workItem.ol && workItem.ol.length > sTitIdx) {
                var isOl = workItem.ol[0].Length !== 1 && workItem.ol[0][0] !== "";
                if (isOl) itemHTML += '<ol class="work_ol">';

                workItem.ol[sTitIdx].forEach(function (olItem, olIdx) {
                  // 리스트별 아이템
                  if (isOl) itemHTML += "<li><span>" + olItem + "</span>";

                  // 블릿 리스트
                  if (
                    workItem.ul &&
                    workItem.ul.length > sTitIdx &&
                    workItem.ul[sTitIdx][olIdx].length !== 0
                  ) {
                    itemHTML += '<ul class="work_ul">';
                    workItem.ul[sTitIdx][olIdx].forEach(function (ulItem) {
                      itemHTML += "<li>" + ulItem + "</li>";
                    });
                    itemHTML += "</ul>";
                  }
                  if (isOl) itemHTML += "</li>";
                });
                if (isOl) itemHTML += "</ol>";
              }
            });
          }
        });

        itemHTML += "</li>";
      }

      return itemHTML;
    };

    // 프로젝트 업무범위
    if (item.work.scope) {
      itemHTML += generateHTML(item.work.scope, "detail_scope on");
    }

    // 프로젝트 주요기여
    if (item.work.task) {
      itemHTML += generateHTML(item.work.task, "detail_task");
    }

    // 프로젝트 주요성과
    if (item.work.result) {
      itemHTML += generateHTML(item.work.result, "detail_result");
    }

    itemHTML +=
      "</ul>" +
      "</div>" +
      '<div class="pjt_detail_img"><img src="' +
      item.images.detail + // 포폴 상세 이미지
      '" alt="포트폴리오 상세" /></div>' +
      "</div>" +
      '<button type="button" class="btn_close"><span>닫기</span></button>' +
      "</div>" +
      '<div class="close_bg"></div>' +
      "</div>" +
      "</li>";

    // 생선된 html을 Dom으로 변환 후 저장
    const parser = new DOMParser();
    const doc = parser.parseFromString(itemHTML, "text/html");
    pjtCtt.push(doc.body.firstChild);
  }

  // DOM 요소의 배열을 컨테이너에 삽입
  pjtCtt.forEach((pjtCttElement) => {
    pjtGelleryElement.appendChild(pjtCttElement);
  });

  // Masonry에 데이터를 추가후 재정렬
  msnry.appended(pjtCtt);

  // ImageLoaded 완료 후 노출
  imagesLoaded(pjtGelleryElement).on("progress", () => {
    setTimeout(() => {
      // 로딩 완료 후 로딩 관련 클래스 삭제
      loadMoreBtnElement.classList.remove("is-loading");
      document.querySelectorAll(".pjt_item").forEach((item) => item.classList.remove("is-loading"));
    }, 300);

    setTimeout(() => {
      projectElement.classList.remove("is-loading");
    }, 100);

    setTimeout(() => {
      // masonry 재정렬
      msnry.layout();
    }, 150);
  });

  // 추가 된 항목 수량 갱신
  pjtItemLen += slicedData.length;

  // JSON 데이터가 전부 추가 된 경우 버튼 삭제
  if (pjtItemLen < filteredData.length) {
    loadMoreBtnElement.style.display = "block";
  } else {
    loadMoreBtnElement.style.display = "none";
  }
};

// 리스트 필터링
const filterItems = () => {
  const keyCpn = document
      .querySelector(".filter-type-cpn")
      .querySelector('input[type="radio"]:checked').value, // 회사별 필터
    keyBiz = document
      .querySelector(".filter-type-biz")
      .querySelector('input[type="radio"]:checked').value, // 사업유형별 필터
    keyDevice = document
      .querySelector(".filter-type-device")
      .querySelector('input[type="radio"]:checked').value, // 지원기기별 필터
    keyLinked = document
      .querySelector(".filter-type-linked")
      .querySelector('input[type="checkbox"]').checked, // 링크 여부 필터
    masonryItems = Array.from(pjtGelleryElement.querySelectorAll(".pjt_item")); // 추가 된 Masonry 아이템

  // Masonry 항목을 삭제
  msnry.remove(masonryItems);
  projectElement.classList.add("is-loading");

  // 필터링 된 항목의 데이터를 재설정과
  // 추가 된 항목 수를 재설정
  filteredData = [];
  pjtItemLen = 0;

  if (keyCpn === "ALL") {
    // 1차필터링 - all이 클릭 된 경우 모든 JSON 데이터를 저장
    filteredData = allData;
  } else {
    // all 이외의 경우, 키와 일치하는 데이터를 추출
    filteredData = allData.filter((item) => item.company === keyCpn);
  }

  if (keyBiz !== "ALL") {
    // 2차 필터링 - device
    filteredData = filteredData.filter((item) => item.business === keyBiz);
  }

  if (keyDevice !== "ALL") {
    // 2차 필터링 - device
    filteredData = filteredData.filter((item) => item.device === keyDevice);
  }

  if (keyLinked) {
    // 3차 필터링 - linked
    filteredData = filteredData.filter((item) => {
      // link 값이 있을 때 필터링
      let linkFt = item.link ? true : false;
      return linkFt === keyLinked;
    });
  }

  const pJtEmptyWrapElement = document.querySelector(".project_empty_wrap");
  // 이전 필터링 결과가 없을 때
  if (pJtEmptyWrapElement) {
    // 필터 초기화 화면 삭제
    pJtEmptyWrapElement.classList.remove("active");

    // 버튼 삭제
    setTimeout(() => {
      pJtEmptyWrapElement.remove();
    }, 100);
  }

  // 필터된 내용이 없을 경우
  if (filteredData.length === 0) {
    const emptyElement = document.createElement("div"),
      emptyHTML =
        '<p class="guide_txt">조건과 일치하는 프로젝트가 업습니다.</p>' +
        '<span class="reset_btn_wrap">' +
        '<button type="button" class="reset_filter_btn"></span>' +
        '<i class="fas fa-sync-alt"></i>' +
        '<span class="btn_txt">필터 초기화</span>' +
        "</button>";

    emptyElement.classList.add("project_empty_wrap");
    emptyElement.style.display = "block";
    emptyElement.innerHTML = emptyHTML;

    setTimeout(() => {
      // 로딩바 제거
      projectElement.classList.remove("is-loading");
    }, 100);

    setTimeout(() => {
      // 필터 초기화 화면 노출
      pjtGelleryElement.insertAdjacentElement("afterend", emptyElement);
      emptyElement.classList.add("active");
    }, 400);
  }

  // 항목을 추가
  setTimeout(() => {
    addItems();
  }, 100);
};

// 필터 라디오 버튼이 변경되면 필터링을 수행
document.querySelector("#gellery-filter").addEventListener("change", (e) => {
  if (e.target.matches(".form-item input")) {
    filterItems();
  }
});

// 필터 초기화 버튼 클릭 이벤트
document.addEventListener("click", (e) => {
  const target = e.target,
    pJtEmptyWrapElement = document.querySelector(".project_empty_wrap"),
    isReseFiltertBtn = target.classList.contains("reset_filter_btn");

  if (isReseFiltertBtn || target.closest(".reset_filter_btn")) {
    pJtEmptyWrapElement.classList.remove("active");

    // 버튼 삭제
    setTimeout(() => {
      pJtEmptyWrapElement.remove();
    }, 100);

    filteredData = allData;
    addItems();

    // 필터 초기화
    Array.from(document.querySelectorAll(".form-item:first-child:not(.chkItem) input")).forEach(
      (filterItem) => {
        filterItem.checked = true;
      }
    );
  }
});

// 프로젝트 리스트별 클릭 이벤트
pjtGelleryElement.addEventListener("click", (e) => {
  const target = e.target,
    pjtItemElement = target.closest(".pjt_item"),
    isDetailBtn = target.classList.contains("detail_btn"),
    isDetailCloseBtn = target.matches(".close_bg, .btn_close"),
    isTabBtn = target.matches(".tab_tit > li");

  if (isDetailBtn || target.closest(".detail_btn")) {
    // 썸네일 호버 내 상세보기 버튼 클릭시
    const pjtDetailElements = pjtItemElement.querySelectorAll(".pjt_detail");

    body.style.overflowY = "hidden"; // 바닥페이지 스크롤 고정
    headerElement.style.display = "none"; // 헤더 숨김
    Array.from(pjtDetailElements).forEach((pjtDatail) => {
      pjtDatail.style.display = "block"; // 프로젝트 상세 팝업 오픈
    });
  } else if (isDetailCloseBtn || target.closest(".btn_close")) {
    // 프로젝트 상세 레이어 닫기
    const pjtDetailElements = pjtItemElement.querySelectorAll(".pjt_detail");

    body.style.overflowY = "auto";
    headerElement.style.display = "block";

    // 썸네일 호버 내 상세보기 버튼 클릭시
    Array.from(pjtDetailElements).forEach((pjtDatail) => {
      pjtDatail.classList.remove("on"); // 프로젝트 상세 팝업 오픈
      pjtDatail.style.display = "none";
    });
  } else if (isTabBtn || target.closest(".tab_tit > li")) {
    //== 프로젝트 팝업 내 상세 설명 탭 메뉴 온오프
    const tabTitItemElements = pjtItemElement.querySelectorAll(".tab_tit > li"),
      tabCtttemElements = pjtItemElement.querySelectorAll(".tab_ctt > li");

    Array.from(tabTitItemElements).forEach((tabTititem, tabTitIdx) => {
      // 클락한 탭 탭 타이틀 활성화
      if (tabTititem === target || tabTititem.contains(target)) {
        tabTititem.classList.add("on");

        // 탭 콘텐츠 활성화
        Array.from(tabCtttemElements).forEach((tabCttItem, tabCttIdx) => {
          if (tabCttIdx === tabTitIdx) {
            tabCttItem.classList.add("on");
          } else {
            tabCttItem.classList.remove("on");
          }
        });
      } else {
        // 클릭한 탭이 아닐 경우 비활성화
        tabTititem.classList.remove("on");
      }
    });
  }
});

//= 리스트에 마우스 오버시 호버 효과
// 마우스의 방향을 감지하는 함수
// http://stackoverflow.com/a/3647634
const getMouseDirection = (e) => {
  let crntTarget = e.currentTarget,
    offset = crntTarget.getBoundingClientRect(),
    w = crntTarget.offsetWidth,
    h = crntTarget.offsetHeight,
    x = e.pageX - (offset.left + window.scrollX) - w / 2,
    y = e.pageY - (offset.top + window.scrollY) - h / 2,
    direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;

  return direction;
};

// 호버 효과
const hoverDirection = (e) => {
  const hoverElement = e.currentTarget.querySelector(".pjt_hover"),
    side = getMouseDirection(e);

  let animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (() => {
      switch (side) {
        // case 0: top, case 1: right, case 2: bottom, default: left
        case 0:
          return { top: "-100%", left: "0%" };
        case 1:
          return { top: "0%", left: "100%" };
        case 2:
          return { top: "100%", left: "0%" };
        default:
          return { top: "0%", left: "-100%" };
      }
    })();

  if (e.type === "mouseenter") {
    animateTo = positionIn;
    hoverElement.style.top = positionOut.top;
    hoverElement.style.left = positionOut.left;
  } else {
    animateTo = positionOut;
  }

  hoverElement.classList.remove("hover_effect");
  setTimeout(() => {
    hoverElement.classList.add("hover_effect");
    hoverElement.style.top = animateTo.top;
    hoverElement.style.left = animateTo.left;
  }, 10);
};
// 호벼 이벤트
const pjtItemnHoverEvents = (el) => {
  ["mouseenter", "mouseleave"].forEach((eventType) => {
    el.addEventListener(eventType, hoverDirection);
  });
};
// 초기 상세 리스트별 호벼 효과 등록
const pjtItemElements = document.querySelectorAll(".pjt_item");
Array.from(pjtItemElements).forEach((pjtItemElement) => {
  pjtItemnHoverEvents(pjtItemElement);
});
// 동적 생성 상세 리스트별 호벼 효과 추가 등록
const dynamicPjtItemHoverEvents = (mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      const addedNodes = mutation.addedNodes;
      Array.from(addedNodes).forEach((addedNode) => {
        if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.classList.contains("pjt_item")) {
          pjtItemnHoverEvents(addedNode);
        }
      });
    }
  }
};
// 동적 생성여부 관철 후 이벤트 등록
const pjtItemHoverObserver = new MutationObserver(dynamicPjtItemHoverEvents);
pjtItemHoverObserver.observe(pjtGelleryElement, { childList: true, subtree: true });

// 리스트 더보기 버튼 클릭시 리스트 추가
loadMoreBtnElement.addEventListener("click", (e) => {
  e.target.classList.add("is-loading"); // 로딩중

  setTimeout(() => {
    addItems(); // 리스트 추가
  }, 300);

  setTimeout(() => {
    imagesLoaded(pjtGelleryElement).on("progress", () => {
      msnry.layout();
    });
  }, 450);
});

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  // 스플래시 완료 후 && infinitSrcTimer Throttling
  if (start > 0 && !infinitSrcTimer) {
    const winH = window.innerHeight, // 뷰포트 높이
      galleryTop = projectElement.offsetTop, // 갤러리 상단 스크롤값
      galleryBtm = projectElement.offsetTop + projectElement.offsetHeight; // 갤러리 하단 스크롤값

    let infinitStart = galleryTop < lastScrTop, // 무한스크롤 시작되는 스크롤값
      infinitEnd = galleryBtm > lastScrTop; // 무한스크롤 끝나는 스크롤값

    // 500ms 마다 스크롤 체크
    infinitSrcTimer = setTimeout(() => {
      const cntScrTop = window.scrollY, // 현재 상단 스크롤값
        winBtm = cntScrTop + winH; // 현재 하단 스크롤값

      infinitSrcTimer = null;

      // 최초 로드시 갤러리 하단에서 시작할 때 미리 무한 스크롤링 되는 현상 방지
      // 무한 스크롤 범위 안에 있을때 && 아래로 스크롤 할때 && 현재 하단 스크롤값이 갤러리 하단보다 클 때
      if (infinitStart && infinitEnd && cntScrTop > lastScrTop && winBtm >= galleryBtm) {
        loadMoreBtnElement.classList.add("is-loading");

        setTimeout(() => {
          addItems();
        }, 500);

        setTimeout(() => {
          imagesLoaded(pjtGelleryElement).on("progress", () => {
            msnry.layout();
          });
        }, 650);
      }
      lastScrTop = cntScrTop; // 마지막 스크롤값 갱신
    }, 350);
  }
});
