import {
  IAdditionalInfoRequest,
  IEditFeedInfo, IEditMainMentoringRequest,
  IEditProjectInfo, IFeedbackData, IMenteeEvaluationRequest, IMentorAuthRequest, IMentorDetail,
  IMyPageDetail, IMyPageEdit,
  IProjectDetail, IRefuseContents
} from './interfaces.ts';
import {ProjectFields, ProjectSubFields} from './selectOptions.ts';

export const InitProject = {
  teamSearchResponseList: [],
  size: -1,
  hasNextSlice: true
}

export const InitProjectDetail:IProjectDetail = {
  info: {
    teamID: 1,
    title: '',
    description: '',
    thumbnailUrl: '',
    leaderID: 1,
    meetingTime: '',
    isFinished: 0,
  },
  members: [],
  spot: {
    onOffline: '',
    city: '',
    detailSpot: ''
  },
  mentoring: [],
  stacks: [],
}

export const InitEditProjectInfo: IEditProjectInfo = {
  info: {
    title: '',
    description: '',
    thumbnailUrl: '',
    leaderID: 1,
    meetingTime: '',
    isFinished: 0,
  },
  type: {
    teamType: 0,
    detailType: ProjectFields[0],
  },
  spot: {
    onOffline: '온라인',
    city: '서울',
    detailSpot: ''
  },
  recruitMemberInfo: {
    state: false,
    memberList: [],
  }
}

export const InitAdditionalInfo: IAdditionalInfoRequest = {
  nickname: '',
  pictureUrl: null,
  birthDay: '1920-01-01',
  expYear: 0,
  profileTagPositions: []
}

export const InitFeedInfo: IEditFeedInfo = {
  title: '',
  content: '',
  imageUrl: null,
  imageBase64: null,
  imageName: '',
  type: 0,
  domain: ProjectSubFields[0],
}

export const InitMyPageDetail: IMyPageDetail = {
  pictureUrl: '',
  nickname: '',
  bestPositionLevel: 1,
  snsLinks: {},
  feedbackScore: 36.5,
  isMentor: false,
  isAuth: false,
  lastLogin: '',
  introduce: '',
  meetingAddress: '',
  meetingTime: '',
  meetingType: 'ONLINE',
  meetingNote: '',

  userPositions: [],
  projects: [],
  studies: [],
}

export const InitMyPageEdit: IMyPageEdit = {
  pictureUrl: null,
  nickname: '',
  link: {},
  introduce: '',
  userPositionLevels: [],
  meetingAddress: '서울',
  meetingTime: '',
  meetingType: '상관없음',
  meetingNote: '',
}

export const InitMenteeEvaluation: IMenteeEvaluationRequest = {
  receiverID: 0,
  grade: 'GREAT',
  isContactable: false,
  isOnTime: false,
  isResponsible: false,
  isKind: false,
  isCollaboration: false,
  isFast: false,
  isActively: false,
  commentToUser: '',
  commentToAdmin: '',
}

export const InitApplicationData = {
  userId: 0,
  thumbnailUrl: '',
  userName: '',
  userPosition: [],
  applyRole: '',
  content: '',
}

export const InitRefuseContents: IRefuseContents = {
  leaderId: -1,
  leaderImage: '',
  leaderName: '',
  teamId: -1,
  teamName: '',
  position: '',
  refusedUser: '',
  refuseReason: '',
  refuseDate: '',
}

export const InitFeedbackData: IFeedbackData = {
  detailFeedbacks: [],
  isFeedbackHider: false,
}

export const InitMentoringRequest: IEditMainMentoringRequest = {
  title: '',
  content: '',
  stacks: [],
  roleType: '',
  career: '주니어',
  imageName: '',
  imageBase64: '',
}

export const InitMentorAuthRequest: IMentorAuthRequest = {
  verifyId: null,
  thumbnailUrl: null,
  imageName: '',
  imageBase64: '',
  roleType: '',
  career: '주니어',
  content: '',
  link: '',
}

export const InitMentorDetail: IMentorDetail = {
  thumbnailUrl: null,
  mentoringId: -1,
  title: '',
  content: '',
  roleType: '',
  career: '',
  likes: 0,
  stars: 0,
  nickname: '',
  userLevel: null,
  userPictureUrl: null,
  likeMentoring: null,
  stacks: [],

  availableReview: false,
  status: null,
  teamTitle: null,
  teamId: null,
  teamMentoringId: null,
  mentorId: -1,
}

export const InitProjectDescription =
  '1. 서비스를 만드시려는 이유가 무엇인가요?\n' +
  '(ex. 코로나 이후로 온라인 수업이 많아졌지만 학생들의 참여 부족 및 흥미 손실이 선생님들 사이에서 문제가 되고 있습니다. 이에 대한 해결책으로 "스마트런"이라는 온라인 학습 플랫폼을 제작하여 재미있는 온라인 학습 환경을 제공하고자 합니다)\n' +
  '\n' +
  '2. 서비스에 대해 설명해주세요.\n' +
  '(ex. "스마트런"은 학생들이 온라인에서 효과적으로 학습할 수 있는 플랫폼으로, 다양한 학습 콘텐츠와 상호 작용 기능을 제공합니다. 학생들은 동영상 강의, 퀴즈, 토론 게시판 등을 통해 학습할 수 있으며, 플랫폼은 학습 성과를 분석하여 맞춤형 학습 경험을 제공합니다.\n' +
  '\n' +
  '3. 어떤 유저층을 목표로 하시나요?\n' +
  '(ex. "스마트런"은 초중고 학생들과 교사를 대상으로 하며, 특히 온라인 학습에 참여하고자 하는 학생들 및 교사들을 중심으로 서비스를 제공합니다.)\n' +
  '\n' +
  '4. 프로젝트 추진 일정이 있다면 알려주세요!\n' +
  'ex.\n' +
  '. 기획 단계 (2023년 1월 - 2월)\n' +
  '. 개발 단계 (2023년 5월 - 8월)\n' +
  '. 테스트 및 피드백 (2023년 9월 - 10월)\n' +
  '. 상용화 및 마케팅 (2023년 11월 이후)\n' +
  '. 모니터링 및 유지보수 (2024년 이후)\n' +
  '\n' +
  '5. 개발이 진행중이라면 진행 현황을 알려주세요\n' +
  '(ex. 현재는 개발이 시작되지 않았으며,  현재 초기 기획 단계에서 아이디어의 완성도를 높이고 사용자 경험을 개선하기 위해 노력하고 있습니다. 빠르게 MVP를 배포하여 기능 및 디자인을 검증하고, 사용자들의 의견을 수렴하여 서비스를 보다 완성도 있게 만들 예정입니다.)\n' +
  '\n' +
  '6. 현재 그룹 채팅방이 있다면 알려주세요.';

export const InitStudyDescription =
  '1. 스터디의 주제를 알려주세요.\n' +
  '(ex. Real Mysql 스터디)\n' +
  '\n' +
  '2. 스터디의 목표는 무엇인가요?\n' +
  '(ex. 2달 만에 빠르게 Real Mysql 1, 2권을 학습하는 것입니다.)\n' +
  '\n' +
  '3. 예상 커리큘럼을 간략히 적어주세요.\n' +
  '(ex. 매주 1장씩 돌아가면서 노션에 공부 내용을 정리하고 발표합니다.)\n' +
  '\n' +
  '\n' +
  '4. 스터디 관련 주의사항이 있다면 알려주세요.\n' +
  '(ex. 불참 시 사전에 팀원들과 협의하여 조정하도록 합니다.)\n' +
  '\n' +
  '5. 현재 그룹 오픈채팅이 있다면 남겨주세요.';