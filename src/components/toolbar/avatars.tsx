"use client";

import {ClientSideSuspense, useOthers, useSelf} from "@liveblocks/react/suspense";

const AVATAR_SIZE = 36;

const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack/>
    </ClientSideSuspense>
  )
}

export default Avatars;

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar src={currentUser.info.picture} name="You"/>
          </div>
        )}
        <div className="flex">
          {users.map(({info, connectionId}) => (
            <Avatar key={connectionId} src={info.picture} name={info.name}/>
          ))}
        </div>
      </div>
      <div className="h-7 w-[1px] bg-neutral-300"/>
    </>
  )
}

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({src, name}: AvatarProps) => {

  return (
    <div
      style={{width: AVATAR_SIZE, height: AVATAR_SIZE}}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div
        className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={name}
        src={src}
        className="size-full rounded-full object-cover"
      />
    </div>
  )
}
