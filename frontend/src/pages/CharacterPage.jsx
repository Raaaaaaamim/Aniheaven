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
  FaQuoteLeft,
  FaRulerVertical,
  FaUtensils,
  FaWeight,
} from "react-icons/fa";
import { GiPowerLightning } from "react-icons/gi";

import { GiArmorDowngrade, GiNinjaHeroicStance } from "react-icons/gi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdTheaterComedy } from "react-icons/md";

import {
  PiEyeBold,
  PiHairDryerFill,
  PiTelevisionSimpleBold,
} from "react-icons/pi";
import { useParams } from "react-router-dom";
import { parseAnimeCharacterData } from "../../lib/utils.js";

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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-primary/30 border-t-transparent rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Character Stats */}
                <div className="space-y-4">
                  {Object.entries(characterData).map(([key, value], index) => {
                    if (key === "Story") return null;
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
                        className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm rounded-xl p-4 md:p-6 hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="bg-primary/20 rounded-lg p-2 md:p-3">
                            {key === "Age" && (
                              <FaBirthdayCake className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Birthday" && (
                              <FaCalendarAlt className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Height" && (
                              <FaRulerVertical className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Weight" && (
                              <FaWeight className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Blood type" && (
                              <FaHeart className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Favorite food" && (
                              <FaUtensils className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Clan" && (
                              <GiNinjaHeroicStance className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Hair" && (
                              <PiHairDryerFill className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Eyes" && (
                              <PiEyeBold className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Eye Color" && (
                              <PiEyeBold className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Grade" && (
                              <GiArmorDowngrade className="text-primary text-lg md:text-xl" />
                            )}
                            {key === "Abilities" && (
                              <GiPowerLightning className="text-primary text-lg md:text-xl" />
                            )}
                            {![
                              "Age",
                              "Birthday",
                              "Height",
                              "Weight",
                              "Blood type",
                              "Favorite food",
                              "Clan",
                              "Hair",
                              "Eyes",
                              "Grade",
                              "Abilities",
                              "Eye Color",
                            ].includes(key) && (
                              <FaInfo className="text-primary text-lg md:text-xl" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
                              {key}
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                              {value}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Character Story */}
                <div className="space-y-6">
                  {characterData.Story?.split("\n").map((paragraph, index) => {
                    if (paragraph.trim() === "") return null;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "backOut",
                        }}
                        className="relative"
                      >
                        <div className="absolute -top-2 -left-2 text-primary/20">
                          <FaQuoteLeft size={24} />
                        </div>
                        <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/[0.05]">
                          <p className="text-white/80 leading-relaxed">
                            {paragraph}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "anime" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {character?.anime?.map((entry, index) => (
                  <AnimeCard
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
                  <AnimeCard
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
                  <VoiceActorCard
                    key={voice.person.mal_id}
                    name={voice.person.name}
                    language={voice.language}
                    image={voice.person.images.jpg.image_url}
                    delay={index * 0.1}
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

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 md:py-4 transition-all ${
      active ? "text-primary" : "text-white/70 hover:text-white"
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-primary/10 backdrop-blur-sm border-b-2 border-primary"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative z-10 text-base md:text-lg">{icon}</span>
    <span className="relative z-10 font-medium text-sm md:text-base whitespace-nowrap">
      {label}
    </span>
  </button>
);

const AnimeCard = ({ title, role, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="relative group"
  >
    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5">
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <div className="space-y-2 md:space-y-3">
            <h3 className="font-semibold text-base md:text-lg leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 md:gap-2 bg-primary/20 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-sm border border-primary/20">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-primary">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </div>
  </motion.div>
);

const VoiceActorCard = ({ name, language, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="group"
  >
    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5">
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <div className="space-y-2 md:space-y-3">
            <h3 className="font-semibold text-base md:text-lg leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 md:gap-2 bg-primary/20 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-sm border border-primary/20">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-primary">
                  {language}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </div>
  </motion.div>
);

export default CharacterPage;
