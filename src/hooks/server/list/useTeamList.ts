import { useInfiniteQuery } from "@tanstack/react-query";
  import Api from "@constant/Api.ts";
  import { IProjectList } from "@constant/interfaces.ts";
  import {useRef} from "react";

  export enum TeamType {
    ENTERPRISE = 0,
    PERSONAL = 1,
  }

  type TeamListResponse = IProjectList;

  function useTeamList(teamType: TeamType) {
    const currentPage = useRef(0);

    return useInfiniteQuery({
      queryKey: ['teamList', teamType as number],
      queryFn: ({ pageParam }) => fetchTeamList(teamType, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextSlice) {
          const current = currentPage.current;
          currentPage.current = current + 1;

          return current + 1;
        }
        return undefined;
      },
      select: (data) => data,
    });
  }

  async function fetchTeamList(teamType: TeamType, pageParam: number): Promise<TeamListResponse> {
    return Api.fetch2Json(`/api/v1/list/team?type=${teamType}&page=${pageParam}`);
  }

  export default useTeamList;