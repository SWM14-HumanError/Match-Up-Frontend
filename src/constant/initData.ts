import {IProjectDetail} from "./interfaces.ts";

export const InitProject = {
  "teamSearchResponseList": [],
  "size": -1,
  "hasNextSlice": true
}

export const InitProjectDetail:IProjectDetail = {
  info: {
    teamID: 1,
    title: "Team Example",
    description: "This is a sample team.",
    leaderID: 1,
  },
  members: [],
  spot: {
    onOffline: "Offline init",
    city: "Seoul init",
    detailSpot: "Central Park init"
  },
  mentoring: [],
  stacks: [],
}