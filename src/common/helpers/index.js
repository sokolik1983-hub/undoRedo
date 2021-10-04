import React, { useEffect, useState } from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import lodash from "lodash";

import LinkIcon from "@material-ui/icons/Link";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

function renderTreeRecursive(item) {
  if (item.isFolder) {
    return (
      <TreeItem
        nodeId={"f_" + item.folder_id}
        label={item.folder_name}
        icon={
          item.children && item.children.length > 0 ? (
            <FolderIcon />
          ) : (
            <FolderOpenIcon />
          )
        }
      >
        {item.children &&
          item.children.map((child) => renderTreeRecursive(child))}
      </TreeItem>
    );
  }

  return (
    <TreeItem nodeId={item.id} label={item.connect_name} icon={<LinkIcon />} />
  );
}

export function getFormattedData(treeData) {
  if (treeData && !lodash.isEmpty(treeData)) {
    return (
      treeData &&
      treeData.children &&
      treeData.children.map((item) => {
        if (item.isFolder) {
          return (
            <TreeItem
              nodeId={"f_" + item.folder_id}
              label={item.folder_name}
              icon={
                item.children && item.children.length > 0 ? (
                  <FolderIcon />
                ) : (
                  <FolderOpenIcon />
                )
              }
            >
              {item.children &&
                item.children.map((child) => renderTreeRecursive(child))}
            </TreeItem>
          );
        }

        return (
          <TreeItem
            nodeId={item.id}
            label={item.name || item.connect_name}
            icon={<LinkIcon />}
          />
        );
      })
    );
  }

  return [];
}

export const flattenArr = (arr) => {
  const result = [];
  arr.forEach((item) => {
    const { folder_id, folder_name, id, name, connect_name, children } = item;
    result.push({ folder_id, folder_name, id, name, connect_name });
    if (children) result.push(...flattenArr(children));
  });
  return result.filter((item) => item.folder_id || item.id);
};
