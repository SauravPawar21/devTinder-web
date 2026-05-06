import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card card-dash bg-base-200 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl font-semibold text-white">
                Edit Profile
              </h2>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">First Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">Last Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">Photo:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">Age:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">Gender:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="px-3">
                <label className="label py-1">
                  <span className="label-text text-white">About:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center py-4">
                <button
                  className="btn w-24 bg-purple-600 hover:bg-purple-700 text-white border-none"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
