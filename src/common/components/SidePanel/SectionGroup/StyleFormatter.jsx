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

function StyleFormatter({ onChange, isHeader, formattingElement }) {
  return (
    <div>
      <SectionGroup
        title="Шрифт"
        actions={[
          {
            id: 'font-family',
            component: (
              <Select
                defaultValue={formattingElement?.style?.fontFamily || ""}
                className={styles.select}
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
                defaultValue={formattingElement?.style?.fontSize || ""}
                className={styles.select}
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
        title="Формат"
        actions={[
          {
            id: 'BOLD',
            name: 'Жирный',
            icon: <FormatBoldIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { fontWeight: 'bold' },
                isHeader
              })
          },
          {
            id: 'ITALIC',
            name: 'Курсив',
            icon: <FormatItalicIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { fontStyle: 'italic' },
                isHeader
              })
          },

          {
            id: 'BACK_COLOR',
            name: 'Цвет фона',
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
            name: 'Цвет текста',
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
            name: 'Очистить',
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
        title="Выравнивание"
        actions={[
          {
            id: 'LEFT_ALIGN',
            name: 'По левому краю',
            icon: <FormatAlignLeftIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'left' },
                isHeader
              })
          },
          {
            id: 'CENTER_ALIGN',
            name: 'По центру',
            icon: <FormatAlignCenterIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'center' },
                isHeader
              })
          },
          {
            id: 'JUSTIFY_ALIGN',
            name: 'По ширине текста',
            icon: <FormatAlignJustifyIcon className={styles.icon} />,
            action: () =>
              onChange({
                styles: { textAlign: 'justify' },
                isHeader
              })
          },
          {
            id: 'RIGHT_ALIGN',
            name: 'По правому краю',
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
        title="Отступы"
        actions={[
          {
            id: 'paddings',
            component: (
              <PaddingsConfig
                formattingElement={formattingElement}
                isHeader={isHeader}
                onChange={params => onChange(params)}
              />
            )
          }
        ]}
      />
      <SectionGroup
        title="Границы"
        actions={[
          {
            id: 'borders',
            component: (
              <BordersConfig
                formattingElement={formattingElement}
                isHeader={isHeader}
                onChange={params => onChange(params)}
              />
            )
          }
        ]}
      />
      <SectionGroup
        title='Ширина столбца/ячейки'
        actions={[
          {
            id: 'width',
            component: (
              <div style={{display: 'flex'}}>
                <input
                  style={{ width: 50 }}
                  value={formattingElement?.style?.width}
                  onChange={event => {
                    onChange({
                      isHeader,
                      styles: {
                        width: `${event.target.value}px`
                      }
                    });
                  }}
                />
                <div>&nbsp;px</div>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}

StyleFormatter.propTypes = {
  onChange: PropTypes.func,
  isHeader: PropTypes.bool,
  formattingElement: PropTypes.object
};

export default StyleFormatter;
