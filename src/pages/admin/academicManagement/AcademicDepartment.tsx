import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import Loader from "../../../components/layout/Loader";

type TTableData = {
    name: string;
    academicFaculty: string;
};

const AcademicDepartment = () => {
    const { data, isLoading, isFetching } =
        useGetAllAcademicDepartmentsQuery(undefined);

    const tableData = data?.data?.map(({ _id, name, academicFaculty }) => ({
        key: _id,
        name,
        academicFaculty: academicFaculty.name,
    }));

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Department Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Academic Faculty",
            key: "academicFaculty",
            dataIndex: "academicFaculty",
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

export default AcademicDepartment;
