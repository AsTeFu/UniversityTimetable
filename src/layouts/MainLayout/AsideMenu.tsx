import classNames from 'classnames';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

const CustomLink: React.FC<{to: string}> = ({to, children}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({path: resolved.pathname, end: true});

  console.log(match);

  return (
    <li>
      <Link
        className={classNames(
          'cursor-pointer flex text-lg border-2 rounded-sm p-2 hover:bg-sky-300 hover:border-sky-300 border-sky-200',
          match && 'bg-sky-200 border-sky-300',
        )}
        to={to}>
        {children}
      </Link>
    </li>
  );
};

export const AsideMenu = () => (
  <aside className="flex flex-col flex-none gap-5 p-5 border-2">
    <h2 className="text-xl">Меню</h2>
    <ul className="gap-2 flex flex-col">
      <CustomLink to="students">Для студента</CustomLink>
      <CustomLink to="teachers">Для преподавателя</CustomLink>
    </ul>
  </aside>
);
