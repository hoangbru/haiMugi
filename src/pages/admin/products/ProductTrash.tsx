/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { RedoOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Space, Table, Button, Tooltip, Popconfirm, Skeleton } from "antd";
import {
  useForceDeleteProductMutation,
  useGetTrashProductsQuery,
  useRestoreProductMutation,
} from "../../../api/product";
import { toast } from "react-hot-toast";

interface DataType {
  key: string | number;
  name: string;
  image: string;
  price: number;
  desc: string;
  detail: string;
  categoryId: string;
  sizeIds: [];
}

const ProductTrash = () => {
  const { data: products, isLoading: isLoadingFetching } =
    useGetTrashProductsQuery();
  const [removeProduct] = useForceDeleteProductMutation();
  const [restoreProduct, { isLoading: isLoadingRestore }] =
    useRestoreProductMutation();
  const text = <span>Khôi phục</span>;

  const confirm = (id: number | string) => {
    removeProduct(id);
    toast.success("Xoá sản phẩm thành công");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "250px",
      render: (image) => (
        <img className="image" src={image} alt="image of product" />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    // {
    //   title: "Kích cỡ",
    //   dataIndex: "sizeIds",
    //   key: "sizeIds",
    //   render: (record) => {
    //     return record?.map((item: any) => item).join(",");
    //   },
    // },
    {
      title: "Hành động",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 100,
      render: (record) => {
        return (
          <Space size="middle">
            <Button
              type="text"
              className="flex justify-center items-center text-xl"
              onClick={() => restoreProduct(record._id)}
            >
              <Tooltip placement="top" title={text}>
                {isLoadingRestore ? (
                  <RedoOutlined className="flex justify-center items-center animate-spin text-xl" />
                ) : (
                  <RedoOutlined />
                )}
              </Tooltip>
            </Button>
            <Popconfirm
              placement="topRight"
              title="Xoá vĩnh viễn sản phẩm?"
              onConfirm={() => confirm(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="primary" danger>
                Xoá
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const data = products?.map((product: any) => {
    return {
      key: product._id,
      ...product,
    };
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Thùng rác</h1>
        {/* <button className=" text-white bg-sky-700 border-1 rounded-md px-3 py-2 hover:opacity-75">
          <Link
            to="/admin/products/add"
            className="hover:text-white flex justify-between items-center gap-2"
          >
            <AiOutlinePlusCircle />
            Thêm mới
          </Link>
        </button> */}
      </div>
      {isLoadingFetching ? (
        <Skeleton />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 4 }}
          // scroll={{ x: 1500, y: 500 }}
        />
      )}
    </div>
  );
};

export default ProductTrash;
