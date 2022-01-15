import axios from '../utils/axios';

const getClassesByGroup = (groupId: string, date: string) =>
  axios.get(`/classes/group/${groupId}/getByDate`, {data: {date}});

export const ClassesAPI = {
  getClassesByGroup,
};
