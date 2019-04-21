import React from "react";
import moment from "moment";

import EditIcon from "../../assets/svgComponents/Edit";

const ClassData = props => {
  const listClass = props.list.map(e => {
    let startDate = e.startDate.toString();
    let expectedEndDate = e.expectedEndDate.toString();
    let endDate = "";
    if (e.endDate !== null) {
      endDate = moment(e.endDate.toString()).format("DD/MM/YYYY");
    }
    return (
      <tr key={e.classId} className="tablerow">
        <td>{e.classId}</td>
        <td id="cfullname" onClick={() => props.openListStudentDialog(e)}>
          {e.className}
        </td>
        <td>{moment(startDate).format("DD/MM/YYYY")}</td>
        <td>{moment(expectedEndDate).format("DD/MM/YYYY")}</td>
        <td>{endDate}</td>
        <td>{e._ClassStatus.csName.split("")}</td>
        <td>
          <EditIcon
            height={20}
            width={20}
            fill="#203e7d"
            classes="editIcon"
            onClick={() => props.openEditClassDialog(e)}
          />
        </td>
      </tr>
    );
  });
  return (
    <React.Fragment>
      <tbody>{listClass}</tbody>
    </React.Fragment>
  );
};

export default ClassData;
