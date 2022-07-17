import BinIcon from '../../../layout/assets/queryPanel/selectOptionActions/binIcon.svg';
import CopyIcon from '../../../layout/assets/queryPanel/selectOptionActions/createCopyIcon.svg';
import RenameIcon from '../../../layout/assets/queryPanel/selectOptionActions/editIcon.svg';

export const REPORT_ACTIONS = [
    {
        text: 'Переименовать',
        icon: <RenameIcon />,
        action: 'rename',
    },
    {
        text: 'Дублировать',
        icon: <CopyIcon />,
        action: 'copy',
    },
    {
        text: 'Удалить',
        icon: <BinIcon />,
        action: 'delete',
    },
];
