import axios from '../utils/axios';
import {Class} from './typings';

/* GET classes by group */
export type GetClassesByGroupResponse = Class[];

const getClassesByGroup = (groupId: string, date: string) =>
  axios.get<GetClassesByGroupResponse>(`/classes/group/${groupId}/getByDate`, {
    data: {date},
  });

export const ClassesAPI = {
  getClassesByGroup,
};
