import { Table, Button, Modal } from "antd";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete, AiFillWarning } from "react-icons/ai";
import PostProductModal from "../../../components/postProductModal/PostProductModal";
import EditProductForm from "../EditProductForm/EditProductForm";
import { useDeleteData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const Container = styled.div`
  /* overflow-x: scroll; */
`;
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

const ProductsTable = ({ data }) => {
  const editRef = useRef(null);
  const [id, setId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { queryClient } = useContext(QueryContext);

  const delMut = useDeleteData("/products");

  const delBtn = (id) => {
    delMut.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
      }
    );
  };

  const { confirm } = Modal;
  const showConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete the product?",
      // icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        delBtn(id);
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const editFormRes = () => {
    setModalOpen(false);
    editRef?.current?.resetFields();
  };

  const dataSource = data?.map((d, i) => {
    return {
      key: i,
      name_Uz: d.name_Uz,
      name_Ru: d.name_Ru,
      name_En: d.name_En,
      price: d?.price,
      discount: d?.discount,
      description_Uz: d?.description_Uz,
      description_Ru: d?.description_Ru,
      description_En: d?.description_En,
      category_Uz: d?.Category.name_Uz,
      category_Ru: d?.Category.name_Ru,
      category_En: d?.Category.name_En,
      photo: (
        <img
          style={{ width: 40 }}
          src={`http://3.19.30.204/upload/${d?.photo?.path}`}
          alt="Not found"
        />
      ),
      btns: (
        <BtnWrap>
          <EditBtn
            onClick={() => {
              setModalOpen(true);
              setId(d?.id);
            }}
          >
            <AiOutlineEdit />
          </EditBtn>
          <DeleteBtn onClick={() => showConfirm(d?.id)}>
            <AiOutlineDelete />
          </DeleteBtn>
        </BtnWrap>
      ),
    };
  });

  return (
    <Container>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 1500 }} />
      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={editFormRes}
      >
        <EditProductForm
          editRef={editRef}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          id={id}
        />
      </PostProductModal>
    </Container>
  );
};

export default ProductsTable;

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
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: true,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    sorter: true,
  },
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
    ellipsis: true,
  },
  {
    title: "Description_Uz",
    dataIndex: "description_Uz",
    key: "description_Uz",
    ellipsis: true,
  },
  {
    title: "Description_Ru",
    dataIndex: "description_Ru",
    ellipsis: true,
    key: "description_Ru",
  },
  {
    title: "Description_En",
    dataIndex: "description_En",
    ellipsis: true,
    key: "description_En",
  },
  {
    title: "Category_Uz",
    dataIndex: "category_Uz",
    key: "category_Uz",
    ellipsis: true,
  },
  {
    title: "Category_Ru",
    dataIndex: "category_Ru",
    key: "category_Ru",
    ellipsis: true,
  },
  {
    ellipsis: true,
    title: "Category_En",
    dataIndex: "category_En",
    key: "category_En",
  },
  {
    title: "Action",
    dataIndex: "btns",
    key: "btns",
    fixed: "right",
    width: 100,
  },
];
