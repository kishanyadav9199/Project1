import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors
          .filter((item) => item.role !== "admin")
          .map((item, index) => (
            <div
              key={index}
              className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            >
              <img
                className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4">
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>

                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>

                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsList;
