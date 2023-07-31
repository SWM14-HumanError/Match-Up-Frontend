import {IProjectDetail} from "./interfaces.ts";

export const InitProject = {
  "teamSearchResponseList": [],
  "size": -1,
  "hasNextSlice": true
}

export const InitProjectDetail:IProjectDetail = {
  "title": "Team Example",
  "description": "This is a sample team.",
  "leaderID": 1,
  "teamUserCardList": [],
  "meetingSpot": {
  "onOffline": "Offline",
    "city": "",
    "detailSpot": ""
},
  "mentoringList": [],
  "stacks": []
}