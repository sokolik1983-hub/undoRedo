import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Button from '../../../common/components/Button';
import Modal from '../../../common/components/Modal';
import {setSemantycLayerDataName} from '../../../data/actions/schemaDesigner';
// import Stats from './ModalItem/Stats';
import BusinessObjects from './ModalItem/BusinessObjects';
import Connect from './ModalItem/Connect';
import Control from './ModalItem/Control';
import Params from './ModalItem/Params';
import SqlItem from './ModalItem/SqlItem';
import TextFieldItem from './ModalItem/TextFieldItem';
import styles from './SemanticLayerModal.module.scss';

const semLayerValues = {
    name: 'Новый семантический слой 1',
    description: '',
    SQLRequest: [],
    SQLMultipleRoads: [],
    CartesianWork: '',
    control: [],
};

/**
 * @param onClick - функция, которая сработает, когда зароется модальное окно
 */

const SemanticLayerModal = ({onClick}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickAction = (event) => {
        onClick(event);
    };

    const content = (
        <Formik
            initialValues={semLayerValues}
            onSubmit={(data) => {
                navigate('/symlayers/create');
                dispatch(setSemantycLayerDataName(data.name));
                console.log(data);
            }}
        >
            {({values, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <TextFieldItem
                        title="Имя"
                        name="name"
                        className={styles.name}
                        onChange={handleChange}
                        value={values.name}
                        isAccordionOpened
                        isRequired
                    />
                    <TextFieldItem
                        title="Описание"
                        name="description"
                        className={styles.description}
                        onChange={handleChange}
                        value={values.description}
                        isTextarea
                    />
                    <Connect title="Cоединение" />
                    {/* <Stats
              title='Статистика'
            /> */}
                    {/* <TextFieldItem
              title='Комментарии'
              name='comments'
              className={styles.comments}
              onChange={handleChange}
              value={values.comments}
              isTextarea
            /> */}
                    <BusinessObjects title="Бизнес-объекты" />
                    <Control title="Управление" onChange={handleChange} />
                    <SqlItem title="SQL" onChange={handleChange} />
                    <Params title="Параметры" />
                    <div className={styles.buttonsWrapper}>
                        <Button type="submit" className={styles.save}>
                            Сохранить
                        </Button>
                        <Button
                            className={styles.cancel}
                            onClick={onClickAction}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
    return (
        <div>
            <Modal
                title="Создать семантический слой"
                visible
                content={content}
                withScroll={false}
                titleClassName={styles.title}
                dialogClassName={styles.dialog}
                headerClassName={styles.header}
                onClose={onClickAction}
            />
        </div>
    );
};

export default SemanticLayerModal;

SemanticLayerModal.propTypes = {
    onClick: PropTypes.func,
};

SemanticLayerModal.defaultProps = {
    onClick: () => {
        //something
    },
};
