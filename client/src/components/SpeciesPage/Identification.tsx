import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface Props {
  images: { source?: string; credit?: any }[];
  scientificName: string;
}

const Identification = ({ images, scientificName }: Props) => {
  // const attribution = classification.thumbnail?.credit;
  return (
    <>
      <div className="img-gallery">
        {images.some(e => e.source && e.credit) ? images.map((item, index) => (
          <PhotoProvider>
            <figure>
              <PhotoView key={index} src={item.source}>
                <img
                  src={item.source}
                  alt=""
                  style={{
                    cursor: "pointer",
                  }}
                />

              </PhotoView>
              <figcaption>
                  {item.credit?.source ? (
                    <p>
                      {
                        <a href={item.credit.source} target="_blank" rel="noopener noreferrer">
                          <i>{item.credit?.title || scientificName}</i>
                        </a>
                      }
                      {item.credit.author ? " by " + item.credit.author : ""}
                      {item.credit.license ? "/" : ""}{" "}
                      {item.credit.licenseSource ? (
                        <a href={item.credit.licenseSource} target="_blank" rel="noopener noreferrer">
                          {item.credit.license}
                        </a>
                      ) : (
                        item.credit.license
                      )}
                    </p>
                  ) : (
                    typeof item.credit === "string" ? <p>{item.credit}</p> : ""
                  )}
                </figcaption>
            </figure>
          </PhotoProvider>
        )) : <p>No images available for this species.</p>}
      </div>
    </>
  );
};

export default Identification;
