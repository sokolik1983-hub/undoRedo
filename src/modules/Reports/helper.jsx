import FavoriteIcon from '../../layout/assets/favoriteIcon.svg';
import BinIcon from '../../layout/assets/folderItemBin.svg';
import EditIcon from '../../layout/assets/folderItemEdit.svg';
import RemoveFromFavoritesIcon from '../../layout/assets/removeFromFavorites.svg';
import ShowIcon from '../../layout/assets/showIcon.svg';

export const sortFoldersAndItems = (folderChildren) => {
  if (!folderChildren) return null;

  const folders = folderChildren
    ?.filter((i) => i.kind === 'FLD')
    .sort((a, b) =>
      a.name.localeCompare(b.name, {
        ignorePunctuation: true,
        sensitivity: 'accent',
      }),
    );

  const items = folderChildren
    ?.filter((i) => i.kind !== 'FLD')
    .sort((a, b) =>
      a.name.localeCompare(b.name, {
        ignorePunctuation: true,
        sensitivity: 'accent',
      }),
    );

  return [...folders, ...items];
};

export const FOLDER_ITEM_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать имя',
    icon: <EditIcon />,
    action: 'edit',
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete',
  },
];

export const REPORT_STRUCTURE_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать имя',
    icon: <EditIcon />,
    action: 'edit',
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete',
  },
];

export const FOLDER_ITEM_DROPDOWN_ACTIONS_REPORTS = [
  {
    title: 'Редактировать',
    icon: <EditIcon />,
    action: 'edit',
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete',
  },
  {
    title: 'Добавить в Избранное',
    icon: <FavoriteIcon />,
    action: 'addToFavorites',
  },
  {
    title: 'Удалить из Избранных',
    icon: <RemoveFromFavoritesIcon />,
    action: 'removeFromFavorites',
  },
];

export const FOLDER_DROPDOWN_ACTIONS = [
  {
    title: 'Редактировать',
    icon: <EditIcon />,
    action: 'edit',
  },
  {
    title: 'Удалить',
    icon: <BinIcon />,
    action: 'delete',
  },
];

export const connectorsTableHeader = [{ name: 'Имя' }];
