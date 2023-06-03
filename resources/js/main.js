$(document).ready(function () {
  var $body = $("body"),
    $wrapper = $("#wrapper"),
    winHeight = $(window).outerHeight(),
    $splachWrap = $("#splash"), // 1
    $progress = $splachWrap.find(".progress");
  // 1. 진행률 표시 전체 컨테이너

  $("html").removeClass("no-js");

  $progress.css({ height: winHeight });

  // 진행률 표시 함수를 호출
  imagesProgress();

  // 이미지 로딩 상항 진행률을 표시
  function imagesProgress() {
    var $progressBar = $splachWrap.find(".progress-bar"), // 2
      $progressText = $splachWrap.find(".progress-text"), // 3
      $bar_R = $progressBar.find(".bar_R"),
      $bar_L = $progressBar.find(".bar_L"),
      // 2. 진행률 표시 막대 부분
      // 3. 진행률 표시 텍스트 부분

      // imagesLoaded 라이브러리에서 body 요소의 이미지 로딩을 모니터링
      // 동시에 body 전체 이미지 수를 저장
      imgLoad = imagesLoaded($body),
      imgTotal = imgLoad.images.length,
      // 읽기를 완료 한 이미지의 숫자 카운터와
      // 진행률 표시의 현재 위치에 해당하는 수치 (모두 처음에는 0)
      imgLoaded = 0,
      current = 0,
      // 1 초에 60 번씩 읽어 여부 확인
      progressTimer = setInterval(updateProgress, 1000 / 60);

    // imagesLoaded을 이용하여 이미지를로드 할 때마다 카운터를 가산
    imgLoad.on("progress", function () {
      imgLoaded++;
    });

    // 이미지로드 상황을 바탕으로 진행 표시를 업데이트
    // 이 함수는 setInterval () 메소드에 의해 1 초에 60 번 불려
    function updateProgress() {
      // 읽을 완료 한 이미지의 비율
      var target = (imgLoaded / imgTotal) * 100;

      // current (현재 위치)와 target (목적지)의 거리를 바탕으로 여유를 건다
      current += (target - current) * 0.1;

      // 표시 바의 폭과 텍스트에 current 값을 반영
      // 텍스트는 소수점 이하를 버리고 정수로
      if (current <= 50) {
        $bar_R.css({ height: current * 2 + "%" });
      } else {
        $bar_R.css({ height: 100 + "%" });
        $bar_L.css({ height: 100 - (current - 50) * 2 + "%" });
      }

      $progressText.text(Math.floor(current) + "%");

      // 종료
      if (current >= 100) {
        // 진행률 표시의 업데이트를 중지
        clearInterval(progressTimer);
        // CSS 스타일을 바꾸기 위하여 클래스를 추가
        $splachWrap.addClass("progress-complete");
        // 진행률 막대와 텍스트를 동시에 애니메이션시키기 위해
        // 그룹화하고 하나의 jQuery 객체에
        $splachWrap
          // 0.3 초 대기
          .delay(300)
          // 1 초에 걸쳐 진행률 막대와 텍스트를 투명하게
          .animate({ opacity: 0 }, 1000, "easeInOutQuint", function () {
            //  오버레이를 none
            $splachWrap.add($progress).css({ display: "none" });
          });
      }

      // current가 99.9보다 크면 100으로 간주하여 종료
      if (current > 99.9) {
        current = 100;
        $wrapper.addClass("on");
      }
    }
  }
});
$(window).load(function () {
  var $window = $(window);

  // 캐싱 방지
  var timestamp = new Date().getTime();
  $("link[rel=stylesheet]").each(function () {
    $(this).attr("href", $(this).attr("href") + "?" + timestamp);
  });
  $("script, img").each(function () {
    $(this).attr("src", $(this).attr("src") + "?" + timestamp);
  });

  // 스크롤 이벤트를 발생하여 처음 로딩할 때의 위치를 결정
  setTimeout(function () {
    $window.trigger("scroll");
  }, 1500);

  /* 고정헤더 -------------------*/
  $(".page_hd").each(function () {
    var $header = $(this);

    //스크롤시 헤더 스타일 변화, 초당 15회
    $window.on("scroll", function () {
      setTimeout(function () {
        if ($window.scrollTop() > 0) {
          $header.addClass("visible");
        } else {
          $header.removeClass("visible");
        }
      }, 1000 / 15);
    });
  });

  /* Portfolio -------------- */
  $("#pf_gellery").each(function () {
    // #gallery요소가 갤러리 컨테이너
    var $pfGellery = $(this),
      $project = $("#project"),
      $loadMoreButton = $("#load-more"), // 추가 버튼
      $filter = $("#gellery-filter"), // 필터링 양식
      addItemCount = 10, // 표시 된 항목 수
      addadd = 0,
      allData = [], // 모든 JSON 데이터
      filteredData = []; // 필터링 된 JSON 데이터;

    /* 한 번에 표시 할 항목 수
			if(780 <= $(window).width()){
				var addItemCount = 4;              
			}else{
				var addItemCount = 6; 
			}*/

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

      // 추가 버튼을 클릭하면 추가로 표시
      $loadMoreButton.on("click", function () {
        $loadMoreButton.addClass("is-loading");
        addItems();
      });

      // 필터 라디오 버튼이 변경되면 필터링을 수행
      $filter.on("change", ".form-item input", filterItems);

      // 항목 링크에 호버 효과 처리 등록
      $pfGellery.on("mouseenter mouseleave", ".pf_item", hoverDirection).on("mouseenter mouseleave", function () {
        $pfGellery.masonry("layout");
      });
    }

    // 항목을 생성하고 문서에 삽입
    function addItems() {
      var elements = [],
        // 추가 데이터의 배열
        slicedData = filteredData.slice(addadd, addadd + addItemCount);

      // slicedData의 요소마다 DOM 요소를 생성
      $.each(slicedData, function (i, item) {
        var itemHTML = "";

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
          '<span class="pf_intro">' +
          item.intro + // 사이트 간략 설명 (서브 타이틀)
          "</span>" +
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
          '<li class="chrome"><img src="/resources/images/common/browser_chrome.png" title="Chrome" alt="chrome"></li>'; // 크롬 지원

        // ie 지원시
        if (item.browser.ie) {
          itemHTML +=
            '<li class="ie"><img src="/resources/images/common/browser_ie.png" title="Internet Explorer" alt="ie"><span class="browser_ver">' +
            item.browser.ie + // ie 버전
            "</span></li>";
        }

        // safari 지원
        if (item.browser.safari) {
          itemHTML +=
            '<li class="safari"><img src="/resources/images/common/browser_safari.png" title="Safari" alt="safari"></li>';
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

          // 캐싱 방지
          $("script, img").each(function () {
            $(this).attr("src", $(this).attr("src") + "?" + timestamp);
          });
        });
      });

      // 추가 된 항목 수량 갱신
      addadd += slicedData.length;

      // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
      if (addadd < filteredData.length) {
        $loadMoreButton.show();
      } else {
        $loadMoreButton.hide();
      }
    }

    // 항목을 필터링한다.
    function filterItems() {
      var keyCompany = $(".filter-type-company").find('input[type="radio"]:checked').val(), // 오피스 필터
        keyDevice = $(".filter-type-device").find('input[type="radio"]:checked').val(), // 디바이스 필터
        keyLinked = $(".filter-type-linked").find('input[type="checkbox"]').prop("checked"), // 링크 여부 필터
        masonryItems = $pfGellery.masonry("getItemElements"); // 추가 된 Masonry 아이템

      $project.addClass("is-loading");

      // Masonry 항목을 삭제
      $pfGellery.masonry("remove", masonryItems);

      // 필터링 된 항목의 데이터를 재설정과
      // 추가 된 항목 수를 재설정
      filteredData = [];
      addadd = 0;

      if (keyCompany === "ALL") {
        // 1차필터링 - all이 클릭 된 경우 모든 JSON 데이터를 저장
        filteredData = allData;
      } else {
        // all 이외의 경우, 키와 일치하는 데이터를 추출
        filteredData = $.grep(allData, function (item) {
          return item.company === keyCompany;
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
      var $overlay = $(this).find(".pf_hover"),
        side = getMouseDirection(event),
        animateTo,
        positionIn = {
          top: "0%",
          left: "0%",
        },
        positionOut = (function () {
          switch (side) {
            // case 0: top, case 1: right, case 2: bottom, default: left
            case 0:
              return { top: "-100%", left: "0%" };
              break; // top
            case 1:
              return { top: "0%", left: "100%" };
              break; // right
            case 2:
              return { top: "100%", left: "0%" };
              break; // bottom
            default:
              return { top: "0%", left: "-100%" };
              break; // left
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
      var $el = $(event.currentTarget),
        offset = $el.offset(),
        w = $el.outerWidth(),
        h = $el.outerHeight(),
        x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
        y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
        direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
      return direction;
    }

    //포트폴리오 디테일 이미지 온오프
    var winHeight = $(window).height(),
      $body = $("body");

    // 썸네일 호버 내 상세보기 버튼 클릭시
    $(this).on("click", ".detail_btn", function () {
      $(this).parents(".pf_item").find(".pf_detail").css("display", "block");
      $body.css({ height: winHeight, "overflow-y": "hidden" }); //포트폴리오 섹션에서 전체 스크롤 고정
      $(".page_hd").css("display", "none");
    });

    // 프로젝트 상세 레이어 닫기
    $(this).on("click", ".pf_detail .close_bg, .pf_detail .btn_close", function () {
      $(".pf_detail").removeClass("on").css("display", "none");
      $body.css({ height: "auto", "overflow-y": "auto" });
      $(".page_hd").css("display", "block");
    });
  });

  // 스크롤이벤트
  $(window).on("scroll", function () {
    var $sect = $("section"),
      sectLen = $sect.length,
      htmlHeight = $("html").outerHeight(),
      $gnbPC = $("#gnb_pc .gnb_menu li");

    setTimeout(function () {
      var winTop = $(window).scrollTop(),
        winBtm = winTop + htmlHeight;

      for (i = 0; i < sectLen; i++) {
        var sectPosition = $sect.eq(i).offset().top,
          comparisonValue = sectPosition + (htmlHeight / 3) * 1; // 뷰포트 높이 의 2/5 지점

        //동적효과 실행
        // 뷰포트 높이 의 2/3 지점 지날때 섹션 활성화
        if (comparisonValue <= winBtm) {
          $sect.eq(i).addClass("active").addClass("on").siblings().removeClass("on");
          //스크롤 위치에 따른 gnb 활성화
          $gnbPC.eq(i).addClass("on").siblings().removeClass("on");
        } else {
          //동적효과 취소
          $sect.eq(i).removeClass("active");
        }
      }
    }, 1000 / 3);
  });
});

//= 클릭 이벤트
$(document).on("click", ".tab_tit > li", function () {
  //== 프로젝트 팝업 내 상세 설명 탭 메뉴
  var idx = $(this).index();

  $(this).addClass("on").siblings("li").removeClass("on");
  $(this).parent("ul").siblings(".tab_ctt").children("li").eq(idx).addClass("on").siblings("li").removeClass("on");
});
