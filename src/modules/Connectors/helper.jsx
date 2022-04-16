import { ReactComponent as EditIcon } from '../../layout/assets/folderItemEdit.svg';
import { ReactComponent as BinIcon } from '../../layout/assets/folderItemBin.svg';
import { ReactComponent as CreateCopyIcon } from '../../layout/assets/folderItemCreateCopy.svg';
import { ReactComponent as SettingsIcon } from '../../layout/assets/folderItemSettings.svg';
import { ReactComponent as CheckConnectionIcon } from '../../layout/assets/folderItemConnectionCheck.svg';
import { ReactComponent as CreateUniverseIcon } from '../../layout/assets/folderItemCreateUniverse.svg';

export const sortFoldersAndItems = folderChildren => {
  if (!folderChildren) return null;

  const folders = folderChildren
    ?.filter(i => i.isFolder)
    .sort((a, b) =>
      a.folder_name.localeCompare(b.folder_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );

  const items = folderChildren
    ?.filter(i => !i.isFolder)
    .sort((a, b) =>
      a.connect_name.localeCompare(b.connect_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );

  return [...folders, ...items];
};

export const FOLDER_ITEM_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать',
    icon: <EditIcon />,
    action: 'edit'
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete'
  },
  {
    title: 'Создать копию',
    icon: <CreateCopyIcon />,
    action: 'create copy'
  },
  {
    title: 'Настройки',
    icon: <SettingsIcon />,
    action: 'settings'
  },
  {
    title: 'Проверка соединения',
    icon: <CheckConnectionIcon />,
    action: 'connection check'
  },
  {
    title: 'Создать юниверс',
    icon: <CreateUniverseIcon />,
    action: 'create universe'
  }
];

export const FOLDER_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать',
    icon: <EditIcon />,
    action: 'edit'
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete'
  },
  {
    title: 'Создать копию',
    icon: <CreateCopyIcon />,
    action: 'create copy'
  }
];

export const connectorsTableHeader = [
  { name: 'Имя' },
  { name: 'Тип соединения' },
  { name: 'Источник' },
];