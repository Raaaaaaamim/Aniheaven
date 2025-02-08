import React from "react";
import { FiLock } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";
import AchievementCard from "./AchievementCard.jsx";

const ProfileTab = ({ user }) => {
  return (
    <div className="border-primary/50 font-outfit mt-3 flex h-40 w-[98%] flex-wrap gap-4">
      <div className="border-border text-text flex w-[49%] flex-col flex-wrap rounded-2xl border-1">
        <div className="flex w-full items-center justify-between gap-2 py-2">
          <div className="ml-4 flex flex-col">
            <h1 className="text-1rem font-semibold">Name</h1>
            <h2 className="text-sm">{user?.name}</h2>
          </div>
          <img
            src={user?.profilePicture}
            className="border-primary mr-4 h-15 w-15 rounded-full border-1"
            alt=""
          />
        </div>
        <div className="bg-border mb-3 h-px w-full"></div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 py-2">
          <div className="ml-4 flex flex-col">
            <h1 className="text-1rem font-semibold">Username</h1>
            <h2 className="text-sm">{user?.username}</h2>
          </div>
          <div className="border-border mr-4 flex h-9 w-9 items-center justify-center rounded-full border-[1px]">
            <MdModeEdit />
          </div>
        </div>
        <div className="bg-border mt-5 h-px w-full"></div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 py-2">
          <div className="ml-4 flex flex-col">
            <h1 className="text-1rem font-semibold">Bio</h1>
            <h2 className="text-sm">
              {user?.bio
                ? user?.bio
                : "Manifesting my next existential crisis, & it's going to be great"}
            </h2>
          </div>
          <div className="border-border mr-4 flex h-9 w-9 items-center justify-center rounded-full border-[1px]">
            <MdModeEdit />
          </div>
        </div>
      </div>

      <div className="border-border relative flex min-h-70 w-[49%] flex-1 items-center justify-center rounded-2xl border-1">
        <AchievementCard
          progress={100}
          icon={FiLock}
          title="Locked"
          description="Unlock this achievement to get more rewards!"
          reward={10}
          rarity={"Jod"}
        />
      </div>
      <div className="border-border relative flex min-h-70 w-[49%] flex-1 items-center justify-center rounded-2xl border-1">
        <AchievementCard
          progress={100}
          icon={FiLock}
          title="Locked"
          description="Unlock this achievement to get more rewards!"
          reward={10}
          rarity={"rare"}
        />
      </div>
      <div className="border-border relative flex min-h-70 w-[49%] flex-1 items-center justify-center rounded-2xl border-1">
        <AchievementCard
          progress={100}
          icon={FiLock}
          title="Locked"
          description="Unlock this achievement to get more rewards!"
          reward={10}
          rarity={"epic"}
        />
      </div>
    </div>
  );
};

export default ProfileTab;
