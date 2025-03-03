import React from "react";

const Category = ({ src, title }) => {
  return (
    <div className=" group flex cursor-pointer  justify-start items-center  gap-3 ">
      <div className="avatar  ">
        <div className="w-7 rounded-full  group-hover:border-[2px] ease-in duration-100 ">
          <img
            alt={title}
            className="rounded-full  "
            src={
              src ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtF6Ss58jVTGqlLOPMZ8cmfw4RuFgJwjRryA&s"
            }
          />
        </div>
      </div>

      <h2 className="group-hover:text-text lg:hidden xl:block block ease-in duration-100  font-bold text-sm text-grayText ">
        {title || "No Category"}
      </h2>
      <div className=" ml-5 ease-in duration-100 lg:group-hover:hidden hidden group-hover:flex xl:group-hover:flex w-2 h-2 rounded-full bg-primary "></div>
    </div>
  );
};

export default Category;
