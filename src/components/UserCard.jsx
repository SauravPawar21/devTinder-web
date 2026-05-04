import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + "" + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center py-4">
          <button className="btn w-24 btn-primary bg-blue-500">Ignore</button>
          <button className="btn w-24 btn-secondary bg-pink-500">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
