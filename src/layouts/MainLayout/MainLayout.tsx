import {Link} from 'react-router-dom';
import {AsideMenu} from './AsideMenu';

export const MainLayout: React.FC = ({children}) => (
  <>
    <header className="w-full py-6 px-4 bg-sky-500 text-white">
      <h1 className="container mx-auto text-4xl font-bold">
        <Link to="">Расписание универа</Link>
      </h1>
    </header>

    <main className="container mx-auto flex flex-row my-10 gap-10">
      <AsideMenu />
      {children}
    </main>
  </>
);
