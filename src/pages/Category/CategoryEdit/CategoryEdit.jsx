import React, { useContext, useEffect, useState } from "react";
import { Input, Form, Button, Upload, message } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEditData, useGetData } from "../../../utils/hooks";
import { queryClient } from "../../../";
import { useTranslation } from "react-i18next";
import { instanceUpload } from "../../../utils/axios";
import Loader from "../../../components/Loader/Loader";

const CategoryEdit = ({ editRef, id, setModalOpen }) => {
  const { t } = useTranslation();

  const editMutate = useEditData("/category");

  const getFields = useGetData(["categories", id], `/category/${id}`);
  const { data } = getFields;

  const onFinish = (values) => {
    queryClient.invalidateQueries("categories");
    editMutate.mutate(
      {
        value: {
          ...values,
          photoId: values?.photoId?.file?.response?.id || data?.photoId,
        },
        id,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          queryClient.invalidateQueries("categories");
          editRef.current.resetFields();
        },
      }
    );
  };

  const props = {
    name: "photo",
    action: instanceUpload,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      {editMutate.isLoading ? (
        <Loader />
      ) : (
        <Form
          ref={editRef}
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          fields={[
            {
              name: ["name_Uz"],
              value: data?.name_Uz,
            },
            {
              name: ["name_Ru"],
              value: data?.name_Ru,
            },
            {
              name: ["name_En"],
              value: data?.name_En,
            },
          ]}
        >
          <Form.Item
            // label="Name_Uz"
            name="name_Uz"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Name", { text: "_Uz" }),
                }),
              },
            ]}
          >
            <Input placeholder={t("Name", { text: "_Uz" })} />
          </Form.Item>

          <Form.Item
            // label="Name_Ru"
            name="name_Ru"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Name", { text: "_Ru" }),
                }),
              },
            ]}
          >
            <Input placeholder={t("Name", { text: "_Ru" })} />
          </Form.Item>
          <Form.Item
            name="name_En"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Name", { text: "_En" }),
                }),
              },
            ]}
          >
            <Input placeholder={t("Name", { text: "_En" })} />
          </Form.Item>
          <div style={{ display: "flex", gap: 20 }}>
            <Form.Item
              name="photoId"
              // rules={[{ required: true, message: t("Please, upload photo") }]}
            >
              <Upload {...props}>
                <Button
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                  icon={<AiOutlineCloudUpload style={{ fontSize: 20 }} />}
                >
                  {t("Click to Upload")}
                </Button>
              </Upload>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={editMutate.isLoading}
            >
              {t("Send")}
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default CategoryEdit;
