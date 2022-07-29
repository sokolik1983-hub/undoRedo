import clsx from 'clsx';
import React, {
  FC,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import CloseIcon from '../../../layout/assets/close.svg';
import styles from './Modal.module.scss';

/**
 * @param visible - булево значение, определяющее, будет ли видно модальное окно
 * @param title - строка содержащая текст заголовка
 * @param content - нода, содержащая в себе контент по середину
 * @param footer - строка содержащая ноду для обработки событий окна
 * @param onClose - функция, которая сработает, когда зароется модальное окно
 * @param withModalScroll - булево значение, позволяющее скролить контент модального окна с внутреннем скроллом
 * @param titleClassName - классы для кастомизации title
 * @param dialogClassName - классы для кастомизации dialog
 * @param dialogClassName - классы для кастомизации header
 * @param bodyClassName - класс для тела окна
 */

interface IModalProps {
  modalClassName?: string;
  bodyClassName?: string;
  content?: ReactElement;
  contentClassName?: string;
  dialogClassName?: string;
  footer: ReactElement;
  withoutTitle?: boolean;
  headerClassName?: string;
  onClose: () => void;
  title?: string;
  titleClassName?: string;
  visible: boolean;
  withScroll?: boolean;
}

const Modal: FC<IModalProps> = ({
  withoutTitle,
  visible,
  title,
  content,
  footer,
  onClose,
  withScroll,
  modalClassName,
  titleClassName,
  dialogClassName,
  headerClassName,
  bodyClassName,
  contentClassName,
}) => {
  const [isModal, setIsModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [overlayChecker, setOverlayChecker] = useState<any | null>(null);
  useEffect(() => setIsModal(visible), [visible]);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    if (window) window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  if (!isModal) return null;

  const modalClasses = clsx(styles.modal, modalClassName, {
    [styles.modalWithScroll]: withScroll,
  });

  const modalDialogClasses = clsx(styles.modalDialog, dialogClassName, {
    [styles.modalDialogWithScroll]: withScroll,
  });

  const modalBodyClasses = clsx(
    styles.modalBody,
    { [styles.modalBodyWithScroll]: withScroll },
    bodyClassName,
  );

  const titleClasses = clsx(styles.modalTitle, titleClassName);
  const headerClasses = clsx(styles.modalHeader, headerClassName);

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (overlayChecker.className === target.className) {
      onClose();
      setIsModal(false);
    }
  };

  return (
    <div
      className={modalClasses}
      onMouseDown={(e: MouseEvent) => setOverlayChecker(e.target)}
      onClick={handleClose}
    >
      <div className={modalDialogClasses} onClick={(e) => e.stopPropagation()}>
        {!withoutTitle && (
          <div className={headerClasses}>
            <h3 className={titleClasses}>{title}</h3>
            <span className={styles.modalClose} onClick={handleClose}>
              <div className={styles.close}>
                <CloseIcon />
              </div>
            </span>
          </div>
        )}
        <div className={modalBodyClasses}>
          <div className={clsx(styles.modalContent, contentClassName)}>
            {content}
          </div>
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
