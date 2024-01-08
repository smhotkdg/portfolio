
<template>

  <div style="margin-bottom: 80px;">
    <h1>안녕하세요!</h1>
    <div v-show="false">
      <ProjectsList v-bind:projects="projects" />
      <ProjectsListOther v-bind:otherProjects="otherProjects" />
    </div>  
    <div>
    <p>{{ projects[1].name }}</p>
    <p>{{ otherProjects[1].name }}</p>
    </div>
    
    <div class="paragraph">
      <div>
        다양한 게임 프로젝트에서 주로 프로그래밍을 다루며<br>
        <p style='line-height:1.5'>풍부한 경험을 쌓은 <strong>게임 프로그래머</strong>입니다.<br></p>
        <p style='line-height:1.5'>항상 효과적이고 체계적인 코드 작성에 관심을 가지며, <br></p>
        <p style='line-height:1.5'>새로운 도전을 즐기고자 끊임없이 노력하고 있습니다. <br></p>
        <p style='line-height:1.5'>프로그래밍 작업에 있어서는 코드의 가독성과 유지보수성을 고려하여 신경을 쓰며, <br></p>
        <p style='line-height:1.5'>팀원들과의 원활한 소통과 협업을 중요시합니다. <br></p>
        <p style='line-height:1.5'>기존의 능력을 더욱 발전시키고 새로운 기술에 대한 학습에 열려있으며,<br></p>
        <p style='line-height:1.5'>창의적이고 도전적인 프로젝트에 기여하고 싶어합니다.<br></p>
      </div>


      <div style="margin-top: 40px;"><a href="mailto:cozy0614@gmail.com">cozy0614@gmail.com</a> or <router-link
          to="/contact">through here</router-link>.</div>
    </div>

    <div class="photo">
      <img src="img/avatar.jpg" alt="Avatar of Seunghun" />
    </div>

    
    <div style="clear:both"></div>
    <div class="experience" id="experience">
      <div class="container">
        <header class="section-header text-center wow zoomIn" data-wow-delay="0.1s">
          <div class="title">실무 경험</div>
        </header>        
        <div class="timeline">
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
            
              <div class="responsive-image-container">                         
              
                <img class="responsive-image" src="img/Logo/galaxy_tale.png" @click="showDetails(projects[0])"/>             
              
              </div>
              <div class="timeline-date">2023.04 ~ 2024.01</div>
              <div class="timeline-title" @click="showDetails(projects[0])">갤럭시 테일 : 고양이 로그라이크 RPG</div>
              <h4>Hoit Studio</h4>
              <p>
                고양이 캡틴과 로그라이크 우주를 탐험하며 모험의 즐거움을 경험하세요
              </p>
              <br>
              <p>
                <i class="fa fa-google fa-lg fa-fw"></i>
                <a href="https://play.google.com/store/apps/details?id=com.hoitstudio.tapzombie" target="_blank">구글 스토어
                  링크</a>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/MeowMeowPunch" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/9316blb5v6I" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="timeline-date">2023.01</div>
              <div class="timeline-title">퍼블리싱 계약</div>
              <h4>Hoit Studio</h4>
              <p>
                중국 Pujia8 Studio "죽음의 바다" 퍼블리싱 계약
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/tab-zombie.png" @click="showDetails(projects[1])"/>
              </div>             
              <div class="timeline-date">2022.11 - 2022.12</div>
              <div class="timeline-title" @click="showDetails(projects[1])">탭 좀비!</div>
              <h4>Hoit Studio</h4>
              <p>
                좀비들을 제거하면서 오래 생존하세요!
              <p>
                간단한 컨트롤의 캐쥬얼 아케이드 플랫포머 액션!
              </p>
              <br>
              <p>
                <i class="fa fa-google fa-lg fa-fw"></i>
                <a href="https://play.google.com/store/apps/details?id=com.hoitstudio.tapzombie" target="_blank">구글 스토어
                  링크</a>
              </p>
              <p>
                <i class="fa fa-apple fa-lg fa-fw"></i>
                <a href="https://apps.apple.com/kr/app/%ED%83%AD-%EC%A2%80%EB%B9%84/id6444820070" target="_blank">앱스토어
                  링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/TabZombie" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/YArSjMc605w" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/bb.jpg" />
              </div>             
              <div class="timeline-date">2022.11</div>
              <div class="timeline-title">버닝비버 2022</div>
              <h4>Hoit Studio</h4>
              <p>
                "죽음의 바다" 모바일 부분 전시
              </p>
              <br>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://v.daum.net/v/20221217060000053" target="_blank">관련 기사_1</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://page.onstove.com/indie/global/view/9128050" target="_blank">관련 기사_2</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://dailian.co.kr/news/view/1184342" target="_blank">관련 기사_3</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="http://www.goodkyung.com/news/articleView.html?idxno=195655" target="_blank">관련 기사_4</a>
              </p>
            </div>
          </div>

          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/gg.jpg" />
              </div>       
              <div class="timeline-date">2022.11</div>
              <div class="timeline-title">Google indie game accelerator 2022</div>
              <h4>Hoit Studio</h4>
              <p>
                구글 인디게임 액셀러레이터 선정
              </p>
              <br>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://dailian.co.kr/news/view/1183183" target="_blank">관련 기사_1</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://www.gamejob.co.kr/Community/news/detail?Comm_Stat=11&Sub_Comm_Stat=0&idx=94397&mode=V"
                  target="_blank">관련 기사_2</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://www.metroseoul.co.kr/article/20221213500485" target="_blank">관련 기사_3</a>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/styx.png" />
              </div>
              <div class="timeline-date">2022.01 - 2020.10</div>
              <div class="timeline-title">죽음의 바다</div>
              <h4>Hoit Studio</h4>
              <p>
                방탈출 퍼즐 어드벤쳐 미스테리 스토리 게임
              <p>
                방탈출 퍼즐과 스토리가 결합된 스릴러 어드벤처!
              <p>
                당신의 선택으로 결정되는 멀티 엔딩!
              </p>
              <br>
              <p>
                <i class="fa fa-google fa-lg fa-fw"></i>
                <a href="https://play.google.com/store/apps/details?id=com.hoitstudio.styx" target="_blank">구글 스토어 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-apple fa-lg fa-fw"></i>
                <a href="https://apps.apple.com/kr/app/%EC%A3%BD%EC%9D%8C%EC%9D%98-%EB%B0%94%EB%8B%A4/id1602798571"
                  target="_blank">앱스토어 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/Styx" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://www.youtube.com/watch?v=ZrUee8Hx-Bw" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/bs.jpg" />
              </div>
              <div class="timeline-date">2022.09</div>
              <div class="timeline-title">부산 인디 커넥트 페스티벌 2022</div>
              <h4>Hoit Studio</h4>
              <p>
                "죽음의 바다" 모바일 부분 전시
              </p>
              <br>
              <p>
                <i class="fa fa-link fa-lg fa-fw"></i>
                <a href="https://bicfest.org/festival03?_token=HhUNopuPP9BeWqfIivpY6inEnFrjmGLXKqTsq1bt&showYear%5B0%5D=2022&hardware%5B0%5D=MOBILE&page=4"
                  target="_blank">관련 링크</a>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://zdnet.co.kr/view/?no=20221114123016" target="_blank">관련 기사</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="timeline-date">2022.08</div>
              <div class="timeline-title">네오위즈, '방구석 인디 게임쇼 2022'</div>
              <h4>Hoit Studio</h4>
              <p>
                장려상 부문 수상
              </p>
              <p>
                <i class="fa fa-newspaper-o fa-lg fa-fw"></i>
                <a href="https://zdnet.co.kr/view/?no=20220927095749" target="_blank">관련 기사</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/heroesstory.png" />
              </div>
              <div class="timeline-date">2021.02 ~ 2021.07</div>
              <div class="timeline-title">히어로즈 스토리</div>
              <h4>Hoit Studio</h4>
              <p>
                다양한 히어로를 획득하세요!
              <p>
                히어로들을 모아 전장에서 승리하세요!
              </p>
              <br>
              <p>
                <i class="fa fa-apple fa-lg fa-fw"></i>
                <a href="https://apps.apple.com/kr/app/%ED%9E%88%EC%96%B4%EB%A1%9C%EC%A6%88-%EC%8A%A4%ED%86%A0%EB%A6%AC/id1544702806"
                  target="_blank">앱스토어 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/HeroesStory" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtu.be/tc_kgNIOmvU" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/road.png" />
              </div>
              <div class="timeline-date">2020.10 ~ 2021.03</div>
              <div class="timeline-title">인공지능 도로포장균열 분석 및 개발</div>
              <h4>Hoit Studio</h4>
              <p>
                고속도로 및 일반도로의 균열을 분석하는
              <p>
                알고리즘 및 인공지능연구 및 개발
              </p>
              <br>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/crack" target="_blank">github 링크</a>
              <p>
              </p>

            </div>
          </div>

          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/reaper.png" />
              </div>
              <div class="timeline-date">2020.04 ~ 2020.11</div>
              <div class="timeline-title">리퍼 영혼약탈자</div>
              <h4>Hoit Studio</h4>
              <p>
                방치형 RPG
              </p>
              <p>
                <i class="fa fa-apple fa-lg fa-fw"></i>
                <a href="https://apps.apple.com/us/app/reaper-soul-stealer/id1514068745" target="_blank">앱스토어 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/Reaper" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/hGN68Pzm6Bg" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/swipedrive.png" />
              </div>
              <div class="timeline-date">2020.01 ~ 2020.02</div>
              <div class="timeline-title">Swipe Drive</div>
              <h4>Hoit Studio</h4>
              <p>
                간단한 스와이프로 자동차를 움직여
              <p>
                퍼즐을 풀어보세요!
              </p>
              <br>

              <p>
                <i class="fa fa-apple fa-lg fa-fw"></i>
                <a href="https://apps.apple.com/us/app/swipedrive/id1507873127" target="_blank">앱스토어 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/swipedrive" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/3SIpds8rqnQ" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/merge.png" />
              </div>
              <div class="timeline-date">2019.09 ~ 2019.10</div>
              <div class="timeline-title">머지마인:골드러쉬</div>
              <h4>Hoit Studio</h4>
              <p>
                방치형 RPG
              </p>
              <p>
                <i class="fa fa-google fa-lg fa-fw"></i>
                <a href="https://play.google.com/store/apps/details?id=com.hoitstudio.mergemine" target="_blank">구글 스토어
                  링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/MergeMine" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/BbAD0mnmKT0" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/mrmine.png" />
              </div>
              <div class="timeline-date">2019.04 ~ 2019.07</div>
              <div class="timeline-title">Mr.Mine</div>
              <h4>Hoit Studio</h4>
              <p>
                100가지가 넘는 다양한 광부를 고용하고 광산을 관리하세요!
              
              <br>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/mrmine" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/twQXCsiTXCs" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/jump.png" />
              </div>
              <div class="timeline-date">2019.02 ~ 2019.2</div>
              <div class="timeline-title">HoitHoitJump</div>
              <h4>Hoit Studio</h4>
              <p>
                하이퍼 캐쥬얼 게임
              </p>
              <p>
                <i class="fa fa-google fa-lg fa-fw"></i>
                <a href="https://play.google.com/store/apps/details?id=com.hoitstudio.hoithoitjump" target="_blank">구글 스토어
                  링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/HoitHoitJump" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/SR6UKQEIpGg" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/Hop.png" />
              </div>
              <div class="timeline-date">2019.01 ~ 2019.01</div>
              <div class="timeline-title">HoitHoitHop</div>
              <h4>Hoit Studio</h4>
              <p>
                하이퍼 캐쥬얼 게임
              </p>
              <br>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/HoitHoitHop" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtube.com/shorts/vA-t3Ky9ZRw" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/zombiewar.png" />
              </div>
              <div class="timeline-date">2018.10 ~ 2012.12</div>
              <div class="timeline-title">좀비전쟁-백신마스터</div>
              <h4>Hoit Studio</h4>
              <p>
                백신을 생산하여 좀비에 감염된 사람들을 치료하고
              <p>
                더 많은 감염자가 나타나지 않도록 대비를 해야 합니다.
              </p>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/zombiewar" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtu.be/z3gZxYEoiew" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/dig.png" />
              </div>
              <div class="timeline-date">2018.01 ~ 2018.08</div>
              <div class="timeline-title">디그덕 :광산 경영 타이쿤</div>
              <h4>Hoit Studio</h4>
              <p>
                전세계 500만뷰 이상의 웹게임
              <p>
                Mr.Mine의 공식 모바일 버전
              </p>
              <br>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/DigDuk" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
                <i class="fa fa-youtube fa-lg fa-fw"></i>
                <a href="https://youtu.be/inc_IpB1S1Q" target="_blank">유튜브 링크</a>
              <p>
              </p>
            </div>
          </div>
          <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/license_plate.png" />
              </div>
              <div class="timeline-date">2015.07 ~ 2015.11</div>
              <div class="timeline-title">실시간 번호판 검출</div>
              <h4>대학원</h4>
              <p>
                실시간 번호판 검출 알고리즘 연구 및 개발
              </p>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/license_plate" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
              <i class="fa fa-youtube fa-lg fa-fw"></i>
              <a href="https://www.youtube.com/watch?v=M3cXLBBN7qI" target="_blank">유튜브 링크</a>
            <p>
            </p>
          </div>
        </div>
        <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
          <div class="timeline-text">
            <div class="responsive-image-container">
              <img class="responsive-image" src="img/Logo/RoadDetection.png" />
            </div>
            <div class="timeline-date">2014.04 ~ 2015.11</div>
            <div class="timeline-title">실시간 도로검출 알고리즘 연구 및 개발</div>
            <h4>대학원</h4>
            <p>
              고속도로 및 국도의 도로 검출 알고리즘 연구 및 개발
            <p>
              CUDA를 이용한 고속화
            </p>

            <p>
              <i class="fa fa-github fa-lg fa-fw"></i>
              <a href="https://github.com/smhotkdg/roaddtection" target="_blank">github 링크</a>
            <p>
            </p>
            <p>
              <i class="fa fa-youtube fa-lg fa-fw"></i>
              <a href="https://www.youtube.com/watch?v=h2cEX1Ey50I&t=2s" target="_blank">유튜브 링크</a>
            <p>
            </p>
          </div>
        </div>
        <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/blind.png" />
              </div>
              <div class="timeline-date">2013.05 ~ 2013.11</div>
              <div class="timeline-title">사각지대 차량 검출</div>
              <h4>대학원</h4>
              <p>                
                실시간 사각지대 차량 검출 알고리즘 연구 및 개발
              </p>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/BlindSpotDetection" target="_blank">github 링크</a>
              <p>
              </p>
              <p>
              <i class="fa fa-youtube fa-lg fa-fw"></i>
              <a href="https://youtu.be/3Wd89kLV-8c" target="_blank">유튜브 링크</a>
            <p>
            </p>
          </div>
        </div>
        <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
          <div class="timeline-text">
            <div class="responsive-image-container">
              <img class="responsive-image" src="img/Logo/vlc.png" />
            </div>
            <div class="timeline-date">2013.03 ~ 2015.01</div>
            <div class="timeline-title">근거리 무선 광 통신 융합 기술</div>
            <h4>대학원</h4>
            <p>
              H.264/AVC를 기반으로 한 encoder 개발.<p>
              MPEG 4를 기반으로 한 decoder 개발.<p>
              실시간 스트림(Full HD) 전송.
            </p>

            <p>
              <i class="fa fa-github fa-lg fa-fw"></i>
              <a href="https://github.com/smhotkdg/VLC_simulator" target="_blank">github 링크</a>
            <p>
            </p>
            
          </div>
        </div>



        <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/crr.png" />
              </div>
              <div class="timeline-date">2012.09 ~ 2012.10</div>
              <div class="timeline-title">움직임 감지와 얼굴 DNA 검출을 통한 CCTV 개선 프로그램</div>
              <h4>대학교</h4>
              <p>
                현재 보급화된 감시 프로그램에 단점 보안을 위한 새로운 CCTV 프로그램 개발.<p>
                 - 무분별한 녹화(대용량 데이터 필요) <p>
                 - 사건 발생 후 대처 부족
              </p>
            
              <p>
              <i class="fa fa-external-link fa-lg fa-fw"></i>
              <a href="https://blog.naver.com/smhotkdg/60163653224" target="_blank">블로그 링크</a>
              <p>
              <i class="fa fa-youtube fa-lg fa-fw"></i>
              <a href="https://www.youtube.com/watch?v=Y0-1hR0Sle0" target="_blank">유튜브 링크</a>
            <p>
            </p>
          </div>
          </div>

          <div class="timeline-item right wow slideInRight" data-wow-delay="0.1s">
          <div class="timeline-text">
            <div class="responsive-image-container">
              <img class="responsive-image" src="img/Logo/code.png" />
            </div>
            <div class="timeline-date">2012.10</div>
            <div class="timeline-title">The Davinci Code</div>
            <h4>대학교</h4>
            <p>
              원본 이미지에 텍스트 파일을 추가하는 Davinci Code 프로그램 이다. 
            </p>

            <p>
              <i class="fa fa-github fa-lg fa-fw"></i>
              <a href="https://github.com/smhotkdg/TheDavinciCode" target="_blank">github 링크</a>
            <p>
              <p>
              <i class="fa fa-external-link fa-lg fa-fw"></i>
              <a href="https://blog.naver.com/smhotkdg/60174556791" target="_blank">블로그 링크</a>
            <p>
            </p>
            
          </div>
        </div>
        <div class="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
            <div class="timeline-text">
              <div class="responsive-image-container">
                <img class="responsive-image" src="img/Logo/adas.png" />
              </div>
              <div class="timeline-date">2011.09 ~ 2011.12</div>
              <div class="timeline-title">운전자 정보 극대화를 위한 Augmented Driving System(ADS) 개발</div>
              <h4>대학교</h4>
              <p>
                전방 차량 검출을 통한 사고예방<p>
                표지판 검출을 통한 정보제공<p>
                제스쳐 인식을 통한 시스템 제어<p>
                차선 검출을 통한 운전자 안전제공
              </p>

              <p>
                <i class="fa fa-github fa-lg fa-fw"></i>
                <a href="https://github.com/smhotkdg/ADAS" target="_blank">github 링크</a>
              <p>
              </p>
               <p>
              <i class="fa fa-external-link fa-lg fa-fw"></i>
              <a href="https://blog.naver.com/smhotkdg/60163657211" target="_blank">블로그 링크</a>
              <p>
              <p>
              <i class="fa fa-youtube fa-lg fa-fw"></i>
              <a href="https://youtu.be/3Wd89kLV-8c" target="_blank">유튜브 링크</a>
            <p>
            </p>
          </div>
          </div>



      </div>
    </div>
  </div>

<ProjectDetailsOverlay
        v-on:close="showPopup = false"
        :visible="showPopup"
        :title="popupTitle"
        :htmlContent="popupContent"
        :color="popupColor"
      />
      
</div></template>
import { EventBus } from '@/path/to/EventBus.js';

// ...

closePopup: function () {
  // 팝업이 닫힐 때 이전의 스크롤 위치로 복구
  window.scrollTo(0, this.previousScrollPosition);
  this.showPopup = false;

  // closePopup 이벤트를 발행
  EventBus.$emit('closePopupEvent');

<script lang="ts">
import Vue from "vue";
import ProjectDetailsOverlay from "@/components/ProjectDetailsOverlay.vue";
import ProjectsList from "@/components/ProjectsList.vue";
import ProjectsListOther from "@/components/ProjectsList.vue";
import gameProjectsData from "@/data/GameProjectsData.ts";
import ProjectData from "@/data/ProjectData.ts";
import OtherProjectsData from "@/data/OtherProjectsData.ts";


export default Vue.extend({
  name: "GameProjects",
  components: {
    ProjectsList,    
    ProjectsListOther,
    ProjectDetailsOverlay, // 이 부분이 추가되었습니다.
  },
  data: function () {
    return {
      projects: gameProjectsData,
      otherProjects: OtherProjectsData,
      showPopup: false,
      popupTitle: "",
      popupColor: "",
      popupContent: "",

    };
  },
  methods: {
    showDetails: function (item: ProjectData) {
      
      this.popupTitle = item.name;
      this.popupColor = item.accentColor;
      this.popupContent = item.htmlDescription;
      this.showPopup = true;      
    },
   
  },
});
</script>

<style scoped>.paragraph {
  max-width: 700px;
  margin-bottom: 20px;
}

.photo {
  margin-top: 50px;
  text-align: center;
}

@media only screen and (min-width: 620px) {
  .paragraph {
    float: left;
  }

  .photo {
    float: left;
    padding: 10px;
    padding-left: 80px;
  }

  
}</style>

