import { Spinner } from "react-bootstrap";
import './shared.css';

function CustomSpinner() {
  return (
    <div className="d-flex justify-content-center mt-5">
         <Spinner className="custom-spinner" animation="border" role="status" />
    </div>
  )
}

export default CustomSpinner