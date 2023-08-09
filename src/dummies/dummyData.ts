import {
  IProjectList,
  IProjectDetail,
  IUser,
  IEditProjectInfo
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
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'This is project 2',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'This is project 3',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'This is project 4',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'Project 5',
      description: 'This is project 5',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'Project 6',
      description: 'This is project 6',
      like: 1,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'Project 7',
      description: 'This is project 7',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      title: 'Project 8',
      description: 'This is project 8',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      title: 'Project 9',
      description: 'This is project 9',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      title: 'Project 10',
      description: 'This is project 10',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
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
    },
    {
      id: 2,
      title: 'Study 2',
      description: 'This is study 2',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'Study 3',
      description: 'This is study 3',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Study 4',
      description: 'This is study 4',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'Study 5',
      description: 'This is study 5',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'Study 6',
      description: 'This is study 6',
      like: 1,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'Study 7',
      description: 'This is study 7',
      like: 3,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      title: 'Study 8',
      description: 'This is study 8',
      like: 5,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      title: 'Study 9',
      description: 'This is study 9',
      like: 2,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      title: 'Study 10',
      description: 'This is study 10',
      like: 4,
      thumbnailUrl: 'https://picsum.photos/200/300',
    },
  ],
  size: 0,
  hasNextSlice: true,
}

export const feeds = [
  {
    title: 'Feed 1',
    description: 'This is feed 1',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-01',
  },
  {
    title: 'Feed 2',
    description: 'This is feed 2',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-02',
  },
  {
    title: 'Feed 3',
    description: 'This is feed 3',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-03',
  },
  {
    title: 'Feed 4',
    description: 'This is feed 4',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-04',
  },
  {
    title: 'Feed 5',
    description: 'This is feed 5',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-05',
  },
  {
    title: 'Feed 6',
    description: 'This is feed 6',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-06',
  },
  {
    title: 'Feed 7',
    description: 'This is feed 7',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-07',
  },
  {
    title: 'Feed 8',
    description: 'This is feed 8',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-08',
  },
  {
    title: 'Feed 9',
    description: 'This is feed 9',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-09',
  },
  {
    title: 'Feed 10',
    description: 'This is feed 10',
    image: 'https://picsum.photos/200/300',
    date: '2021-01-10',
  },
];

export const mentors = [
  {
    id: 1,
    name: 'Mentor 1',
    description: 'This is mentor 1',
    heart: 4,
    star: 3,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Mentor 2',
    description: 'This is mentor 2',
    heart: 3,
    star: 2,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Mentor 3',
    description: 'This is mentor 3',
    heart: 5,
    star: 4,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    name: 'Mentor 4',
    description: 'This is mentor 4',
    heart: 2,
    star: 1,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    name: 'Mentor 5',
    description: 'This is mentor 5',
    heart: 5,
    star: 4,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    name: 'Mentor 6',
    description: 'This is mentor 6',
    heart: 1,
    star: 2,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    name: 'Mentor 7',
    description: 'This is mentor 7',
    heart: 3,
    star: 4,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    name: 'Mentor 8',
    description: 'This is mentor 8',
    heart: 5,
    star: 5,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    name: 'Mentor 9',
    description: 'This is mentor 9',
    heart: 2,
    star: 3,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    name: 'Mentor 10',
    description: 'This is mentor 10',
    heart: 4,
    star: 5,
    thumbnailUrl: 'https://picsum.photos/200/300',
  },
];

export const mentees: IUser[] = [
  {
    userID: 1,
    profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
    memberLevel: 'level 2',
    nickname: 'JohnDoe',
    position: {
      positionName: 'Software Engineer',
      level: 'Senior'
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
    memberLevel: 'level 3',
    nickname: 'JohnKim',
    position: {
      positionName: 'Backend Engineer',
      level: 'Senior'
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
    memberLevel: 'level 2',
    nickname: 'JaneDoe',
    position: {
      positionName: 'Backend Engineer',
      level: 'Senior'
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
    memberLevel: 'level 1',
    nickname: 'JaneKim',
    position: {
      positionName: 'Frontend Engineer',
      level: 'Junior'
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
    memberLevel: 'level 2',
    nickname: 'JohnDoe',
    position: {
      positionName: 'Software Engineer',
      level: 'Senior'
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
    memberLevel: 'level 3',
    nickname: 'JohnKim',
    position: {
      positionName: 'Backend Engineer',
      level: 'Senior'
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
    memberLevel: 'level 2',
    nickname: 'JaneDoe',
    position: {
      positionName: 'Frontend Engineer',
      level: 'Senior'
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
    memberLevel: 'level 1',
    nickname: 'JaneKim',
    position: {
      positionName: 'Frontend Engineer',
      level: 'Junior'
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
    memberLevel: 'level 2',
    nickname: 'JohnDoe',
    position: {
      positionName: 'Software Engineer',
      level: 'Senior'
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
    memberLevel: 'level 3',
    nickname: 'JohnKim',
    position: {
      positionName: 'Backend Engineer',
      level: 'Senior'
    },
    score: 342,
    like: 4.3,
    techStacks: [
      stackList[183], // Python
      stackList[114], // Java
      stackList[213], // Spring
    ]
  },
];

export const ProjectDetail: IProjectDetail = {
  info: {
    teamID: 2,
    title: 'Team Example',
    description: 'This is a sample team.',
    leaderID: 12345,
  },
  members: [
    {
      userID: 1,
      profileImageURL: 'https://avatars.githubusercontent.com/u/48755175?v=4',
      memberLevel: 'level 2',
      nickname: 'User1',
      position: {
        positionName: '백엔드',
        level: 'level 1',
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
      memberLevel: 'level 2',
      nickname: 'User1',
      position: {
        positionName: '백엔드',
        level: 'level 1',
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
      memberLevel: 'level 2',
      nickname: 'User1',
      position: {
        positionName: '백엔드',
        level: 'level 1',
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
      memberLevel: 'level 3',
      nickname: 'User2',
      position: {
        positionName: '프론트엔드',
        level: 'level 2',
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
        Level: '카카오 3년차',
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
        Level: '구글 10년차'
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
        Level: '구글 10년차'
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
        Level: '구글 10년차'
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
        Level: '구글 10년차'
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

// const FiledList = [
//   {title: '프론트엔드', subtitle: 'React', currNum: 1, maxNum: 2},
//   {title: '백엔드', subtitle: 'Node.js', currNum: 2, maxNum: 2},
//   {title: '데이터베이스', subtitle: 'MongoDB', currNum: 3, maxNum: 5},
//   {title: '기획', subtitle: '기획', currNum: 0, maxNum: 5},
//   {title: '디자인', subtitle: '디자인', currNum: 3, maxNum: 5},
// ];