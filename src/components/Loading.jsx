import React from "react";
import loading from "../assets/loading.gif";
import errorImg from "../assets/error.png";
const Loading = ({ error }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
      {error ? (
        <img className="w-[1000px]" src={errorImg} alt="error" />
      ) : (
        <img src={loading} alt="loading" />
      )}

      {error ? (
        <>
          <h1 className="text-bold text-4xl">An error occured</h1>
          {error?.response?.status && (
            <h2 className="text-2xl">Error code: {error?.response?.status} </h2>
          )}

          {error?.message && <p className="text-xl">{error?.message}</p>}

          {error?.response?.statusText ? (
            <p className="text-xl">{error?.response?.statusText}</p>
          ) : null}

          {console.log(error)}
        </>
      ) : null}
    </div>
  );
};

export default Loading;
