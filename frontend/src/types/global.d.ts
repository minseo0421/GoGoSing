// global.d.ts
declare namespace YT {
  class Player {
    constructor(container: Element | string, options: PlayerOptions);
    playVideo(): any;
    pauseVideo(): any;
    // 필요한 기타 메서드들도 여기에 추가할 수 있습니다.
  }
}
// 아래 코드는 일반적으로 유튜브 영상을 가져오는 것, 우리는 음악 만 재생할 것이기에
// YT 타입 에 대한 정의, 그리고 iframe이 가진 Play, Pause에 대한 타입의 정의만 필요해서 player Option이 필요없었다.

// 이후 프로젝트에 재사용 하기 위해 남겨놓는 예시 코드
// declare namespace YT {
//     interface PlayerOptions {
//       height?: string | number;
//       width?: string | number;
//       videoId?: string;
//       playerVars?: {
//         autoplay?: 0 | 1;
//         // ... 다른 playerVars 옵션도 여기에 추가할 수 있습니다.
//       };
//       events?: {
//         onReady?: (event: any) => void;
//         onStateChange?: (event: any) => void;
//         // ... 다른 이벤트도 여기에 추가할 수 있습니다.
//       };
//     }

//     class Player {
//       constructor(container: string | HTMLElement, options: PlayerOptions);
//       playVideo(): void;
//       pauseVideo(): void;
//       // ... YT.Player의 다른 메서드와 속성도 여기에 추가할 수 있습니다.
//     }
//   }
