import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaBirthdayCake,
  FaBook,
  FaCalendarAlt,
  FaHeart,
  FaInfo,
  FaLanguage,
  FaMask,
  FaQuoteLeft,
  FaRulerVertical,
  FaWeight,
} from "react-icons/fa";
import {
  GiArmorDowngrade,
  GiNinjaHeroicStance,
  GiPowerLightning,
} from "react-icons/gi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdTheaterComedy } from "react-icons/md";
import {
  PiEyeBold,
  PiHairDryerFill,
  PiTelevisionSimpleBold,
} from "react-icons/pi";
import { useParams } from "react-router-dom";
import {
  characterFieldIcons,
  parseAnimeCharacterData,
} from "../../lib/utils.js";
import TabButton from "../components/profile/TabButton.jsx";
import CharacterPageSkeleton from "../components/skeletons/CharacterPageSkeleton";
import CharacterInfoCard from "../components/ui/CharacterInfoCard.jsx";

const iconComponents = {
  FaBirthdayCake,
  FaCalendarAlt,
  FaHeart,
  FaInfo,
  FaLanguage,
  FaMask,
  FaQuoteLeft,
  FaRulerVertical,
  FaWeight,
  GiArmorDowngrade,
  GiNinjaHeroicStance,
  GiPowerLightning,
  IoPersonCircleOutline,
  PiEyeBold,
  PiHairDryerFill,
};

const CharacterPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      return await axios.get(`https://api.jikan.moe/v4/characters/${id}/full`);
    },
  });

  const character = data?.data?.data;
  console.log(character);

  const characterData = parseAnimeCharacterData(character?.about);

  if (isLoading) {
    return <CharacterPageSkeleton />;
  }

  return (
    <div className="font-outfit bg-background min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative mt-10 min-h-[50vh] w-full md:h-[60vh]">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <img
            src={character?.images?.webp?.image_url}
            className="h-full w-full object-cover"
            alt={character?.name}
          />
          <div className="from-background via-background/95 absolute inset-0 bg-linear-to-t to-transparent backdrop-blur-xs" />
          <div className="mask absolute inset-0 backdrop-blur-xs" />
          <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />
        </div>

        {/* Content */}
        <div className="relative -top-20 container mx-auto flex h-full items-center px-4 md:-top-[25px] xl:-top-10">
          <div className="flex h-full w-full flex-col items-center gap-6 pb-8 md:flex-row md:items-end md:gap-8">
            {/* Left Side - Character Image */}
            <div className="mx-auto mt-4 w-[200px] shrink-0 sm:w-[240px] md:mx-0 md:w-[280px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute rounded-2xl bg-linear-to-r opacity-75 blur-xs transition-all duration-300 group-hover:opacity-100" />
                <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                  <img
                    src={character?.images?.webp?.image_url}
                    alt={character?.name}
                    className="h-full w-full scale-90 rounded-2xl object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Character Info */}
            <div className="mt-0 mb-5 flex-1 text-center text-white md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 md:space-y-4"
              >
                <h1 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                  {character?.name}
                </h1>
                <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:gap-4">
                  {character?.name_kanji && (
                    <h2 className="font-outfit text-xl text-white/70 md:text-2xl">
                      {character?.name_kanji}
                    </h2>
                  )}
                  {character?.favorites > 0 && (
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-xs">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-white/90">
                        {character?.favorites?.toLocaleString()} Favorites
                      </span>
                    </div>
                  )}
                </div>

                {/* Nicknames */}
                {character?.nicknames?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 px-2 md:justify-start md:px-0">
                    {character.nicknames.map((nickname, index) => (
                      <span
                        key={index}
                        className="bg-primary/20 border-primary/20 text-primary rounded-full border px-2 py-1 text-xs backdrop-blur-xs md:px-3 md:text-sm"
                      >
                        {nickname}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-background/80 sticky top-0 z-30 border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-2 md:px-4">
          <div className="no-scrollbar flex gap-4 overflow-x-auto md:gap-6">
            <TabButton
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              icon={<IoPersonCircleOutline />}
              label="About"
            />
            <TabButton
              active={activeTab === "anime"}
              onClick={() => setActiveTab("anime")}
              icon={<PiTelevisionSimpleBold />}
              label="Anime"
            />
            <TabButton
              active={activeTab === "manga"}
              onClick={() => setActiveTab("manga")}
              icon={<FaBook />}
              label="Manga"
            />
            <TabButton
              active={activeTab === "voices"}
              onClick={() => setActiveTab("voices")}
              icon={<MdTheaterComedy />}
              label="Voice Actors"
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "about" && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Character Stats */}
                {Object.entries(characterData).map(([key, value], index) => {
                  if (key === "Story") return null;
                  const IconComponent =
                    iconComponents[characterFieldIcons[key]] ||
                    IoPersonCircleOutline;

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "backOut",
                      }}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 backdrop-blur-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-white/[0.02] p-2.5">
                          <IconComponent className="text-primary h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-base font-medium text-white/90">
                            {key}
                          </h3>
                          <p className="text-sm text-white/60">{value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Story Paragraphs */}
                {characterData?.Story?.split("\n\n").map((paragraph, index) => (
                  <motion.div
                    key={index}
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="rounded-lg bg-white/[0.02] p-2.5">
                        <FaQuoteLeft className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white/90">
                          {index === 0 ? "Description" : `Part ${index + 1}`}
                        </h3>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 backdrop-blur-xs">
                      <p className="text-sm leading-relaxed text-white/80">
                        {paragraph
                          .trim()
                          .split("\n")
                          .map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                              <br />
                            </span>
                          ))}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "anime" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {character?.anime?.map((entry, index) => (
                  <CharacterInfoCard
                    key={entry.anime.mal_id}
                    title={entry.anime.title}
                    role={entry.role}
                    image={entry.anime.images.webp.image_url}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}

            {activeTab === "manga" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {character?.manga?.map((entry, index) => (
                  <CharacterInfoCard
                    key={entry.manga.mal_id}
                    title={entry.manga.title}
                    role={entry.role}
                    image={entry.manga.images.webp.image_url}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}

            {activeTab === "voices" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {character?.voices?.map((voice, index) => (
                  <CharacterInfoCard
                    key={voice.person.mal_id}
                    title={voice.person.name}
                    role={voice.language}
                    image={voice.person.images.jpg.image_url}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CharacterPage;
