import React, { useEffect } from "react";

import NoData from "../../../../theme/NoData";
import Loading from "../../../../components/Loading";
import { AllProgram, StudentStatus } from "../../../../components/Filter";
import Pagination from "../../../../components/Pagination";
import Search from "../../../../components/Search";
import DeleteIcon from "../../../../assets/image/Delete.svg";

const Content = props => {
  useEffect(() => {
    props.getWaitingStudents(
      props.searchAddStudent,
      props.ss_id,
      props.programme_id,
      props.addStudentPage
    );
  }, [props.posting]);

  const listWaitingStudents = props.listWaitingStudents.map(e => {
    return (
      <tr
        key={e.studentId}
        className={
          e.vtcaMainClass.classId === props.classId ||
          e._StudentStatus.ssId === 3 ||
          e._StudentStatus.ssId === 5 ||
          e._StudentStatus.ssId === 6
            ? "unClickAble"
            : ""
        }
        onClick={
          e.vtcaMainClass.classId === props.classId ||
          e._StudentStatus.ssId === 3 ||
          e._StudentStatus.ssId === 5 ||
          e._StudentStatus.ssId === 6
            ? null
            : () => props.openAddStudentConfirm(e)
        }
      >
        <td>{e.studentId}</td>
        <td>{e.fullName}</td>
        <td>{e._StudentStatus.ssName.split("")}</td>
        <td>{e._Programme.programmeName}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <Search
        placeholder={"Nhập tên hoặc mã sinh viên để tìm kiếm..."}
        onKeyPressSearch={searchAddStudent =>
          props.getWaitingStudents(
            searchAddStudent,
            props.ss_id,
            props.programme_id,
            props.addStudentPage
          )
        }
      />
      {props.searchAddStudent !== "" && (
        <div style={{ marginBottom: "10px" }} className="searchQuery">
          Tìm kiếm kết quả với từ khóa "{props.searchAddStudent}"{" "}
          <img
            src={DeleteIcon}
            alt="delete"
            height={15}
            width={15}
            onClick={() => props.getWaitingStudents("", 4, "", 1)}
          />
        </div>
      )}
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Họ & Tên</th>
            <th className="status">
              Trạng thái
              <StudentStatus
                list={props.studentStatus}
                filter={ss_id =>
                  props.getWaitingStudents(
                    props.searchAddStudent,
                    ss_id,
                    props.programme_id,
                    1
                  )
                }
              />
            </th>
            <th className="program">
              Chuyên nghành
              <AllProgram
                list={props.allProgram}
                filter={programme_id =>
                  props.getWaitingStudents(
                    props.searchAddStudent,
                    props.ss_id,
                    programme_id,
                    1
                  )
                }
              />
            </th>
          </tr>
        </thead>
        {props.listWaitingStudents.length > 0 && (
          <tbody>{listWaitingStudents}</tbody>
        )}
      </table>
      {props.loadingWaitingStudent && (
        <Loading type="TailSpin" height={25} width={25} color="#203e7d" />
      )}
      {props.listWaitingStudents.length < 1 && !props.loadingWaitingStudent && (
        <NoData />
      )}
      {Math.ceil(props.totalAddAble / 30) > 1 && (
        <Pagination
          page={props.addStudentPage}
          maxPage={Math.ceil(props.totalAddAble / 30)}
          onPressEnter={page =>
            props.getWaitingStudents(
              props.searchAddStudent,
              props.ss_id,
              props.programme_id,
              page
            )
          }
          prevPage={page =>
            props.getWaitingStudents(
              props.searchAddStudent,
              props.ss_id,
              props.programme_id,
              page
            )
          }
          nextPage={page =>
            props.getWaitingStudents(
              props.searchAddStudent,
              props.ss_id,
              props.programme_id,
              page
            )
          }
        />
      )}
    </React.Fragment>
  );
};

export default Content;
