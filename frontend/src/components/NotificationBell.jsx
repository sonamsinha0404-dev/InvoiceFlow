import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import "./NotificationBell.css";

function NotificationBell() {

  const [show, setShow] = useState(false);
  const notificationRef = useRef(null);

  const [notifications, setNotifications] = useState(() => {

  const savedNotifications = localStorage.getItem("notifications");

  return savedNotifications
    ? JSON.parse(savedNotifications)
    : [];

  });

const getTimeAgo = (time) => {

  const seconds = Math.floor(
    (new Date() - new Date(time)) / 1000
  );

  if (seconds < 60)
    return "Just now";

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60)
    return `${minutes} min ago`;

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24)
    return `${hours} hr ago`;

  const days = Math.floor(
    hours / 24
  );

  return `${days} day ago`;

};

useEffect(() => {

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

}, [notifications]);

  useEffect(() => {

  function handleClickOutside(event) {

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {

      setShow(false);

    }

  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);

  return (

    <div
        className="notification-container"
        ref={notificationRef}
    >

      <button
        className="bell-btn"
        onClick={() => setShow(!show)}
        >
        <FaBell />

        <span className="notification-count">
            {notifications.length}
        </span>

     </button>

      {
        show && (

          <div className="notification-dropdown">

            <h4>Notifications</h4>

            {

              notifications.map((item,index)=>(

                <div
                key={index}
                className="notification-item"
                >

                <p>

                {item.message}

                </p>

                <small>

                {getTimeAgo(item.time)}

                </small>

                </div>

                ))

            }

          </div>

        )
      }

    </div>

  );

}

export default NotificationBell;