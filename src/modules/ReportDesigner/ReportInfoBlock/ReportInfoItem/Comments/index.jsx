import PropTypes from 'prop-types';
import React, {useState} from 'react';

import Divider from '../../../../../common/components/Divider';
import Lists from '../../../../../layout/assets/queryPanel/lists.svg';
import Comment from './comment';
import styles from './Comments.module.scss';
import ReportInfoItem from '..';

const usersComments = [
    {
        name: 'Филипп',
        surname: 'Киркоров',
        date: '1.09.2019',
        time: '10:45',
        id: 1,
        comment:
            'Чёт накатило и я создал первый с своей жизни Юниверс из того, что было под рукойЧёт накатило и я создал первый с своей жизни Юниверс из того, что было под рукойЧёт накатило и я создал первый с своей жизни Юниверс из того, что было под рукой.',
    },
    {
        name: 'Максим',
        surname: 'Галкин',
        date: '28.07.2015',
        time: '12:16',
        id: 2,
        comment: 'Отличный Юниверс получился.',
    },
    {
        name: 'Алла',
        surname: 'Пугачева',
        date: '15.12.2021',
        time: '14:09',
        id: 3,
        comment: 'Тоже нужен Юниверс.',
    },
    {
        name: 'Леонид',
        surname: 'Якубович',
        date: '31.03.2017',
        time: '20:03',
        id: 4,
        comment: 'За лучший Юниверс приз-автомобиль!',
    },
];

const Comments = ({title}) => {
    const [comments, setComments] = useState(usersComments);
    const [val, setVal] = useState('');

    const onDeleteComment = (id) =>
        setComments(comments.filter((item) => item.id !== id));

    const handleChange = (e) => setVal(e.target.value);

    const onAddComment = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setComments([
                ...comments,
                {
                    name: 'newUser',
                    surname: 'newSurname',
                    date: '10.05.2022',
                    time: '15.34',
                    id: (Math.random() * 100).toFixed(),
                    comment: val,
                },
            ]);
            setVal('');
        }
    };

    return (
        <ReportInfoItem title={title}>
            <div className={styles.wrapper}>
                <Lists className={styles.listIcon} />
                <textarea
                    type="text"
                    name="comments"
                    className={styles.textarea}
                    onChange={handleChange}
                    onKeyPress={onAddComment}
                    value={val}
                />
                <Divider color="#FFFFFF" />
                <div className={styles.comments}>
                    {comments.map((item) => (
                        <Comment
                            key={item.id}
                            props={item}
                            handleDelete={onDeleteComment}
                        />
                    ))}
                </div>
            </div>
        </ReportInfoItem>
    );
};

export default Comments;

Comments.propTypes = {
    title: PropTypes.string,
};

Comments.defaultProps = {
    title: '',
};
