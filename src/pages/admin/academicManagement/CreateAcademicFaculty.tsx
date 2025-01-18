/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PageHeader from "../../../components/layout/PageHeader";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");
        try {
            const res = (await addAcademicFaculty(
                data
            )) as TResponse<TAcademicFaculty>;
            if (res?.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Academic Faculty Created", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <>
            <PageHeader text="Create Academic Faculty" />
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(academicFacultySchema)}
                    >
                        <PHInput type="text" name="name" label="Name" />
                        <Button htmlType="submit">Create</Button>
                    </PHForm>
                </Col>
            </Flex>
        </>
    );
};

export default CreateAcademicFaculty;
