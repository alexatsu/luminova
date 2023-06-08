import { useState } from "react";
export function License() {
  const [content, setContent] = useState("");
  
  return (
    <div>
      <h1>License</h1>
      <p>Luminova photos are made to be used freely. Our license reflects that.</p>
      <p>
        
        ✅ All photos can be <strong>downloaded</strong> and used for <strong>free</strong>✅{" "}
        <strong>Commercial</strong> and <strong>non-commercial</strong> purposes ✅{" "}
        <strong>No permission needed</strong> (though attribution is appreciated!)
      </p>
      <h5>
        <strong>What is not permitted</strong> 👎
      </h5>
      <p>
        🚫 Photos cannot be <strong>sold</strong> without significant modification. 🚫 Compiling
        photos from Luminova to replicate a similar or competing service.
      </p>
      <h5>
        <strong>Longform</strong>
      </h5>
      <p>
        Luminova grants you an irrevocable, nonexclusive, worldwide copyright license to download,
        copy, modify, distribute, perform, and use photos from Luminova for free, including for
        commercial purposes, without permission from or attributing the photographer or Luminova.
        This license does not include the right to compile photos from Luminova to replicate a
        similar or competing service.
      </p>
      <p>
        Questions? <a href="http://#.com">Read our FAQ</a>.
      </p>
    </div>
  );
}
