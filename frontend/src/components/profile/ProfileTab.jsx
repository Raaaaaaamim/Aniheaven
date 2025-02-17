import React from "react";
import { MdModeEdit } from "react-icons/md";
import AchievementCard from "./AchievementCard.jsx";

const ProfileTab = ({ user }) => {
  return (
    <div className="font-outfit mt-6 flex w-full flex-col gap-6 px-4">
      {/* Profile and Achievements Container */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Info Card */}
        <div className="bg-secondary/5 border-primary/10 hover:border-primary/20 hover:shadow-primary/5 rounded-3xl border shadow-lg backdrop-blur-sm transition-all duration-300">
          {/* Name Section */}
          <div className="flex w-full items-center justify-between p-6">
            <div className="space-y-1">
              <h1 className="text-primary text-lg font-semibold">Name</h1>
              <h2 className="text-base text-gray-300">{user?.name}</h2>
            </div>
            <div className="relative">
              <img
                src={user?.profilePicture}
                className="border-primary/20 h-16 w-16 rounded-2xl border-2 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                alt={user?.name}
              />
              <div className="border-background absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 bg-green-500"></div>
            </div>
          </div>

          <div className="via-primary/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>

          {/* Username Section */}
          <div className="flex w-full items-center justify-between p-6">
            <div className="space-y-1">
              <h1 className="text-primary text-lg font-semibold">Username</h1>
              <h2 className="text-base text-gray-300">@{user?.username}</h2>
            </div>
            <button className="group border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300">
              <MdModeEdit className="text-primary/50 group-hover:text-primary transition-colors" />
            </button>
          </div>

          <div className="via-primary/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>

          {/* Bio Section */}
          <div className="flex w-full items-start justify-between p-6">
            <div className="mr-4 flex-1 space-y-2">
              <h1 className="text-primary text-lg font-semibold">Bio</h1>
              <h2 className="text-base leading-relaxed text-gray-300">
                {user?.bio || "User has no bio yet ✨"}
              </h2>
            </div>
            <button className="group border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300">
              <MdModeEdit className="text-primary/50 group-hover:text-primary transition-colors" />
            </button>
          </div>
          <div className="via-primary/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>
          <div className="flex w-full items-start justify-between p-6">
            <div className="mr-4 flex-1 space-y-2">
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-primary text-lg font-semibold">Email</h1>
                <h3 className="cursor-pointer text-sm text-red-500 hover:text-red-400">
                  verify
                </h3>
              </div>

              <h2 className="text-base leading-relaxed text-gray-300">
                {user?.email}
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center"></div>
            <button className="group border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300">
              <MdModeEdit className="text-primary/50 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* Achievement Cards Container */}
        <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(user?.achievements).map(([key, value]) => {
            return (
              <div
                key={key}
                className="bg-secondary/5 border-primary/10 hover:border-primary/20 hover:shadow-primary/5 rounded-3xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px]"
              >
                <AchievementCard
                  xp={user.xp}
                  achievementName={key}
                  isLocked={!value}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
