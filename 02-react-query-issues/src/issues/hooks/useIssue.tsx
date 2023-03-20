import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';
import { Issue } from '../interfaces/issue';

export const getIssueInfo = async(issueNumber: number):Promise<Issue> => {
    //await sleep(2);
    const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    console.log(data);
    
    return data;
}

export const getIssueComments = async(issueNumber: number):Promise<Issue[]> => {
    //await sleep(2);
    const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    console.log(data);
    
    return data;
}

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssueInfo(issueNumber),
    );

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueQuery.data!.number),
        {
            enabled: issueQuery.data !== undefined
        }
    );

  return {
    issueQuery,
    issueCommentsQuery
  }
}
