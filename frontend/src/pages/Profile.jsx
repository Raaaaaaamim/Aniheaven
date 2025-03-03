import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseAsString, useQueryState } from "nuqs";
import {
  IoHeart,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiRestartFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import ContinueWatchingTab from "../components/profile/ContinueWatchingTab.jsx";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileTab from "../components/profile/ProfileTab.jsx";
import TabButton from "../components/profile/TabButton.jsx";
import WatchlistTab from "../components/profile/WatchlistTab.jsx";
import SettingsTab from "../components/settings/SettingsTab.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";
import Loader from "../components/ui/Loader.jsx";
import { userAtom } from "../store/index.js";

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const tabLabels = [
    {
      Icon: IoPersonCircleOutline,
      label: "Profile",
    },
    {
      Icon: IoSettingsOutline,
      label: "Settings",
    },
    {
      Icon: MdOutlineNotificationsActive,
      label: "Notifications",
    },
    {
      Icon: IoHeart,
      label: "Watchlist",
    },
    {
      Icon: RiRestartFill,
      label: "ContinueWatching",
    },
  ];
  const [currentTab, setCurrentTab] = useQueryState(
    "currentTab",
    parseAsString.withDefault(tabLabels[0].label),
  );
  const tabs = [
    {
      label: "Profile",
      element: <ProfileTab user={user} />,
    },
    {
      label: "Settings",
      element: <SettingsTab />,
    },
    {
      label: "Watchlist",
      element: <WatchlistTab />,
    },
    {
      label: "ContinueWatching",
      element: <ContinueWatchingTab />,
    },
  ];

  const { isLoading, isError } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/user/profile`);
        setUser(response?.data?.user); // Update user state directly here

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch profile",
        );
      }
    },

    enabled: !!user?._id,
  });

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorCard error="Something went wrong" />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center">
          <ProfileHeader />
          <div className="mb-10 flex min-h-[50vh] w-full flex-col items-center">
            <div className="font-outfit border-border mt-7 flex h-13 w-full gap-2 border-b-1">
              {tabLabels.map(({ Icon, label }, i) => (
                <TabButton
                  key={i}
                  active={currentTab === label}
                  onClick={() => {
                    setCurrentTab(label);
                  }}
                  icon={<Icon />}
                  label={label}
                  className={i === 0 ? "ml-3" : "ml-0"}
                />
              ))}
            </div>
            {tabs.find((tab) => tab.label === currentTab)?.element}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
