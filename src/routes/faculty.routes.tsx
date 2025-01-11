import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths = [
    {
        name: "Faculty Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />,
    },
    {
        name: "Offered Course",
        children: [
            {
                name: "Offered Course",
                path: "offered-course",
                element: <OfferedCourse />,
            },
        ],
    },
];
