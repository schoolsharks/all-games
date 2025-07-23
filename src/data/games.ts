export interface Game {
  id: number;
  name: string;
  playerLink: string;
  adminLink: string;
  adminPin: string;
  adminPasscode: string;
}

// Sample games data - you can modify this or fetch from an API
export const games: Game[] = [
  {
    id: 1,
    name: "miras-homeownership",
    playerLink: "https://miras-homeownership.wgab.world/home",
    adminLink: "https://miras-homeownership.wgab.world/admin",
    adminPin: "1234",
    adminPasscode: "chess123"
  },
  {
    id: 2,
    name: "skill-quest",
    playerLink: "https://skillquest.wgab.world/",
    adminLink: "https://skillquest.wgab.world/admin",
    adminPin: "5678",
    adminPasscode: "quiz456"
  },
  {
    id: 3,
    name: "sniff-and-tail-server",
    playerLink: "https://sniffandtail.wgab.world",
    adminLink: "https://sniffandtail.wgab.world/admin",
    adminPin: "9012",
    adminPasscode: "word789"
  },
  {
    id: 4,
    name: "zero-to-hero",
    playerLink: "https://zerotohero.wgab.world/",
    adminLink: "https://zerotohero.wgab.world/admin",
    adminPin: "3456",
    adminPasscode: "memory321"
  },
  {
    id: 5,
    name: "miras-choices",
    playerLink: "https://miraschoices.wgab.world/",
    adminLink: "https://miraschoices.wgab.world/admin",
    adminPin: "7890",
    adminPasscode: "number654"
  },
  {
    id: 6,
    name: "game-of-choises",
    playerLink: "https://gameofchoises.wgab.world/",
    adminLink: "https://gameofchoises.wgab.world/admin",
    adminPin: "1357",
    adminPasscode: "color987"
  },
  {
    id: 7,
    name: "data-guard",
    playerLink: "https://dataguard.wgab.world/",
    adminLink: "https://dataguard.wgab.world/admin",
    adminPin: "2468",
    adminPasscode: "color987"
  },
  {
    id: 8,
    name: "balance-master",
    playerLink: "https://balancemaster.wgab.world/",
    adminLink: "https://balancemaster.wgab.world/admin",
    adminPin: "1122",
    adminPasscode: "color987"
  },
  {
    id: 9,
    name: "aspire-for-her",
    playerLink: "https://sheexports.afh.wgab.world/",
    adminLink: "https://sheexports.afh.wgab.world/admin",
    adminPin: "3344",
    adminPasscode: "color987"
  },
  {
    id: 10,
    name: "word-puzzle",
    playerLink: "https://wordpuzzle.wgab.world/",
    adminLink: "https://wordpuzzle.wgab.world/admin",
    adminPin: "5566",
    adminPasscode: "color987"
  },
  {
    id: 11,
    name: "sherry-chat-game",
    playerLink: "https://chatgame.wgab.world",
    adminLink: "https://chatgame.wgab.world/admin",
    adminPin: "7788",
    adminPasscode: "color987"
  },
  {
    id: 12,
    name: "aspire-for-her-staging",
    playerLink: "https://staging-sheexports.afh.wgab.world/",
    adminLink: "https://staging-sheexports.afh.wgab.world/admin",
    adminPin: "9900",
    adminPasscode: "color987"
  },
  {
    id: 13,
    name: "mindsmith",
    playerLink: "https://mindsmith.wgab.world/user/onboarding/",
    adminLink: "https://mindsmith.wgab.world/user/onboarding/admin",
    adminPin: "1111",
    adminPasscode: "color987"
  },
  {
    id: 14,
    name: "quickk",
    playerLink: "https://staging-quickk.wgab.world/",
    adminLink: "https://staging-quickk.wgab.world/admin",
    adminPin: "2222",
    adminPasscode: "color987"
  },
  {
    id: 15,
    name: "upsc-gurus",
    playerLink: "https://app.upscgurus.in",
    adminLink: "https://app.upscgurus.in/admin",
    adminPin: "3333",
    adminPasscode: "color987"
  }
];
