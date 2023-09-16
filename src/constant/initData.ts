import {
  IAdditionalInfoRequest,
  IEditFeedInfo,
  IEditProjectInfo,
  IMyPageDetail, IMyPageEdit,
  IProjectDetail
} from './interfaces.ts';
import {ProjectSubFields} from './selectOptions.ts';

export const InitProject = {
  teamSearchResponseList: [],
  size: -1,
  hasNextSlice: true
}

export const InitUser = {
  userCardResponses: [],
  size: 0,
  hasNextSlice: true,
}

export const InitProjectDetail:IProjectDetail = {
  info: {
    teamID: 1,
    title: 'Team Example',
    description: 'This is a sample team.',
    thumbnailUrl: '',
    leaderID: 1,
  },
  members: [],
  spot: {
    onOffline: 'Offline init',
    city: 'Seoul init',
    detailSpot: 'Central Park init'
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
  },
  type: {
    teamType: 0,
    detailType: '기타',
  },
  spot: {
    onOffline: 'Online',
    city: '',
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
  userPositionLevels: {}
}

export const InitFeedInfo: IEditFeedInfo = {
  title: '',
  content: '',
  imageUrl: '',
  type: 0,
  domain: ProjectSubFields[0],
}

export const InitMyPageDetail: IMyPageDetail = {
  pictureUrl: '',
  nickname: '',
  bestPositionLevel: 1,
  ghLink: '',
  openChatLink: '',
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
  Link: {},
  introduce: '',
  userPositionLevels: {},
  meetingAddress: '서울',
  meetingTime: '',
  meetingType: '상관없음',
  meetingNote: '',
}