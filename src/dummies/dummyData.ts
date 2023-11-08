import {
  IProjectList,
  IProjectDetail, IMainFeedsList, IUserCardList, IMyPageDetail, IMainMentorList
} from '../constant/interfaces.ts';
import stackList from '../constant/stackList.ts';
import {BigTechTypeEn, BigTechTypeKo, CareerOptions} from '../constant/selectOptions.ts';

const DUMMY_LENGTH = 15;

export const projects: IProjectList = {
  teamSearchResponseList:
    Array.from({length: DUMMY_LENGTH}, (_, i) => ({
      id: i + 1,
      title: `Project ${i + 1}`,
      description: `This is project ${i + 1}`,
      like: Math.ceil(Math.random() * 100),
      thumbnailUrl: Math.random() > 0.1 ? 'https://picsum.photos/200/300' : null,
      techStacks:
        Array.from({length: Math.ceil(Math.random() * 5)}, (_) =>
          stackList[Math.floor(Math.random() * stackList.length)]
        ),
      leaderID: Math.ceil(Math.random() * 10),
      leaderNickname: '더미인',
      leaderLevel: Math.floor(Math.random() * 5),
    })),
  size: DUMMY_LENGTH,
  hasNextSlice: true,
};

export const studies: IProjectList = {
  teamSearchResponseList:
    Array.from({length: DUMMY_LENGTH}, (_, i) => ({
      id: i + 1,
      title: `Study ${i + 1}`,
      description: `This is study ${i + 1}`,
      like: Math.ceil(Math.random() * 100),
      thumbnailUrl: Math.random() > 0.1 ? 'https://picsum.photos/200/300' : null,
      techStacks:
        Array.from({length: Math.ceil(Math.random() * 5)}, (_) =>
          stackList[Math.floor(Math.random() * stackList.length)]
        ),
      leaderID: Math.ceil(Math.random() * 10),
      leaderNickname: '더미인',
      leaderLevel: Math.floor(Math.random() * 5),
    })),
  size: DUMMY_LENGTH,
  hasNextSlice: true,
};

export const feeds: IMainFeedsList = {
  feedSearchResponses:
    Array.from({length: DUMMY_LENGTH}, (_, i) => ({
      id: i + 1,
      userId: Math.ceil(Math.random() * 10),
      title: `Feed ${i + 1}`,
      content: `This is feed ${i + 1}`,
      thumbnailUrl: 'https://picsum.photos/200/300',
      createdDate: '2021-01-01',
      nickname: '김민수',
      userPictureUrl: Math.random() < 0.1 ? null : `https://avatars.githubusercontent.com/u/${48755175 + Math.ceil(Math.random() * 100)}?v=4`,
      positionLevel: Math.floor(Math.random() * 5),
      isLiked: false,
    })),
  size: DUMMY_LENGTH,
  hasNextSlice: true,
};

export const mentees: IUserCardList = {
  userCardResponses:
    Array.from({length: DUMMY_LENGTH}, (_, i) => ({
      userID: i + 1,
      profileImageURL: Math.random() < 0.1 ? null : `https://avatars.githubusercontent.com/u/${48755175 + Math.ceil(Math.random() * 100)}?v=4`,
      memberLevel: Math.floor(Math.random() * 5),
      nickname: `Mentee${i}`,
      position: {
        positionName: BigTechTypeKo[Math.floor(Math.random() * BigTechTypeKo.length)],
        level: Math.floor(Math.random() * 5),
      },
      score: Number((30.5 + Math.random() * 10).toFixed(1)),
      like: Math.ceil(Math.random() * 100),
      techStacks:
        Array.from({length: Math.ceil(Math.random() * 5)}, (_) =>
          stackList[Math.floor(Math.random() * stackList.length)]
        ),
    })),
  size: DUMMY_LENGTH,
  hasNextSlice: true,
};

export const mentors: IMainMentorList = {
  mentoringSearchResponses:
    Array.from({length: 10}, (_, i) => ({
      mentoringId: i + 1,
      thumbnailUrl: Math.random() < 0.1 ? null : 'https://picsum.photos/200/300',
      title: `Mentoring ${i + 1}`,
      content: 'contents',
      roleType: BigTechTypeEn[Math.floor(Math.random() * BigTechTypeEn.length)],
      career: CareerOptions[Math.floor(Math.random() * CareerOptions.length)],
      likes: Math.ceil(Math.random() * 100),
      stars: Number((Math.random() * 5).toFixed(1)),
      nickname: `Mentor${i + 1}`,
      userLevel: Math.floor(Math.random() * 5),
      userPictureUrl: `https://avatars.githubusercontent.com/u/${48755175 + Math.ceil(Math.random() * 100)}?v=4`,
      likeMentoring: false,

      leaderName: '더미인',
      availableReview: false,
      stacks: null,
      status: null,
      teamTitle: null,
      teamId: null,
      teamMentoringId: null,
      mentorId: Math.ceil(Math.random() * 10),
    })),
  size: 0,
  hasNextSlice: true,
};

export const ProjectDetail: IProjectDetail = {
  info: {
    teamID: 2,
    title: 'Team Example',
    description: 'This is a sample team.',
    thumbnailUrl: 'https://avatars.githubusercontent.com/u/48755175?v=4',
    leaderID: 12345,
    meetingTime: '2021-04-23',
  },
  members:
    Array.from({length: 10}, (_, i) => ({
      userID: i + 1,
      profileImageURL: Math.random() < 0.1 ? null : `https://avatars.githubusercontent.com/u/${48755175 + Math.ceil(Math.random() * 100)}?v=4`,
      memberLevel: Math.floor(Math.random() * 5),
      nickname: `Mentee${i}`,
      position: {
        positionName: BigTechTypeKo[Math.floor(Math.random() * BigTechTypeKo.length)],
        level: Math.floor(Math.random() * 5),
      },
      score: Number((30.5 + Math.random() * 10).toFixed(1)),
      like: Math.ceil(Math.random() * 100),
      techStacks:
        Array.from({length: Math.ceil(Math.random() * 5)}, (_) =>
          stackList[Math.floor(Math.random() * stackList.length)]
        ),
      role: BigTechTypeEn[Math.floor(Math.random() * BigTechTypeEn.length)],
      approve: true,
      recruitID: Math.ceil(Math.random() * 10),
      toFeedbackAt: '2023-10-01T16:56:47.064787',
      lastFeedbackAt: '2023-10-01T16:56:47.064787',
    })),
  spot: {
    onOffline: 'Offline',
    city: '서울 강남구',
    detailSpot: 'Central Park'
  },
  mentoring:
    mentors.mentoringSearchResponses.slice(0, 5).map((mentor) => ({
      ...mentor,
      availableReview: Math.random() < 0.3,
    })),
  stacks:
    Array.from({length: Math.ceil(Math.random() * 5)}, (_) =>
      stackList[Math.floor(Math.random() * stackList.length)].tagName
    ),
};

export const MyUserDetailDummy: IMyPageDetail = {
  pictureUrl: `https://avatars.githubusercontent.com/u/${48755175+Math.floor(Math.random()*100)}?v=4`,
  nickname: '더미인',
  bestPositionLevel: Math.floor(Math.random() * 5),
  snsLinks: {},
  feedbackScore: Number((30.5 + Math.random() * 10).toFixed(1)),
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

  userPositions:
    Array.from({length: Math.floor(Math.random()*4)}, () => ({
      type: BigTechTypeEn[Math.floor(Math.random() * BigTechTypeEn.length)],
      tags: Array.from({length: Math.ceil(Math.random() * 5)},
        () => stackList[Math.floor(Math.random() * stackList.length)].tagName),
      typeLevel: Math.floor(Math.random() * 5),
    })),
  projects: [],
  studies: [],
}
