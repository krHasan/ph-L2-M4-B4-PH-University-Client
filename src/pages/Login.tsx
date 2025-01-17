import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues = {
        id: "A-0001",
        password: "abc123$",
    };
    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging In");
        try {
            const userInfo = {
                id: data.id,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            console.log("login", res);
            const user = verifyToken(res.data.accessToken) as TUser;

            dispatch(setUser({ user, token: res.data.accessToken }));
            toast.success("Logged In", { id: toastId, duration: 2000 });
            navigate(`/${user.role}/dashboard`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="id" label="User ID" />
                <PHInput type="password" name="password" label="Password" />
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;
