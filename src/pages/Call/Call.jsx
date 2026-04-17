import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "./call.css";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
const styles = {
  controls: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "15px",
    padding: "12px 20px",
    background: "rgba(0,0,0,0.5)",
    borderRadius: "50px",
    backdropFilter: "blur(10px)",
  },

  button: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
};

export default function Call() {
  const location = useLocation();
  const channelName = location.state?.channelName || "test-channel";
  const APP_ID = import.meta.env.VITE_APP_ID;

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  
  const isCaller = location?.state?.isCaller;
  useEffect(() => {
    const init = async () => {
      try {
        // 🔥 1. GET TOKEN FROM BACKEND
        const res = await axiosInstance.post("/token", {
          channelName,
        });
      

        const { token: agoraToken, uid } = res.data;

      

        if (!APP_ID || !channelName || !agoraToken) {
          console.error("Missing required values");
          return;
        }

        await client.join(APP_ID, channelName, agoraToken, uid || null);

    

        // 🔥 3. CHECK DEVICES
        const devices = await AgoraRTC.getDevices();

        const hasMic = devices.some((d) => d.kind === "audioinput");
        const hasCam = devices.some((d) => d.kind === "videoinput");

        let tracks = [];

        // 🔥 4. CREATE TRACKS ONLY IF AVAILABLE
        if (hasMic || hasCam) {
          try {
            const [micTrack, camTrack] =
              await AgoraRTC.createMicrophoneAndCameraTracks();

            tracks = [micTrack, camTrack];

            // 🔥 OPTIONAL: SHOW LOCAL VIDEO
            camTrack.play("local-container");
          } catch (err) {
            console.log("Media not available, joining without publish");
          }
        }

        // 🔥 5. PUBLISH IF TRACKS EXIST
        if (tracks.length > 0) {
          await client.publish(tracks);
       
        }

        // 🔥 6. HANDLE REMOTE USERS
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            user.videoTrack.play("remote-container");
          }

          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });

        client.on("user-unpublished", (user) => {
          console.log("User left:", user.uid);
        });
      } catch (error) {
        console.error("Call error:", error);
      }
    };

    init();

    // 🔥 CLEANUP (VERY IMPORTANT)
    return () => {
      client.leave();
      client.removeAllListeners();
    };
  }, []);

  const joinCall = async () => {
    await init(); // your join logic
    setJoined(true);
  };

  const rejectCall = () => {
    navigate("/");
  };

  let micTrack;

  const toggleMute = async () => {
    if (micTrack) {
      await micTrack.setEnabled(!micTrack.enabled);
    }
  };

  let camTrack;

  const toggleCamera = async () => {
    if (camTrack) {
      await camTrack.setEnabled(!camTrack.enabled);
    }
  };

  const endCall = async () => {
    await client.leave();
    window.location.href = "/"; // or navigate
  };

  if (isCaller) {
    console.log("Calling...");
  }

  return (
    <>
      <div style={styles.container}>
        {/* Remote Video (Full Screen) */}
        <div id="remote-container" style={styles.remoteVideo}></div>

        {/* Local Video (Small Floating) */}
        <div id="local-container" style={styles.localVideo}></div>

        {/* Call Controls */}
        <div style={styles.controls}>
          <button
            onClick={toggleMute}
            style={{
              ...styles.button,
              backgroundColor: isMuted ? "#ff4d4f" : "#1f2937",
            }}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>

          <button
            onClick={toggleCamera}
            style={{
              ...styles.button,
              backgroundColor: isCameraOff ? "#ff4d4f" : "#1f2937",
            }}
          >
            {isCameraOff ? <VideoOff /> : <Video />}
          </button>

          <button
            onClick={endCall}
            style={{
              ...styles.button,
              backgroundColor: "#ef4444",
            }}
          >
            <PhoneOff />
          </button>
        </div>
      </div>
      {!isCaller && !joined && (
        <div className="incoming-call">
          <h2>Incoming Call...</h2>
          <button onClick={joinCall}>Accept</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}
    </>
  );
}
