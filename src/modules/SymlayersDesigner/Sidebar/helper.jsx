import BinIcon from '../../../layout/assets/folderItemBin.svg';
import EditIcon from '../../../layout/assets/folderItemEdit.svg';

const FOLDER_ITEM_DROPDOWN_ACTIONS = [
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

export default FOLDER_ITEM_DROPDOWN_ACTIONS;
