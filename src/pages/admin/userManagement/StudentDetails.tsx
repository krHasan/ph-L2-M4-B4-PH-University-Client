import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const param = useParams();
    console.log(param);
    return (
        <div>
            <h1>This is StudentDetails component</h1>
        </div>
    );
};

export default StudentDetails;
