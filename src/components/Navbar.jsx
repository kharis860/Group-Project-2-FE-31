import "../components/Navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const user = localStorage.getItem("credentialLogin");
  // console.log(JSON.parse(user));
  const users = JSON.parse(user);
  useEffect(() => {
    console.log(users.uname);
  }, []);

  const [unameUser, setUnameUser] = useState("");
  useEffect(() => {
    setUnameUser(users.uname);
    console.log(unameUser);
  });
  return (
    <div>
      {/* start kanan */}
      <div>
        {/* navbar start */}
        <nav className="nav">
          <div className="profil">
            <h5>{unameUser}</h5>
            <img src={require("../Img/person.png")} alt="Gambar profil" width="40px" />
          </div>
        </nav>
        {/* end navbar */}
      </div>
      {/* end kanan */}
    </div>
  );
}

export default Navbar;
