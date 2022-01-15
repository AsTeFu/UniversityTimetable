import classNames from 'classnames';
import {Group} from '../../typings';

export type GroupsProps = {
  groups: Group[];
  onSelect: (group: Group) => void;
  selected: string;
};

export const Groups: React.FC<GroupsProps> = ({groups, onSelect, selected}) => (
  <ul className="flex flex-row gap-2 text-xl">
    {groups.map((group) => (
      <li key={group.groupId}>
        <button
          onClick={() => onSelect(group)}
          className={classNames(
            'border-2 rounded-md p-2 hover:bg-sky-200 hover:border-sky-400',
            selected === group.groupId &&
              'bg-sky-500 border-sky-600 hover:bg-sky-600 hover:border-sky-700',
          )}>
          {group.groupId}
        </button>
      </li>
    ))}
  </ul>
);
