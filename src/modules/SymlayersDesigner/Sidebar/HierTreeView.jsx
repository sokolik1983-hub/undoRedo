/* eslint-disable react/prop-types */
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import Label from '@material-ui/icons/Label';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ReactComponent as TableIcon } from '../../../layout/assets/icons/table-icon.svg';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary
  },
  content: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  },
  checkBox: {
    padding: '0px 5px'
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    hasCheckBox,
    checked,
    onSelect,
    item,
    ...other
  } = props;

  function isChecked() {
    return lodash.find(checked, it => it.object_name === item.object_name);
  }

  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          {hasCheckBox ? (
            <Checkbox
              className={classes.checkBox}
              checked={checked && isChecked()}
              onChange={onSelect(item)}
            />
          ) : (
            <LabelIcon color="inherit" className={classes.labelIcon} />
          )}

          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      )}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function HierTreeView({ data, ...props }) {
  const [treeData, setTreeData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setTreeData(lodash.groupBy(data, item => item.schema));
    }
  }, [data]);

  function handleSelect(value) {
    props.onSelect(value);
  }

  return (
    <>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {lodash.keys(treeData).map((key, idx) => {
          return (
            <StyledTreeItem nodeId={idx} labelText={key} labelIcon={TableIcon}>
              {treeData[key].map(item => (
                <StyledTreeItem
                  nodeId={item.object_name}
                  labelText={item.object_name}
                  labelIcon={TableIcon}
                  labelInfo="-"
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  hasCheckBox
                  onSelect={handleSelect}
                  item={item}
                  {...props}
                />
              ))}
            </StyledTreeItem>
          );
        })}
      </TreeView>
    </>
  );
}
