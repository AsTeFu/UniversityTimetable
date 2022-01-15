import {useState} from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {Groups} from '../../components/groups/Groups';
import {useGroupQuery} from '../../redux/api/classes';
import {UniverTable} from './UniverTable';

export const ClassesByGroup: React.FC = () => {
  const [groupId, setGroupId] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const {isLoading: groupsLoading, data: groups = []} = useGroupQuery({});

  if (groupsLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="flex flex-col gap-5 p-5 flex-1">
      <section>
        <h1 className="text-xl">Параметры</h1>

        <section>
          <h1>Дата</h1>

          <input
            type="date"
            name="calendar"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </section>

        <section>
          <h1>Группа</h1>

          <Groups
            groups={groups}
            selected={groupId}
            onSelect={(group) => setGroupId(group.groupId)}
          />
        </section>
      </section>

      {groupId ? (
        <UniverTable date={date} groupId={groupId} />
      ) : (
        <p className="text-lg">Сначала выбери группу</p>
      )}
    </div>
  );
};
