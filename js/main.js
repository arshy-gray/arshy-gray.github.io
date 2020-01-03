$(document).ready(function(){

	var $body = $('body'),
		$wrapper = $('#wrapper'),
		winHeight = $(window).outerHeight(),
		$container = $('#loading'),// 1
		$progress = $container.find('.progress');
		// 1. 진행률 표시 전체 컨테이너
		
		$progress.css({height:winHeight});

    // 진행률 표시 함수를 호출
    imagesProgress();

    // 이미지 로딩 상항 진행률을 표시
    function imagesProgress () {

        var $progressBar  = $container.find('.progress-bar'),  // 2
            $progressText = $container.find('.progress-text'), // 3
			$bar_R = $progressBar.find('.bar_R'),
			$bar_L = $progressBar.find('.bar_L'),

            // 2. 진행률 표시 막대 부분
            // 3. 진행률 표시 텍스트 부분

            // imagesLoaded 라이브러리에서 body 요소의 이미지 로딩을 모니터링
            // 동시에 body 전체 이미지 수를 저장
            imgLoad       = imagesLoaded('body'),
            imgTotal      = imgLoad.images.length,

            // 읽기를 완료 한 이미지의 숫자 카운터와
            // 진행률 표시의 현재 위치에 해당하는 수치 (모두 처음에는 0)
            imgLoaded     = 0,
            current       = 0,

            // 1 초에 60 번씩 읽어 여부 확인
            progressTimer = setInterval(updateProgress, 1000 / 60);

        // imagesLoaded을 이용하여 이미지를로드 할 때마다 카운터를 가산
        imgLoad.on('progress', function () {
            imgLoaded++;
        });

        // 이미지로드 상황을 바탕으로 진행 표시를 업데이트
        // 이 함수는 setInterval () 메소드에 의해 1 초에 60 번 불려
        function updateProgress () {

            // 읽을 완료 한 이미지의 비율
            var target = (imgLoaded / imgTotal) * 100;
			
			 // current (현재 위치)와 target (목적지)의 거리를 바탕으로 여유를 건다
			current += (target - current) * 0.1;

            // 표시 바의 폭과 텍스트에 current 값을 반영
            // 텍스트는 소수점 이하를 버리고 정수로
				if(current <= 50 ){
					$bar_R.css({ height: current * 2 + '%' });
				}else{
					$bar_R.css({ height: 100 + '%' });
					$bar_L.css({ height: 100 - ((current - 50) * 2) + '%' });
				}

            $progressText.text(Math.floor(current) + '%');

          // 종료
            if(current >= 100){
                // 진행률 표시의 업데이트를 중지
                clearInterval(progressTimer);
                // CSS 스타일을 바꾸기 위하여 클래스를 추가
                $container.addClass('progress-complete');
                // 진행률 막대와 텍스트를 동시에 애니메이션시키기 위해
                // 그룹화하고 하나의 jQuery 객체에
                $container
                    // 0.3 초 대기
                    .delay(300)
                    // 1 초에 걸쳐 진행률 막대와 텍스트를 투명하게
                    .animate({ opacity: 0 }, 1000, 'easeInOutQuint', function () {
                        //  오버레이를 none
                        $container.add($progress).css({ display:'none' });
                    });
            } 

            // current가 99.9보다 크면 100으로 간주하여 종료
            if (current > 99.9) {
                current = 100;
                $wrapper.addClass('on');				
            }
        }

    }

});
$(window).load(function(){

	/* 고정헤더 -------------------*/
	$('.page_hd').each(function(){
		var $window = $(window), //Window 객체
			$header = $(this),
			$gnb = $header.find('.gnb_menu'), // 헤더 스타일 저장
			$section01 = $('#main'),
			
			//웹 페이지상단에서 section01 아래 위치까지의 길이
			//section01의 상단 위치 + section01의 높이
			threshold = $section01.outerHeight();
		
		//스크롤시 헤더 스타일 변화, 초당 15회
		$window.on('scroll', $.throttle(1000 / 15, function(){
			if($window.scrollTop() > threshold){
				$header.addClass('visible');
			}else{
				$header.removeClass('visible');
			}
		}));

		// 스크롤 이벤트를 발생하여 처음 로딩할 때의 위치를 결정
		$window.trigger('scroll');
			
	});	

	 /*  gnb메뉴 (Smooth scroll) ------------------  */
	$('.gnb_menu a').smoothScroll({	
		easing: 'easeOutExpo',
			speed:1500,
		afterScroll : function(){
			location.hash = $(this).attr('href');
		}
	});



	  /* Project Slide -------------- */
    $('.slide_wrap').each(function () {

    // 변수의 준비   

        var $container = $(this),                                 // a
            $slideGroup = $container.find('.slides'),				// b
            $slides = $slideGroup.find('li'),                 // c
			$slidesImg = $slides.find('img'), 
            $nav = $container.find('.drection_btn'),             // e
            // 슬라이드 쇼의 각 요소의 jQuery 객체
            // a 슬라이드 쇼 전체 컨테이너
            // b 모든 슬라이드의 정리 (슬라이드 그룹)
            // c 각 슬라이드
            // d 각 슬라이드 이미지
            // e 방향

            slideCount = $slides.length, // 슬라이드 장수
            slideEA = 0,
			currentIndex = 0,            // 현재 슬라이드의 인덱스
            duration = 500,              // 다음 슬라이드에 애니메이션의 소요 시간
            easing = 'swing',    // 다음 슬라이드에 애니메이션의 이징 종류
            interval = 7500,             // 자동으로 다음 슬라이드로 옮길 때까지의 시간
            timer;                       // 타이머
		
		
		//표시할 슬라이드개수 지정
		if(767 < $(window).outerWidth(true) + 17){
			slideEA = 2;
		}else{
			slideEA = 1;
		}

		//함수 정의
		//모든 슬라이드를 나타내는 함수
		function goToSlide(index){
			//슬라이드 이미지를 대상 인덱스에 맞게 보이기
			$slidesImg.animate({opacity:0},duration);

			for(i=0; i <= (slideCount/slideEA) % slideEA; i++){
				$slidesImg.eq(index * slideEA + i).animate({opacity:1},duration);
			}		

			//현재 슬라이드의 높이값 저장
			slideHeight();
				
			//현재 슬라이드의 인덱스값을 저장
			currentIndex = index;

			//네비게이션과 인디케이터 상태를 업데이트
			updateNav();
		
		}	

		//이미지높이에 따른 슬라이드 높이 자동계산
		function slideHeight(){
			var slideHeight = $slidesImg.height();
			
			$container.css('height', slideHeight);

		}
		
		//슬라이드 상태에 따라 내비게이션과 인디케이터를 업데이트하는 함수
		function updateNav(){
			var $navPrev = $nav.find('.prev'),
				$navNext = $nav.find('.next');
			
			//첫번째 슬라이드 prev 삭제
			if(currentIndex === 0){
				$navPrev.addClass('disabled');
			}else{
				$navPrev.removeClass('disabled');
			}

			//마지막 슬라이드 next 삭제
			if(currentIndex === slideCount/ slideEA - 1){
				$navNext.addClass('disabled');
			}else{
				$navNext.removeClass('disabled');
			}

		}

		//타이머를 시작하는 함수
		function startTimer(){
			//변수 internval로 설정한 시간마다 작업을 수행
			timer = setInterval(function(){
				//현재 슬라이드의 인덱스에 따라 다음에 표시할 슬라이드를 결정
				//마지막 슬라이드라면 첫번째 슬라이드의 인덱스값을 저장
				var nextIndex = (currentIndex + 1) % (slideCount / slideEA);

				goToSlide(nextIndex);

			}, interval);
		}

		//타이머를 중지시키는 함수
		function stopTimer(){
			clearInterval(timer);
		}

		//이벤트 등록
		//내비게션 링크를 클릭하면 해당 슬라이드를 표시
		$nav.on('click', 'li', function(event){
			event.preventDefault();
			if($(this).hasClass('prev')){
				goToSlide(currentIndex - 1);
			}else{
				goToSlide(currentIndex + 1);
			}
		});

		//마우스오버 시에는 타이머를 정지시키고, 마우스아웃 시에는 타이머를 작동
		$container.on({
			mouseenter:stopTimer,
			mouseleave:startTimer
		});
	
		//슬라이드쇼 시작
		//첫번째슬라이드표시
		goToSlide(currentIndex);

		//타이머시작
		startTimer();

		//반응형 초기화
		$(window).resize($.throttle(1500 / 1, function () {
				
				//슬라이드 초기화 중 이미지 로딩표시
				$('.slides').addClass('loading');
		
				(function(){					

					//표시할 슬라이드개수 지정
					if(767 < $(window).outerWidth(true) + 17){
						slideEA = 2;
						currentIndex = currentIndex % slideEA;
						
					}else{
						slideEA = 1;
						currentIndex = currentIndex;					
					}
					
					//슬라이드 업데이트
					$slidesImg.animate({opacity:0},duration);

					for(i=0; i <= (slideCount/slideEA) % slideEA; i++){
						$slidesImg.eq(currentIndex * slideEA + i).animate({opacity:1},duration);
					}					
					
					//현재 슬라이드의 높이값 저장
					slideHeight();

					//네비게이션과 인디케이터 상태를 업데이트
					updateNav();

				})();
				
				//슬라이드 초기화 후 이미지 로딩표시
				setTimeout(function(){
					$('.slides').removeClass('loading');
				}, 3000);
		}));
		
	});

	 /* Portfolio -------------- */
	 $('#pf_gellery').each(function () {
        // #gallery요소가 갤러리 컨테이너
        var $container = $(this),
			$loadMoreButton = $('#load-more'), // 추가 버튼
            $filter = $('#gellery-filter'),    // 필터링 양식
            addItemCount = 10,					// 표시 된 항목 수
            addadd = 0,                        
            allData = [],                      // 모든 JSON 데이터
            filteredData = [];                 // 필터링 된 JSON 데이터;
		
			/* 한 번에 표시 할 항목 수
			if(780 <= $(window).width()){
				var addItemCount = 4;              
			}else{
				var addItemCount = 6; 
			}*/


		//옵션을 설정 Masonry를 준비
        $container.masonry({
            columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
            itemSelector: '.pf_item',
			percentPosition: true
        });

		// JSON을 검색하고 initGallery 함수를 실행
        $.getJSON('./data/pf_content.json', initGallery);

		// 갤러리 초기화
        function initGallery (data) {

            // 취득한 JSON 데이터를 저장
            allData = data;

            // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
            filteredData = allData;

            // 첫 번째 항목을 표시
            addItems();

            // 추가 버튼을 클릭하면 추가로 표시
            $loadMoreButton.on('click', addItems);

            // 필터 라디오 버튼이 변경되면 필터링을 수행
            $filter.on('change', 'input[type="radio"]', filterItems);

			// 항목 링크에 호버 효과 처리 등록
            $container.on('mouseenter mouseleave', '.pf_item', hoverDirection);
        }

		 // 항목을 생성하고 문서에 삽입
        function addItems (filter) {

            var elements = [],
                // 추가 데이터의 배열
                slicedData = filteredData.slice(addadd, addadd + addItemCount);

            // slicedData의 요소마다 DOM 요소를 생성
            $.each(slicedData, function (i, item) {
            	var itemHTML = '';

              itemHTML += '<li class="pf_item is-loading">' +
						'<div class="pf_thumb">' +
							'<div class="img_box"><img src="' + item.images.thumb + '" alt="' + item.title + '" /></div>' +
							'<div class="txt_box">' +
								'<h4>'+ item.title + '</h4>' +
								'<ul>' +
									'<li><span class="pf_th_li_t"><i class="fa fa-bar-chart" title="참여율"></i>참여율</span><span class="pf_th_li_c">' + item.part +'</span></li>' +
									'<li><span class="pf_th_li_t"><i class="fa fa-calendar" title="프로젝트기간"></i>프로젝트기간</span><span class="pf_th_li_c">' + item.project +'</span></li>' +
								'</ul>' +
							'</div>' +
						'</div>' +
						'<div class="pf_hover">' +
							'<div class="btn_box"><ul>' +
								'<li class="detail_btn"><a href="javascript:vold(0);" title="자세히보기"><i class="fa fa-search"></i></a></li>';

						if(item.link){
								itemHTML += '<li class="siteLink_btn"><a href="' + item.link + '" title="' + item.linkTitle +'" target="' + item.winTarget + '"><i class="fa fa-link"></i></a></li>';
							}					

						itemHTML += '</ul></div>' +
						'</div>' +
						'<div class="pf_detail">' +
							'<div class="pf_layer" title="이미지를 클릭하면 닫힙니다.">' +
								'<div class="pf_txt_basic">' +
									'<div class="txt_basic_main">' +
                            			'<div class="basic_main_tit">' +
											'<h4 class="pf_t">' + item.title + '</h4>' +
											'<span class="type">(' + item.intro + ')</span>' +
                           				 '</div>' +
										'<div class="basic_main_type">' +
                            				'<ul class="type_device">' +
												'<li><i class="fas fa-desktop"></i></li>';

								if(item.category !== 'ONLY PC'){
									itemHTML += '<li><i class="fas fa-mobile-alt"></i></li>';
								}

                				if(item.category === 'RESPONSIVE') {
                                    itemHTML += '<li><i class="fas fa-sync-alt"></i></li>';
                                }

                                itemHTML += '</ul>' +
											'<ul class="type_browser">' +
												'<li><img src="./images/main/browser_chrome.png" alt="chrome"></li>' +
												'<li><img src="./images/main/browser_ie.png" alt="ie"><span class="browser_ver">' + item.browser.ie + '</span></li>';

								if(item.browser.safari){
                                    itemHTML += '<li><img src="./images/main/browser_safari.png" alt="safari"></li>';
								}

								itemHTML += '</ul>' +
										'</div>' +
									'</div>' +
									'<div class="txt_basic_sub">' +
										'<ul class="pf_c">' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-calendar-alt"></i>프로젝트기간</span>' +
												'<span class="pf_li_c">' + item.project + '</span>' +
											'</li>' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-users"></i>구성원</span>' +
												'<span class="pf_li_c">' + item.member + '</span>' +
											'</li>' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-user-tag"></i>주요역할</span>' +
												'<span class="pf_li_c">' + item.main_role + '</span>' +
											'</li>' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-chart-bar"></i>참여율</span>' +
												'<span class="pf_li_c">' + item.part + '</span>' +
											'</li>' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-code"></i>사용언어</span>' +
												'<span class="pf_li_c">' + item.language + '</span>' +
											'</li>' +
											'<li>' +
												'<span class="pf_li_t"><i class="fas fa-laptop-code"></i>개발환경</span>' +
												'<span class="pf_li_c">' + item.task_environment + '</span>' +
											'</li>';

							if(item.link){
								itemHTML += '<li>' +
												'<span class="pf_li_t"><i class="fas fa-external-link-alt"></i>웹사이트</span>' +
												'<span class="pf_li_c"><a href="' + item.link + '" title="새창" target="_blank">' + item.link + '</a></span>' +
											'</li>';
							}

							itemHTML += '</ul>' +
									'</div>' +
								'</div>' +
								'<div class="pf_img"><img src="' + item.images.detail + '" alt="포트폴리오 상세" /></div>' +
								'<div class="pf_txt_detail">' +
									'<ul class="txt_detail_tit">';

							if(item.work.scope){
                                itemHTML += '<li class="on"><i class="fas fa-tasks"></i>업무범위</li>';
							}

							if(item.work.task){
                                itemHTML += '<li><i class="fas fa-graduation-cap"></i>주요기여</li>';
							}

							if(item.work.result){
                                itemHTML += '<li><i class="fas fa-trophy"></i>주요성과</li>';
							}

                		itemHTML += '</ul>' +
									'<ul class="txt_detail_ctt">';

						if(item.work.scope){
							itemHTML += '<li class="detail_scope on">' + item.work.scope.page;

								if(item.work.scope.comment){
                                    itemHTML += '<span class="comment">' + item.work.scope.comment + '</span>';
								}

                            itemHTML += '</li>';
						}

						if(item.work.task){
							itemHTML += '<li class="detail_task">' +
											'<ul>';

								for(var taskItem in item.work.task){
									itemHTML += '<li>' + item.work.task[taskItem] + '</li>';
								}

								itemHTML += '</ul>' +
										'</li>';
						}

						if(item.work.result){
							itemHTML += '<li class="detail_result">' +
											'<ul>';

								for(var resultItem in item.work.result){
									itemHTML += '<li>' + item.work.result[resultItem] + '</li>';
								}

								itemHTML += '</ul>' +
										'</li>';
						}

						itemHTML += '</ul>' +
								'</div>' +
							'</div>' +
							'<div class="btn_close"><a href="javascript:vold(0);"><img src="./images/main/btn2_close.png" alt="닫기" /></a></div>' +
							'<div class="close_bg"></div>' +
						'</div>' +
					'</li>';
                elements.push($(itemHTML).get(0));
            });

            // DOM 요소의 배열을 컨테이너에 넣고 Masonry 레이아웃을 실행
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $(elements).removeClass('is-loading');
                    $container.masonry('appended', elements);

                    // 필터링시 재배치
                    if (filter) {
                        $container.masonry();
                    }
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
        function filterItems () {
            var key = $(this).val(),// 체크 된 라디오 버튼의 value

                // 추가 된 Masonry 아이템
                masonryItems = $container.masonry('getItemElements');

            // Masonry 항목을 삭제
            $container.masonry('remove', masonryItems);

            // 필터링 된 항목의 데이터를 재설정과
            // 추가 된 항목 수를 재설정
            filteredData = [];
            addadd = 0;

           if (key === 'ALL') {
                // all이 클릭 된 경우 모든 JSON 데이터를 저장
                filteredData = allData;
            } // all 이외의 경우, 키와 일치하는 데이터를 추출
						else if(key === 'ONLY PC' || key === 'PC&MOBILE' || key === 'RESPONSIVE'){
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
                });
		            } else {
		                 filteredData = $.grep(allData, function (item) {
							return item.category2 === key;
		                });
            }              

            // 항목을 추가
            addItems(true);			
        }

	 // 호버 효과
		function hoverDirection (event) {
			var $overlay = $(this).find('.pf_hover'),
				side = getMouseDirection(event),
				animateTo,
				positionIn = {
					top:  '0%',
					left: '0%'
				},
				positionOut = (function () {
					switch (side) {
						// case 0: top, case 1: right, case 2: bottom, default: left
						case 0:  return { top: '-100%', left:    '0%' }; break; // top
						case 1:  return { top:    '0%', left:  '100%' }; break; // right
						case 2:  return { top:  '100%', left:    '0%' }; break; // bottom
						default: return { top:    '0%', left: '-100%' }; break; // left
					}
				})();
			if (event.type === 'mouseenter') {
				animateTo = positionIn;
				$overlay.css(positionOut);
			} else {
				animateTo = positionOut;
			}
			$overlay.stop(true).animate(animateTo, 250, 'easeOutExpo');
		}

		// 마우스의 방향을 감지하는 함수
		// http://stackoverflow.com/a/3647634
		function getMouseDirection (event) {
			var $el = $(event.currentTarget),
				offset = $el.offset(),
				w = $el.outerWidth(),
				h = $el.outerHeight(),
				x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
				y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
				direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
			return direction;
		}

		// jQuery UI Button
		$('.filter-form input[type="radio"]').button({
			icons: {
				primary: 'icon-radio'
			}
		});

		//포트폴리오 디테일 이미지 온오프
		var winHeight = $(window).height(),
			$body = $('body');

		$(this).on('click', '.detail_btn', function(){
			$(this).parents('.pf_item').find('.pf_detail').css('display','block');
			$body.css({height:winHeight, 'overflow-y':'hidden'}); //포트폴리오 섹션에서 전체 스크롤 고정
			$('.page_hd').css('display','none');
		});

		$(this).on('click', '.pf_detail img', function(){
			$('.pf_detail').removeClass('on').css('display','none');
			$body.css({height:'auto', 'overflow-y':'auto'});
			$('.page_hd').css('display','block');
		});	
    });

	/* 풀페이지 : (콘텐츠 생성된 뒤에 실행해야하므로 최하단에 선언)-------------------*/
	(function fullPage(){
		var htmlHeight = $('html').outerHeight(),
			$section = [$('.fullpage')], //풀페이지 적용할 섹션
			sectionLen = $section.length;

		//적용할 높이값 및 최소높이값 계산
		for(var i=0; i<sectionLen; i++){
			//풀페이지 높이값
			$section[i].css('height', htmlHeight);

			//풀페이지 최소 높이값 계산 변수선언
			var el1 = $section[i].find('> h2').outerHeight(true),
				el2 = $section[i].find('> p').outerHeight(true),
				el3 = 0,
				el3Len = $section[i].find('article').length,
				sectionMinHeight,
				sectionMaxHeight;
			
			//article 개수만큼 높이 환산
			for(var j=0, el3Sum = []; j<el3Len; j++){
			 	el3Sum[j] = $section[i].find('article:nth-child(' + (j+1) + ')').outerHeight(true);
				el3 += el3Sum[j];		
			}

			//풀페이지 최소 높이값
			sectionMinHeight = el1 + el2 + el3 + ($section[i].outerHeight(true) - $section[i].height());			
			$section[i].css('minHeight', sectionMinHeight);

			//풀페이지 콘텐츠(제목 제외) 최대 높이값
			sectionMaxHeight = htmlHeight - ($section[i].outerHeight(true) - $section[i].height()) - el1 - el2;			
			$section[i].find('.wrap_cen').css('maxHeight', sectionMaxHeight);
			
			//풀페이지 콘텐츠(제목 제외) 최소 높이값
			$section[i].find('.wrap_cen').css('minHeight', el3);
		};
	})();		

	//반응형 초기화
	$(window).resize($.throttle(1000 / 3, function () {
		var htmlHeight = $('html').outerHeight(),
			$section = [$('.fullpage')], //풀페이지 적용할 섹션
			sectionLen = $section.length;

		//적용할 높이값 및 최소높이값 계산
		for(var i=0; i<sectionLen; i++){
			//풀페이지 높이값
			$section[i].css('height', htmlHeight);

			//풀페이지 최소 높이값 계산 변수선언
			var el1 = $section[i].find('> h2').outerHeight(true),
				el2 = $section[i].find('> p').outerHeight(true),
				el3 = 0,
				el3Len = $section[i].find('article').length,
				sectionMinHeight,
				sectionMaxHeight;
			
			//article 개수만큼 높이 환산
			for(var j=0, el3Sum = []; j<el3Len; j++){
			 	el3Sum[j] = $section[i].find('article:nth-child(' + (j+1) + ')').outerHeight(true);
				el3 += el3Sum[j];		
			}
			
			//풀페이지 콘텐츠(제목 제외) 최대 높이값
			sectionMaxHeight = htmlHeight - ($section[i].outerHeight(true) - $section[i].height()) - el1 - el2;			
			$section[i].find('.wrap_cen').css('maxHeight', sectionMaxHeight);
			
			//풀페이지 콘텐츠(제목 제외) 최소 높이값
			$section[i].find('.wrap_cen').css('minHeight', el3);
			
		};		
	}));

	/* 스크롤에 따른 동적효과 : (풀페이지 하단에 선언)-------------------*/
	$(window).on('scroll', $.throttle(1000 / 3, 
		
	function (){
		var $sect = $('section'),
			sectLen = $sect.length,
			htmlHeight = $('html').outerHeight(),
			winTop = $(window).scrollTop(),
			winBtm = winTop + htmlHeight,
			$gnbPC = $('#gnb_pc .gnb_menu li'),
			$gnbM = $('#gnb_m .gnb_menu li'),
			$gnbMain = $('#main .gnb_menu li');	

			for(i=0; i<sectLen; i++){
				var sectHeight = $sect.eq(i).outerHeight(true),
					sectPosition = $sect.eq(i).offset().top,
					comparisonValue = sectPosition + 150;		
				
				//동적효과 실행
				if(comparisonValue <= winBtm){
					$sect.eq(i).addClass('active').addClass('on');	
					$sect.removeClass('on');
					$sect.eq(i).addClass('on');					
				}else{ //동적효과 취소
					$sect.eq(i).removeClass('active');
				}

				//스크롤 위치에 따른 섹션구분
				if($sect.eq(i).hasClass('on')){
					$gnbPC.removeClass('on');
					$gnbPC.eq(i).addClass('on');

					$gnbM.removeClass('on');
					$gnbM.eq(i).addClass('on');

					$gnbMain.removeClass('on');
					$gnbMain.eq(i).addClass('on');
				}
			}
	})); 	
});