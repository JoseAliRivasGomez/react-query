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
        {
          staleTime: 1000 * 60 * 60, //cada hora se refresca
          //initialData: [], //la data inicial fresca
          //placeholderData: [], //la data temporal mientras hace refetch
        }
        // {
        //   refetchOnWindowFocus: false
        // }
      );

    return labelsQuery;
}
