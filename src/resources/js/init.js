const body = document.body,
  headerElement = document.querySelector(".page_hd"),
  sectElement = document.querySelectorAll("section"),
  sectLen = sectElement.length,
  gnbItemElement = document.querySelectorAll(".gnb_menu li"),
  timestamp = new Date().getTime(),
  scrollEvent = new Event("scroll");

let lastScrTop = window.scrollY;

let start = 0; // 스플래시 사라진 후 메인페이지 로딩 체크 (완료시 1)

let sectActiveTimer, scrTiggerTimer; // 섹션활성화, 로딩 후 최초 스크롤시 setTimeout Throttle에 사용

// 자바스크립트 사용
document.querySelector("html").classList.remove("no-js");

// 캐싱 방지
document.querySelectorAll("link[rel=stylesheet]").forEach((styleLink) => {
  styleLink.setAttribute("href", styleLink.getAttribute("href") + "?" + timestamp);
});
document.querySelectorAll("script[class*=production]").forEach((styleLink) => {
  styleLink.setAttribute("src", styleLink.getAttribute("src") + "?" + timestamp);
});

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  const winH = window.innerHeight;

  // sectActiveTimer Throttling
  if (!sectActiveTimer) {
    // 스크롤시 헤더 스타일 변화, 초당 15회 체크
    sectActiveTimer = setTimeout(() => {
      const winTop = window.scrollY,
        winBtm = winTop + winH;

      sectActiveTimer = null;

      // 고정헤더
      if (window.scrollY > 0) {
        headerElement.classList.add("visible");
      } else {
        headerElement.classList.remove("visible");
      }

      // 섹션 활성화 여부
      for (i = 0; i < sectLen; i++) {
        let sectPosition = sectElement[i].offsetTop;
        const comparisonValue = sectPosition + (winH / 3) * 1; // 뷰포트 높이의 하단에서 1/3 지점

        // 동적효과 실행
        // 뷰포트 높이의 하단에서 1/3 지점 지날때 섹션 활성화
        if (comparisonValue <= winBtm) {
          //스크롤 위치에 따른 섹션활성화
          sectElement.forEach((sect) => {
            sect.classList.remove("on");
          });
          sectElement[i].classList.add("active", "on");
          //스크롤 위치에 따른 gnb 활성화
          gnbItemElement.forEach((gnbItem) => {
            gnbItem.classList.remove("on");
          });
          gnbItemElement[i].classList.add("on");
        } else {
          //동적효과 취소
          sectElement[i].classList.remove("active");
        }
      }
    }, 300);
  }
});

// 이미지 로딩 상항 진행률을 표시
(function imagesProgress() {
  const splashElement = document.querySelector("#splash"),
    // 진행률 표시 막대
    progressBarElement = splashElement.querySelector(".progress-bar"),
    // 진행률 표시 텍스트
    progressTextEelement = splashElement.querySelector(".progress-txt"),
    barRElement = progressBarElement.querySelector(".bar_R"),
    barLElement = progressBarElement.querySelector(".bar_L"),
    // imagesLoaded 라이브러리에서 body 요소의 이미지 로딩을 모니터링
    imgLoad = imagesLoaded(body),
    // body 전체 이미지 수를 저장
    imgTotal = imgLoad.images.length;

  // 읽기를 완료 한 이미지의 숫자 카운터와
  let imgLoaded = 0,
    // 진행률 표시의 현재 위치에 해당하는 수치 (모두 처음에는 0)
    current = 0;

  // imagesLoaded을 이용하여 이미지를로드 할 때마다 카운터를 가산
  imgLoad.on("progress", () => {
    imgLoaded++;
  });

  // 이미지로드 상황을 바탕으로 진행 표시를 업데이트x
  // 이 함수는 setInterval () 메소드에 의해 1 초에 30 번 호출
  const updateProgress = () => {
    // 로딩 완료된 이미지의 비율을 정수로 반환
    let target = Math.floor((imgLoaded / imgTotal) * 100);

    // 이미지 로딩 진행율에 따라 current값 갱신
    current += (target - current) * 0.1;

    // 표시 바의 높이와 텍스트에 current 값을 반영
    if (current <= 50) {
      barRElement.style.height = current * 2 + "%";
    } else {
      barRElement.style.height = "100%";
      barLElement.style.height = (current - 50) * 2 + "%";
    }

    progressTextEelement.textContent = Math.floor(current) + "%";

    // 로딩 완료 후 실행
    if (current >= 100) {
      // 진행률 업데이트 중지
      clearInterval(progressTimer);
      splashElement.classList.add("progress-complete");
      // 스플래시 화면 off
      setTimeout(() => {
        splashElement.classList.add("off");
      }, 1000);
    }

    // current가 99.9보다 크면 100으로 간주하여 종료
    if (current > 99.9) {
      current = 100;
      // 본문 on
      document.querySelector("#wrapper").classList.add("on");

      start = 1; // 메인페이지 로딩 체크

      window.dispatchEvent(scrollEvent); // 로딩 완료 후 스크롤 발생 (페럴렉스 실행)
      lastScrTop = window.scrollY; // 로딩 완료 후 스크롤값 저장 (갤러리 무한 스크롤링에서 사용)
    }
  };

  // 1 초에 30 번씩 진행율 호출하여 확인
  const progressTimer = setInterval(updateProgress, 1000 / 30);
})();
