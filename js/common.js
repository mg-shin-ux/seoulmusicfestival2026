$(function () {
  let $header = $('#header'),
    $header_btn = $header.find('.btn-menu'),
    $gnb = $header.find('.gnb > ul'),
    $gnb_li = $gnb.find('> li'),
    $sub = $header.find('.sub');

  // PC 버전: 호버 로직
  $gnb_li.on('mouseenter', function () {
    if ($(window).width() > 1280) {
      $(this).find('.sub').stop().slideDown(300);
    }
  }).on('mouseleave', function () {
    if ($(window).width() > 1280) {
      $(this).find('.sub').stop().slideUp(300);
    }
  });

  // PC 버전: .sub a 활성화된 상태(.on)
  $sub.on('click', 'a', function () {
    $sub.find('a').siblings().removeClass();
    $(this).addClass('on');
  });

  // 모바일 버전: 메뉴 열기 버튼
  $header_btn.on('click', function () {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $gnb.stop().fadeIn(300);
    } else {
      $gnb.stop().fadeOut(300, function () {
        // 닫힐 때 서브메뉴 스타일도 초기화해서 다음에 열 때 깨끗하게
        $sub.hide();
      });
    }
  });

  // 모바일 버전: 아코디언 메뉴
  $gnb_li.find('> a').on('click', function (e) {
    if ($(window).width() <= 1280) {
      let $thisSub = $(this).siblings('.sub');

      if ($thisSub.length > 0) { // 서브메뉴가 있는 경우에만
        e.preventDefault(); // 링크 이동 방지

        // 아코디언 로직
        $sub.not($thisSub).stop().slideUp(300);
        $thisSub.stop().slideToggle(300);
      }
    }
  });

  // 서브메뉴 내부 링크 클릭 시 메뉴 닫기 (탭 전환 대응)
  $sub.find('a').on('click', function () {
    if ($(window).width() <= 1280) {
      $gnb.fadeOut(300);
      $header_btn.removeClass('active');
      $sub.hide();
    }
  });

  // 리사이즈/초기화 로직
  $(window).on('resize', function () {
    let w = $(window).width();

    if (w > 1280) {
      // PC 모드로 돌아올 때 모바일의 모든 스타일 제거
      $gnb.removeAttr('style');
      $sub.removeAttr('style');
      $header_btn.removeClass('active');
    }
  }).trigger('resize'); // 페이지 새로고침 시에도 한 번 실행되도록 함

});