import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

import { ReactComponent as AddTableIcon } from '../../../layout/assets/icons/tables_add.svg';
import { ReactComponent as SearchIcon } from '../../../layout/assets/icons/search.svg';
import { ReactComponent as ViewsIcon } from '../../../layout/assets/icons/views_show.svg';
import { ReactComponent as FiltersIcon } from '../../../layout/assets/icons/tables_filters.svg';

function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectTab = value => () => {
    setActiveTab(value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div
            className={clsx(styles.tab, activeTab === 0 && styles.activeTab)}
            onClick={handleSelectTab(0)}
          >
            Таблицы
          </div>
          <div
            className={clsx(styles.tab, activeTab === 1 && styles.activeTab)}
            onClick={handleSelectTab(1)}
          >
            Объекты
          </div>
        </div>

        <div className={styles.actions}>
          <div>-</div>
          <div>x</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tableActions}>
          <div>
            <AddTableIcon />
          </div>
          <div className={styles.tableFilters}>
            <div>
              <SearchIcon />
            </div>
            <div>
              <ViewsIcon />
            </div>
            <div>
              <FiltersIcon />
            </div>
          </div>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              style={{ marginRight: 10 }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0V3L3 3V0H0ZM4 0V3L7 3V0H4ZM8 3V0H11V3L8 3ZM12 0V3L15 3V0H12ZM0 7V4H3V7H0ZM0 8V11H3V8H0Z"
                fill="url(#paint0_linear_262_1886)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5L7 5V4H4V5ZM4 11L7 11V10H4V11ZM11 5L8 5V4H11V5ZM8 11L11 11V10H8V11ZM15 5L12 5V4H15V5ZM12 11L15 11V10H12V11ZM7 9L4 9V8H7V9ZM8 9L11 9V8H8V9ZM15 9L12 9V8H15V9ZM4 7L7 7V6L4 6V7ZM11 7L8 7V6L11 6V7ZM12 7L15 7V6L12 6V7Z"
                fill="url(#paint1_linear_262_1886)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_262_1886"
                  x1="12.3214"
                  y1="-3.53571"
                  x2="2.48076"
                  y2="23.3025"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC700" />
                  <stop offset="1" stopColor="#DF0909" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_262_1886"
                  x1="12.593"
                  y1="2.14676"
                  x2="10.069"
                  y2="13.4611"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1AE3D7" />
                  <stop offset="1" stopColor="#0945DF" />
                </linearGradient>
              </defs>
            </svg>
            Таблица 1
          </p>
          <p style={{ margin: '0px 0px 0px 10px' }}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              style={{ marginRight: 10 }}
            >
              <rect
                y="3"
                width="3"
                height="15"
                transform="rotate(-90 0 3)"
                fill="url(#paint0_linear_273_1328)"
              />
              <rect
                x="11"
                y="2"
                width="4"
                height="9"
                fill="url(#paint1_linear_273_1328)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.42551 8.29591C6.78529 8.02057 7.29209 7.88297 7.94604 7.88297H8.77376V7.43007C8.77376 7.16365 8.70227 6.95279 8.55917 6.79734C8.41606 6.64641 8.20761 6.57088 7.93379 6.57088C7.69258 6.57088 7.50043 6.63522 7.35745 6.76403C7.21435 6.88392 7.14286 7.04377 7.14286 7.24358L6.11895 7.25024V7.2236C6.09847 6.81958 6.2661 6.46206 6.62171 6.15129C6.97327 5.83599 7.43311 5.6784 8.00123 5.6784C8.54899 5.6784 8.9924 5.82932 9.3317 6.1313C9.66279 6.43768 9.82833 6.875 9.82833 7.44339V9.72122C9.82833 9.92995 9.84268 10.1319 9.87125 10.3273C9.89577 10.5226 9.93869 10.7113 10 10.8934H8.92704C8.89025 10.769 8.8596 10.6426 8.83507 10.5138C8.8065 10.3894 8.78811 10.2674 8.77989 10.1475C8.63679 10.3873 8.4488 10.5892 8.21582 10.7536C7.97462 10.9178 7.70693 11 7.41263 11C6.92214 11 6.54605 10.8601 6.28449 10.5804C6.01876 10.3096 5.88596 9.93208 5.88596 9.44815C5.88596 8.95528 6.06585 8.57125 6.42551 8.29591ZM1.87002 8.32255H3.54384L2.72839 5.60514H2.69773L1.87002 8.32255ZM3.21888 4L5.40773 10.8934H4.31024L3.83201 9.28164H1.58185L1.09135 10.8934H0L2.21336 4H3.21888ZM6.94666 9.42816C6.94666 9.62344 7.00589 9.78116 7.12447 9.90105C7.24304 10.0165 7.41263 10.0742 7.63335 10.0742C7.89491 10.0742 8.13403 10.001 8.35071 9.85442C8.56321 9.71243 8.70423 9.54592 8.77376 9.3549V8.59562H7.93379C7.62306 8.59562 7.38197 8.67994 7.2103 8.84872C7.03458 9.01296 6.94666 9.20611 6.94666 9.42816Z"
                fill="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_273_1328"
                  x1="2.46428"
                  y1="-1.82143"
                  x2="-11.8522"
                  y2="3.90517"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC700" />
                  <stop offset="1" stopColor="#DF0909" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_273_1328"
                  x1="14.1247"
                  y1="-0.382738"
                  x2="6.69931"
                  y2="9.03128"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1AE3D7" />
                  <stop offset="1" stopColor="#0945DF" />
                </linearGradient>
              </defs>
            </svg>
            колонка 1
          </p>
          <p style={{ margin: '0px 0px 0px 10px' }}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              style={{ marginRight: 10 }}
            >
              <rect
                y="3"
                width="3"
                height="15"
                transform="rotate(-90 0 3)"
                fill="url(#paint0_linear_273_1328)"
              />
              <rect
                x="11"
                y="2"
                width="4"
                height="9"
                fill="url(#paint1_linear_273_1328)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.42551 8.29591C6.78529 8.02057 7.29209 7.88297 7.94604 7.88297H8.77376V7.43007C8.77376 7.16365 8.70227 6.95279 8.55917 6.79734C8.41606 6.64641 8.20761 6.57088 7.93379 6.57088C7.69258 6.57088 7.50043 6.63522 7.35745 6.76403C7.21435 6.88392 7.14286 7.04377 7.14286 7.24358L6.11895 7.25024V7.2236C6.09847 6.81958 6.2661 6.46206 6.62171 6.15129C6.97327 5.83599 7.43311 5.6784 8.00123 5.6784C8.54899 5.6784 8.9924 5.82932 9.3317 6.1313C9.66279 6.43768 9.82833 6.875 9.82833 7.44339V9.72122C9.82833 9.92995 9.84268 10.1319 9.87125 10.3273C9.89577 10.5226 9.93869 10.7113 10 10.8934H8.92704C8.89025 10.769 8.8596 10.6426 8.83507 10.5138C8.8065 10.3894 8.78811 10.2674 8.77989 10.1475C8.63679 10.3873 8.4488 10.5892 8.21582 10.7536C7.97462 10.9178 7.70693 11 7.41263 11C6.92214 11 6.54605 10.8601 6.28449 10.5804C6.01876 10.3096 5.88596 9.93208 5.88596 9.44815C5.88596 8.95528 6.06585 8.57125 6.42551 8.29591ZM1.87002 8.32255H3.54384L2.72839 5.60514H2.69773L1.87002 8.32255ZM3.21888 4L5.40773 10.8934H4.31024L3.83201 9.28164H1.58185L1.09135 10.8934H0L2.21336 4H3.21888ZM6.94666 9.42816C6.94666 9.62344 7.00589 9.78116 7.12447 9.90105C7.24304 10.0165 7.41263 10.0742 7.63335 10.0742C7.89491 10.0742 8.13403 10.001 8.35071 9.85442C8.56321 9.71243 8.70423 9.54592 8.77376 9.3549V8.59562H7.93379C7.62306 8.59562 7.38197 8.67994 7.2103 8.84872C7.03458 9.01296 6.94666 9.20611 6.94666 9.42816Z"
                fill="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_273_1328"
                  x1="2.46428"
                  y1="-1.82143"
                  x2="-11.8522"
                  y2="3.90517"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC700" />
                  <stop offset="1" stopColor="#DF0909" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_273_1328"
                  x1="14.1247"
                  y1="-0.382738"
                  x2="6.69931"
                  y2="9.03128"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1AE3D7" />
                  <stop offset="1" stopColor="#0945DF" />
                </linearGradient>
              </defs>
            </svg>
            колонка 2
          </p>
          <p style={{ margin: '0px 0px 0px 10px' }}>
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              style={{ marginRight: 10 }}
            >
              <rect
                y="3"
                width="3"
                height="15"
                transform="rotate(-90 0 3)"
                fill="url(#paint0_linear_273_1328)"
              />
              <rect
                x="11"
                y="2"
                width="4"
                height="9"
                fill="url(#paint1_linear_273_1328)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.42551 8.29591C6.78529 8.02057 7.29209 7.88297 7.94604 7.88297H8.77376V7.43007C8.77376 7.16365 8.70227 6.95279 8.55917 6.79734C8.41606 6.64641 8.20761 6.57088 7.93379 6.57088C7.69258 6.57088 7.50043 6.63522 7.35745 6.76403C7.21435 6.88392 7.14286 7.04377 7.14286 7.24358L6.11895 7.25024V7.2236C6.09847 6.81958 6.2661 6.46206 6.62171 6.15129C6.97327 5.83599 7.43311 5.6784 8.00123 5.6784C8.54899 5.6784 8.9924 5.82932 9.3317 6.1313C9.66279 6.43768 9.82833 6.875 9.82833 7.44339V9.72122C9.82833 9.92995 9.84268 10.1319 9.87125 10.3273C9.89577 10.5226 9.93869 10.7113 10 10.8934H8.92704C8.89025 10.769 8.8596 10.6426 8.83507 10.5138C8.8065 10.3894 8.78811 10.2674 8.77989 10.1475C8.63679 10.3873 8.4488 10.5892 8.21582 10.7536C7.97462 10.9178 7.70693 11 7.41263 11C6.92214 11 6.54605 10.8601 6.28449 10.5804C6.01876 10.3096 5.88596 9.93208 5.88596 9.44815C5.88596 8.95528 6.06585 8.57125 6.42551 8.29591ZM1.87002 8.32255H3.54384L2.72839 5.60514H2.69773L1.87002 8.32255ZM3.21888 4L5.40773 10.8934H4.31024L3.83201 9.28164H1.58185L1.09135 10.8934H0L2.21336 4H3.21888ZM6.94666 9.42816C6.94666 9.62344 7.00589 9.78116 7.12447 9.90105C7.24304 10.0165 7.41263 10.0742 7.63335 10.0742C7.89491 10.0742 8.13403 10.001 8.35071 9.85442C8.56321 9.71243 8.70423 9.54592 8.77376 9.3549V8.59562H7.93379C7.62306 8.59562 7.38197 8.67994 7.2103 8.84872C7.03458 9.01296 6.94666 9.20611 6.94666 9.42816Z"
                fill="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_273_1328"
                  x1="2.46428"
                  y1="-1.82143"
                  x2="-11.8522"
                  y2="3.90517"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFC700" />
                  <stop offset="1" stopColor="#DF0909" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_273_1328"
                  x1="14.1247"
                  y1="-0.382738"
                  x2="6.69931"
                  y2="9.03128"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1AE3D7" />
                  <stop offset="1" stopColor="#0945DF" />
                </linearGradient>
              </defs>
            </svg>
            колонка 3
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
