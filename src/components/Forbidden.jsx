import error from "../Img/forbidden.jpg";
import "./Forbidden.css";

function Forbidden() {
  return (
    <div className="imgContainer">
      <img src={error} alt="gambar error" />
    </div>
  );
}

export default Forbidden;
