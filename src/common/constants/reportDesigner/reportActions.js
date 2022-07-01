/* eslint-disable import/prefer-default-export */
import { ReactComponent as RenameIcon } from '../../../layout/assets/queryPanel/selectOptionActions/editIcon.svg';
import { ReactComponent as CopyIcon } from '../../../layout/assets/queryPanel/selectOptionActions/createCopyIcon.svg';
import { ReactComponent as BinIcon } from '../../../layout/assets/queryPanel/selectOptionActions/binIcon.svg';

export const REPORT_ACTIONS = [
  {
    text: 'Переименовать',
    icon: <RenameIcon />,
    action: 'rename'
  },
  {
    text: 'Дублировать',
    icon: <CopyIcon />,
    action: 'copy'
  },
  {
    text: 'Удалить',
    icon: <BinIcon />,
    action: 'delete'
  }
];