import { ReactDOM } from "react";
import { useParams } from "react-router";

const Capture = () => {
  const { interfaceName } = useParams();
  return (
    <div>Capture Page {interfaceName}</div>
  )
}

export default Capture
