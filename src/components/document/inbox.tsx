"use client";

import {BellIcon} from "lucide-react";
import {ClientSideSuspense} from "@liveblocks/react";
import {useInboxNotifications} from "@liveblocks/react/suspense";

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {InboxNotification, InboxNotificationList} from "@liveblocks/react-ui";

const Inbox = () => {
  return (
    <ClientSideSuspense fallback={
      <>
        <Button
          variant="ghost"
          className="relative"
          size="icon"
          disabled
        >
          <BellIcon className="size-5"/>
        </Button>
        <div className="h-7 w-[1px] bg-neutral-300"/>
      </>
    }>
      <InboxMenu/>
    </ClientSideSuspense>
  )
}

export default Inbox;

const InboxMenu = () => {
  const {inboxNotifications} = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative"
            size="icon"
          >
            <BellIcon className="size-5"/>
            {inboxNotifications?.length > 0 && (
              <span
                className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-sm text-white flex items-center justify-center animate-pulse">
              {inboxNotifications.length}
            </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications?.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification key={notification.id} inboxNotification={notification}/>
              ))}
            </InboxNotificationList>
          ) : (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground ">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="h-7 w-[1px] bg-neutral-300"/>
    </>
  )
}
