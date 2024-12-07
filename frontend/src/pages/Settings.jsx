import { Spinner } from "@nextui-org/react";
import useSessions from "../hooks/useSessions";
import SessionCard from "../components/SessionCard";

const Settings = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold">My Sessions</h1>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">There was an error fetching your sessions</p>}
      {isSuccess && (
        <div>
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
