import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setLinks } from '../../../../data/reducers/schemaDesigner';
import Button from "../../../../common/components/Button";
import Modal from "../../../../common/components/Modal";
import styles from './DeleteItemModal.module.scss';

const DeleteItemModal = ({ onClose, linkId }) => {
  const dispatch = useDispatch();

  const links = useSelector(state => state.app.schemaDesigner.links);

	const deleteLink = () => {
    const result = links.filter(l => {
      return (l.id !== linkId);
    });

    dispatch(setLinks(result));
  }

	const confirmContent = (
  <div className={styles.message}>
    Данная связь будет удаленa. 
    <br />
    Вы уверены что хотите продолжить?
  </div>
	)

	const buttonsFooter = (
  <div className={styles.footer}>
    <Button buttonStyle='BIG_ORANGE' onClick={deleteLink}> Удалить </Button>
    <Button buttonStyle='BIG_BLUE' onClick={onClose}> Отмена </Button>
  </div>
	)

	return (
  <Modal
    className={styles.root}
    visible
    onClose={onClose}
    title="Удаление связи"
    content={confirmContent}
    footer={buttonsFooter}
		/>
	)
}

export default DeleteItemModal;

DeleteItemModal.propTypes = {
	onClose: PropTypes.func,
	linkId: PropTypes.string
}