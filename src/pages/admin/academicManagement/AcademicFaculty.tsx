import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import Loader from "../../../components/layout/Loader";

type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
    const { data, isLoading, isFetching } =
        useGetAllAcademicFacultiesQuery(undefined);

    const tableData = data?.data?.map(({ _id, name }) => ({
        key: _id,
        name,
    }));

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Action",
            key: "x",
            render: () => {
                return (
                    <div>
                        {" "}
                        <Button>Update</Button>{" "}
                    </div>
                );
            },
        },
    ];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Table loading={isFetching} columns={columns} dataSource={tableData} />
    );
};

export default AcademicFaculty;
