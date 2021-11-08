/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatClearIcon from '@material-ui/icons/FormatClear';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';

import { FONT_LIST, FONT_SIZE } from '../../../constants/common';
import { transformOptions } from '../../../helpers/common';
import SectionGroup from '.';
import ColorPicker from '../../ColorPicker';
import Select from '../../Select';

import styles from './SectionGroup.module.scss';
import PaddingsConfig from './PaddingsConfig';
import BordersConfig from './BordersConfig';

function StyleFormatter({ onChange, isHeader }) {
  return (
    <div>
      <SectionGroup
        title="Font"
        actions={[
          {
            id: 'font-family',
            component: (
              <Select
                name="fontfamily"
                options={transformOptions(FONT_LIST)}
                onSelectItem={fontFamily =>
                  onChange({
                    styles: { fontFamily },
                    isHeader
                  })
                }
              />
            )
          },
          {
            id: 'font-size',
            component: (
              <Select
                name="fsize"
                options={transformOptions(FONT_SIZE)}
                onSelectItem={fontSize =>
                  onChange({
                    styles: { fontSize },
                    isHeader
                  })
                }
              />
            )
          }
        ]}
      />
      <SectionGroup
        title="Format"
        actions={[
          {
            id: 'BOLD',
            name: 'Bold Text',
            icon: <FormatBoldIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { fontWeight: 'bold' },
                isHeader
              })
          },
          {
            id: 'ITALIC',
            name: 'Insert graph',
            icon: <FormatItalicIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { fontStyle: 'italic' },
                isHeader
              })
          },

          {
            id: 'BACK_COLOR',
            name: 'Insert text',
            component: (
              <ColorPicker
                icon={<FormatColorFillIcon className={styles.icon} />}
                className={styles.icon}
                onChangeColor={color =>
                  onChange({
                    styles: { backgroundColor: color },
                    isHeader
                  })
                }
              />
            )
          },
          {
            id: 'FONT_COLOR',
            name: 'Insert text',
            component: (
              <ColorPicker
                icon={<FormatColorTextIcon className={styles.icon} />}
                className={styles.icon}
                onChangeColor={color =>
                  onChange({
                    styles: { color },
                    isHeader
                  })
                }
              />
            )
          },
          {
            id: 'CLEAR_STYLE',
            name: 'Insert text',
            icon: <FormatClearIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: {},
                isHeader
              })
          }
        ]}
      />
      <SectionGroup
        title="Align"
        actions={[
          {
            id: 'LEFT_ALIGN',
            name: 'Insert text',
            icon: <FormatAlignLeftIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'left' },
                isHeader
              })
          },
          {
            id: 'CENTER_ALIGN',
            name: 'Insert text',
            icon: <FormatAlignCenterIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'center' },
                isHeader
              })
          },
          {
            id: 'JUSTIFY_ALIGN',
            name: 'Insert text',
            icon: <FormatAlignJustifyIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'justify' },
                isHeader
              })
          },
          {
            id: 'RIGHT_ALIGN',
            name: 'Insert text',
            icon: <FormatAlignRightIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'right' },
                isHeader
              })
          }
        ]}
      />
      <SectionGroup
        title="Paddings"
        actions={[
          {
            id: 'paddings',
            component: (
              <PaddingsConfig
                isHeader={isHeader}
                onChange={params => onChange(params)}
              />
            )
          }
        ]}
      />
      <SectionGroup
        title="Borders"
        actions={[
          {
            id: 'borders',
            component: (
              <BordersConfig
                isHeader={isHeader}
                onChange={params => onChange(params)}
              />
            )
          }
        ]}
      />
    </div>
  );
}

StyleFormatter.propTypes = {
  onChange: PropTypes.func,
  isHeader: PropTypes.bool
};

export default StyleFormatter;
