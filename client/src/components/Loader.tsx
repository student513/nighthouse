import ReactLoading from "react-loading"

import "../style/Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <ReactLoading type="bars" color="#E6E6E6" />
    </div>
  )
}

export default Loader
