"use client";

import {ReactNode, useEffect, useMemo, useState} from "react";
import {useParams} from "next/navigation";
import {toast} from "sonner";

import {ClientSideSuspense, LiveblocksProvider, RoomProvider,} from "@liveblocks/react/suspense";
import Loader from "@/components/loader";
import {getDocument, getUsers} from "@/app/documents/[documentId]/actions";
import {Id} from "../../convex/_generated/dataModel";
import {LEFT_MARGIN, RIGHT_MARGIN} from "@/constants/margins";

type User = { id: string; name: string; avatar: string, color: string; };

export function Room({children}: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch (error) {
        toast.error("Error fetching users");
        console.error("Error fetching users:", error);
      }
    },
    []
  )

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({room}),
        })

        return await response.json();
      }}
      resolveUsers={({userIds}) => {
        return userIds.map((userId) => {
          const user = users.find((u) => u.id === userId);
          return user
            ? {
              name: user.name,
              picture: user.avatar,
              color: user.color,
            }
            : undefined;
        });
      }}
      resolveMentionSuggestions={({text}) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({roomIds}) => {
        const documents = await getDocument(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id.toString(),
          name: document.name,
        }))
      }}
    >
      <RoomProvider id={params.documentId as string}
                    initialStorage={{leftMargin: LEFT_MARGIN, rightMargin: RIGHT_MARGIN}}
      >
        <ClientSideSuspense fallback={
          <Loader
            label="Loading document..."
          />
        }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
