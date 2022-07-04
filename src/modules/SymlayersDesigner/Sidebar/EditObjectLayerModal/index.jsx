import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditObjectLayerModal.module.scss';
import { CREATE_OBJECT_MODAL_VALUES } from '../../CreateObjectLayerModal/createObjectModalConstants';
import { setObjectLayer } from '../../../../data/reducers/schemaDesigner';
import TextFieldItem from '../../CreateObjectLayerModal/ModalItem/TextFieldItem';
import PropertiesBlock from '../../CreateObjectLayerModal/ModalItem/PropertiesBlock';
import DescriptionBlock from '../../CreateObjectLayerModal/ModalItem/DescriptionBlock';
import QueryBlock from '../../CreateObjectLayerModal/ModalItem/QueryBlock';
import ValueListConnectionBlock from '../../CreateObjectLayerModal/ModalItem/ValueListConnectionBlock';
import KeysBlock from '../../CreateObjectLayerModal/ModalItem/KeysBlock';
import TechInfoBlock from '../../CreateObjectLayerModal/ModalItem/TechInfoBlock';
import FooterBlock from '../../CreateObjectLayerModal/ModalItem/Footer';
import Modal from '../../../../common/components/Modal';
import { setEditObjectModal } from '../../../../data/actions/universes';
import { showToast } from '../../../../data/actions/app';

const EditObjectLayerModal = ({ visible }) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.app.ui.modalData);

  const editObjectModalValues = {
    [CREATE_OBJECT_MODAL_VALUES.NAME]: data.name,
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_DATA_TYPE]: data.objectDataType,
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_TYPE]: data.objectType,
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_FUNCTION]: data.objectFunction,
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_DESCRIPTION]:data.objectDescription,
    [CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD]: data.selectQueryField,
    [CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD]: data.whereQueryField,
    [CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT]: data.defaultLinkInput,
    [CREATE_OBJECT_MODAL_VALUES.THIS_LIST_EDIT_CHECKBOX]: data.thisListEditCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.REFRESH_BEFORE_USAGE_CHECKBOX]: data.refreshBeforeUsageCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.SHOW_HIERARCHY_CHECKBOX]: data.showHierarchyCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.EXPORT_BY_UNIVERSE_CHECKBOX]: data.exportByUniverseCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.SEARCH_DELEGETION_CHECKBOX]: data.searchDelegetionCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION]: data.usagePermission,
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_RESULTS_CHECKBOX]: data.useInResultsCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_CONDITIONS_CHECKBOX]: data.useInConditionsCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_SORTINGS_CHECKBOX]: data.useInSortingsCheckBox,
    [CREATE_OBJECT_MODAL_VALUES.KEYS_DATA_TYPE]: data.keysDataType,
    [CREATE_OBJECT_MODAL_VALUES.KEYS_TYPE]: data.keysType,
    [CREATE_OBJECT_MODAL_VALUES.KEYS_SELECT_INPUT]: data.keysSelectInput,
    [CREATE_OBJECT_MODAL_VALUES.KEYS_WHERE_INPUT]: data.keysWhereInput,
    [CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT]: data.techInfoInput,
    [CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT]: data.displayInput,
    [CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT]: data.originInput
  };

  const handleClose = () => {
    return dispatch(setEditObjectModal(false));
  };

  const checkBoxValues = [
    CREATE_OBJECT_MODAL_VALUES.THIS_LIST_EDIT_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.REFRESH_BEFORE_USAGE_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.SHOW_HIERARCHY_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.EXPORT_BY_UNIVERSE_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.SEARCH_DELEGETION_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.USE_IN_RESULTS_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.USE_IN_CONDITIONS_CHECKBOX,
    CREATE_OBJECT_MODAL_VALUES.USE_IN_SORTINGS_CHECKBOX
  ];
	
  const content = (
    <Formik
      initialValues={editObjectModalValues}
      onSubmit={(values, event) => {
        handleClose();
        console.log(values, data.id)
        dispatch(setObjectLayer({...values, id: data.id}));
        dispatch(showToast('success', 'Объект сохранен'));
        event.preventDefault();
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextFieldItem
            title="Имя"
            className={styles.name}
            id="name"
            name="name"
            value={values[CREATE_OBJECT_MODAL_VALUES.NAME]}
            onChange={handleChange}
          />
          <PropertiesBlock
            name={[
              [CREATE_OBJECT_MODAL_VALUES.OBJECT_DATA_TYPE],
              [CREATE_OBJECT_MODAL_VALUES.OBJECT_TYPE],
              [CREATE_OBJECT_MODAL_VALUES.OBJECT_FUNCTION]
            ]}
            value={[
              data.objectDataType,
              data.objectType,
              data.objectFunction
            ]}
            onChange={handleChange}
          />
          <DescriptionBlock
            name="objectDescription"
            value={values[CREATE_OBJECT_MODAL_VALUES.OBJECT_DESCRIPTION]}
            onChange={handleChange}
          />
          <QueryBlock
            name={[
              [CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD],
              [CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD]
            ]}
            value={[
              values[CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD],
              values[CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD]
            ]}
            onChange={handleChange}
          />
          <ValueListConnectionBlock
            checkBoxNames={checkBoxValues}
            name={[
              [CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT],
              [CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION]
            ]}
            value={[
              values[CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT],
              data.usagePermission || values[CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION],
            ]}
            checkboxes={[
              data.thisListEditCheckBox,
              data.refreshBeforeUsageCheckBox,
              data.showHierarchyCheckBox,
              data.exportByUniverseCheckBox,
              data.searchDelegetionCheckBox,
              data.useInResultsCheckBox,
              data.useInConditionsCheckBox,
              data.useInSortingsCheckBox
            ]}
            onChange={handleChange}
          />
          <KeysBlock
            name={[
              [CREATE_OBJECT_MODAL_VALUES.KEYS_DATA_TYPE],
              [CREATE_OBJECT_MODAL_VALUES.KEYS_SELECT_INPUT],
              [CREATE_OBJECT_MODAL_VALUES.KEYS_WHERE_INPUT],
              [CREATE_OBJECT_MODAL_VALUES.KEYS_TYPE]
            ]}
            value={[
              data.keysDataType,
              values[CREATE_OBJECT_MODAL_VALUES.KEYS_SELECT_INPUT],
              values[CREATE_OBJECT_MODAL_VALUES.KEYS_WHERE_INPUT],
              data.keysType || values[CREATE_OBJECT_MODAL_VALUES.KEYS_TYPE]
            ]}
            onChange={handleChange}
          />
          <TechInfoBlock
            name={[
              [CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT],
              [CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT],
              [CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT]
            ]}
            value={[
              values[CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT],
              values[CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT],
              values[CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT]
            ]}
            onChange={handleChange}
          />
          <FooterBlock onClose={handleClose} />
        </form>
      )}
    </Formik>
  );
  return (
    <div>
      <Modal
        title="Редактировать объект"
        visible={visible}
        content={content}
        dialogClassName={styles.dialog}
        withScroll={false}
        onClose={handleClose}
      />
    </div>
  );
};

export default EditObjectLayerModal;

EditObjectLayerModal.propTypes = {
  visible: PropTypes.bool,
};
