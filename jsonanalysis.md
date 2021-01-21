- audit
  - 각 스코어들의 체크리스트. 표시되지 않은 다른 속성도 많다. 필요에 따라 커스터마이징 가능
    - Performance의 metrics값도 포함되어있다.
      - "speed-index"
      - "total-blocking-time"
      - "cumulative-layout-shift" 등등
  - "screenshot-thumbnails": Performance에서 쭈루룩 캡쳐한 것. 300ms 간격인듯
  - audit에 모든 내용이 다 들어가있다.
- categories.perfomance.score가 리포트에 최종 표시되는 스코어값
- categoryGroup: 각 카테고리 하위 항목들

- 중요 지표

  - nspeed

    - Rum Metrics
      - [ ] TTFB: the first byte tim 기본페이지의 첫 바이트가 수신될 때까지의 시간
      - [lh] FCP(first contentful paint)
      - [ ] DOM interactive
      - [ ] load time: 윈도우 로드 이벤트가 시작된 시간
      - [lh] TTI(time to interactive)
    - Web Vitals

      - [lh] LCP(largest contentful paint)
      - [lh] layoutshift: cumulative-layout-shift

      - [wpt] first byte time
      - [wpt] keep alive enable
      - [wpt] compress image
      - [wpt] cache static content
      - [ ] combine js and css files
      - [ ] effective use of CDN
      - [ ] no cookies on static content
      - [lh] minify javascript: unminified-javascript, unused-javascript, unused-css-rules,unminified-css
      - [ ] Disable E-tags
      - [ ] progressive JPEGs

    - Page Metrics
      - [lh] Byte: total-byte-weight인가?
      - [lh] request: server-response-time || network-requests
    - [wpt]Content Breakdown

- 꺼내올 데이터
  - Speed Index: audits.speed-index
  - Total Blocking time: audits.total-blocking-time
  - FCP: audits.first-contentful-paint.numericValue
  - TTI: audits.interative.numericValue
  - LCP: audits.largest-contentful-paint.numericValue
  - cumulative-layout-shift: audits.cumulative-layout-shift ???
  - unminified-javascript: audits.unminified-javascript.numericValue
  - server-response-time: audits.numericValue.numericValue
  - score
    - performance: categories.performance.score
    - accessibility: categories.accessibility.score
    - best-practices: categories.best-practices.score
    - seo: categories.seo.score
