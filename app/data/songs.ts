const songs = [
  {
    id: 1,
    title: "Am I Dreaming",
    artist: "Metro Boomin, A$AP Rocky, Roisee",
    album: "/album/Spiderman wall.jpg",   
    src: "/music/Am I Dreaming.mp3",      
    duration: "2:05"
  },
  {
    id: 2,
    title: "Annihilate",
    artist: "Metro Boomin, Swae Lee, Lil Wayne, Offset",
    album: "/album/Spiderman wall.jpg",   // from public/album
    src: "/music/Annihilate.mp3",      // from public/music
    duration: "1:18"
  },
  {
    id: 3,
    title: "Calling",
    artist: "Metro Boomin, Swae Lee, Nav",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Calling.mp3",
    duration: "1:27"
  },
  {
    id: 4,
    title: "Home",
    artist: "Metro Boomin",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Home.mp3",
    duration: "1:11"
  },
  {
    id: 5,
    title: "Make it Out Alive",
    artist: "Malachii",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Make It Out Alive.mp3",
    duration: "1:16"
  },
  {
    id: 6,
    title: "Nonviolent Communication",
    artist: "Metro Boomin, James Blake,A$AP Rocky, 21 Savage",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Nonviolent Communication.mp3",
    duration: "1:01"
  },
  {
    id: 7,
    title: "Self Love",
    artist: "Metro Boomin, Coi Leray",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Self Love.mp3",
    duration: "1:22"
  },
  {
    id: 8,
    title: "Sunflower",
    artist: "Swae Lee, Post Malone",
    album: "/album/Spiderman wall.jpg",
    src: "/music/Sunflower.mp3",
    duration: "1:16"
  },
  {
    id: 9,
    title: "What's Up Danger",
    artist: "Blackway, Black Caviar",
    album: "/album/Spiderman wall.jpg",
    src: "/music/What's Up Danger.mp3",
    duration: "1:10"
  },
]

export type Song = typeof songs[0];

export default songs;