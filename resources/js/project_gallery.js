/* Portfolio -------------- */
const $pfGellery = $("#pf_gellery"), // 갤러리 컨테이너
  $project = $("#project"),
  $loadMoreButton = $("#load-more"); // 리스트 더보기 버튼

let addItemCount = 10, // 표시 된 항목 수
  addadd = 0,
  allData = [], // 모든 JSON 데이터
  filteredData = []; // 필터링 된 JSON 데이터;

let infinitSrcTimer; // 갤러리 무한 스크롤링 setTimeout Throttle에 사용

// 한 번에 표시 할 항목 수
if ($(window).width() < 780) {
  addItemCount = 6;
}

// 프로젝트 갤러리 이벤트 핸들러
$("#pf_gellery")
  // 썸네일 호버 내 상세보기 버튼 클릭시
  .on("click", ".detail_btn", function () {
    $(this).parents(".pf_item").find(".pf_detail").show();
    $body.css({ "overflow-y": "hidden" }); // 스크롤 고정
    $header.hide();
  })
  // 프로젝트 상세 레이어 닫기
  .on("click", ".pf_detail .close_bg, .pf_detail .btn_close", function () {
    $(this).parents(".pf_item").find(".pf_detail").removeClass("on").hide();
    $body.css({ "overflow-y": "auto" });
    $header.show();
  })
  // 항목 링크에 호버 효과 처리 등록
  .on("mouseenter mouseleave", ".pf_item", hoverDirection)
  //== 프로젝트 팝업 내 상세 설명 탭 메뉴 온오프
  .on("click", ".tab_tit > li", function () {
    const idx = $(this).index();

    $(this).addClass("on").siblings("li").removeClass("on");
    $(this).parent("ul").siblings(".tab_ctt").children("li").eq(idx).addClass("on").siblings("li").removeClass("on");
  })
  // 갤러리 네 마우스 오버시 masonry 재정렬 (ajax 호풀시 imageloaded 오작동 이슈)
  .on("mouseenter mouseleave", "#project", function () {
    $("#pf_gellery").masonry("layout");
  });

// 필터 라디오 버튼이 변경되면 필터링을 수행
$("#gellery-filter").on("change", ".form-item input", filterItems);

// 추가 버튼을 클릭하면 추가로 표시
// $loadMoreButton.on("click", function () {
//   $loadMoreButton.addClass("is-loading");
//   addItems();
//   $pfGellery.delay(100).fadeIn(100, function () {
//     $pfGellery.imagesLoaded(function () {
//       $pfGellery.masonry("layout");
//     });
//   });
// });

// 스크롤 이벤트
$(window).on("scroll", function () {
  // 스플래시 완료 후 && infinitSrcTimer Throttling
  if (start > 0 && !infinitSrcTimer) {
    const winH = $(window).height(), // 뷰포트 높이
      galleryTop = $project.offset().top, // 갤러리 상단 스크롤값
      galleryBtm = $project.offset().top + $project.outerHeight(); // 갤러리 하단 스크롤값

    let infinitStart = galleryTop < lastScrTop, // 무한스크롤 시작되는 스크롤값
      infinitEnd = galleryBtm > lastScrTop; // 무한스크롤 끝나는 스크롤값

    // 300ms 마다 스크롤 체크
    infinitSrcTimer = setTimeout(function () {
      const cntScrTop = $(window).scrollTop(); // 현재 상단 스크롤값
      const winBtm = cntScrTop + winH; // 현재 하단 스크롤값

      infinitSrcTimer = null;

      // 최초 로드시 갤러리 하단에서 시작할때 미리 무한 스크롤링 되는 현상 방지
      // 무한 스크롤 범위 안에 있을때 && 아래로 스크롤 할때 && 현재 하단 스크롤값이 갤러리 하단보다 클 때
      if (infinitStart && infinitEnd && cntScrTop > lastScrTop && winBtm >= galleryBtm) {
        $loadMoreButton.addClass("is-loading");
        addItems();
        $pfGellery.delay(100).fadeIn(100, function () {
          $pfGellery.imagesLoaded(function () {
            $pfGellery.masonry("layout");
          });
        });
      }
      lastScrTop = cntScrTop; // 마지막 스크롤값 갱신
    }, 500);
  }
});

//옵션을 설정 Masonry를 준비
$pfGellery.masonry({
  columnWidth: ".grid-sizer",
  gutter: ".gutter-sizer",
  itemSelector: ".pf_item",
  percentPosition: true,
});

// JSON을 검색하고 initGallery 함수를 실행
$.getJSON("/db/pf_content.json", initGallery);

// 갤러리 초기화
function initGallery(data) {
  // 취득한 JSON 데이터를 저장
  allData = data;

  // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
  filteredData = allData;

  $project.addClass("is-loading");

  // 첫 번째 항목을 표시
  addItems();
}

// 항목을 생성하고 문서에 삽입
function addItems() {
  let elements = [];
  // 추가 데이터의 배열
  const slicedData = filteredData.slice(addadd, addadd + addItemCount);

  // slicedData의 요소마다 DOM 요소를 생성
  $.each(slicedData, function (i, item) {
    let itemHTML = "";

    // 리스트 썸네일
    itemHTML += '<li class="pf_item ';

    // 썸네일 길이 : long
    if (item.images.thumb_h) itemHTML += "thumb_h_" + item.images.thumb_h + " ";

    itemHTML +=
      'is-loading">' + // masonry loding cloass
      '<div class="pf_thumb">' +
      '<div class="img_box"><img src="' +
      item.images.thumb + // 썸네일 이미지
      '" alt=""/></div>' +
      '<div class="txt_box">' +
      "<h4>" +
      item.title + // 썸네일 타이틀
      "</h4>" +
      '<p class="pf_intro">' +
      item.intro + // 사이트 간략 설명 (서브 타이틀)
      "</p>" +
      "<ul>" +
      '<li><span class="pf_th_li_t"><i class="fas fa-chart-bar" title="참여율"></i></span><span class="pf_th_li_c">' +
      item.part + // 썸네일 참여율
      "</span></li>" +
      '<li><span class="pf_th_li_t"><i class="fas fa-calendar-alt" title="프로젝트기간"></i></span><span class="pf_th_li_c">' +
      item.period + // 썸네일 프로젝트 기간
      "</span></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      // 썸네일 호버
      '<div class="pf_hover">' +
      '<div class="btn_box"><ul>' +
      // 썸네일 호버 내 버튼
      '<li class="detail_btn"><button type="button" title="자세히보기"><i class="fa fa-search"></i></button></li>';

    // 사이트 링크 있을 때
    if (item.link) {
      // 사이트 링크 URL
      itemHTML += '<li class="siteLink_btn"><a href="' + item.link + '" title="';

      // 사이트 링크 툴팁
      item.linkTitle ? (itemHTML += item.linkTitle) : (itemHTML += "사이트 바로가기");

      itemHTML += '" target="_blank"><i class="fa fa-link"></i></a></li>';
    }

    itemHTML +=
      "</ul></div>" +
      "</div>" +
      // 프로젝트 레이어 팝업
      '<div class="pf_detail">' +
      '<div class="pf_layer">' +
      '<div class="pf_layer_tit">' +
      '<h4 class="pf_main_tit">' +
      item.title + // 타이틀
      "</h4>" +
      '<p class="pf_intro">' +
      item.intro + // 사이트 간략 설명 (서브 타이틀)
      "</p>" +
      "</div>" +
      '<div class="pf_layer_ctt">' +
      '<div class="pf_info">' +
      '<div class="pf_info_type">' +
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
      itemHTML += '<li class="responsive"><i class="fas fa-sync-alt" title="반응형"></i></li>';
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
      '<ul class="pf_c">' +
      "<li>" +
      '<span class="pf_li_t">프로젝트기간<i class="fas fa-calendar-alt"></i></span>' +
      '<span class="pf_li_c">' +
      item.period + // 프로젝트 기간
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pf_li_t">구성원<i class="fas fa-users"></i></span>' +
      '<span class="pf_li_c">' +
      item.member + // 프로젝트 구성원
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pf_li_t">주요역할<i class="fas fa-user-tag"></i></span>' +
      '<span class="pf_li_c">' +
      item.main_role + // 주요역할
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pf_li_t">참여율<i class="fas fa-chart-bar"></i></span>' +
      '<span class="pf_li_c">' +
      item.part + // 참여율
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pf_li_t">사용언어<i class="fas fa-code"></i></span>' +
      '<span class="pf_li_c">' +
      item.language + // 사용언어
      "</span>" +
      "</li>" +
      "<li>" +
      '<span class="pf_li_t">개발환경<i class="fas fa-laptop-code"></i></span>' +
      '<span class="pf_li_c">' +
      item.task_environment + // 개발환경
      "</span>" +
      "</li>";

    // 사이트 링크 있을 때
    if (item.link) {
      itemHTML +=
        "<li>" +
        '<span class="pf_li_t">웹사이트<i class="fas fa-external-link-alt"></i></span>' +
        '<span class="pf_li_c"><a href="' +
        item.link + // 사이트 링크 URL
        '" title="새창" target="_blank">' +
        item.link + // 사이트 링트 텍스트
        "</a>";

      // 사이트 링크 툴팁 있을 때
      if (item.linkTitle) itemHTML += ' <br /><em class="tit_main"><b>(' + item.linkTitle + ")</b></em>";

      itemHTML += "</span></li>";
    }

    itemHTML +=
      "</ul>" +
      "</div>" +
      "</div>" +
      // 작업 상세 텝 메뉴
      '<div class="pf_info_detail tab_wrap">' +
      '<ul class="txt_detail_tit tab_tit">';

    // 업무범위 있을 때
    if (item.work.scope) {
      itemHTML += '<li class="on"><i class="fas fa-tasks"></i>업무범위</li>';
    }

    // 주요기여 있을 때
    if (item.work.task) {
      itemHTML += '<li><i class="fas fa-graduation-cap"></i>주요기여</li>';
    }

    // 주요성과 잇을 때
    if (item.work.result) {
      itemHTML += '<li><i class="fas fa-trophy"></i>주요성과</li>';
    }

    itemHTML += "</ul>" + '<ul class="txt_detail_ctt tab_ctt">';

    // 프로젝트 상세 설명 리스트 출력 함수
    function generateHTML(item, className) {
      let itemHTML = "";
      if (item && item.length > 0) {
        itemHTML += '<li class="' + className + '">';

        // 각 아이템별 빈값, 빈문자열일 경우 비노출
        item.forEach(function (workItem) {
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
                  if (workItem.ul && workItem.ul.length > sTitIdx && workItem.ul[sTitIdx][olIdx].length !== 0) {
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
    }

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
      '<div class="pf_img"><img src="' +
      item.images.detail + // 포폴 상세 이미지
      '" alt="포트폴리오 상세" /></div>' +
      "</div>" +
      '<button type="button" class="btn_close"><img src="/resources/images/common/btn2_close.png" alt="닫기" /></button>' +
      "</div>" +
      '<div class="close_bg"></div>' +
      "</div>" +
      "</li>";

    elements.push($(itemHTML).get(0));
  });

  // ajax 호출 후 ImageLoaded가 정상 적용되지 않는 이슈 -> delay로 해결
  $pfGellery.delay(100).fadeIn(100, function () {
    $pfGellery.imagesLoaded(function () {
      // DOM 요소의 배열을 컨테이너에 넣고 Masonry 레이아웃을 실행
      $pfGellery.append(elements).masonry("appended", elements).masonry();

      // 로딩 완료 후 로딩 관련 클래스 삭제
      $project.removeClass("is-loading");
      $(".pf_item").removeClass("is-loading");
      $loadMoreButton.removeClass("is-loading");

      $pfGellery.masonry("layout");
    });
  });

  // 추가 된 항목 수량 갱신
  addadd += slicedData.length;

  // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
  if (addadd < filteredData.length) {
    $loadMoreButton.css("display", "block");
  } else {
    $loadMoreButton.hide();
  }
}

// 항목을 필터링한다.
function filterItems() {
  const keyCpn = $(".filter-type-cpn").find('input[type="radio"]:checked').val(), // 회사별 필터
    keyBiz = $(".filter-type-biz").find('input[type="radio"]:checked').val(), // 사업유형별 필터
    keyDevice = $(".filter-type-device").find('input[type="radio"]:checked').val(), // 지원기기별 필터
    keyLinked = $(".filter-type-linked").find('input[type="checkbox"]').prop("checked"), // 링크 여부 필터
    masonryItems = $pfGellery.masonry("getItemElements"); // 추가 된 Masonry 아이템

  $project.addClass("is-loading");

  // Masonry 항목을 삭제
  $pfGellery.masonry("remove", masonryItems);

  // 필터링 된 항목의 데이터를 재설정과
  // 추가 된 항목 수를 재설정
  filteredData = [];
  addadd = 0;

  if (keyCpn === "ALL") {
    // 1차필터링 - all이 클릭 된 경우 모든 JSON 데이터를 저장
    filteredData = allData;
  } else {
    // all 이외의 경우, 키와 일치하는 데이터를 추출
    filteredData = $.grep(allData, function (item) {
      return item.company === keyCpn;
    });
  }

  if (keyBiz !== "ALL") {
    // 2차 필터링 - device
    filteredData = $.grep(filteredData, function (item) {
      return item.business === keyBiz;
    });
  }

  if (keyDevice !== "ALL") {
    // 2차 필터링 - device
    filteredData = $.grep(filteredData, function (item) {
      return item.device === keyDevice;
    });
  }

  if (keyLinked) {
    // 3차 필터링 - linked
    filteredData = $.grep(filteredData, function (item) {
      // link 값이 있을 때 필터링
      item.link ? (linkFt = true) : (linkFt = false);

      return linkFt === keyLinked;
    });
  }

  // 항목을 추가
  addItems();
}

// 호버 효과
function hoverDirection(event) {
  const $overlay = $(this).find(".pf_hover"),
    side = getMouseDirection(event);

  let animateTo,
    positionIn = {
      top: "0%",
      left: "0%",
    },
    positionOut = (function () {
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
  if (event.type === "mouseenter") {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 250, "easeOutExpo");
}

// 마우스의 방향을 감지하는 함수
// http://stackoverflow.com/a/3647634
function getMouseDirection(event) {
  let $el = $(event.currentTarget),
    offset = $el.offset(),
    w = $el.outerWidth(),
    h = $el.outerHeight(),
    x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
    direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}
