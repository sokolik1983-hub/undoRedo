import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../../../../common/components/Divider';
import TablesPaneActions from './TablesPaneActions/TablesPaneActions';
import HierTreeView from '../HierTreeView';
import { ReactComponent as OwnerIcon } from '../../../../layout/assets/icons/ownerIcon.svg';
import styles from './TablesPane.module.scss';
import { setConnectorObjects } from '../../../../data/reducers/data';

const TablesPane = ({ onSelect }) => {
  const dispatch = useDispatch();
  const connectorObjects = useSelector(
    state => state.app.data.connectorObjects
  );

  if (connectorObjects?.tables?.length === 0) {
 const tempTables = [
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "PRE_SEARCH_TEST",
        "schema": "tern_analytics",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_email",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_license",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_main",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_okved",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_role_fl",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_role_ul",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egr_source",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrip_address",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrip_main",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_addresses",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_executive",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_executive_bad_data",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_executive_disq",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_founder",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_founder_bad_data",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_founder_encumbrance",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_founder_il_rights",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_founder_org_rights",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_invalid_address",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_main",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_managing_org",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_managing_org_bad_data",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_pred_succ_kfx",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_pred_succ_ul",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_reorg_change",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_reorg_ul",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_status",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "egrul_unit",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "exp_to_postgress",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    },
    {
        "catalog": "TA",
        "comment": "",
        "objectName": "zzz_test_test_search",
        "schema": "tern_analytics_egr",
        "type": "TABLE"
    }
]
  dispatch(setConnectorObjects({tables: tempTables, result: 0}));
  }

  console.log(connectorObjects)
  const [selectedSchemes, setSelectedSchemes] = useState([]);

  return (
    <div className={styles.root}>
      <TablesPaneActions setSelectedSchemes={setSelectedSchemes} />
      <Divider color="#0D6CDD" />
      <div className={styles.owner}>
        <OwnerIcon />
        <span>Owner</span>
      </div>
      <HierTreeView
        data={selectedSchemes.length ? selectedSchemes : connectorObjects.tables}
        onSelect={onSelect}
        isOpen={!!selectedSchemes?.length}
      />
    </div>
  );
};

export default TablesPane;

TablesPane.propTypes = {
  onSelect: PropTypes.func
};
