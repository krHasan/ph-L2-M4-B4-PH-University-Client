import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "70%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Spin
                tip="Loading..."
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
        </div>
    );
};

export default Loader;
