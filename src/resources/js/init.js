const $body = $("body"),
  $header = $(".page_hd"),
  $sect = $("section"),
  sectLen = $sect.length,
  $gnb = $(".gnb_menu li"),
  timestamp = new Date().getTime();

let lastScrTop = $(window).scrollTop();

let start = 0; // 스플래시 사라진 후 메인페이지 로딩 체크 (완료시 1)

let sectActiveTimer, scrTiggerTimer; // 섹션활성화, 로딩 후 최초 스크롤시 setTimeout Throttle에 사용

// 자바스크립트 사용
$("html").removeClass("no-js");

// 캐싱 방지
$("link[rel=stylesheet]").each(function () {
  $(this).attr("href", $(this).attr("href") + "?" + timestamp);
});
$("script[class*=production]").each(function () {
  $(this).attr("src", $(this).attr("src") + "?" + timestamp);
});

// 스크롤 이벤트
$(window).on("scroll", function () {
  const winH = $(window).height();

  // sectActiveTimer Throttling
  if (!sectActiveTimer) {
    // 스크롤시 헤더 스타일 변화, 초당 15회 체크
    sectActiveTimer = setTimeout(function () {
      const winTop = $(window).scrollTop(),
        winBtm = winTop + winH;

      sectActiveTimer = null;

      // 고정헤더
      if ($(window).scrollTop() > 0) {
        $header.addClass("visible");
      } else {
        $header.removeClass("visible");
      }

      // 섹션 활성화 여부
      for (i = 0; i < sectLen; i++) {
        let sectPosition = $sect.eq(i).offset().top;
        const comparisonValue = sectPosition + (winH / 3) * 1; // 뷰포트 높이의 2/3 지점

        // 동적효과 실행
        // 뷰포트 높이 의 2/3 지점 지날때 섹션 활성화
        if (comparisonValue <= winBtm) {
          $sect.eq(i).addClass("active on").siblings().removeClass("on");
          //스크롤 위치에 따른 gnb 활성화
          $gnb.eq(i).addClass("on").siblings().removeClass("on");
        } else {
          //동적효과 취소
          $sect.eq(i).removeClass("active");
        }
      }
    }, 300);
  }
});

// 이미지 로딩 상항 진행률을 표시
(function imagesProgress() {
  var $splachWrap = $("#splash"),
    // 진행률 표시 막대
    $progressBar = $splachWrap.find(".progress-bar"),
    // 진행률 표시 텍스트
    $progressText = $splachWrap.find(".progress-txt"),
    $bar_R = $progressBar.find(".bar_R"),
    $bar_L = $progressBar.find(".bar_L"),
    // imagesLoaded 라이브러리에서 body 요소의 이미지 로딩을 모니터링
    imgLoad = imagesLoaded($("body")),
    // body 전체 이미지 수를 저장
    imgTotal = imgLoad.images.length,
    // 읽기를 완료 한 이미지의 숫자 카운터와
    imgLoaded = 0,
    // 진행률 표시의 현재 위치에 해당하는 수치 (모두 처음에는 0)
    current = 0,
    // 1 초에 30 번씩 진행율 호출하여 확인
    progressTimer = setInterval(updateProgress, 1000 / 30);

  // imagesLoaded을 이용하여 이미지를로드 할 때마다 카운터를 가산
  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  // 이미지로드 상황을 바탕으로 진행 표시를 업데이트
  // 이 함수는 setInterval () 메소드에 의해 1 초에 30 번 호출
  function updateProgress() {
    // 로딩 완료된 이미지의 비율을 정수로 반환
    var target = Math.floor((imgLoaded / imgTotal) * 100);

    // 이미지 로딩 진행율에 따라 current값 갱신
    current += (target - current) * 0.1;

    // 표시 바의 높이와 텍스트에 current 값을 반영
    if (current <= 50) {
      $bar_R.css({ height: current * 2 + "%" });
    } else {
      $bar_R.css({ height: "100%" });
      $bar_L.css({ height: (current - 50) * 2 + "%" });
    }

    $progressText.text(Math.floor(current) + "%");

    // 로딩 완료 후 실행
    if (current >= 100) {
      // 진행률 업데이트 중지
      clearInterval(progressTimer);
      $splachWrap.addClass("progress-complete");
      // 스플래시 화면 off
      $splachWrap.delay(300).animate({ opacity: 0 }, 1000, "easeInOutQuint", function () {
        $splachWrap.css({ display: "none" });
      });
    }

    // current가 99.9보다 크면 100으로 간주하여 종료
    if (current > 99.9) {
      current = 100;
      // 본문 on
      $("#wrapper").addClass("on");

      start = 1; // 메인페이지 로딩 체크

      $(window).trigger("scroll"); // 로딩 완료 후 스크롤 발생 (페럴렉스 실행)
      lastScrTop = $(window).scrollTop(); // 로딩 완료 후 스크롤값 저장 (갤러리 무한 스크롤링에서 사용)
    }
  }
})();
