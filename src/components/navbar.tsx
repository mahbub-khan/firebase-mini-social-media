import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const navigate = useNavigate(); //to redirect user to the login page
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="/createpost"> Create Post </Link>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              referrerPolicy="no-referrer"
              width="40"
              height="40"
            />
            <button onClick={signUserOut}> Log Out </button>
          </>
        )}
      </div>
    </div>
  );
};

// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { signOut } from "firebase/auth";

// export const Navbar = () => {
//   const navigate = useNavigate(); // to redirect user to the login page
//   const [user] = useAuthState(auth);

//   const signUserOut = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   if (!user) {
//     navigate("/login"); // Redirect to login if user is not logged in
//     return null; // Render nothing while redirecting
//   }

//   return (
//     <div className="navbar">
//       <div className="links">
//         <Link to="/"> Home </Link>
//         <Link to="/createpost"> Create Post </Link>
//       </div>

//       <div className="user">
//         <p>{user?.displayName}</p>
//         <img
//           src={user?.photoURL || ""}
//           referrerPolicy="no-referrer"
//           width="30"
//           height="30"
//         />
//         <button onClick={signUserOut}> Log Out </button>
//       </div>
//     </div>
//   );
// };
