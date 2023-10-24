import {
  IAdditionalInfoRequest,
  IEditFeedInfo, IEditMainMentoringRequest,
  IEditProjectInfo, IFeedbackData, IMenteeEvaluationRequest,
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
  career: '',
  imageName: '',
  imageBase64: '',
}