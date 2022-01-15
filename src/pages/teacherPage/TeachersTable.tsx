import moment from 'moment';
import {useMemo} from 'react';
import {Column, Data, Table} from '../../components';
import {useClassesByTeacherAndDateQuery} from '../../redux/api/classes';

enum HeadersIds {
  Name = 'name',
  Type = 'type',
  Groups = 'groups',
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
    Header: 'Группы',
    accessor: HeadersIds.Groups,
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
  teacherId: string;
};

export const TeachersTable: React.FC<UniverTableProps> = ({
  date,
  teacherId,
}) => {
  const {isLoading, data: classes = []} = useClassesByTeacherAndDateQuery({
    teacherId,
    date: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
  });

  const data = useMemo<Data<HeadersIds>[]>(
    () =>
      classes.map(({name, type: {type}, groups, classroom, dates}) => ({
        [HeadersIds.Name]: name,
        [HeadersIds.Type]: type,
        [HeadersIds.Groups]: groups.map(({groupId}) => groupId).join(', '),
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
        Расписание для вас на{' '}
        {moment(date).locale('ru').format('DD MMMM, dddd')}
      </h1>

      <Table columns={columns} data={data} />
    </div>
  );
};
