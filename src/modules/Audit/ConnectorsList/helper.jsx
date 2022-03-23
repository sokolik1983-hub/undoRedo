
export const sortFoldersAndItems = folderChildren => {
  if (!folderChildren) return null;

  const folders = folderChildren
    ?.filter(i => i.isFolder)
    .sort((a, b) =>
      a.folder_name.localeCompare(b.folder_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );

  const items = folderChildren
    ?.filter(i => !i.isFolder)
    .sort((a, b) =>
      a.connect_name.localeCompare(b.connect_name, {
        ignorePunctuation: true,
        sensitivity: 'accent'
      })
    );

  return [...folders, ...items];
};

export const FOLDER_ITEM_DROPDOWN_ACTIONS = [
  
];

export const FOLDER_DROPDOWN_ACTIONS = [
];

export const connectorsTableHeader = [
  { name: 'Имя' },
  { name: 'Тип файла' },
  { name: 'Дата' }
];
