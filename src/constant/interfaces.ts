export interface ISvg {
  width: number;
  height: number;
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
  like: number;
  thumbnailUrl: string;
  techStacks: ITechStack[];

  leaderID: number;
  leaderName: string;
  leaderLevel: number;
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
  teamSearchResponseList: Array<ITeamProjectSummary>;
}
export interface IUserCardList extends InfScroll {
  userCardResponses: IUser[];
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
  thumbnailURL: string;
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

export interface IMainFeedsList extends InfScroll {
  feedSearchResponsDtos: IMainFeeds[];
}

export interface IEditFeedInfo {
  title: string;
  content: string;
  imageUrl: string;
  type: number;
  domain: string;
}

export interface IAdditionalInfo {
  name: string;
  nickname: string;
  positionLevel: number;
  userBirthdayYear: number;
  userBirthdayMonth: number;
  userBirthdayDay: number;
  address: string;
  expYear: number;
  expertize: string[];
  meetingType: string;
  position: string;
}