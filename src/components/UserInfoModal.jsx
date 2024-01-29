import React, { useState, useEffect } from "react";
import * as userService from "../services/userService";
import { formatDate } from "../utils/dateUtils";

const UserInfoModal = ({ onClose, userId }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    userService
      .getOne(userId)
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <div className="overlay">
        <div className="backdrop" onClick={onClose}></div>
        <div className="modal">
          <div className="detail-container">
            <header className="headers">
              <h2>User Detail</h2>
              <button className="btn close" onClick={onClose}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-11"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M235.3 256l106.7-106.7c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L192 210.8 85.33 104.1c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L146.7 256 85.33 362.7c-12.5 12.5-12.5 32.75 0 45.25C89.47 415.1 96.73 416 104 416s14.53-.875 21.33-6.625L192 301.3l106.7 106.7C308.5 415.1 315.8 416 323.1 416s14.53-.875 21.33-6.625C352.5 401.8 352.5 381.5 340 369.1L233.3 256z"
                  ></path>
                </svg>
              </button>
            </header>
            <div className="content">
              <div className="image-container">
                <img src={userDetails.imageUrl} alt="" className="image" />
              </div>
              <div className="user-details">
                <p>
                  User Id: <strong>{userDetails._id}</strong>
                </p>
                <p>
                  Full Name:
                  <strong>
                    {" "}
                    {userDetails.firstName} {userDetails.lastName}{" "}
                  </strong>
                </p>
                <p>
                  Email: <strong>{userDetails.email}</strong>
                </p>
                <p>
                  Phone Number: <strong>{userDetails.phoneNumber}</strong>
                </p>
                <p>
                  Address:
                  <strong>
                    {userDetails.address?.country}, {userDetails.address?.city},{" "}
                    {userDetails.address?.street},{" "}
                    {userDetails.address?.streetNumber}
                  </strong>
                </p>
                <p>
                  Created on:{" "}
                  <strong>{formatDate(userDetails.createdAt)}</strong>
                </p>
                <p>
                  Modified on:{" "}
                  <strong>{formatDate(userDetails.updatedAt)}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoModal;
