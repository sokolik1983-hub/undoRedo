import BinIcon from '../../../layout/assets/folderItemBin.svg';
import EditIcon from '../../../layout/assets/folderItemEdit.svg';

export const sortFoldersAndItems = (folderChildren) => {
    if (!folderChildren) return null;

    const folders = folderChildren
        ?.filter((i) => i.isFolder)
        .sort((a, b) =>
            a.folder_name.localeCompare(b.folder_name, {
                ignorePunctuation: true,
                sensitivity: 'accent',
            }),
        );

    const items = folderChildren
        ?.filter((i) => !i.isFolder)
        .sort((a, b) =>
            a.connect_name.localeCompare(b.connect_name, {
                ignorePunctuation: true,
                sensitivity: 'accent',
            }),
        );

    return [...folders, ...items];
};

export const FOLDER_ITEM_DROPDOWN_ACTIONS = [
    {
        title: 'Восстановить',
        icon: <EditIcon />,
        action: 'edit',
    },
    {
        title: 'Удалить',
        icon: <BinIcon />,
        action: 'delete',
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

export const connectorsTableHeader = [
    {name: 'Имя'},
    {name: 'Тип файла'},
    {name: 'Дата удаления'},
];
