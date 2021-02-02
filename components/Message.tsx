import { useNotifications, Notification } from "./Notifications";

export const Message: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  const { remove } = useNotifications();
  const { id, message } = notification;
  return (
    <div
      className="relative px-6 py-4 mb-4 text-white bg-blue-500 border-0 rounded cursor-pointer"
      onClick={() => {
        remove(id);
      }}
    >
      <span className="inline-block mr-5 text-xl align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block mr-8 align-middle">{message}</span>
      <button className="absolute top-0 right-0 mt-4 mr-6 text-2xl font-semibold leading-none bg-transparent outline-none focus:outline-none">
        <span>×</span>
      </button>
    </div>
  );
};
