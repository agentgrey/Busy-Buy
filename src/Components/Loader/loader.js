/** ------------------ IMPORTING SPINNER MODULES ------------------ **/
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        margin: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <GridLoader color="#FF8C00" />
      
    </div>
  );
};

/** ------------------ EXPORTING MODULES ------------------ **/
export default Loader;
