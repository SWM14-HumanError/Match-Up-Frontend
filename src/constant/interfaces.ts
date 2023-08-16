export interface ISvg {
  width: number;
  height: number;
}

// Schema Interfaces
export interface IUser {
  userID: number;
  profileImageURL: string;
  memberLevel: string|null;
  nickname: string;
  position: {
    positionName: string;
    level: string;
  };
  score: number;
  like: number;
  techStacks: ITechStack[];
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
  teamSearchResponseList: Array<
    {
      id: number;
      title: string;
      description: string;
      like: number;
      thumbnailUrl: string;
      // todo : 프로젝트 스택 리스트; 유저 정보 (레벨; 이름) 정보 추가
    }
  >;
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
    Level: string;
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
