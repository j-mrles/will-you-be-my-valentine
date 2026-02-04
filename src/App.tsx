import { useState } from "react";

const GIFS = [
  "https://media.tenor.com/x-O6nTyo1-8AAAAM/doge-doge-meme.gif",
  "https://media.tenor.com/GJUz8DogSTUAAAAi/cute-cat-cutie.gif",
  "https://media.tenor.com/ZKDKcI-tQ_YAAAAm/happy-taps.webp",
  "https://media.tenor.com/4DiFwww6548AAAAm/kitty.webp",
  "https://media.tenor.com/mSVpXDtBoXMAAAAm/kitty-dancing.webp",
  "https://media.tenor.com/SFy5Za0DyMEAAAAm/erm-fingers.webp"
] as const;

const NO_BUTTON_PHRASES = [
  "No",
  "Are you sure?",
  "What if I asked really nicely?",
  "Pretty please",
  "With a chocolate rice cake on top",
  "What about a matcha frostie",
  "PLEASE POOKIE",
  "But :*(",
  "I am going to die",
  "Yep im dead",
  "ok ur talking to nathan's ghost",
  "please babe",
  ":((((",
  "PRETTY PLEASE",
  "Estoy muerto",
  "No :(",
] as const;

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // First GIF (index 0) only shows once, then cycle through the rest (1-5)
  const currentGifIndex = noCount === 0 ? 0 : 1 + ((noCount - 1) % (GIFS.length - 1));
  const currentGif = GIFS[currentGifIndex];
  const yesButtonSize = noCount * 20 + 16;
  const noButtonText =
    noCount === 0 ? "No" : NO_BUTTON_PHRASES[Math.min(noCount, NO_BUTTON_PHRASES.length - 1)];

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.error(`Failed to load GIF: ${target.src}`);
    // Skip index 0 (first GIF) when cycling through alternatives
    let nextIndex = currentGifIndex === 0 ? 1 : (currentGifIndex + 1) % GIFS.length;
    if (nextIndex === 0) nextIndex = 1; // Skip back to index 0
    target.src = GIFS[nextIndex];
  };

  return (
    <>
      {/* Floating hearts decoration */}
      <div className="heart" style={{ left: '10%', top: '20%' }}>💕</div>
      <div className="heart" style={{ left: '20%', top: '60%' }}>💖</div>
      <div className="heart" style={{ left: '80%', top: '30%' }}>💗</div>
      <div className="heart" style={{ left: '70%', top: '70%' }}>💝</div>
      <div className="heart" style={{ left: '50%', top: '10%' }}>💕</div>
      <div className="heart" style={{ left: '30%', top: '80%' }}>💖</div>
      <div className="heart" style={{ left: '90%', top: '50%' }}>💗</div>
      <div className="heart" style={{ left: '15%', top: '40%' }}>💝</div>
      
      <div className="-mt-16 flex h-screen flex-col items-center justify-center relative z-10">
        {yesPressed ? (
          <>
            <img 
              src={GIFS[0]} 
              alt="Celebration"
              className="border-4 border-pink-400 rounded-2xl shadow-2xl p-2 bg-white"
            />
            <div className="my-4 text-4xl font-bold text-pink-800 drop-shadow-lg">
              WOOOOOO!!! I love you pookie!! ;))
            </div>
          </>
        ) : (
          <>
            <img
              className="h-[200px] drop-shadow-2xl border-4 border-pink-400 rounded-2xl shadow-2xl p-2 bg-white"
              src={currentGif}
              key={`gif-${noCount}`}
              alt={`Valentine gif ${currentGifIndex + 1}`}
              onError={handleImageError}
            />
            <h1 className="my-4 text-4xl font-bold text-pink-900 drop-shadow-lg">
              Will you be my Valentine?
            </h1>
            <div className="flex items-center gap-4">
              <button
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-bold text-white shadow-lg hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200"
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="rounded-full bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 font-bold text-white shadow-lg hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200"
              >
                {noButtonText}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
