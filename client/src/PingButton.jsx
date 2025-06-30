import React, { useState } from "react";

function PingButton() {
  const [response, setResponse] = useState(null);

  const pingApi = async () => {
    try {
      const res = await fetch("/api/ping");
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("API not reachable");
    }
  };

  return (
    <div>
      <button onClick={pingApi}>Ping API</button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default PingButton;
