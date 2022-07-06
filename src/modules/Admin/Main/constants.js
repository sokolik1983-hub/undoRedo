// eslint-disable-next-line import/prefer-default-export
export const JSON_EXAMPLE = {
  settings: [
    {
      groupKey: 'General',
      groupName: 'Основные настройки',
      groupElements: [
        {
          key: 'Version',
          name: 'Версия',
          description: 'Версия сервиса',
          isEditable: 0,
          editType: 'string',
          value: '2.0.1'
        },
        {
          key: 'Type',
          name: 'Тип сервиса',
          description: 'Тип сервиса',
          isEditable: 0,
          editType: 'string',
          value: 'Central'
        },
        {
          key: 'Address',
          name: 'IP-адрес',
          description: 'IP-адрес, по которому функционирует сервис',
          isEditable: 1,
          editType: 'string',
          value: '127.0.0.1:8084'
        }
      ]
    },
    {
      groupKey: 'Session',
      groupName: 'Настройки сессий',
      groupElements: [
        {
          key: 'maxLoginCount',
          name: 'Максимальное число пользователей',
          description:
            'Максимальное число пользователей, которые могут одновременно работать в системе',
          isEditable: 1,
          editType: 'range',
          value: 300,
          min: 1,
          max: 1000
        },
        {
          key: 'MaxMinutesLifetime',
          name: 'Время жизни токена',
          description: 'Срок действия сессии пользователя, в минутах',
          isEditable: 1,
          editType: 'range',
          value: 60,
          min: 1,
          max: 120
        },
        {
          key: 'PerMinutesRemove',
          name: 'Интервал удаления токенов',
          description:
            'Интервал времени, через которое производится автоматическое удаление сессий пользователей, не выполнявших никаких действий после истечения сессии, в минутах',
          isEditable: 1,
          editType: 'range',
          value: 15,
          min: 1,
          max: 120
        }
      ]
    },
    {
      groupKey: 'Logging',
      groupName: 'Настройки журналирования',
      groupElements: [
        {
          key: 'LogPath',
          name: 'Путь к логу',
          description:
            'Путь к файлу, в который сохраняется отладочный лог сервиса',
          isEditable: 1,
          editType: 'string',
          value: 'Central.log'
        },
        {
          key: 'LogLevel',
          name: 'Уровень отладки',
          description:
            'Уровень сообщений, записываемых в отладочный лог сервиса',
          isEditable: 1,
          editType: 'list',
          value: 'Debug',
          list: ['Debug', 'Warning', 'Critical', 'Fatal', 'Info']
        }
      ]
    },
    {
      groupKey: 'Other',
      groupName: 'Другие настройки',
      groupElements: [
        {
          key: 'Cache',
          name: 'Путь к кэшу',
          description:
            'Путь к папке, в которой сохраняются неотправленные сообщения для дальнейшей отправки',
          isEditable: 1,
          editType: 'string',
          value: '/cache/Central'
        }
      ]
    }
  ]
};

export const EDIT_TYPE = {
  range: 'range',
  string: 'string',
  list: 'list'
};
