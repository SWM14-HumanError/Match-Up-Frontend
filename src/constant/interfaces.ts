export interface ISvg {
  width: number;
  height: number;
}

export interface IProject {
  teamSearchResponseList: Array<
    {
      id: number;
      title: string;
      description: string;
      like: number;
      thumbnailUrl: string;
    }
  >;
  size: number;
  hasNextSlice: boolean;
}

export interface IProjectDetail {
  info: IProjectInfo;
  members: IProjectMember[];
  spot: IProjectMeetingSpot;
  mentoring: IProjectMentoring[];
  stacks: string[];
}

export interface IEditProjectInfo {
  info: IProjectInfo,
  type: IProjectType,
  members: IProjectRecruitment,
  spot: IProjectMeetingSpot,
}

export interface IProjectInfo {
  teamID?: number;
  title: string;
  description: string;
  leaderID: number;
}

export interface IProjectMember {
  userID: number;
  profileImageURL: string;
  memberLevel: string;
  nickname: string;
  position: {
    positionName: string;
    level: string;
  };
  score: number;
  like: number;
  stacks: string[];
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
  memberList: Array<
    {
      role: string;
      stacks: string[];
      maxCount: number;
      count: number;
    }
  >;
}

export interface IProjectType {
  teamType: number;
  detailType: string;
}

export interface IMember {
  userID: number;
  profileImageURL: string;
  memberLevel: string;
  nickname: string;
  position: {
    positionName: string;
    positionLevel: string;
  };
  score: number;
  like: number;
  stacks: string[];
}

export interface IMemberList {
  list: IMember[];
  page: number;
  hasNextSlice: boolean;
}