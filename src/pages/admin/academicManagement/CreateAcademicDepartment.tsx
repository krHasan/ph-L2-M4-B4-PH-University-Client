/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import Loader from "../../../components/layout/Loader";
import PageHeader from "../../../components/layout/PageHeader";
import {
    useAddAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
    const [createAcademicDepartment] = useAddAcademicDepartmentMutation();
    const { data, isLoading } = useGetAllAcademicFacultiesQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    const facultiesNameOption = data?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");
        try {
            const res = (await createAcademicDepartment(
                data
            )) as TResponse<TAcademicDepartment>;
            if (res?.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Department Created", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <>
            <PageHeader text="Create Academic Department" />
            <Flex justify="center" align="center">
                <Col span={9}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(academicDepartmentSchema)}
                    >
                        <PHSelect
                            label="Academic Faculty"
                            name="academicFaculty"
                            options={facultiesNameOption!}
                        />
                        <PHInput type="text" name="name" label="Name" />
                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicDepartment;
