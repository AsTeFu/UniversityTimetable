import moment from 'moment';
import {useMemo} from 'react';
import {Column, Data, Table} from '../../components';
import {useClassesByGroupAndDateQuery} from '../../redux/api/classes';

enum HeadersIds {
  Name = 'name',
  Type = 'type',
  Teacher = 'teacher',
  Classroom = 'classroom',
  Time = 'time',
}

const columns: Column<HeadersIds>[] = [
  {
    Header: 'Тип',
    accessor: HeadersIds.Type,
  },
  {
    Header: 'Название',
    accessor: HeadersIds.Name,
  },

  {
    Header: 'Преподаватель',
    accessor: HeadersIds.Teacher,
  },
  {
    Header: 'Аудитория',
    accessor: HeadersIds.Classroom,
  },
  {
    Header: 'Время',
    accessor: HeadersIds.Time,
  },
];

export type UniverTableProps = {
  date: string;
  groupId: string;
};

export const UniverTable: React.FC<UniverTableProps> = ({date, groupId}) => {
  const {isLoading, data: classes = []} = useClassesByGroupAndDateQuery({
    groupId,
    date: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
  });

  const data = useMemo<Data<HeadersIds>[]>(
    () =>
      classes.map(({name, type: {type}, teacher, classroom, dates}) => ({
        [HeadersIds.Name]: name,
        [HeadersIds.Type]: type,
        [HeadersIds.Teacher]: `${teacher.surname} ${teacher.name[0]}.${teacher.thirdName[0]}`,
        [HeadersIds.Classroom]: `${classroom.universityBuilding}-${classroom.classroom}`,
        [HeadersIds.Time]: moment(dates[0]).locale('ru').format('HH:mm'),
      })),
    [classes],
  );

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (classes.length === 0) {
    return (
      <p className="text-lg">В этот день у тебя нет пар, отдыхай, работяга</p>
    );
  }

  return (
    <div>
      <h1 className="text-xl">
        Расписание для группы {groupId} на{' '}
        {moment(date).locale('ru').format('DD MMMM, dddd')}
      </h1>

      <Table columns={columns} data={data} />
    </div>
  );
};
