import { useState, useEffect } from "react";
import { isImageReady, preloadImage } from "../utils/preload";
import { REMOTE_UP } from "../data";

export default function PersonCard({ person }) {
  const [imgErr, setImgErr] = useState(false);
  const [prevPhoto, setPrevPhoto] = useState(person.photo);
  const [src, setSrc] = useState(person.photo);
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(person.photo));

  if (person.photo !== prevPhoto) {
    setPrevPhoto(person.photo);
    setSrc(person.photo);
    setImgErr(false);
    setIsLoaded(isImageReady(person.photo));
  }

  useEffect(() => {
    if (src && !isImageReady(src)) {
      preloadImage(src).then(() => setIsLoaded(true));
    }
  }, [src]);

  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const handleError = () => {
    if (src && src.startsWith("/people") && REMOTE_UP) {
      setSrc(src.replace("/people", REMOTE_UP));
    } else {
      setImgErr(true);
    }
  };

  return (
    <div className="person" data-person-name={person.name}>
      <div className="avatar">
        <span className="initials" aria-hidden="true">{initials}</span>
        {src && !imgErr && (
          <img
            src={src}
            alt={person.name}
            loading="eager"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={isLoaded ? "is-loaded" : "is-loading"}
            style={{
              "--photo-position": person.photoPosition || "center 20%",
              "--photo-scale": person.photoScale ? String(person.photoScale) : "1",
            }}
          />
        )}
      </div>
      <h4>{person.name}</h4>
      {person.role && <p>{person.role}</p>}
    </div>
  );
}
