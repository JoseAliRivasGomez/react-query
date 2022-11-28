import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const {data} = await githubApi.get<Label[]>('/labels');
    //console.log(data);
    return data;
  } 

export const useLabels = () => {

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        // {
        //   refetchOnWindowFocus: false
        // }
      );

    return labelsQuery;
}
