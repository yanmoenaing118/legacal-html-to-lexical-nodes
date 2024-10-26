import React, { useState } from "react";

export default function ImageComponent() {
  const [show, setShow] = useState(false);

  return (
    <figure className="relative">
      <img
        src="https://pics.dmm.co.jp/digital/video/1stars984/1stars984jp-5.jpg"
        alt="Fuck"
      />
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
            <p>Yano Ema</p>
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
