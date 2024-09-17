import { Link } from "react-router-dom"
const Pages = () => {
 return <div>
  {/* <h1>Home Page</h1> */}
  <button className="btn btn-main">
   <Link to='/dashboard'>Dashboard</Link>
  </button>
  <button className="btn btn-main">
   <Link to='/login'>Home</Link>
  </button>
  {/* <button className="btn btn-main">
   <Link to='/messages'>SMS</Link>
  </button> */}
  <button className="btn btn-main">
   <Link to='/settings'>Settings</Link>
  </button>
 </div>
}

export default Pages