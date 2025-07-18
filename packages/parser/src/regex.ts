const createRegex = (pattern: string): RegExp =>
  new RegExp(`(?<![^\\s\\[(_\\-.,])(${pattern})(?=[\\s\\)\\]_.\\-,]|$)`, 'i');

const createLanguageRegex = (pattern: string): RegExp =>
  createRegex(`${pattern}(?![ .\\-_]?sub(title)?s?)`);

export const PARSE_REGEX = {
  resolutions: {
    '2160p': createRegex(
      '(bd|hd|m)?(4k|2160(p|i)?)|u(ltra)?[ .\\-_]?hd|3840\s?x\s?(\d{4})'
    ),
    '1440p': createRegex(
      '(bd|hd|m)?(1440(p|i)?)|2k|w?q(uad)?[ .\\-_]?hd|2560\s?x(\d{4})'
    ),
    '1080p': createRegex(
      '(bd|hd|m)?(1080(p|i)?)|f(ull)?[ .\\-_]?hd|1920\s?x\s?(\d{3,4})'
    ),
    '720p': createRegex('(bd|hd|m)?(720(p|i)?)|hd|1280\s?x\s?(\d{3,4})'),
    '480p': createRegex('(bd|hd|m)?(480(p|i)?)|sd'),
  },
  qualities: {
    'BluRay REMUX':
      /((?<=remux.*)[ .\-_](blu[ .\-_]?ray))|((blu[ .\-_]?ray)[ .\-_](?=.*remux))|((?<![^\s\[(_\-.,])(bd|br|b|uhd)[ .\\-_]?remux(?=\s\)\]_.\-,]|$))/i,
    BluRay: createRegex(
      'blu[ .\\-_]?ray|((bd|br|b)[ .\\-_]?(rip|r)?)(?![ .\\-_]?remux)'
    ),
    'WEB-DL': createRegex('web[ .\\-_]?(dl)?(?![ .\\-_]?(DLRip|cam))'),
    WEBRip: createRegex('web[ .\\-_]?rip'),
    HDRip: createRegex('hd[ .\\-_]?rip|web[ .\\-_]?dl[ .\\-_]?rip'),
    'HC HD-Rip': createRegex('hc|hd[ .\\-_]?rip'),
    DVDRip: createRegex('dvd[ .\\-_]?(rip|mux|r|full|5|9)'),
    HDTV: createRegex(
      '(hd|pd)tv|tv[ .\\-_]?rip|hdtv[ .\\-_]?rip|dsr(ip)?|sat[ .\\-_]?rip'
    ),
    CAM: createRegex('cam|hdcam|cam[ .\\-_]?rip'),
    TS: createRegex('telesync|ts|hd[ .\\-_]?ts|pdvd|predvd(rip)?'),
    TC: createRegex('telecine|tc|hd[ .\\-_]?tc'),
    SCR: createRegex('((dvd|bd|web|hd)?[ .\\-_]?)?(scr(eener)?)'),
  },
  visualTags: {
    '10bit': createRegex('10[ .\\-_]?bit'),
    'HDR10+': createRegex('hdr[ .\\-_]?10[ .\\-_]?(plus|[+])'),
    HDR10: createRegex('hdr[ .\\-_]?10(?![ .\\-_]?(?:\\+|plus))'),
    HDR: createRegex('hdr(?![ .\\-_]?10)(?![ .\\-_]?(?:\\+|plus))'),
    DV: createRegex('do?(lby)?[ .\\-_]?vi?(sion)?(?:[ .\\-_]?atmos)?|dv'),
    '3D': createRegex('(bd)?(3|three)[ .\\-_]?(d(imension)?(al)?)'),
    IMAX: createRegex('imax'),
    AI: createRegex('ai[ .\\-_]?(upscale|enhanced|remaster)?'),
    SDR: createRegex('sdr'),
  },
  audioTags: {
    Atmos: createRegex('atmos'),
    'DD+': createRegex(
      '(d(olby)?[ .\\-_]?d(igital)?[ .\\-_]?(p(lus)?|\\+)(?:[ .\\-_]?(5[ .\\-_]?1|7[ .\\-_]?1))?)|e[ .\\-_]?ac[ .\\-_]?3'
    ),
    DD: createRegex(
      '(d(olby)?[ .\\-_]?d(igital)?(?:[ .\\-_]?(5[ .\\-_]?1|7[ .\\-_]?1))?)|(?<!e[ .\\-_]?)ac[ .\\-_]?3'
    ),
    'DTS-HD MA': createRegex('dts[ .\\-_]?hd[ .\\-_]?ma'),
    'DTS-HD': createRegex('dts[ .\\-_]?hd(?![ .\\-_]?ma)'),
    DTS: createRegex('dts(?![ .\\-_]?hd[ .\\-_]?ma|[ .\\-_]?hd)'),
    TrueHD: createRegex('true[ .\\-_]?hd'),
    5.1: createRegex(
      '(d(olby)?[ .\\-_]?d(igital)?[ .\\-_]?(p(lus)?|\\+)?)?5[ .\\-_]?1(ch)?'
    ),
    7.1: createRegex(
      '(d(olby)?[ .\\-_]?d(igital)?[ .\\-_]?(p(lus)?|\\+)?)?7[ .\\-_]?1(ch)?'
    ),
    AAC: createRegex('q?aac(?:[ .\\-_]?2)?'),
    FLAC: createRegex('flac(?:[ .\\-_]?(lossless|2\\.0|x[2-4]))?'),
  },
  encodes: {
    HEVC: createRegex('hevc[ .\\-_]?(10)?|[xh][ .\\-_]?265'),
    AVC: createRegex('avc|[xh][ .\\-_]?264'),
    AV1: createRegex('av1'),
    Xvid: createRegex('xvid'),
    DivX: createRegex('divx|dvix'),
    'H-OU': createRegex('h?(alf)?[ .\\-_]?(ou|over[ .\\-_]?under)'),
    'H-SBS': createRegex('h?(alf)?[ .\\-_]?(sbs|side[ .\\-_]?by[ .\\-_]?side)'),
  },
  languages: {
    Remux_T1: createLanguageRegex('Remux.*(3L|BiZKiT|BLURANiUM|CiNEPHiLES|FraMeSToR|PmP|ZQ)|-BMF|-WiLDCAT'),
    Remux_T2: createLanguageRegex('Remux.*(Flights|NCmt|playBD|SiCFoI|SURFINBIRD|TEPES|decibeL|EPSiLON|HiFi|KRaLiMaRKo|PTer|TRiToN)'),
    Remux_T3: createLanguageRegex('Remux.*(ATELiER|iFT|NTb|PTP|SumVision|TOA)'),
    Bluray_T1: createLanguageRegex('Blu[-_]?Ray.*(BBQ|c0kE|Chotab|CRiSC|CtrlHD|Dariush|decibeL|D-Z0N3|DON|EbP|EDPH|Geek|LolHD|MainFrame|NCmt|NTb|PTer|TayTO|TDD|TnP|VietHD|ZoroSenpai|W4NK3R|ZQ)|-BMF'),
    Bluray_T2: createLanguageRegex('Blu[-_]?Ray.*(EA|HiDt|HiSD|HQMUX|iFT|QOQ|SA89|sbR)'),
    Bluray_T3: createLanguageRegex('Blu[-_]?Ray.*(ATELiER|BHDStudio|hallowed|HiFi|HONE|LoRD|SPHD|WEBDV|playHD)'),
    Web_T1: createLanguageRegex('WEB[-_.]?(?:DL|RIP).*(ABBIE|AJP69|APEX|PAXA|PEXA|XEPA|BLUTONiUM|CasStudio|CMRG|CRFW|CRUD|CtrlHD|FLUX|GNOME|HONE|KiNGS|Kitsune|monkee|NOSiViD|NTb|NTG|QOQ|RTN|SiC|TEPES|T6D|TOMMY|ViSUM)'),
    Web_T2: createLanguageRegex('WEB[-_.]?(?:DL|RIP).*(3cTWeB|BTW|Cinefeel|CiT|Coo7|dB|DEEP|END|ETHiCS|FC|Flights|iJP|iKA|iT00NZ|JETIX|KHN|KiMCHI|LAZY|MiU|MZABI|NPMS|NYH|orbitron|PHOENiX|playWEB|PSiG|ROCCaT|RTFM|SA89|SbR|SDCC|SIGMA|SMURF|SPiRiT|TVSmash|WELP|XEBEC|4KBEC|CEBEX)'),
    Web_T3: createLanguageRegex('WEB[-_.]?(?:DL|RIP).*(BYNDR|DRACULA|GNOMiSSiON|NINJACENTRAL|ROCCaT|SiGMA|SLiGNOME|SwAgLaNdEr|T4H|ViSiON)'),
    Web_Scene: createLanguageRegex('WEB[-_.]?(?:DL|RIP).*(DEFLATE|INFLATE)'),
    BAD: createLanguageRegex('SWTYBLZ|TeeWee|Will1869|24xHD|41RGB|4K4U|AROMA|aXXo|AZAZE|BARC0DE|BAUCKLEY|BdC|beAst|BTM|C1NEM4|C4K|CDDHD|CHAOS|CHD|CiNE|COLLECTiVE|CREATiVE24|CrEwSaDe|CTFOH|d3g|DDR|DNL|EPiC|EuReKA|FaNGDiNG0|Feranki1980|FGT|FMD|FRDS|FZHD|GalaxyRG|GHD|GPTHD|HDS|HDTime|HDWinG|iNTENSO|iPlanet|iVy|jennaortega|JFF|KC|KiNGDOM|KIRA|L0SERNIGHT|LAMA|Leffe|Liber8|LiGaS|LUCY|MarkII|MeGusta|mHD|mSD|MTeam|MySiLU|NhaNc3|nHD|nikt0|nSD|OFT|Pahe|PATOMiEL|PRODJi|PSA|PTNK|RARBG|RDN|Rifftrax|RU4HD|SANTi|Scene|ShieldBearer|STUTTERSHIT|SUNSCREEN|TBS|TEKNO3D|Tigole|TIKO|VISIONPLUSHDR|WAF|WiKi|x0r|YIFY|YTS|Zeus'),
    Multi: createLanguageRegex('multi'),
    'Dual Audio': createLanguageRegex(
      'dual[ .\\-_]?(audio|lang(uage)?|flac|ac3|aac2?)'
    ),
    Dubbed: createLanguageRegex('dub(bed)?'),
    English: createLanguageRegex('english|eng'),
    Japanese: createLanguageRegex('japanese|jap'),
    Chinese: createLanguageRegex('chinese|chi'),
    Russian: createLanguageRegex('russian|rus'),
    Spanish: createLanguageRegex('spanish|spa|esp'),
    French: createLanguageRegex('french|fra'),
    German: createLanguageRegex('german|ger'),
    Italian: createLanguageRegex('italian|ita'),
    Korean: createLanguageRegex('korean|kor'),
    Hindi: createLanguageRegex('hindi|hin'),
    Thai: createLanguageRegex('thai|tha'),
    Vietnamese: createLanguageRegex('vietnamese|vie'),
    Indonesian: createLanguageRegex('indonesian|ind'),
    Polish: createLanguageRegex('polish|pol'),
    Dutch: createLanguageRegex('dutch|dut|nl|nederlands|flemish|vlaams|gesproken'),
    Danish: createLanguageRegex('danish|dan'),
    Finnish: createLanguageRegex('finnish|fin'),
    Swedish: createLanguageRegex('swedish|swe'),
    Norwegian: createLanguageRegex('norwegian|nor'),
    Latino: createLanguageRegex('latino|lat'),
  },
  releaseGroup:
    /- ?(?!\d+$|S\d+|\d+x|ep?\d+|[^[]+]$)([^\-. []+[^\-. [)\]\d][^\-. [)\]]*)(?:\[[\w.-]+])?(?=\.\w{2,4}$|$)/i,
};
