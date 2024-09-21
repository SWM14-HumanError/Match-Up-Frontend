import {
  ICompanyVerify,
  ICompanyVerifyList, IInquiry, IInquiryList,
  IJobPosting,
  IJobPostingList, IMainFeeds, IMainFeedsList, IMainMentorList, IMentoring, IMentorVerify, IMentorVerifyList,
  InfList, IProjectList, ITeamProjectSummary,
  IUser,
  IUserCardList,
  SearchParams
} from '@constant/interfaces.ts';
import {DEFAULT_PAGE_SIZE} from '@hooks/useInfScroll.ts';
import {
  enterprises,
  feeds,
  mentees,
  mentors as mentorsDummy,
  mentorVerifies,
  projects,
  studies
} from '../dummies/dummyData.ts';

/**
 * InfScrollAdapter
 * U: API에서 받아오는 리스트 데이터 타입
 * T: 리스트 원소 타입
 */
export interface InfScrollAdapter<U, T> {
  ApiUrl: string;
  DummyData: Array<T>;
  DefaultParams: SearchParams;
  transform: (data: U) => InfList<T>;
}

//= useInfScroll<IProjectList>('/api/v1/list/team', 'teamSearchResponseList', infScrollLayout, projects, {type: 0});
export class ProjectAdapter implements InfScrollAdapter<IProjectList, ITeamProjectSummary> {
  ApiUrl = '/api/v1/list/team';
  DummyData = projects.teamSearchResponseList as ITeamProjectSummary[];
  DefaultParams = {type: 0};

  transform(data: IProjectList): InfList<ITeamProjectSummary> {
    return {
      list: data.teamSearchResponseList,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

//= useInfScroll<IProjectList>('/api/v1/list/team', 'teamSearchResponseList', infScrollLayout, studies, {type: 1});
export class StudyAdapter implements InfScrollAdapter<IProjectList, ITeamProjectSummary> {
  ApiUrl = '/api/v1/list/team';
  DummyData = studies.teamSearchResponseList as ITeamProjectSummary[];
  DefaultParams = {type: 1};

  transform(data: IProjectList): InfList<ITeamProjectSummary> {
    return {
      list: data.teamSearchResponseList,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

export class MenteeAdapter implements InfScrollAdapter<IUserCardList, IUser> {
  ApiUrl = '/api/v1/list/user';
  DummyData = mentees.userCardResponses as IUser[];
  DefaultParams = {size: DEFAULT_PAGE_SIZE};

  transform(data: IUserCardList): InfList<IUser> {
    return {
      list: data.userCardResponses,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

// = useInfScroll<IMainMentorList, IMentoring>('/api/v1/mentorings', 'mentoringSearchResponses', infScrollLayout, mentorsDummy, {});
export class MentorAdapter implements InfScrollAdapter<IMainMentorList, IMentoring> {
  ApiUrl = '/api/v1/mentorings';
  DummyData = mentorsDummy.mentoringSearchResponses as IMentoring[];
  DefaultParams = {};

  transform(data: IMainMentorList): InfList<IMentoring> {
    return {
      list: data.mentoringSearchResponses,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

// = useInfScroll<IMainFeedsList>('/api/v1/feeds', 'feedSearchResponses', infScrollLayout, feeds, {});
export class FeedAdapter implements InfScrollAdapter<IMainFeedsList, IMainFeeds> {
  ApiUrl = '/api/v1/feeds';
  DummyData = feeds.feedSearchResponses as IMainFeeds[];
  DefaultParams = {};

  transform(data: IMainFeedsList): InfList<IMainFeeds> {
    return {
      list: data.feedSearchResponses,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

export class JobPostingAdapter implements InfScrollAdapter<IJobPostingList, IJobPosting> {
  ApiUrl = '/api/v1/job-posting';
  DummyData = [];
  DefaultParams = {size: DEFAULT_PAGE_SIZE};

  transform(data: IJobPostingList): InfList<IJobPosting> {
    return {
      list: data.responseList,
      size: data.page < data.totalPageCount ? DEFAULT_PAGE_SIZE : data.totalDataCount % DEFAULT_PAGE_SIZE,
      hasNextSlice: data.page === data.totalPageCount,
    };
  }
}

// = useInfScroll<IInquiryList>('/api/v1/inquiry', 'inquiryList', infScrollLayout, dummyData, {});
export class InquiryAdapter implements InfScrollAdapter<IInquiryList, IInquiry> {
  ApiUrl = '/api/v1/inquiry';
  DummyData = [];
  DefaultParams = {size: DEFAULT_PAGE_SIZE};

  transform(data: IInquiryList): InfList<IInquiry> {
    return {
      list: data.inquiryList,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

// = useInfScroll<IMentorVerifyList>('/api/v1/mentoring/verify/list', 'verifyMentorsResponses', infScrollLayout, mentorVerifies, {});
export class MentorVerifyAdapter implements InfScrollAdapter<IMentorVerifyList, IMentorVerify> {
  ApiUrl = '/api/v1/mentoring/verify/list';
  DummyData = mentorVerifies.verifyMentorsResponses as IMentorVerify[];
  DefaultParams = {size: DEFAULT_PAGE_SIZE};

  transform(data: IMentorVerifyList): InfList<IMentorVerify> {
    return {
      list: data.verifyMentorsResponses,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

export class CompanyVerifyAdapter implements InfScrollAdapter<ICompanyVerifyList, ICompanyVerify> {
  ApiUrl = '/api/v1/enterprise/verify/list';
  DummyData = enterprises.enterpriseApplyList as ICompanyVerify[];
  DefaultParams = {size: DEFAULT_PAGE_SIZE};

  transform(data: ICompanyVerifyList): InfList<ICompanyVerify> {
    return {
      list: data.enterpriseApplyList,
      size: data.size,
      hasNextSlice: data.hasNextSlice,
    };
  }
}

