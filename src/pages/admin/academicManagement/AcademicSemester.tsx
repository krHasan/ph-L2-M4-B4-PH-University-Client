import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
    const { data } = useGetAllSemestersQuery(undefined);
    return (
        <div>
            <h1>This is AcademicSemester component</h1>
        </div>
    );
};

export default AcademicSemester;
