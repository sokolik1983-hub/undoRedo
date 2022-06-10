import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Modal from '../../../common/components/Modal';
import {setCreateObjectModal} from '../../../data/actions/universes';
import {addObjectLayer} from '../../../data/reducers/schemaDesigner';
import styles from './CreateObjectLayerModal.module.scss';
import {CREATE_OBJECT_MODAL_VALUES} from './createObjectModalConstants';
import DescriptionBlock from './ModalItem/DescriptionBlock';
import FooterBlock from './ModalItem/Footer';
import KeysBlock from './ModalItem/KeysBlock';
import PropertiesBlock from './ModalItem/PropertiesBlock';
import QueryBlock from './ModalItem/QueryBlock';
import TechInfoBlock from './ModalItem/TechInfoBlock';
import TextFieldItem from './ModalItem/TextFieldItem';
import ValueListConnectionBlock from './ModalItem/ValueListConnectionBlock';

const createObjectModalValues = {
    [CREATE_OBJECT_MODAL_VALUES.NAME]: '',
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_DATA_TYPE]: '',
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_TYPE]: '',
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_FUNCTION]: '',
    [CREATE_OBJECT_MODAL_VALUES.OBJECT_DESCRIPTION]: '',
    [CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD]: '',
    [CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD]: '',
    [CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT]: '',
    [CREATE_OBJECT_MODAL_VALUES.THIS_LIST_EDIT_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.REFRESH_BEFORE_USAGE_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.SHOW_HIERARCHY_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.EXPORT_BY_UNIVERSE_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.SEARCH_DELEGETION_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION]: '',
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_RESULTS_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_CONDITIONS_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.USE_IN_SORTINGS_CHECKBOX]: false,
    [CREATE_OBJECT_MODAL_VALUES.KEYS_DATA_TYPE]: '',
    [CREATE_OBJECT_MODAL_VALUES.KEYS_TYPE]: '',
    [CREATE_OBJECT_MODAL_VALUES.KEYS_SELECT_INPUT]: '',
    [CREATE_OBJECT_MODAL_VALUES.KEYS_WHERE_INPUT]: '',
    [CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT]: '',
    [CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT]: '',
    [CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT]: '',
};

const CreateObjectLayerModal = ({visible}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        return dispatch(setCreateObjectModal(false));
    };

    const checkBoxValues = [
        CREATE_OBJECT_MODAL_VALUES.THIS_LIST_EDIT_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.REFRESH_BEFORE_USAGE_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.SHOW_HIERARCHY_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.EXPORT_BY_UNIVERSE_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.SEARCH_DELEGETION_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.USE_IN_RESULTS_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.USE_IN_CONDITIONS_CHECKBOX,
        CREATE_OBJECT_MODAL_VALUES.USE_IN_SORTINGS_CHECKBOX,
    ];

    const content = (
        <Formik
            initialValues={createObjectModalValues}
            onSubmit={(values, event) => {
                handleClose();
                dispatch(
                    addObjectLayer({...values, id: `objLay_${Date.now()}`}),
                );
                event.preventDefault();
                navigate('/symlayers/create');
            }}
        >
            {({values, handleChange, handleSubmit}) => (
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
                            [CREATE_OBJECT_MODAL_VALUES.OBJECT_FUNCTION],
                        ]}
                        onChange={handleChange}
                    />
                    <DescriptionBlock
                        name="objectDescription"
                        value={
                            values[
                                CREATE_OBJECT_MODAL_VALUES.OBJECT_DESCRIPTION
                            ]
                        }
                        onChange={handleChange}
                    />
                    <QueryBlock
                        name={[
                            [CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD],
                            [CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD],
                        ]}
                        value={[
                            values[
                                CREATE_OBJECT_MODAL_VALUES.SELECT_QUERY_FIELD
                            ],
                            values[
                                CREATE_OBJECT_MODAL_VALUES.WHERE_QUERY_FIELD
                            ],
                        ]}
                        onChange={handleChange}
                    />
                    <ValueListConnectionBlock
                        checkBoxNames={checkBoxValues}
                        name={[
                            [CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT],
                            [CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION],
                        ]}
                        value={[
                            values[
                                CREATE_OBJECT_MODAL_VALUES.DEFAULT_LINK_INPUT
                            ],
                            values[CREATE_OBJECT_MODAL_VALUES.USAGE_PERMISSION],
                        ]}
                        onChange={handleChange}
                    />
                    <KeysBlock
                        name={[
                            [CREATE_OBJECT_MODAL_VALUES.KEYS_DATA_TYPE],
                            [CREATE_OBJECT_MODAL_VALUES.KEYS_SELECT_INPUT],
                            [CREATE_OBJECT_MODAL_VALUES.KEYS_WHERE_INPUT],
                            [CREATE_OBJECT_MODAL_VALUES.KEYS_TYPE],
                        ]}
                        onChange={handleChange}
                    />
                    <TechInfoBlock
                        name={[
                            [CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT],
                            [CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT],
                            [CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT],
                        ]}
                        value={[
                            values[CREATE_OBJECT_MODAL_VALUES.TECH_INFO_INPUT],
                            values[CREATE_OBJECT_MODAL_VALUES.DISPLAY_INPUT],
                            values[CREATE_OBJECT_MODAL_VALUES.ORIGIN_INPUT],
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
                title="Создать объект"
                visible={visible}
                content={content}
                dialogClassName={styles.dialog}
                withScroll={false}
                onClose={handleClose}
            />
        </div>
    );
};

export default CreateObjectLayerModal;

CreateObjectLayerModal.propTypes = {
    visible: PropTypes.bool,
};
