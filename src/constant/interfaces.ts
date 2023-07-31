export interface ISvg {
  width: number;
  height: number;
}

export interface IProject {
  "teamSearchResponseList": Array<
    {
      "id": number;
      "title": string;
      "description": string;
      "like": number;
      "thumbnailUrl": string;
    }
  >;
  "size": number;
  "hasNextSlice": boolean;
}

export interface IProjectDetail {
  "title": string;
  "description": string;
  "leaderID": number;
  "teamUserCardList": Array<
    {
      "profileImageURL": string;
      "memberLevel": number;
      "nickname": string;
      "position": {
        "positionName": string;
        "level": number;
      };
      "score": number;
      "like": number;
      "stacks": string[];
      "role": string;
      "approve": string;
    }
  >;
  "meetingSpot": {
    "onOffline": string;
    "city": string;
    "detailSpot": string;
  };
  "mentoringList": Array<
    {
      "id": number;
      "thumbnailURL": string;
      "title": string;
      "position": {
        "positionName": string;
        "level": string;
      },
      "mentorProfileURL": string;
      "mentorNickname": string;
      "score": number;
      "like": number;
    }
  >
  "stacks": string[];
}