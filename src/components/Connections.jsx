import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("FULL RESPONSE:", res.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Connections</h1>

      <div className="max-w-2xl mx-auto space-y-5">
        {connections.map((conn, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = conn;

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

              <button className="btn btn-primary btn-sm">View</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
