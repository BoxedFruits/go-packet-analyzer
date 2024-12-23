import { useParams } from "react-router";
import { useEffect } from "react";

const Capture = () => {
  const { interfaceName } = useParams();

  useEffect(() => {
    // capture 
  }, [])

  return (
    <div>Capture Page {interfaceName}</div>
  )
}

export default Capture
