import React, { useState } from "react";

export default function ImageComponent({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <figure className="relative">
      <img src={src} alt="Fuck" />
      <div className="absolute w-full top-0 left-0">
        <button
          className=" w-[30px] h-[30px] rounded-full bg-black text-white  text-lg absolute right-2 top-3"
          type="button"
          onClick={() => setShow(true)}
        >
          i
        </button>
        {show && (
          <div className="bg-black text-white p-2 relative">
            <p>{caption}</p>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="scale-x-125 absolute right-3 top-1"
            >
              x
            </button>
          </div>
        )}
      </div>
    </figure>
  );
}
