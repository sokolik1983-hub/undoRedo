import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Divider from '../../../../common/components/Divider';
import { EMPTY_STRING } from '../../../../common/constants/common';
import { setCreateObjectModal } from '../../../../data/actions/universes';
import FolderIcon from '../../../../layout/assets/openFolderIcon.svg';
import ObjectLayer from '../ObjectLayer/ObjectLayer';
import styles from './ObjectsPane.module.scss';
import ObjectsPaneActions from './ObjectsPaneActions/ObjectsPaneActions';

const ObjectsPane = () => {
  const dispatch = useDispatch();
  const objectsLayers = useSelector(
    (state) => state.app.schemaDesigner.objectsLayerList,
  );
  const [objectsList, setObjectsList] = useState([]);
  const [filterObjectsMode, setFilterObjectMode] = useState(null);
  const [selectObjectLayer, setSelectObjectLayer] = useState(EMPTY_STRING);
  useEffect(() => {
    setObjectsList(objectsLayers);
    setFilterObjectMode(null);
  }, [objectsLayers]);

  const handleObjectDrop = () => {
    dispatch(setCreateObjectModal(true));
  };

  const handleSelectObjectLayer = (id) => {
    setSelectObjectLayer(id);
    if (id === selectObjectLayer) {
      setSelectObjectLayer(EMPTY_STRING);
    }
  };

  return (
    <div
      className={styles.root}
      onDrop={(e) => {
        if (e.dataTransfer.getData('field')) {
          handleObjectDrop(JSON.parse(e.dataTransfer.getData('field')), e);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <ObjectsPaneActions
        objectsLayers={objectsLayers}
        setObjectsList={setObjectsList}
        filterObjectsMode={filterObjectsMode}
        setFilterObjectMode={setFilterObjectMode}
      />
      <Divider color="#0D6CDD" />
      <div className={styles.owner}>
        <FolderIcon />
        <span className={styles.ownerText}>Новый семантический слой</span>
      </div>
      <div className={styles.contentData}>
        <div className={styles.objectsData}>
          {objectsList?.map((object) => {
            if (
              filterObjectsMode === 'GAUGE' &&
              object.objectType === 'Показатель'
            )
              return (
                <ObjectLayer
                  key={object.id}
                  onSelect={handleSelectObjectLayer}
                  field={object}
                />
              );
            if (
              filterObjectsMode === 'MEAS' &&
              object.objectType === 'Измерение'
            )
              return (
                <ObjectLayer
                  key={object.id}
                  onSelect={handleSelectObjectLayer}
                  field={object}
                />
              );
            if (filterObjectsMode === 'ATTR' && object.objectType === 'Атрибут')
              return (
                <ObjectLayer
                  key={object.id}
                  onSelect={handleSelectObjectLayer}
                  field={object}
                />
              );
            if (!filterObjectsMode)
              return (
                <ObjectLayer
                  key={object.id}
                  onSelect={handleSelectObjectLayer}
                  field={object}
                />
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ObjectsPane;
