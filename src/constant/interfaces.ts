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

