import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import HomePageButton from './HomePageButton/HomePageButton';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import navigationMenu from '../../navigation';
import { ReactComponent as ExplorerIcon } from '../../layout/assets/icons/button_plus.svg';
import FloatingButton from '../../common/components/FloatingButton';
import option from '../../common/components/Select/Option';
import { testNewFunc } from '../../data/actions/auth';

const RECENTS = [
  { id: 1, title: 'Отчет 1' },
  { id: 2, title: 'Отчет 2' },
  { id: 3, title: 'Отчет 3' }
];

const FAVORITES = [
  { id: 1, title: 'Избранный Отчет 1' },
  { id: 2, title: 'Избранный Отчет 2' }
];

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(PAGE.DASHBOARD));
  }, []);

  const handleClick = () => {
    console.log('click create');
  };

  const serverResponse = useSelector(state => state.app.auth.serverResponse);
  const [params, setParams] = useState(null);
  const [request, setRequest] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [manualParams, setManualParams] = useState('');

  const VALUES=[
    {code: 'REPOS.GET_SPECIAL_FOLDER', params: { folderType: 'USER' }},
    {code: 'REPOS.BLOCK_OBJ', params: { id: 10020, isBlock: 0 }},
    {code: 'REPOS.GET_GROUP', params: { id: 10016 }},
    {code: 'REPOS.GET_OBJ', params: { id: 10001 }},
    {code: 'REPOS.FIND_USER', params: { login: 'test' }},
    {code: 'REPOS.GET_USER', params: { id: 10001 }},
    {code: 'REPOS.SET_USER', params: { data: {id: 10021, user_pass: 'test4'} }},
    {code: 'REPOS.GET_CHILDS', params: { id: 10002, startIndex: 0 }},
    {code: 'REPOS.GET_NEW_OBJ', params: { kind: "FLD" }},
  ]

  const handleNewFuncSelect = (e) => {
    const func = VALUES.find(item => item.code === e.target.value);
    setParams(func.params);
    setRequest(func.code);
    dispatch(testNewFunc(func));
  };

  const token = localStorage.getItem('token');

  const handleManualFunc = () => {
    const func = {
      code: manualCode,
      params: manualParams,
    }
    setParams(func.params);
    setRequest(func.code);
    dispatch(testNewFunc(func));
  }

  return (
    <div className={styles.root}>
      <div className={styles.requestWrapper}>
        <span>Проверка запросов к новому серверу</span>
        <div className={styles.newServerManual}>
          <span>Введите запрос вручную</span>
          <span>Code:</span>
          <input type='text' id='manCode' onChange={e => setManualCode(e.target.value)} />
          <span>Params:</span>
          <input type='text' id='manParams' onChange={e => setManualParams(e.target.value)} />
          <button onClick={() => handleManualFunc()} type="submit">Отправить запрос</button>
        </div>
        <div className={styles.newServerContainer}>
          <select name='newCommand' id='newCommand' onChange={(e) => handleNewFuncSelect(e)}>
            <option value='none'>Выберите запрос</option>
            { VALUES.map(item => {
              return <option key={Math.random(Date.now())} value={item.code}>{item.code}</option>
            }) }
          </select>
          <span>
            Запрос:
            {JSON.stringify(request)}
          </span>
          <span>
            Параметры запроса:
            {JSON.stringify(params)}
          </span>
          <span>
            Токен:
            {token}
          </span>
          <div className={styles.newServerResponse}>
            <span>Ответ сервера:</span>
            <div>
              <span>{JSON.stringify(serverResponse)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.row, styles.recent_bg)}>
        <p className={styles.rowTitle}>Недавние</p>
        <div className={styles.section}>
          {RECENTS.map(item => (
            <HomePageButton key={item.id} title={item.title} isDocument />
          ))}
        </div>
      </div>

      <div className={clsx(styles.row, styles.favorites_bg)}>
        <p className={styles.rowTitle}>Избранное</p>
        <div className={styles.section}>
          {FAVORITES.map(item => (
            <HomePageButton key={item.id} title={item.title} isDocument />
          ))}
        </div>
      </div>

      <div className={clsx(styles.row, styles.apps_bg)}>
        <p className={styles.rowTitle}>Приложения</p>
        <div className={clsx(styles.section, styles.apps)}>
          {navigationMenu &&
            navigationMenu.map(item => {
              return (
                <HomePageButton
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                />
              );
            })}
        </div>
      </div>
      <FloatingButton
        icon={<ExplorerIcon />}
        text="Создать отчет"
        onClick={handleClick}
      />
    </div>
  );
}

export default HomePage;
