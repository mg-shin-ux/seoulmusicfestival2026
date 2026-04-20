// 1. 브라우저의 스크롤 기억 방지 (맨 위에서 시작)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

$(function () {
    const $tabBtn = $('.tab .menu li a');
    const $tabContent = $('.tab-item');
    const $headerTitle = $('.header-wrap .text-box b');
    const $headerDesc = $('.header-wrap .text-box p');

    const headerData = [
        { title: "DAY 1", desc: '"서울의 소음이 멈추는 곳, 내면의 일렁임을 마주할 시간"' },
        { title: "DAY 2", desc: '"두 번째 밤, 우리가 하나 되는 가장 뜨거운 울림"' },
        { title: "부대프로그램", desc: '"음악 그 이상의 즐거움, 축제의 여백을 채우는 순간들"' }
    ];

    // 탭 전환 함수
    function switchTab(idx) {
        if (idx < 0 || idx >= headerData.length) return;

        // 1) 버튼 상태 변경
        $tabBtn.removeClass('on').eq(idx).addClass('on');

        // 2) 콘텐츠 전환
        $tabContent.removeClass('active').hide(); // 클래스 제거 + 인라인 스타일까지 싹 숨김
        $tabContent.eq(idx).addClass('active').stop().fadeIn(300);

        // 3) 헤더 텍스트 변경
        $('.header-wrap .text-box').stop().animate({ opacity: 0 }, 300, function () {
            $headerTitle.text(headerData[idx].title);
            $headerDesc.text(headerData[idx].desc);
            $(this).animate({ opacity: 1 }, 300);
        });
    }

    // GNB 메뉴 클릭 (해당 경로 버튼 on 유지)
    $('.gnb a').on('click', function (e) {
        const href = $(this).attr('href');
        // 파일명이 program.html이 아닐 수도 있으므로 포함 여부로 체크
        if (href.includes('#')) {
            const targetHash = href.split('#')[1];
            let targetIdx = -1;

            if (targetHash === "day1") targetIdx = 0;
            else if (targetHash === "day2") targetIdx = 1;
            else if (targetHash === "program") targetIdx = 2;

            if (targetIdx !== -1) {
                // 현재 페이지가 program.html이라면 바로 탭 전환
                if (location.pathname.includes('program.html')) {
                    e.preventDefault();
                    switchTab(targetIdx);
                    let offsetTop = $('.tab').offset().top - 100;
                    $('html, body').stop().animate({ scrollTop: offsetTop }, 300);
                }
            }
        }
    });

    // 하단 탭 버튼 클릭
    $tabBtn.on('click', function (e) {
        e.preventDefault();
        switchTab($(this).parent().index());
    });

    // 초기 실행 (새로고침 시 해당 탭 유지 + 최상단 시작)
    function init() {
        const hash = window.location.hash;
        let targetIdx = 0;

        if (hash === "#day1") targetIdx = 0;
        else if (hash === "#day2") targetIdx = 1;
        else if (hash === "#program") targetIdx = 2;

        // 버튼 on 상태와 콘텐츠를 즉시 설정
        switchTab(targetIdx);

        // 새로고침 시 무조건 맨 위로 (setTimeout으로 타이밍 조절)
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 15);
    }

    init();

    $(window).on('hashchange', function () {
        const hash = window.location.hash;
        let targetIdx = (hash === "#day1") ? 0 : (hash === "#day2") ? 1 : (hash === "#program") ? 2 : 0;
        switchTab(targetIdx);
    });


    // 헤더 shink
    $(window).on('scroll', function () {
        let scTop = $(window).scrollTop();

        if (scTop > 50) {
            $('#header').addClass('shrink');
            $('body').addClass('scrolled'); // 탭 메뉴 위치 제어용
        } else {
            $('#header').removeClass('shrink');
            $('body').removeClass('scrolled');
        }
    });
});