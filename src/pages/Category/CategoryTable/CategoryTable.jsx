import React, { useContext, useState } from "react";
import { Table, Button } from "antd";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete, AiFillWarning } from "react-icons/ai";
import { useDeleteData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;
const EditBtn = styled(Button)`
  border: none;
  background: none;
  font-size: 22px;
  line-height: 1;
  padding: 5px;
  margin-right: 10px;
  color: #005036;
  transition: 0.2s;
  &:hover {
    color: #005036 !important;
    transform: scale(1.09);
  }
`;
const DeleteBtn = styled(EditBtn)`
  color: #f00;
  &:hover {
    color: #f00 !important;
  }
`;

const CategoryTable = ({ categories }) => {
  const { data } = categories?.data;
  const delMut = useDeleteData(`/category`);
  const { queryClient } = useContext(QueryContext);

  const delBtn = (id) => {
    delMut.mutate(
      { id },
      {
        onSuccess: () => {
          console.log("success");
          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
      }
    );
  };

  const dataSource = data?.map((d, i) => {
    return {
      key: i,
      name_Uz: d.name_Uz,
      name_Ru: d.name_Ru,
      name_En: d.name_En,
      photo: (
        <img
          style={{ width: 40 }}
          src={`http://3.19.30.204/upload/${d.photo.path}`}
        />
      ),
      btns: (
        <BtnWrap>
          <EditBtn>
            <AiOutlineEdit />
          </EditBtn>
          <DeleteBtn onClick={() => delBtn(d?.id)}>
            <AiOutlineDelete />
          </DeleteBtn>
        </BtnWrap>
      ),
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default CategoryTable;

const columns = [
  {
    title: "Name_Uz",
    dataIndex: "name_Uz",
    key: "name_Uz",
  },
  {
    title: "Name_Ru",
    dataIndex: "name_Ru",
    key: "name_Ru",
  },
  {
    title: "Name_En",
    dataIndex: "name_En",
    key: "name_En",
  },
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
  },
  {
    title: "Action",
    dataIndex: "btns",
    key: "btns",
    fixed: true,
    width: 100,
  },
];
