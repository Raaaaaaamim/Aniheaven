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
import CharacterPageSkeleton from "../components/skeletons/CharacterPageSkeleton";
import CharacterInfoCard from "../components/ui/CharacterInfoCard.jsx";
import TabButton from "../components/ui/TabButton.jsx";

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
    <div className="w-full min-h-screen font-outfit  bg-background">
      {/* Hero Section */}
      <div className="relative mt-10 w-full min-h-[50vh] md:h-[60vh]">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <img
            src={character?.images?.webp?.image_url}
            className="w-full h-full object-cover"
            alt={character?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-sm" />
          <div className="absolute inset-0 mask backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative md:-top-[25px] xl:-top-10 -top-20 container mx-auto px-4 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 w-full h-full pb-8">
            {/* Left Side - Character Image */}
            <div className="w-[200px] sm:w-[240px] md:w-[280px] flex-shrink-0 mx-auto md:mx-0 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute bg-gradient-to-r rounded-2xl opacity-75 blur group-hover:opacity-100 transition-all duration-300" />
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                  <img
                    src={character?.images?.webp?.image_url}
                    alt={character?.name}
                    className="w-full h-full rounded-2xl scale-90 object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Character Info */}
            <div className="flex-1 text-white text-center md:text-left  mb-5 mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 md:space-y-4"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-text/90 to-text/60">
                  {character?.name}
                </h1>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                  {character?.name_kanji && (
                    <h2 className="text-xl md:text-2xl text-white/70 font-outfit">
                      {character?.name_kanji}
                    </h2>
                  )}
                  {character?.favorites > 0 && (
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-white/90">
                        {character?.favorites?.toLocaleString()} Favorites
                      </span>
                    </div>
                  )}
                </div>

                {/* Nicknames */}
                {character?.nicknames?.length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 px-2 md:px-0">
                    {character.nicknames.map((nickname, index) => (
                      <span
                        key={index}
                        className="px-2 md:px-3 py-1 text-xs md:text-sm bg-primary/20 backdrop-blur-sm rounded-full border border-primary/20 text-primary"
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
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                      className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-white/[0.02] rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-white/90 mb-1">
                            {key}
                          </h3>
                          <p className="text-white/60 text-sm">{value}</p>
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
                    <div className="flex items-center  gap-3 mb-2">
                      <div className="p-2.5 bg-white/[0.02] rounded-lg">
                        <FaQuoteLeft className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white/90">
                          {index === 0 ? "Description" : `Part ${index + 1}`}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/[0.05]">
                      <p className="text-white/80 text-sm leading-relaxed">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
