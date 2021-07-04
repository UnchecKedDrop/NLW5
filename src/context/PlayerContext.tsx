import { EphemeralKeyInfo } from 'node:tls';
import { createContext, useState, ReactNode } from 'react';
import Episode from '../pages/episodes/[slug]';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [episodeList, setEpisodeList] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLoolping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLoolping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function playNext() {
      const nextEpisodeIndex = currentEpisodeIndex + 1
      if(isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      } else if(nextEpisodeIndex < episodeList.length) {
          setCurrentEpisodeIndex(nextEpisodeIndex)
      }
  }

  function playPrevious() {    
    if(currentEpisodeIndex > 0) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
}

  return (
    <PlayerContext.Provider 
        value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            playList, 
            isPlaying, 
            togglePlay, 
            setPlayingState,
            playNext,
            playPrevious,
            isLooping,
            toggleLoop,
            isShuffling,
            toggleShuffle,
        }}
    >
        {children}
    </PlayerContext.Provider>
  )
}