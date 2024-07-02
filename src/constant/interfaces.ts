export interface ISvg {
  width?: number;
  height?: number;
}

// Schema Interfaces
export interface IUser {
  userID: number;
  profileImageURL: string|null;
  memberLevel: number|null;
  nickname: string|null;
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
  thumbnailUrl: string|null;
  techStacks: ITechStack[];
  isFinished: 0|1;

  leaderID: number;
  leaderNickname: string;
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
  mentoring: IMentoring[];
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
  maxCount?: number;
  count?: number;
}

export interface IEditProjectRequest {
  name: string;
  description: string;
  imageBase64: string|null;
  imageName: string|null;

  type: IProjectType;
  meetingSpot: IProjectMeetingSpot;
  meetingDate: string;
  memberList: Array<IEditProjectMember>;
}

export interface IProjectInfo {
  teamID?: number;
  title: string;
  description: string;
  thumbnailUrl: string|null;
  leaderID: number;
  meetingTime: string;
  isFinished: 0|1;
}

export interface IProjectMember extends IUser {
  role: string;
  approve: boolean;
  recruitID: number;
  lastFeedbackAt: string;
  toFeedbackAt: string;
}

export interface IProjectMeetingSpot {
  onOffline: string;
  city: string;
  detailSpot: string;
}

export interface IProjectRecruitment {
  state: boolean;
  memberList: IRecruitmentInfo[];
}

export interface IRecruitmentInfo {
  role: string;
  stacks: string[]; //ITechStack[];
  maxCount: number;
  count: number;
}

export interface IProjectType {
  teamType: number;
  detailType: string;
}

export interface IMentoring {
  thumbnailUrl: string | null;
  mentoringId: number;
  title: string;
  content: string;
  roleType: string;
  career: string;
  likes: number;
  stars: number;
  nickname: string|null;
  userLevel: number;
  userPictureUrl: string | null;
  likeMentoring: false;
  stacks: string[] | null;

  leaderName: string;
  availableReview: boolean | null;
  status: string | null;
  teamTitle: string | null;
  teamId: number | null;
  teamMentoringId: number | null;
  mentorId: number;
}

export interface IMainMentorList extends InfScroll {
  mentoringSearchResponses: IMentoring[];
}

export interface IEditMainMentoringRequest {
  title: string;
  content: string;
  stacks: string[];
  roleType: string;
  career: string;
  imageName?: string|undefined;
  imageBase64?: string|null|undefined;
  thumbnailUrl?: string|null|undefined;
}

export interface IMainFeeds {
  id: number;
  userId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdDate: string;
  nickname: string|null;
  userPictureUrl: string|null;
  positionLevel: number;
  isLiked: boolean;
}

export interface IMainFeedComment {
  commentId: number;
  userId: number;
  commentWriter: string;
  createdAt: string;
  content: string;
}

export interface IMainFeedsList extends InfScroll {
  feedSearchResponses: Array<IMainFeeds|null|undefined>;
}

// export interface IMainFeedCommentList extends InfScroll {
//   comments: Array<IMainFeedComment|null|undefined>;
// }

export interface IEditFeedInfo {
  title: string;
  content: string;
  imageUrl: string|null;
  imageBase64: string|null;
  imageName: string|null;
  type: number;
  domain: string;
}

// Todo: 프로필 편집 interface 중복 제거
export interface IAdditionalInfoRequest {
  email?: string;
  id?: string;
  nickname: string;
  pictureUrl?: string | null;
  birthDay?: string;
  expYear?: number;
  meetingAddress?: string;
  meetingTime?: string;
  meetingType?: string;
  meetingNote?: string;
  introduce?: string;
  profileTagPositions?: IUserTagPosition[] | null;
  link?: {
    [key: string]: string | undefined;
    DISCORD: string;
    KAKAO: string;
    GITHUB: string;
    EMAIL: string;
  };
}

export interface IUserTagPosition {
  type: string;
  tags: string[];
  typeLevel: number;
}

export interface ILink {
  [key: string]: string | undefined;
  github?: string;
  kakao?: string;
  discord?: string;
}

export interface IMyPageDetail {
  pictureUrl: string|null;
  nickname: string|null;
  bestPositionLevel: number|null;
  snsLinks: ILink;
  feedbackScore: number;
  isMentor: boolean;
  isAuth: boolean;
  lastLogin: string; //Date
  introduce: string|null;
  meetingAddress: string|null;
  meetingTime: string|null;
  meetingType: 'ONLINE'|'OFFLINE'|'FREE'|null;
  meetingNote: string|null;

  userPositions: IUserTagPosition[]|null;
  projects: ITeamProjectSummary[]|null;
  studies: ITeamProjectSummary[]|null;
}

export interface IMyPageEdit {
  pictureUrl: string|null;
  nickname: string;
  introduce: string;
  link: ILink;
  userPositionLevels: IUserTagPosition[]|null;
  meetingAddress: string;
  meetingTime: string;
  meetingType: string;
  meetingNote: string;
}

export interface IMyPageEditRequest {
  imageBase64: string|null;
  imageName: string|null;
  nickname: string;
  link: ILink;
  introduce: string;
  profileTagPositions: IUserTagPosition[] | null;
  meetingAddress: string;
  meetingTime: string;
  meetingType: 'ONLINE'|'OFFLINE'|'FREE';
  meetingNote: string;

  birthDay?: string;
  expYear?: number;
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

export interface IFeedbackData {
  detailFeedbacks: string[];
  isFeedbackHider: boolean;
}

export interface IApplicationData {
  userId: number;
  thumbnailUrl: string;
  userName: string;
  userPosition: IUserTagPosition[];
  applyRole: string;
  content: string;
}

export interface IRefuseContents {
  leaderId: number;
  leaderImage: string;
  leaderName: string;
  teamId: number;
  teamName: string;
  position: string;
  refusedUser: string;
  refuseReason: string;
  refuseDate: string;
}

export interface IAvailableTeam {
  teamId: number;
  teamType: number;
  teamTitle: string;
}

export interface IMentorAuthRequest {
  verifyId: number|null;
  thumbnailUrl: string|null;
  imageName: string|null|undefined;
  imageBase64: string|null|undefined;
  roleType: string;
  career: string;
  content: string;
  link: string;
}

export interface IMentorDetail {
  thumbnailUrl: string|null;
  mentoringId: number;
  title: string;
  content: string;
  roleType: string;
  career: string;
  likes: number;
  stars: number;
  nickname: string|null;
  userLevel: number|null;
  userPictureUrl: string|null;
  likeMentoring: string|null;
  stacks: string[];

  availableReview: boolean|null;
  status: string|null;
  teamTitle: number|null;
  teamId: number|null;
  teamMentoringId: number|null;
  mentorId: number;
}

export interface IMentorVerify {
  career: string;
  content: string;
  link: string;
  roleType: string;
  thumbnailUrl: string|null;
  userId: number;
  verifyId: number;
}

export interface IMentorVerifyList extends InfScroll {
  verifyMentorsResponses: IMentorVerify[];
}

export interface ICompanyAuthRequest {
  content: string;
  enterpriseEmail: string;
  // certificateName: string|null;
  // certificateBase64: string|null;
}

export interface ICompanyVerify extends ICompanyAuthRequest {
  verifyId: number;
}

export interface ICompanyVerifyList extends InfScroll {
  verifyEnterpriseResponses: ICompanyVerify[];
}

export interface IChattingRoom {
  chatRoomId: number;
  sender: {
    userId: number;
    nickname: string;
    pictureUrl: string|null;
    level: number|null;
  };
  peopleCount: number;
  unreadCount: 0|1;
  lastChat: string;
  lastChatTime: string;
}

export interface IChattingRoomList extends InfScroll {
  chatRoomResponseList: (IChattingRoom|null|undefined)[];
}

export interface IChattingMessage {
  sender: {
    userId: number;
    nickname: string;
    pictureUrl: string|null;
    level: number|null;
  };
  type: 'CHAT'|'LEAVE'|'ENTER';
  message: string;
  isRead: 0|1;
  sendTime: string;
}

export interface IChattingMessageList extends InfScroll {
  chatMessageResponseList: (IChattingMessage|null|undefined)[];
}

export interface IInquiry {
  title: string;
  content: string;
  createdAt: string;
  userNickname: string;
  userEmail: string;
}

export interface IInquiryList extends InfScroll{
  inquiryList: IInquiry[];
}