import { InfinitySpin } from "react-loader-spinner";

function Loader() {
  return (
    <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    >
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Loader;
