import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return <h1>Loading...</h1>;

  if (requests.length === 0) return <h1>No Requests Found</h1>;
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Connections Requests</h1>

      <div className="max-w-2xl mx-auto space-y-5">
        {requests.map((conn, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            conn.fromUserId;

          return (
            <div
              key={index}
              className="flex items-center gap-5 p-4 bg-base-200 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={photoUrl}
                alt="photo"
                className="h-20 w-20 rounded-full object-cover border border-gray-600"
              />

              <div className="text-left flex-1">
                <h3 className="font-semibold text-lg">
                  {firstName + " " + lastName}
                </h3>

                {age && gender && (
                  <p className="text-sm text-gray-400">{age + ", " + gender}</p>
                )}

                <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                  {about}
                </p>
              </div>

              <div className="flex  gap-2">
                <button className="btn w-24 bg-purple-600 hover:bg-purple-700 text-white border-none">
                  Reject
                </button>
                <button className="btn w-24 bg-pink-500 hover:bg-pink-700 text-white border-none">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
