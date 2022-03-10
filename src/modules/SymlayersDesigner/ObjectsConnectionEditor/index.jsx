import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import Modal from '../../../common/components/Modal';
import Button from '../../../common/components/Button';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';

const ObjectsConnectionEditor = ({visible}) => {
  const dispatch = useDispatch();
  const modalContent = () => {
    return (
      <div>
        dfdsfsdfdsf
        <Button>sdf</Button>
      </div>
    )
  };

  return (
    <Modal
      title='Изменить связь'
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={() => dispatch(setObjectsConnectionsModal(false))}
    />
  )
};

export default ObjectsConnectionEditor;

ObjectsConnectionEditor.propTypes = {
  visible: PropTypes.bool
}
