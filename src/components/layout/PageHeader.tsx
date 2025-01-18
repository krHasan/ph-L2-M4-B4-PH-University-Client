const PageHeader = ({ text }: { text: string }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1.5rem",
            }}
        >
            <h1 style={{ fontSize: "2rem" }}>{text}</h1>
        </div>
    );
};

export default PageHeader;
