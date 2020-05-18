import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import report from "../models/report";

export default (props) => {
  const createExampleTreeItem = (examples) => {
    return examples.map((example) => {
      const id = Math.random();
      return (
        <TreeItem key={id} nodeId={`${id}`} label={example.name}></TreeItem>
      );
    });
  };

  const createGroupTreeItem = (groups) => {
    return groups.map((group) => {
      const id = Math.random();
      return (
        <TreeItem key={id} nodeId={`${id}`} label={group.name}>
          {createGroupTreeItem(group.children)}
          {createExampleTreeItem(group.examples)}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {createGroupTreeItem(report.groups, 0)}
    </TreeView>
  );
};
