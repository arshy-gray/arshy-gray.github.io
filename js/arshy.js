const $body=$("body"),$header=$(".page_hd"),$sect=$("section"),sectLen=$sect.length,$gnbPC=$("#gnb_pc .gnb_menu li"),timestamp=(new Date).getTime();let lastScrTop=$(window).scrollTop(),start=0,sectActiveTimer,scrTiggerTimer;$("html").removeClass("no-js"),$("link[rel=stylesheet]").each(function(){$(this).attr("href",$(this).attr("href")+"?"+timestamp)}),$("script[class*=production]").each(function(){$(this).attr("src",$(this).attr("src")+"?"+timestamp)}),$(window).on("scroll",function(){const s=$(window).height();sectActiveTimer=sectActiveTimer||setTimeout(function(){var e=$(window).scrollTop()+s;for(sectActiveTimer=null,0<$(window).scrollTop()?$header.addClass("visible"):$header.removeClass("visible"),i=0;i<sectLen;i++)$sect.eq(i).offset().top+s/3*1<=e?($sect.eq(i).addClass("active on").siblings().removeClass("on"),$gnbPC.eq(i).addClass("on").siblings().removeClass("on")):$sect.eq(i).removeClass("active")},300)}),function(){var s=$("#splash"),e=s.find(".progress-bar"),t=s.find(".progress-txt"),i=e.find(".bar_R"),o=e.find(".bar_L"),e=imagesLoaded($("body")),n=e.images.length,r=0,a=0,c=setInterval(function(){var e=Math.floor(r/n*100);(a+=.1*(e-a))<=50?i.css({height:2*a+"%"}):(i.css({height:"100%"}),o.css({height:2*(a-50)+"%"}));t.text(Math.floor(a)+"%"),100<=a&&(clearInterval(c),s.addClass("progress-complete"),s.delay(300).animate({opacity:0},1e3,"easeInOutQuint",function(){s.css({display:"none"})}));99.9<a&&(a=100,$("#wrapper").addClass("on"),start=1,$(window).trigger("scroll"),lastScrTop=$(window).scrollTop())},1e3/30);e.on("progress",function(){r++})}();
const $pfGellery=$("#pf_gellery"),$project=$("#project"),$loadMoreButton=$("#load-more");let addItemCount=10,addadd=0,allData=[],filteredData=[],infinitSrcTimer;function initGallery(t){allData=t,filteredData=allData,$project.addClass("is-loading"),addItems()}function addItems(){let e=[];var t=filteredData.slice(addadd,addadd+addItemCount);$.each(t,function(t,i){let l="";function a(t,i){let s="";return t&&0<t.length&&(s+='<li class="'+i+'">',t.forEach(function(e){e.main_tit&&0<e.main_tit.length&&1!==e.main_tit.Length&&""!==e.main_tit[0]&&(s+='<strong class="work_main_tit">'+e.main_tit+"</strong>"),e.sub_tit&&0<e.sub_tit.length&&e.sub_tit.forEach(function(t,l){var a;1!==e.sub_tit.Length&&""!==e.sub_tit[0]&&(s+='<em class="work_sub_tit">'+t+"</em>"),e.ol&&e.ol.length>l&&((a=1!==e.ol[0].Length&&""!==e.ol[0][0])&&(s+='<ol class="work_ol">'),e.ol[l].forEach(function(t,i){a&&(s+="<li><span>"+t+"</span>"),e.ul&&e.ul.length>l&&0!==e.ul[l][i].length&&(s+='<ul class="work_ul">',e.ul[l][i].forEach(function(t){s+="<li>"+t+"</li>"}),s+="</ul>"),a&&(s+="</li>")}),a)&&(s+="</ol>")})}),s+="</li>"),s}l+='<li class="pf_item ',i.images.thumb_h&&(l+="thumb_h_"+i.images.thumb_h+" "),l+='is-loading"><div class="pf_thumb"><div class="img_box"><img src="'+i.images.thumb+'" alt=""/></div><div class="txt_box"><h4>'+i.title+'</h4><p class="pf_intro">'+i.intro+'</p><ul><li><span class="pf_th_li_t"><i class="fas fa-chart-bar" title="참여율"></i></span><span class="pf_th_li_c">'+i.part+'</span></li><li><span class="pf_th_li_t"><i class="fas fa-calendar-alt" title="프로젝트기간"></i></span><span class="pf_th_li_c">'+i.period+'</span></li></ul></div></div><div class="pf_hover"><div class="btn_box"><ul><li class="detail_btn"><button type="button" title="자세히보기"><i class="fa fa-search"></i></button></li>',i.link&&(l+='<li class="siteLink_btn"><a href="'+i.link+'" title="',i.linkTitle?l+=i.linkTitle:l+="사이트 바로가기",l+='" target="_blank"><i class="fa fa-link"></i></a></li>'),l+='</ul></div></div><div class="pf_detail"><div class="pf_layer"><div class="pf_layer_tit"><h4 class="pf_main_tit">'+i.title+'</h4><p class="pf_intro">'+i.intro+'</p></div><div class="pf_layer_ctt"><div class="pf_info"><div class="pf_info_type"><ul class="type_device">',"MOBILE"===i.device&&"RESPONSIVE"!==i.device||(l+='<li><i class="fas fa-desktop" title="PC"></i></li>'),"PC"===i.device&&"RESPONSIVE"!==i.device||(l+='<li><i class="fas fa-mobile-alt" title="Mobile"></i></li>'),"RESPONSIVE"===i.device&&(l+='<li class="responsive"><i class="fas fa-sync-alt" title="반응형"></i></li>'),l+='</ul><ul class="type_browser"><li class="chrome"><i title="Chrome"></i></li>',i.browser.ie&&(l+='<li class="ie"><i title="Internet Explorer"></i><span class="browser_ver">'+i.browser.ie+"</span></li>"),i.browser.safari&&(l+='<li class="safari"><i title="Safari"></i></li>'),l+='</ul></div><div class="txt_basic_sub"><ul class="pf_c"><li><span class="pf_li_t">프로젝트기간<i class="fas fa-calendar-alt"></i></span><span class="pf_li_c">'+i.period+'</span></li><li><span class="pf_li_t">구성원<i class="fas fa-users"></i></span><span class="pf_li_c">'+i.member+'</span></li><li><span class="pf_li_t">주요역할<i class="fas fa-user-tag"></i></span><span class="pf_li_c">'+i.main_role+'</span></li><li><span class="pf_li_t">참여율<i class="fas fa-chart-bar"></i></span><span class="pf_li_c">'+i.part+'</span></li><li><span class="pf_li_t">사용언어<i class="fas fa-code"></i></span><span class="pf_li_c">'+i.language+'</span></li><li><span class="pf_li_t">개발환경<i class="fas fa-laptop-code"></i></span><span class="pf_li_c">'+i.task_environment+"</span></li>",i.link&&(l+='<li><span class="pf_li_t">웹사이트<i class="fas fa-external-link-alt"></i></span><span class="pf_li_c"><a href="'+i.link+'" title="새창" target="_blank">'+i.link+"</a>",i.linkTitle&&(l+=' <br /><em class="tit_main"><b>('+i.linkTitle+")</b></em>"),l+="</span></li>"),l+='</ul></div></div><div class="pf_info_detail tab_wrap"><ul class="txt_detail_tit tab_tit">',i.work.scope&&(l+='<li class="on"><i class="fas fa-tasks"></i>업무범위</li>'),i.work.task&&(l+='<li><i class="fas fa-graduation-cap"></i>주요기여</li>'),i.work.result&&(l+='<li><i class="fas fa-trophy"></i>주요성과</li>'),l+='</ul><ul class="txt_detail_ctt tab_ctt">',i.work.scope&&(l+=a(i.work.scope,"detail_scope on")),i.work.task&&(l+=a(i.work.task,"detail_task")),i.work.result&&(l+=a(i.work.result,"detail_result")),l+='</ul></div><div class="pf_img"><img src="'+i.images.detail+'" alt="포트폴리오 상세" /></div></div><button type="button" class="btn_close"><img src="../../img/common/btn2_close.png" alt="닫기" /></button></div><div class="close_bg"></div></div></li>',e.push($(l).get(0))}),$pfGellery.delay(100).fadeIn(100,function(){$pfGellery.imagesLoaded(function(){$pfGellery.append(e).masonry("appended",e).masonry(),$project.removeClass("is-loading"),$(".pf_item").removeClass("is-loading"),$loadMoreButton.removeClass("is-loading"),$pfGellery.masonry("layout")})}),(addadd+=t.length)<filteredData.length?$loadMoreButton.css("display","block"):$loadMoreButton.hide()}function filterItems(){const i=$(".filter-type-cpn").find('input[type="radio"]:checked').val(),l=$(".filter-type-biz").find('input[type="radio"]:checked').val(),a=$(".filter-type-device").find('input[type="radio"]:checked').val(),e=$(".filter-type-linked").find('input[type="checkbox"]').prop("checked"),t=$pfGellery.masonry("getItemElements");$project.addClass("is-loading"),$pfGellery.masonry("remove",t),filteredData=[],addadd=0,filteredData="ALL"===i?allData:$.grep(allData,function(t){return t.company===i}),"ALL"!==l&&(filteredData=$.grep(filteredData,function(t){return t.business===l})),"ALL"!==a&&(filteredData=$.grep(filteredData,function(t){return t.device===a})),e&&(filteredData=$.grep(filteredData,function(t){return(linkFt=!!t.link)===e})),addItems()}function hoverDirection(t){const i=$(this).find(".pf_hover"),l=getMouseDirection(t);let a,e=function(){switch(l){case 0:return{top:"-100%",left:"0%"};case 1:return{top:"0%",left:"100%"};case 2:return{top:"100%",left:"0%"};default:return{top:"0%",left:"-100%"}}}();"mouseenter"===t.type?(a={top:"0%",left:"0%"},i.css(e)):a=e,i.stop(!0).animate(a,250,"easeOutExpo")}function getMouseDirection(t){var i=$(t.currentTarget),l=i.offset(),a=i.outerWidth(),i=i.outerHeight(),e=(t.pageX-l.left-a/2)*(i<a?i/a:1),t=(t.pageY-l.top-i/2)*(a<i?a/i:1);return Math.round((Math.atan2(t,e)*(180/Math.PI)+180)/90+3)%4}$(window).width()<780&&(addItemCount=6),$("#pf_gellery").on("click",".detail_btn",function(){$(this).parents(".pf_item").find(".pf_detail").show(),$body.css({"overflow-y":"hidden"}),$header.hide()}).on("click",".pf_detail .close_bg, .pf_detail .btn_close",function(){$(this).parents(".pf_item").find(".pf_detail").removeClass("on").hide(),$body.css({"overflow-y":"auto"}),$header.show()}).on("mouseenter mouseleave",".pf_item",hoverDirection).on("click",".tab_tit > li",function(){var t=$(this).index();$(this).addClass("on").siblings("li").removeClass("on"),$(this).parent("ul").siblings(".tab_ctt").children("li").eq(t).addClass("on").siblings("li").removeClass("on")}).on("mouseenter mouseleave","#project",function(){$("#pf_gellery").masonry("layout")}),$("#gellery-filter").on("change",".form-item input",filterItems),$loadMoreButton.on("click",function(){$loadMoreButton.addClass("is-loading"),addItems(),$pfGellery.delay(100).fadeIn(100,function(){$pfGellery.imagesLoaded(function(){$pfGellery.masonry("layout")})})}),$(window).on("scroll",function(){if(0<start&&!infinitSrcTimer){const e=$(window).height(),t=$project.offset().top,s=$project.offset().top+$project.outerHeight();let l=t<lastScrTop,a=s>lastScrTop;infinitSrcTimer=setTimeout(function(){var t=$(window).scrollTop(),i=t+e;infinitSrcTimer=null,l&&a&&t>lastScrTop&&i>=s&&($loadMoreButton.addClass("is-loading"),addItems(),$pfGellery.delay(100).fadeIn(100,function(){$pfGellery.imagesLoaded(function(){$pfGellery.masonry("layout")})})),lastScrTop=t},500)}}),$pfGellery.masonry({columnWidth:".grid-sizer",gutter:".gutter-sizer",itemSelector:".pf_item",percentPosition:!0}),$.getJSON("/db/pf_content.json",initGallery);