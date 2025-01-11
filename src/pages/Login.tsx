import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const [login] = useLoginMutation();

    const onSubmit = async (data) => {
        const userInfo = {
            id: data.id,
            password: data.password,
        };
        const res = await login(userInfo).unwrap();
        const user = verifyToken(res.data.accessToken);

        dispatch(setUser({ user, token: res.data.accessToken }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                id="id"
                value={"2025010001"}
                placeholder="ID"
                {...register("id")}
            />
            <input
                type="password"
                id="password"
                value={"abc123$"}
                placeholder="Password"
                {...register("password")}
            />
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;
