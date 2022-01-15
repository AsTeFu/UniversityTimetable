import moment from 'moment';
import {useState} from 'react';
import {useTeachersQuery} from '../../redux/api/teachers';
import {TeachersTable} from './TeachersTable';

export const TeacherPage = () => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [teacherId, setTeacherId] = useState('');
  const {isLoading, data: teachers = []} = useTeachersQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
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

        <section className="mt-4">
          <input
            className="border-2 p-4 w-full text-lg"
            list="teacher"
            placeholder="Как вас зовут?"
            onChange={(e) => {
              const name = e.target.value;
              const index = teachers.findIndex(
                (t) => `${t.surname} ${t.name} ${t.thirdName}` === name,
              );

              setTeacherId(teachers[index].teacherId);
            }}
          />

          <datalist id="teacher">
            {teachers.map((teacher) => (
              <option
                key={teacher.teacherId}
                value={`${teacher.surname} ${teacher.name} ${teacher.thirdName}`}
              />
            ))}
          </datalist>
        </section>
      </section>

      {teacherId ? (
        <TeachersTable date={date} teacherId={teacherId} />
      ) : (
        <p className="text-lg">Сначала кто ты?</p>
      )}
    </div>
  );
};
