import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default (props) => {
  const specDetail = {
    group: "W046_マニュアル作成・編集画面",
    subGroups: [
      "改定内容入力・承認申請モーダル",
      "改定内容モーダル",
      "承認者",
      "承認者が設定されていない場合",
    ],
    scenario: "ヘルプメッセージがオンマウスする",
    expectation: "ヘルプメッセージが表示されている",
    time: "0m13s",
    source: "./spec/system/src/w046_manual_edit_spec.rb:158",
    imageUrl:
      "https://d3utmhtlcphhyc.cloudfront.net/files/topics/24949_ext_25_0.jpg",
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>{specDetail.group}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sub Groups</TableCell>
              <TableCell>
                {specDetail.subGroups.map((subGroup) => {
                  return (
                    <p style={{ margin: 5 }} key={subGroup}>
                      {subGroup}
                    </p>
                  );
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Scenario</TableCell>
              <TableCell>{specDetail.scenario}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Expectation</TableCell>
              <TableCell>{specDetail.expectation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <img
                  src={specDetail.imageUrl}
                  alt={specDetail.expectation}
                ></img>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>{specDetail.time}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>{specDetail.source}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
