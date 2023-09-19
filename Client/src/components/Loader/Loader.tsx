import { Triangle } from  'react-loader-spinner'
import "./Loader.css"

const Loader = () => {
  return (
    <div className='loader'>
        <Triangle
        height="80"
        width="80"
        color="#B7A0E2"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
        />
    </div>
  )
}

export default Loader