const $pjtGellery=$("#pjt_gellery"),$project=$("#project"),$loadMoreButton=$("#load-more");let addItemCount=10,addadd=0,allData=[],filteredData=[],infinitSrcTimer;function initGallery(t){allData=t,filteredData=allData,$project.addClass("is-loading"),addItems()}function addItems(){let l=[];var t=filteredData.slice(addadd,addadd+addItemCount);$.each(t,function(t,i){let e="";function a(t,i){let s="";return t&&0<t.length&&(s+='<li class="'+i+'">',t.forEach(function(l){l.main_tit&&0<l.main_tit.length&&1!==l.main_tit.Length&&""!==l.main_tit[0]&&(s+='<strong class="work_main_tit">'+l.main_tit+"</strong>"),l.sub_tit&&0<l.sub_tit.length&&l.sub_tit.forEach(function(t,e){var a;1!==l.sub_tit.Length&&""!==l.sub_tit[0]&&(s+='<em class="work_sub_tit">'+t+"</em>"),l.ol&&l.ol.length>e&&((a=1!==l.ol[0].Length&&""!==l.ol[0][0])&&(s+='<ol class="work_ol">'),l.ol[e].forEach(function(t,i){a&&(s+="<li><span>"+t+"</span>"),l.ul&&l.ul.length>e&&0!==l.ul[e][i].length&&(s+='<ul class="work_ul">',l.ul[e][i].forEach(function(t){s+="<li>"+t+"</li>"}),s+="</ul>"),a&&(s+="</li>")}),a)&&(s+="</ol>")})}),s+="</li>"),s}e+='<li class="pjt_item ',i.images.thumb_h&&(e+="thumb_h_"+i.images.thumb_h+" "),e+='is-loading"><div class="pjt_thumb"><div class="img_box"><img src="'+i.images.thumb+'" alt=""/></div><div class="txt_box"><h4>'+i.title+'</h4><p class="pjt_intro">'+i.intro+'</p><ul><li><span class="pjt_item_tit"><i class="fas fa-chart-bar" title="참여율"></i></span><span class="pf_item_ctt">'+i.part+'</span></li><li><span class="pjt_item_tit"><i class="fas fa-calendar-alt" title="프로젝트기간"></i></span><span class="pf_item_ctt">'+i.period+'</span></li></ul></div></div><div class="pjt_hover"><div class="btn_box"><ul><li class="detail_btn"><button type="button" title="자세히보기"><i class="fa fa-search"></i></button></li>',i.link&&(e+='<li class="siteLink_btn"><a href="'+i.link+'" title="새창',i.linkTitle&&(e+=" : "+i.linkTitle),e+='" target="_blank"><i class="fa fa-link"></i><span>사이트 바로가기</span></a></li>'),e+='</ul></div></div><div class="pjt_detail"><div class="pjt_layer"><div class="pjt_layer_tit"><h4 class="pjt_main_tit">'+i.title+'</h4><p class="pjt_intro">'+i.intro+'</p></div><div class="pjt_layer_ctt"><div class="pjt_info"><div class="pjt_info_type"><ul class="type_device">',"MOBILE"===i.device&&"RESPONSIVE"!==i.device||(e+='<li><i class="fas fa-desktop" title="PC"></i></li>'),"PC"===i.device&&"RESPONSIVE"!==i.device||(e+='<li><i class="fas fa-mobile-alt" title="Mobile"></i></li>'),"RESPONSIVE"===i.device&&(e+='<li class="responsive"><i class="fas fa-sync-alt" title="반응형"></i></li>'),e+='</ul><ul class="type_browser"><li class="chrome"><i title="Chrome"></i></li>',i.browser.ie&&(e+='<li class="ie"><i title="Internet Explorer"></i><span class="browser_ver">'+i.browser.ie+"</span></li>"),i.browser.safari&&(e+='<li class="safari"><i title="Safari"></i></li>'),e+='</ul></div><div class="txt_basic_sub"><ul class="pjt_ctt"><li><span class="pjt_item_tit">프로젝트기간<i class="fas fa-calendar-alt"></i></span><span class="pjt_item_ctt">'+i.period+'</span></li><li><span class="pjt_item_tit">구성원<i class="fas fa-users"></i></span><span class="pjt_item_ctt">'+i.member+'</span></li><li><span class="pjt_item_tit">주요역할<i class="fas fa-user-tag"></i></span><span class="pjt_item_ctt">'+i.main_role+'</span></li><li><span class="pjt_item_tit">참여율<i class="fas fa-chart-bar"></i></span><span class="pjt_item_ctt">'+i.part+'</span></li><li><span class="pjt_item_tit">사용언어<i class="fas fa-code"></i></span><span class="pjt_item_ctt">'+i.language+'</span></li><li><span class="pjt_item_tit">개발환경<i class="fas fa-laptop-code"></i></span><span class="pjt_item_ctt">'+i.task_environment+"</span></li>",i.link&&(e+='<li><span class="pjt_item_tit">웹사이트<i class="fas fa-external-link-alt"></i></span><span class="pjt_item_ctt"><a href="'+i.link+'" title="새창" target="_blank">'+i.link+"</a>",i.linkTitle&&(e+=' <br /><em class="lint_desc"><b>('+i.linkTitle+")</b></em>"),e+="</span></li>"),e+='</ul></div></div><div class="pjt_info_detail tab_wrap"><ul class="txt_detail_tit tab_tit">',i.work.scope&&(e+='<li class="on"><i class="fas fa-tasks"></i>업무범위</li>'),i.work.task&&(e+='<li><i class="fas fa-graduation-cap"></i>주요기여</li>'),i.work.result&&(e+='<li><i class="fas fa-trophy"></i>주요성과</li>'),e+='</ul><ul class="txt_detail_ctt tab_ctt">',i.work.scope&&(e+=a(i.work.scope,"detail_scope on")),i.work.task&&(e+=a(i.work.task,"detail_task")),i.work.result&&(e+=a(i.work.result,"detail_result")),e+='</ul></div><div class="pjt_detail_img"><img src="'+i.images.detail+'" alt="포트폴리오 상세" /></div></div><button type="button" class="btn_close"><span>닫기</span></button></div><div class="close_bg"></div></div></li>',l.push($(e).get(0))}),$pjtGellery.delay(100).fadeIn(100,function(){$pjtGellery.imagesLoaded(function(){$pjtGellery.append(l).masonry("appended",l).masonry(),$project.removeClass("is-loading"),$(".pjt_item").removeClass("is-loading"),$loadMoreButton.removeClass("is-loading"),$pjtGellery.masonry("layout")})}),(addadd+=t.length)<filteredData.length?$loadMoreButton.css("display","block"):$loadMoreButton.hide()}function filterItems(){const i=$(".filter-type-cpn").find('input[type="radio"]:checked').val(),e=$(".filter-type-biz").find('input[type="radio"]:checked').val(),a=$(".filter-type-device").find('input[type="radio"]:checked').val(),l=$(".filter-type-linked").find('input[type="checkbox"]').prop("checked"),t=$pjtGellery.masonry("getItemElements");$project.addClass("is-loading"),$pjtGellery.masonry("remove",t),filteredData=[],addadd=0,filteredData="ALL"===i?allData:$.grep(allData,function(t){return t.company===i}),"ALL"!==e&&(filteredData=$.grep(filteredData,function(t){return t.business===e})),"ALL"!==a&&(filteredData=$.grep(filteredData,function(t){return t.device===a})),l&&(filteredData=$.grep(filteredData,function(t){return(linkFt=!!t.link)===l})),addItems()}function hoverDirection(t){const i=$(this).find(".pjt_hover"),e=getMouseDirection(t);let a,l=function(){switch(e){case 0:return{top:"-100%",left:"0%"};case 1:return{top:"0%",left:"100%"};case 2:return{top:"100%",left:"0%"};default:return{top:"0%",left:"-100%"}}}();"mouseenter"===t.type?(a={top:"0%",left:"0%"},i.css(l)):a=l,i.stop(!0).animate(a,250,"easeOutExpo")}function getMouseDirection(t){var i=$(t.currentTarget),e=i.offset(),a=i.outerWidth(),i=i.outerHeight(),l=(t.pageX-e.left-a/2)*(i<a?i/a:1),t=(t.pageY-e.top-i/2)*(a<i?a/i:1);return Math.round((Math.atan2(t,l)*(180/Math.PI)+180)/90+3)%4}$(window).width()<780&&(addItemCount=6),$pjtGellery.on("click",".detail_btn",function(){$(this).parents(".pjt_item").find(".pjt_detail").show(),$body.css({"overflow-y":"hidden"}),$header.hide()}).on("click",".pjt_detail .close_bg, .pjt_detail .btn_close",function(){$(this).parents(".pjt_item").find(".pjt_detail").removeClass("on").hide(),$body.css({"overflow-y":"auto"}),$header.show()}).on("mouseenter mouseleave",".pjt_item",hoverDirection).on("click",".tab_tit > li",function(){var t=$(this).index();$(this).addClass("on").siblings("li").removeClass("on"),$(this).parent("ul").siblings(".tab_ctt").children("li").eq(t).addClass("on").siblings("li").removeClass("on")}).on("mouseenter mouseleave","#project",function(){$("#pjt_gellery").masonry("layout")}),$("#gellery-filter").on("change",".form-item input",filterItems),$loadMoreButton.on("click",function(){$loadMoreButton.addClass("is-loading"),addItems(),$pjtGellery.delay(100).fadeIn(100,function(){$pjtGellery.imagesLoaded(function(){$pjtGellery.masonry("layout")})})}),$(window).on("scroll",function(){if(0<start&&!infinitSrcTimer){const l=$(window).height(),t=$project.offset().top,s=$project.offset().top+$project.outerHeight();let e=t<lastScrTop,a=s>lastScrTop;infinitSrcTimer=setTimeout(function(){var t=$(window).scrollTop(),i=t+l;infinitSrcTimer=null,e&&a&&t>lastScrTop&&i>=s&&($loadMoreButton.addClass("is-loading"),addItems(),$pjtGellery.delay(100).fadeIn(100,function(){$pjtGellery.imagesLoaded(function(){$pjtGellery.masonry("layout")})})),lastScrTop=t},500)}}),$pjtGellery.masonry({columnWidth:".grid-sizer",gutter:".gutter-sizer",itemSelector:".pjt_item",percentPosition:!0}),$.getJSON("../json/project_detail.json",initGallery);