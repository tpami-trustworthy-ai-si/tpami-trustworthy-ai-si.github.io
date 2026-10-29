/** Public information displayed on the guest editor cards. */
export interface Editor {
  id: string;
  name: string;
  role: 'lead' | 'guest';
  affiliation: string;
  photo: string;
  homepage?: string;
}

export const editors: Editor[] = [
  {
    id: 'rama-chellappa',
    name: 'Rama Chellappa',
    role: 'lead',
    affiliation: 'Johns Hopkins University',
    photo: 'rama-chellappa.jpg',
    homepage: 'https://engineering.jhu.edu/faculty/rama-chellappa/',
  },
  {
    id: 'chun-pong-lau',
    name: 'Chun Pong Lau',
    role: 'guest',
    affiliation: 'City University of Hong Kong',
    photo: 'chun-pong-lau.jpeg',
    homepage: 'https://samuel930930.github.io/',
  },
  {
    id: 'zhongliang-guo',
    name: 'Zhongliang Guo',
    role: 'guest',
    affiliation: 'University of Aberdeen',
    photo: 'zhongliang-guo.png',
    homepage: 'https://robust-ai.me/',
  },
  {
    id: 'jiang-liu',
    name: 'Jiang Liu',
    role: 'guest',
    affiliation: 'Advanced Micro Devices, Inc. (AMD)',
    photo: 'jiang-liu.jpg',
    homepage: 'https://joellliu.github.io/',
  },
  {
    id: 'linlin-shen',
    name: 'Linlin Shen',
    role: 'guest',
    affiliation: 'Shenzhen University',
    photo: 'linlin-shen.jpeg',
    homepage: 'https://ai.szu.edu.cn/english/info/1102/6222.htm',
  },
  {
    id: 'zhiyuan-zha',
    name: 'Zhiyuan Zha',
    role: 'guest',
    affiliation: 'Jilin University',
    photo: 'zhiyuan-zha.jpg',
    homepage: 'https://zhazhiyuan.github.io/homepage/',
  },
  {
    id: 'yiming-li',
    name: 'Yiming Li',
    role: 'guest',
    affiliation: 'Nanyang Technological University',
    photo: 'yiming-li.png',
    homepage: 'https://liyiming.tech/',
  },
  {
    id: 'yi-yu',
    name: 'Yi Yu',
    role: 'guest',
    affiliation: 'Jilin University',
    photo: 'yi-yu.jpg',
    homepage: 'https://yuyi-sd.github.io/',
  },
];

export const editorPhotoDir = 'images/editors';
