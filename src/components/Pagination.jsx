import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

const Pagination = ({
  coins,
  currentPage,
  totalPosts,
  postsPerPage,
  setCurrentPage,
  setSearchText,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  //page buttons functions
  const numberButtonFunction = (i) => {
    setCurrentPage(i);
    setSearchText("");
  };

  const prevButtonFunction = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchText("");
    }
  };

  const nextButtonFunction = () => {
    if (currentPage < pageNumber.length) {
      setSearchText("");
      setCurrentPage(currentPage + 1);
    }
  };

  const firstButtonFunction = () => {
    if (currentPage > 1) setCurrentPage(1);
    setSearchText("");
  };

  const lastButtonFunction = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage(pageNumber.length);
      setSearchText("");
    }
  };

  return (
    <div className="rounded-div min-w-[400px]">
      <ul className="flex py-3 gap-1">
        <li
          // onClick={() =>
          //   currentPage <= pageNumber.length ? setCurrentPage(1) : null
          // }

          onClick={firstButtonFunction}
          className={
            currentPage > 1
              ? "flex rounded border justify-center items-center p-2 w-10 hover:bg-secondary bg-primary  cursor-pointer "
              : "flex rounded border justify-center items-center p-2 w-10 bg-primary opacity-[0.35] cursor-pointer "
          }
        >
          <BiFirstPage className="text-2xl" />
        </li>
        <li
          // onClick={() =>
          //   currentPage > 1 ? setCurrentPage(currentPage - 1) : null
          // }

          onClick={prevButtonFunction}
          className={
            currentPage > 1
              ? "flex rounded border justify-center items-center p-2 w-10 hover:bg-secondary bg-primary  cursor-pointer "
              : "flex rounded border justify-center items-center p-2 w-10 bg-primary opacity-[0.35] cursor-pointer "
          }
        >
          <IoIosArrowBack />
        </li>
        {pageNumber.slice(currentPage - 1, currentPage + 4).map((number) => (
          <li
            // onClick={() => setCurrentPage(number)}
            onClick={() => numberButtonFunction(number)}
            key={number}
            className={
              number === currentPage
                ? "flex rounded border justify-center items-center p-2 w-10 bg-secondary cursor-pointer"
                : "flex rounded border justify-center items-center p-2 w-10 hover:bg-secondary bg-primary  cursor-pointer"
            }
          >
            {number}
          </li>
        ))}
        <li
          // onClick={() => {
          //   currentPage < pageNumber.length
          //     ? setCurrentPage(currentPage + 1)
          //     : null;
          // }}
          onClick={nextButtonFunction}
          className={
            currentPage < pageNumber.length
              ? "flex rounded border justify-center items-center p-2 w-10 hover:bg-secondary bg-primary cursor-pointer "
              : "flex rounded border justify-center items-center p-2 w-10 bg-primary opacity-[0.35] cursor-pointer "
          }
        >
          <IoIosArrowForward />
        </li>
        <li
          // onClick={() =>
          //   currentPage < pageNumber.length ? setCurrentPage(pageNumber.length) : null
          // }
          onClick={lastButtonFunction}
          className={
            currentPage < pageNumber.length
              ? "flex rounded border justify-center items-center p-2 w-10 hover:bg-secondary bg-primary cursor-pointer "
              : "flex rounded border justify-center items-center p-2 w-10 bg-primary opacity-[0.35] cursor-pointer "
          }
        >
          <BiLastPage className="text-2xl" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
