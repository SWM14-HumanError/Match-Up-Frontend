import {
  IProjectList,
  IProjectDetail,
  IEditProjectInfo, IMainMentor, IMainFeedsList, IUserCardList, IMyPageDetail
} from '../constant/interfaces.ts';
import stackList from '../constant/stackList.ts';

export const projects: IProjectList = {
  teamSearchResponseList:[
    {
      id: 1,
      title: 'Project 1',
      description: 'This is project 1',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'This is project 2',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인2',
      leaderLevel: 1,
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'This is project 3',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'This is project 4',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 5,
      title: 'Project 5',
      description: 'This is project 5',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 6,
      title: 'Project 6',
      description: 'This is project 6',
      like: 1,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 7,
      title: 'Project 7',
      description: 'This is project 7',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 8,
      title: 'Project 8',
      description: 'This is project 8',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 9,
      title: 'Project 9',
      description: 'This is project 9',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 10,
      title: 'Project 10',
      description: 'This is project 10',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
  ],
  size: 0,
  hasNextSlice: true,
};

export const studies: IProjectList = {
  teamSearchResponseList: [
    {
      id: 1,
      title: 'Study 1',
      description: 'This is study 1',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 2,
      title: 'Study 2',
      description: 'This is study 2',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 3,
      title: 'Study 3',
      description: 'This is study 3',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 4,
      title: 'Study 4',
      description: 'This is study 4',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 5,
      title: 'Study 5',
      description: 'This is study 5',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 6,
      title: 'Study 6',
      description: 'This is study 6',
      like: 1,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 7,
      title: 'Study 7',
      description: 'This is study 7',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 8,
      title: 'Study 8',
      description: 'This is study 8',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 9,
      title: 'Study 9',
      description: 'This is study 9',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
    {
      id: 10,
      title: 'Study 10',
      description: 'This is study 10',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
      techStacks: [
        stackList[183], // Python
      ],
      leaderID: 1,
      leaderName: '더미인',
      leaderLevel: 0,
    },
  ],
  size: 0,
  hasNextSlice: true,
}

export const feeds: IMainFeedsList = {
  feedSearchResponses: [
    {
      id: 1,
      userId: 1,
      title: 'Feed 1',
      content: 'This is feed 1',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 1,
      liked: false,
    },
    {
      id: 2,
      userId: 3,
      title: 'Feed 2',
      content: 'This is feed 2',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 5,
      liked: false,
    },
    {
      id: 3,
      userId: 4,
      title: 'Feed 3',
      content: 'This is feed 3',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 2,
      liked: false,
    },
    {
      id: 4,
      userId: 5,
      title: 'Feed 4',
      content: 'This is feed 4',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 1,
      liked: false,
    },
    {
      id: 5,
      userId: 2,
      title: 'Feed 5',
      content: 'This is feed 5',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 3,
      liked: false,
    },
    {
      id: 6,
      userId: 2,
      title: 'Feed 6',
      content: 'This is feed 6',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 4,
      liked: false,
    },
    {
      id: 7,
      userId: 2,
      title: 'Feed 7',
      content: 'This is feed 7',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 1,
      liked: false,
    },
    {
      id: 8,
      userId: 2,
      title: 'Feed 8',
      content: 'This is feed 8',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 2,
      liked: false,
    },
    {
      id: 9,
      userId: 2,
      title: 'Feed 9',
      content: 'This is feed 9',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-04-23',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 3,
      liked: false,
    },
    {
      id: 10,
      userId: 2,
      title: 'Feed 10',
      content: 'This is feed 10',
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-10',
      userName: '김민수',
      userPictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      positionLevel: 4,
      liked: false,
    },
  ],
  size: 10,
  hasNextSlice: true,
};

export const mentees: IUserCardList = {
  userCardResponses: [
    {
      userID: 1,
      profileImageURL: null,
      memberLevel: 2,
      nickname: 'JohnDoe',
      position: {
        positionName: 'Software Engineer',
        level: 0
      },
      score: 1000,
      like: 4.3,
      techStacks: [
        stackList[115], // JavaScript
        stackList[236], // TypeScript
        stackList[190], // React
        stackList[156], // Node.js
      ]
    },
    {
      userID: 2,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 3,
      nickname: 'JohnKim',
      position: {
        positionName: 'Backend Engineer',
        level: 0
      },
      score: 342,
      like: 4.3,
      techStacks: [
        stackList[213], // Spring
        stackList[114], // Java
      ]
    },
    {
      userID: 3,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'JaneDoe',
      position: {
        positionName: 'Backend Engineer',
        level: 0
      },
      score: 123,
      like: 4.3,
      techStacks: [
        stackList[183], // Python
      ]
    },
    {
      userID: 4,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 1,
      nickname: 'JaneKim',
      position: {
        positionName: 'Frontend Engineer',
        level: 0
      },
      score: 123,
      like: 4.3,
      techStacks: [
        stackList[190], // React
        stackList[246], // Vue.js
      ]
    },
    {
      userID: 5,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'JohnDoe',
      position: {
        positionName: 'Software Engineer',
        level: 0
      },
      score: 1000,
      like: 4.3,
      techStacks: [
        stackList[115], // JavaScript
        stackList[236], // TypeScript
        stackList[190], // React
        stackList[156], // Node.js
      ]
    },
    {
      userID: 6,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 3,
      nickname: 'JohnKim',
      position: {
        positionName: 'Backend Engineer',
        level: 0
      },
      score: 342,
      like: 4.3,
      techStacks: [
        stackList[213], // Spring
        stackList[114], // Java
      ]
    },
    {
      userID: 7,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'JaneDoe',
      position: {
        positionName: 'Frontend Engineer',
        level: 0
      },
      score: 123,
      like: 4.3,
      techStacks: [
        stackList[115], // JavaScript
        stackList[190], // React
      ]
    },
    {
      userID: 8,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 1,
      nickname: 'JaneKim',
      position: {
        positionName: 'Frontend Engineer',
        level: 0
      },
      score: 123,
      like: 4.3,
      techStacks: [
        stackList[115], // JavaScript
        stackList[6], // Angular
      ]
    },
    {
      userID: 9,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'JohnDoe',
      position: {
        positionName: 'Software Engineer',
        level: 0
      },
      score: 1000,
      like: 4.3,
      techStacks: [
        stackList[115], // JavaScript
        stackList[236], // TypeScript
        stackList[190], // React
        stackList[156], // Node.js
      ]
    },
    {
      userID: 10,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 3,
      nickname: 'JohnKim',
      position: {
        positionName: 'Backend Engineer',
        level: 0
      },
      score: 342,
      like: 4.3,
      techStacks: [
        stackList[183], // Python
        stackList[114], // Java
        stackList[213], // Spring
      ]
    },
  ],
  size: 10,
  hasNextSlice: true,
};

export const mentors :IMainMentor[] = [
  {
    id: 1,
    title: '멘토1',
    content: 'This is mentor 1',
    likes: 4,
    mentor: null,
    mentoringReviewList: [],
    teamMentoringList: [],
    thumbnailURL: null,
  },
  {
    id: 2,
    title: '멘토 2',
    content: 'This is mentor 2',
    likes: 3,
    mentor: null,
    mentoringReviewList: [],
    teamMentoringList: [],
    thumbnailURL: null,
  },
  {
    id: 3,
    title: '멘토 3',
    content: 'This is mentor 3',
    likes: 5,
    mentor: null,
    mentoringReviewList: [],
    teamMentoringList: [],
    thumbnailURL: null,
  },
  // {
  //   id: 4,
  //   title: 'Mentor 4',
  //   content: 'This is mentor 4',
  //   likes: 2,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 5,
  //   title: 'Mentor 5',
  //   content: 'This is mentor 5',
  //   likes: 5,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 6,
  //   title: 'Mentor 6',
  //   content: 'This is mentor 6',
  //   likes: 1,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 7,
  //   title: 'Mentor 7',
  //   content: 'This is mentor 7',
  //   likes: 3,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 8,
  //   title: 'Mentor 8',
  //   content: 'This is mentor 8',
  //   likes: 5,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 9,
  //   title: 'Mentor 9',
  //   content: 'This is mentor 9',
  //   likes: 2,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
  // {
  //   id: 10,
  //   title: 'Mentor 10',
  //   content: 'This is mentor 10',
  //   likes: 4,
  //   mentor: null,
  //   mentoringReviewList: [],
  //   teamMentoringList: [],
  //   thumbnailURL: 'https://picsum.photos/200/300',
  // },
];

export const ProjectDetail: IProjectDetail = {
  info: {
    teamID: 2,
    title: 'Team Example',
    description: 'This is a sample team.',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
    leaderID: 12345,
  },
  members: [
    {
      userID: 1,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'User1',
      position: {
        positionName: '백엔드 개발자',
        level: 1,
      },
      score: 4.8,
      like: 50,
      techStacks: [
        stackList[114], // Java
        stackList[213], // Spring
        stackList[115] // JavaScript
      ],
      role: '백엔드',
      approve: true,
    },
    {
      userID: 2,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'User1',
      position: {
        positionName: '백엔드 개발자',
        level: 1,
      },
      score: 4.8,
      like: 50,
      techStacks: [
        stackList[114], // Java
        stackList[213], // Spring
        stackList[115] // JavaScript
      ],
      role: '백엔드',
      approve: true,
    },
    {
      userID: 3,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 2,
      nickname: 'User1',
      position: {
        positionName: '백엔드 개발자',
        level: 1,
      },
      score: 4.8,
      like: 50,
      techStacks: [
        stackList[114], // Java
        stackList[213], // Spring
        stackList[115] // JavaScript
      ],
      role: '백엔드',
      approve: true,
    },
    {
      userID: 4,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 3,
      nickname: 'User2',
      position: {
        positionName: '프론트엔드 개발자',
        level: 0
      },
      score: 3.5,
      like: 30,
      techStacks: [
        stackList[183], // Python
        stackList[52], // Django
        stackList[190] // React
      ],
      role: '프론트엔드',
      approve: false,
    }
  ],
  spot: {
    onOffline: 'Offline',
    city: 'Seoul',
    detailSpot: 'Central Park'
  },
  mentoring: [
    {
      mentoringID: 1,
      thumbnailURL: 'https://picsum.photos/200/300',
      title: 'Mentoring 1',
      position: {
        positionName: '백엔드',
        Level: 0
      },
      mentorProfileURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      mentorNickname: 'Mentor1',
      score: 5.0,
      like: 100
    },
    {
      mentoringID: 2,
      thumbnailURL: 'https://picsum.photos/200/300',
      title: 'Mentoring 2',
      position: {
        positionName: '프론트엔드',
        Level: 0
      },
      mentorProfileURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      mentorNickname: 'Mentor2',
      score: 4.0,
      like: 80
    },
    {
      mentoringID: 3,
      thumbnailURL: 'https://picsum.photos/200/300',
      title: 'Mentoring 2',
      position: {
        positionName: '프론트엔드',
        Level: 0
      },
      mentorProfileURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      mentorNickname: 'Mentor2',
      score: 4.0,
      like: 80
    },
    {
      mentoringID: 4,
      thumbnailURL: 'https://picsum.photos/200/300',
      title: 'Mentoring 2',
      position: {
        positionName: '프론트엔드',
        Level: 0
      },
      mentorProfileURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      mentorNickname: 'Mentor2',
      score: 4.0,
      like: 80
    },
    {
      mentoringID: 5,
      thumbnailURL: 'https://picsum.photos/200/300',
      title: 'Mentoring 2',
      position: {
        positionName: '프론트엔드',
        Level: 0
      },
      mentorProfileURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      mentorNickname: 'Mentor2',
      score: 4.0,
      like: 80
    }
  ],
  stacks: [
    'Java',
    'Spring',
    'JavaScript',
    'Python',
    'Django',
    'React'
  ]
};

export const ProjectEdit: IEditProjectInfo = {
  info: {
    teamID: 1,
    title: 'Project Title',
    description: 'Project Description',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
    leaderID: 1,
  },
  type: {
    teamType: 1,
    detailType: '웹'
  },
  spot: {
    onOffline: 'Offline',
    city: 'Seoul',
    detailSpot: 'Central Park'
  },
  recruitMemberInfo: {
    state: true,
    memberList: [
      {
        role: '프론트엔드',
        stacks: [
          stackList[115], // JavaScript
          stackList[190], // React
        ],
        maxCount: 1,
        count: 1
      },
      {
        role: '백엔드',
        stacks: [
          stackList[114], // Java
          stackList[213], // Spring
        ],
        maxCount: 3,
        count: 1
      }
    ]
  },
}

export const MyUserDetailDummy: IMyPageDetail = {
  pictureUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
  nickname: '더미인',
  bestPositionLevel: 1,
  ghLink: '',
  openChatLink: '',
  isMentor: false,
  isAuth: false,
  lastLogin: '',
  introduce:
    '안녕하세요! 저는 채현우입니다.\n' +
    '저는 열정적인 개발자로서 소프트웨어 개발과 인공지능 분야에 흥미를 가지고 있습니다. 컴퓨터 과학에 대한 끊임없는 탐구와 창의적인 문제 해결에 힘쓰며, 사용자들에게 가치 있는 경험을 제공하기 위해 노력하고 있습니다. \n' +
    '제 개발 경험은 다양한 프로젝트와 협업을 통해 쌓아왔습니다. 웹 개발, 모바일 애플리케이션 개발, 데이터베이스 관리 및 인공지능 알고리즘 개발 등 다양한 분야에서의 경험을 가지고 있습니다. 현대의 기술 트렌드를 따라가며 항상 새로운 도전을 즐기고, 최신 도구와 기술을 습득하여 프로젝트에 적용하려고 노력합니다.\n' +
    '제가 개발한 소프트웨어를 설계하고 구현할 때, 사용자 경험에 특별한 주의를 기울입니다. 사용자가 직관적이고 편리하게 소프트웨어를 사용할 수 있도록 신경 쓰는 것이 저의 핵심 가치 중 하나입니다. 또한, 유지 보수 가능하고 확장 가능한 코드 작성을 중요하게 여기며, 효율성과 안정성을 고려하여 개발합니다. \n' +
    '제 목표는 사용자들에게 가치 있는 소프트웨어를 제공하여 일상 생활을 향상시키고, 혁신적인 기술로 사회에 기여하는 것입니다. 사용자들의 요구 사항을 이해하고, 문제를 해결하기 위해 최선을 다하는 것이 저의 목표입니다.\n' +
    '제가 개발한 소프트웨어나 프로젝트에 대해 궁금한 점이 있으시다면 언제든지 저에게 물어보세요. 제가 도움을 드릴 수 있도록 최선을 다하겠습니다. 감사합니다!',
  meetingAddress: '',
  meetingTime: '',
  meetingType: 'ONLINE',
  meetingNote: '',

  userPositions: [
    {
      positionName: '백엔드',
      positionLevel: 1,
    },
    {
      positionName: '프론트엔드',
      positionLevel: 2,
    },
    {
      positionName: 'UX/XI',
      positionLevel: 4,
    }
  ],
  projects: [],
  studies: [],
}

// const FiledList = [
//   {title: '프론트엔드', subtitle: 'React', currNum: 1, maxNum: 2},
//   {title: '백엔드', subtitle: 'Node.js', currNum: 2, maxNum: 2},
//   {title: '데이터베이스', subtitle: 'MongoDB', currNum: 3, maxNum: 5},
//   {title: '기획', subtitle: '기획', currNum: 0, maxNum: 5},
//   {title: '디자인', subtitle: '디자인', currNum: 3, maxNum: 5},
// ];