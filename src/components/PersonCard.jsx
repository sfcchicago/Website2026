import { useState, useEffect } from "react";
import { isImageReady, preloadImage } from "../utils/preload";
import { REMOTE_UP } from "../data";
import { urlFor } from "../sanity/client";

export default function PersonCard({ person }) {
  const [imgErr, setImgErr] = useState(false);
  const photoUrl = (person.photo && typeof person.photo === "object") ? urlFor(person.photo) : person.photo;
  const [prevPhoto, setPrevPhoto] = useState(photoUrl);
  const [src, setSrc] = useState(photoUrl);
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(photoUrl));

  if (photoUrl !== prevPhoto) {
    setPrevPhoto(photoUrl);
    setSrc(photoUrl);
    setImgErr(false);
    setIsLoaded(isImageReady(photoUrl));
  }

  useEffect(() => {
    if (src && !isImageReady(src)) {
      preloadImage(src).then(() => setIsLoaded(true));
    }
  }, [src]);

  const initials = (person.name || "")
    .split(" ")
    .filter(Boolean)
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
