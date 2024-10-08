// import './main.css'
import {
    Outlet
  } from "react-router-dom";
  
  
  const Main = () => {
    return (
      <div className='main w-full h-full bg-primaryDark'>
        <Outlet />
      </div>
    )
  }
  
  export default Main
  