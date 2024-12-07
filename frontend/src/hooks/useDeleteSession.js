import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import { SESSIONS } from "./useSessions";

const useDeleteSession = (sessionId) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
    //   queryClient.setQueryData([SESSIONS], (cache) =>
    //     cache.filter((session) => session._id !== sessionId)     // keep the sessions that don't match the current session id
    //   );
        queryClient.invalidateQueries([SESSIONS]);
    },
  });

  return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;
