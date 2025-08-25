import React, { useState, useRef, useEffect } from "react";
import { getSpeech } from "../../helper/apis";

const ReadButton = ({ news }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const handleReadAloud = async () => {
    try {
      setIsLoading(true);

      if (!audioSrc) {
        let base64Audio = news.newsAudio?.en;

        // If audio not already stored, request backend
        if (!base64Audio) {
          const res = await getSpeech({
            text: `<p>Title: ${news.title?.en}.</p> <p>Description:</p> ${news.description?.en}`,
            newsId: news._id,
          });
          base64Audio = res.audioContent; // backend returns audioContent (base64)
        }

        // Convert base64 → Blob URL
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const audioUrl = URL.createObjectURL(
          new Blob([bytes], { type: "audio/mp3" })
        );

        setAudioSrc(audioUrl);

        // Set up audio
        audioRef.current.src = audioUrl;
        audioRef.current.onended = handleAudioEnd;

        // ✅ Wait until audio is loaded before playing
        await new Promise((resolve, reject) => {
          audioRef.current.oncanplaythrough = () => {
            resolve();
          };
          audioRef.current.onerror = (err) => {
            reject(err);
          };
          audioRef.current.load();
        });
      }

      setIsReading(true);
      setIsPaused(false);
      await audioRef.current.play();
    } catch (error) {
      console.error("Error in handleReadAloud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same ...
  const handlePause = () => {
    if (isReading) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsReading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsReading(false);
      setIsPaused(false);
    }
  };

  const handleAudioEnd = () => {
    setIsReading(false);
    setIsPaused(false);
  };

  return (
    <div className="read-button-container">
      <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnd} hidden />

      {isReading || isPaused ? (
        <div className="audio-controls">
          <button
            onClick={isReading ? handlePause : handleReadAloud}
            className={`control-btn play-pause-btn ${
              isReading ? "playing" : ""
            } ${isPaused ? "paused" : ""}`}
            disabled={isLoading}
          >
            <div className="btn-content">
              <div className="icon-wrapper">
                <i className={`fas ${isReading ? "fa-pause" : "fa-play"}`}></i>
              </div>
              <span>{isReading ? "Pause" : isPaused ? "Resume" : "Play"}</span>
            </div>
            <div className="wave-animation"></div>
          </button>

          <button onClick={handleStop} className="control-btn stop-btn">
            <div className="btn-content">
              <div className="icon-wrapper">
                <i className="fas fa-stop"></i>
              </div>
              <span>Stop</span>
            </div>
          </button>
        </div>
      ) : (
        <button
          onClick={handleReadAloud}
          className={`read-aloud-btn ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          <div className="btn-content">
            <div className="icon-wrapper">
              <i className="fas fa-volume-up"></i>
              {isLoading && <div className="loading-spinner"></div>}
            </div>
            <span>{isLoading ? "Processing..." : "Read News"}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default ReadButton;
