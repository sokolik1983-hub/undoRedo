/* eslint-disable no-debugger */
import { ReactComponent as EditIcon } from '../../layout/assets/folder-item-edit.svg';
import { ReactComponent as BinIcon } from '../../layout/assets/folder-item-bin.svg';
import { ReactComponent as CreateCopyIcon } from '../../layout/assets/folder-item-create-copy.svg';
import { ReactComponent as SettingsIcon } from '../../layout/assets/folder-item-settings.svg';
import { ReactComponent as CheckConnectionIcon } from '../../layout/assets/folder-item-connection-check.svg';
import { ReactComponent as CreateUniverseIcon } from '../../layout/assets/folder-item-create-universe.svg';

export const sortFoldersAndItems = folderChildren => {
  const folders = folderChildren
    ?.filter(i => i?.isFolder)
    .sort((a, b) =>
      a.folder_name.localeCompare(b.folder_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );
  debugger;
  const items = folderChildren
    ?.filter(i => !i?.isFolder)
    .sort((a, b) =>
      a.name.localeCompare(b.connect_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );

  return [...folders, ...items];
};

export const FOLDER_ITEM_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать',
    icon: <EditIcon />
  },
  {
    title: 'Удалить',
    icon: <BinIcon />
  },
  {
    title: 'Создать копию',
    icon: <CreateCopyIcon />
  },
  {
    title: 'Настройки',
    icon: <SettingsIcon />
  },
  {
    title: 'Проверка соединения',
    icon: <CheckConnectionIcon />
  },
  {
    title: 'Создать юниверс',
    icon: <CreateUniverseIcon />
  }
];
