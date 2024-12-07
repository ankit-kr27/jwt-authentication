import { Button } from "@nextui-org/react";
import useDeleteSession from "../hooks/useDeleteSession";

// eslint-disable-next-line react/prop-types
const SessionCard = ({ session }) => {
  // eslint-disable-next-line react/prop-types
  const { _id, userAgent, isCurrent, createdAt } = session;

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div
      key={_id}
      className="bg-gray-700 p-4 rounded-md shadow-lg mt-4 flex border"
    >
      <div className="flex-1">
        <p className="font-bold text-sm mb-1">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 ml-2 rounded-full">
              Current Session
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400">{userAgent}</p>
      </div>
      <div>
        {!isCurrent && (
          <Button
            variant="ghost"
            size="sm"
            title="Delete Session"
            color="danger"
            isLoading={isPending}
            onClick={deleteSession}
            className="text-lg"
          >
            &times;
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
