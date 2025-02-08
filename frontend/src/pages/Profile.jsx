import { parseAsString, useQueryState } from "nuqs";
import {
  IoHeart,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiRestartFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileTab from "../components/profile/ProfileTab.jsx";
import TabButton from "../components/profile/TabButton.jsx";
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
      label: "Continue Watching",
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
  ];
  return (
    <div className="flex h-full w-full flex-col items-center">
      <ProfileHeader />
      <div className="mb-20 flex h-[80vh] w-full flex-col items-center">
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
  );
};

export default Profile;
