export interface ISvg {
  width?: number;
  height?: number;
}

// Schema Interfaces
export interface IUser {
  userID: number;
  profileImageURL: string|null;
  memberLevel: number|null;
  nickname: string;
  position: {
    positionName: string;
    level: number|null;
  };
  score: number;
  like: number;
  techStacks: ITechStack[];
}

export interface ITeamProjectSummary {
  id: number;
  title: string;
  description: string;
  like: number|null;
  thumbnailUrl: string;
  techStacks: ITechStack[];

  leaderID: number;
  leaderName: string;
  leaderLevel: number|null;
}

export interface ISimpleTechStack{
  tagName: string;
  url?: string;
}
export interface ITechStack extends ISimpleTechStack {
  tagID: number;
  tagName: string;
  url: string;
}

export interface InfScroll {
  size: number;
  hasNextSlice: boolean;
}

// API Response Interfaces extends InfScroll
export interface IProjectList extends InfScroll {
  teamSearchResponseList: Array<ITeamProjectSummary|undefined|null>;
}
export interface IUserCardList extends InfScroll {
  userCardResponses: Array<IUser|undefined|null>;
}

export interface IProjectDetail {
  info: IProjectInfo;
  members: IProjectMember[];
  spot: IProjectMeetingSpot;
  mentoring: IProjectMentoring[];
  stacks: string[];
}

export interface IEditProjectInfo {
  info: IProjectInfo;
  type: IProjectType;
  spot: IProjectMeetingSpot;
  recruitMemberInfo: IProjectRecruitment;
}

export interface IEditProjectMember {
  role: string;
  stacks: string[];
  maxCount: number;
}

export interface IEditProjectRequest {
  name: string;
  description: string;
  base64Thumbnail: string|null;

  type: IProjectType;
  meetingSpot: IProjectMeetingSpot;
  memberList: Array<IEditProjectMember>;
}

export interface IProjectInfo {
  teamID?: number;
  title: string;
  description: string;
  thumbnailUrl: string|null;
  leaderID: number;
}

export interface IProjectMember extends IUser {
  role: string;
  approve: boolean;
}

export interface IProjectMeetingSpot {
  onOffline: string;
  city: string;
  detailSpot: string;
}

export interface IProjectMentoring {
  mentoringID: number;
  thumbnailURL: string;
  title: string;
  position: {
    positionName: string;
    Level: number|null;
  };
  mentorProfileURL: string;
  mentorNickname: string;
  score: number;
  like: number;
}

export interface IProjectRecruitment {
  state: boolean;
  memberList: IRecruitmentInfo[];
}

export interface IRecruitmentInfo {
  role: string;
  stacks: ITechStack[];
  maxCount: number;
  count: number;
}

export interface IProjectType {
  teamType: number;
  detailType: string;
}

export interface IMainMentor {
  id: number;
  title: string;
  content: string;
  likes: number;
  mentor: null;
  mentoringReviewList: []
  teamMentoringList: []
  thumbnailURL: string|null;
}

// export interface IMainMentorList extends InfScroll {
//   mentorSearchResponseList: IMainMentor[];
// }

export interface IMainFeeds {
  id:number;
  userId: number;
  title: string;
  content: string;
  thumbnailUrl: string|null;
  createdDate: string;
  userName: string;
  userPictureUrl: string|null;
  positionLevel: number|null;
}

export interface IMainFeedComment {
  commentId: number;
  userId: number;
  createdAt: string;
  content: string;
}

export interface IMainFeedsList extends InfScroll {
  feedSearchResponses: Array<IMainFeeds|null|undefined>;
}

export interface IMainFeedCommentList extends InfScroll {
  comments: Array<IMainFeedComment|null|undefined>;
}

export interface IEditFeedInfo {
  title: string;
  content: string;
  imageUrl: string|null;
  type: number;
  domain: string;
}

export interface IAdditionalInfoRequest {
  nickname: string;
  pictureUrl: string|null;
  birthDay: string;
  expYear: number;
  userPositionLevels: {
    [key: string]: number | undefined;
    BACK?: number;
    FRONT?: number;
    FULL?: number;
    AI?: number;
    DESIGN?: number;
  };
}

export interface IUserPosition {
  positionName: string|null
  positionLevel: number|null
}

export interface IMyPageDetail {
  pictureUrl: string|null;
  nickname: string|null;
  bestPositionLevel: number|null;
  ghLink: string|null;
  openChatLink: string|null;
  isMentor: boolean;
  isAuth: boolean;
  lastLogin: string; //Date
  introduce: string|null;
  meetingAddress: string|null;
  meetingTime: string|null;
  meetingType: 'ONLINE'|'OFFLINE'|'FREE'|null;
  meetingNote: string|null;

  userPositions: IUserPosition[]|null;
  projects: ITeamProjectSummary[]|null;
  studies: ITeamProjectSummary[]|null;
}

export interface IMyPageEdit {
  pictureUrl: string|null;
  nickname: string;
  introduce: string;
  Link: {
    [key: string]: string | undefined;
    github?: string;
    kakao?: string;
    discord?: string;
  };
  userPositionLevels: {
    [key: string]: number | undefined;
    BACK?: number;
    FRONT?: number;
    FULL?: number;
    AI?: number;
    DESIGN?: number;
  };
  meetingAddress: string;
  meetingTime: string;
  meetingType: string;
  meetingNote: string;
}

export interface IMenteeEvaluationRequest {
  receiverID: number;
  grade: 'GREAT'|'NORMAL'|'BAD';
  [key: string]: boolean | string | number;
  isContactable: boolean;
  isOnTime: boolean;
  isResponsible: boolean;
  isKind: boolean;
  isCollaboration: boolean;
  isFast: boolean;
  isActively: boolean;
  commentToUser: string;
  commentToAdmin: string;
}

export interface IAlarmData {
  id: number;
  title: string;
  createdDate: string;
  content: string;
  redirectUrl: string;
  alertType: string;
  read: boolean;
}

export interface IAlarmList extends InfScroll {
  alertResponseList: IAlarmData[];
}