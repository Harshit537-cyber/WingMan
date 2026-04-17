// // AgoraCall.jsx
// import { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client"; // npm install socket.io-client
// import AgoraRTC, {
//   AgoraRTCProvider,
//   useJoin,
//   useLocalCameraTrack,
//   useLocalMicrophoneTrack,
//   usePublish,
//   LocalVideoTrack,
//   RemoteUser,
//   useRemoteUsers,
// } from "agora-rtc-react";
// import { useLocation } from "react-router-dom";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
// const socket = io("http://localhost:5000");

// // ─── Inner call component (inside AgoraRTCProvider) ─────────────────────────
// function CallRoom({ callConfig, onLeave }) {
//   const { localCameraTrack } = useLocalCameraTrack(true);
//   const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
//   usePublish([localMicrophoneTrack, localCameraTrack].filter(Boolean));
//   const remoteUsers = useRemoteUsers();
//   useJoin(
//     {
//       appid: callConfig.appId,
//       channel: callConfig.channelName,
//       token: callConfig.token,
//     },
//     true,
//   );

//   return (
//     <div className="min-h-screen bg-gray-950 flex flex-col">
//       <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//           <span className="text-white text-sm font-medium">In call</span>
//         </div>
//         <span className="text-gray-400 text-sm">
//           {remoteUsers.length + 1} participants
//         </span>
//       </div>

//       <div className="flex-1 p-4 grid grid-cols-2 gap-3">
//         <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video">
//           {localCameraTrack ? (
//             <LocalVideoTrack
//               track={localCameraTrack}
//               play
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
//               No camera
//             </div>
//           )}
//           <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
//             You
//           </div>
//         </div>
//         {remoteUsers.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-700 aspect-video flex items-center justify-center text-gray-500 text-sm">
//             Waiting...
//           </div>
//         ) : (
//           remoteUsers.map((u) => (
//             <div
//               key={u.uid}
//               className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video"
//             >
//               <RemoteUser user={u} className="w-full h-full object-cover" />
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex justify-center py-5 border-t border-gray-800">
//         <button
//           onClick={onLeave}
//           className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all active:scale-95"
//         >
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Main App ────────────────────────────────────────────────────────────────
// export default function AgoraCall() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const myUserId = user?._id;
//   const location = useLocation();
//   //   const friendUserId = location?.state?.userId

//   const friendUserId = location?.state?.userId;
//   const isCaller = location?.state?.isCaller;

//   const [screen, setScreen] = useState("home"); // home | calling | ringing | incall
//   const [callConfig, setCallConfig] = useState(null);
//   const [incomingCall, setIncoming] = useState(null); // { fromUserId, channelName }
//   const [calleeId, setCalleeId] = useState("");

//   useEffect(() => {
//     if (!myUserId) return;

//     socket.emit("register", myUserId);

//     socket.on("incoming:call", ({ fromUserId, channelName }) => {
//       setIncoming({ fromUserId, channelName });
//       setScreen("ringing");
//     });

//     socket.on("call:ready", ({ token, channelName, appId }) => {
//       setCallConfig({ token, channelName, appId });
//       setScreen("incall");
//     });

//     socket.on("call:declined", () => {
//       setScreen("home");
//       alert("Call was declined.");
//     });

//     socket.on("call:ended", () => {
//       setScreen("home");
//       setCallConfig(null);
//     });

//     return () => socket.removeAllListeners();
//   }, [myUserId]);

//   //   const startCall = () => {
//   //      const user = JSON.parse(localStorage.getItem('user'))
//   //     if (!calleeId.trim()) return;
//   //     const channelName = `call_${Date.now()}`;   // unique channel per call
//   //     socket.emit('call:invite', {
//   //       fromUserId: user._id,
//   //      // toUserId: calleeId.trim(),
//   //       toUserId: friendUserId,
//   //       channelName,
//   //     });
//   //     setScreen('calling');
//   //   };

//   const startCall = (toUserId) => {
//     if (!toUserId) return;

//     const channelName = `call_${Date.now()}`;

//     socket.emit("call:invite", {
//       fromUserId: myUserId,
//       toUserId: toUserId,
//       channelName,
//     });

//     setCalleeId(toUserId); // store for UI / end call
//     setScreen("calling");
//   };

//   useEffect(() => {
//     if (isCaller && friendUserId) {
//       startCall(friendUserId);
//     }
//   }, [isCaller, friendUserId]);

//   //   const acceptCall = () => {
//   //     socket.emit('call:accept', {
//   //       fromUserId: incomingCall.fromUserId,
//   //       toUserId: myUserId.current,
//   //       channelName: incomingCall.channelName,
//   //     });
//   //   };
//   const acceptCall = () => {
//     socket.emit("call:accept", {
//       fromUserId: incomingCall.fromUserId,
//       toUserId: myUserId, // ✅ correct (logged in user)
//       channelName: incomingCall.channelName,
//     });
//   };

//   const declineCall = () => {
//     socket.emit("call:decline", { fromUserId: incomingCall.fromUserId });
//     setIncoming(null);
//     setScreen("home");
//   };

//   //   const endCall = () => {
//   //     const otherId = incomingCall?.fromUserId || calleeId;
//   //     socket.emit('call:end', { toUserId: otherId });
//   //     setScreen('home');
//   //     setCallConfig(null);
//   //     setIncoming(null);
//   //   };
//   const endCall = () => {
//     const otherId = incomingCall?.fromUserId || calleeId;

//     socket.emit("call:end", { toUserId: otherId });

//     setScreen("home");
//     setCallConfig(null);
//     setIncoming(null);
//   };

//   // ── Screens ────────────────────────────────────────────────────────────────

//   if (screen === "incall" && callConfig) {
//     return (
//       <AgoraRTCProvider client={client}>
//         <CallRoom callConfig={callConfig} onLeave={endCall} />
//       </AgoraRTCProvider>
//     );
//   }

//   if (screen === "ringing") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800">
//           <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
//             <svg
//               className="w-10 h-10 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//               />
//             </svg>
//           </div>
//           <p className="text-gray-400 text-sm mb-1">Incoming call from</p>
//           <p className="text-white text-xl font-bold mb-6">
//             {incomingCall?.fromUserId}
//           </p>
//           <div className="flex gap-4">
//             <button
//               onClick={declineCall}
//               className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all"
//             >
//               Decline
//             </button>
//             <button
//               onClick={acceptCall}
//               className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all"
//             >
//               Accept
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (screen === "calling") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800">
//           <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
//             <svg
//               className="w-10 h-10 text-white animate-spin"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8H4z"
//               />
//             </svg>
//           </div>
//           <p className="text-white text-xl font-bold mb-1">{calleeId}</p>
//           <p className="text-gray-400 text-sm mb-6">Calling...</p>
//           <button
//             onClick={() => {
//               socket.emit("call:end", { toUserId: calleeId });
//               setScreen("home");
//             }}
//             className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Home screen
//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm border border-gray-800">
//         <h1 className="text-white text-xl font-bold mb-1">Video Call</h1>
//         <p className="text-gray-400 text-sm mb-6">
//           Your ID:{" "}
//           <span className="text-blue-400 font-mono">{myUserId.current}</span>
//         </p>
//         <input
//           type="text"
//           placeholder="Enter friend's user ID..."
//           value={calleeId}
//           onChange={(e) => setCalleeId(e.target.value)}
//           className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors"
//         />
//         <button
//           onClick={startCall}
//           className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
//             />
//           </svg>
//           Call
//         </button>
//       </div>
//     </div>
//   );
// }



// AgoraCall.jsx
// import { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import AgoraRTC, {
//   AgoraRTCProvider,
//   useJoin,
//   useLocalCameraTrack,
//   useLocalMicrophoneTrack,
//   usePublish,
//   LocalVideoTrack,
//   RemoteUser,
//   useRemoteUsers,
// } from "agora-rtc-react";
// import { useLocation } from "react-router-dom";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
// const socket = io("http://localhost:5000");

// // ─── Call Room (inside AgoraRTCProvider) ─────────────────────────────────────
// function CallRoom({ callConfig, onLeave }) {
//   const { localCameraTrack } = useLocalCameraTrack(true);
//   const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
//   usePublish([localMicrophoneTrack, localCameraTrack].filter(Boolean));
//   const remoteUsers = useRemoteUsers();

//   useJoin(
//     {
//       appid: callConfig.appId,
//       channel: callConfig.channelName,
//       token: callConfig.token,
//     },
//     true
//   );

//   return (
//     <div className="min-h-screen bg-gray-950 flex flex-col">
//       <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//           <span className="text-white text-sm font-medium">In call</span>
//         </div>
//         <span className="text-gray-400 text-sm">
//           {remoteUsers.length + 1} participants
//         </span>
//       </div>

//       <div className="flex-1 p-4 grid grid-cols-2 gap-3">
//         <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video">
//           {localCameraTrack ? (
//             <LocalVideoTrack
//               track={localCameraTrack}
//               play
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
//               No camera
//             </div>
//           )}
//           <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
//             You
//           </div>
//         </div>

//         {remoteUsers.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-700 aspect-video flex items-center justify-center text-gray-500 text-sm">
//             Waiting for other participant...
//           </div>
//         ) : (
//           remoteUsers.map((u) => (
//             <div
//               key={u.uid}
//               className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video"
//             >
//               <RemoteUser user={u} className="w-full h-full object-cover" />
//             </div>
//           ))
//         )}
//       </div>

//       <div className="flex justify-center py-5 border-t border-gray-800">
//         <button
//           onClick={onLeave}
//           className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all active:scale-95"
//         >
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function AgoraCall() {
//   // ✅ FIX 1: Parse user once, store stably
//   const userRef = useRef(JSON.parse(localStorage.getItem("user")));
//   const myUserId = userRef.current?._id;

//   const location = useLocation();
//   const friendUserId = location?.state?.userId;
//   const isCaller = location?.state?.isCaller;

//   const [screen, setScreen] = useState("home");
//   const [callConfig, setCallConfig] = useState(null);
//   const [incomingCall, setIncoming] = useState(null);
//   const [calleeId, setCalleeId] = useState("");

//   // ✅ FIX 2: Register socket immediately, not inside effect with dependency
//   useEffect(() => {
//     if (!myUserId) {
//       console.warn("⚠️ No myUserId — user not logged in");
//       return;
//     }

//     // Register as soon as component mounts
//     console.log("📡 Registering socket for:", myUserId);
//     socket.emit("register", myUserId);

//     // Re-register on reconnect (important!)
//     socket.on("connect", () => {
//       console.log("🔄 Socket reconnected, re-registering:", myUserId);
//       socket.emit("register", myUserId);
//     });

//     socket.on("incoming:call", ({ fromUserId, channelName }) => {
//       console.log("📞 Incoming call from:", fromUserId);
//       setIncoming({ fromUserId, channelName });
//       setScreen("ringing");
//     });

//     socket.on("call:ready", ({ token, channelName, appId }) => {
//       console.log("✅ Call ready, joining channel:", channelName);
//       setCallConfig({ token, channelName, appId });
//       setScreen("incall");
//     });

//     socket.on("call:declined", () => {
//       console.log("❌ Call declined");
//       setScreen("home");
//       alert("Call was declined.");
//     });

//     socket.on("call:ended", () => {
//       console.log("📵 Call ended by other party");
//       setScreen("home");
//       setCallConfig(null);
//     });

//     socket.on("call:error", ({ message }) => {
//       console.error("Call error:", message);
//       alert(message);
//       setScreen("home");
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("incoming:call");
//       socket.off("call:ready");
//       socket.off("call:declined");
//       socket.off("call:ended");
//       socket.off("call:error");
//     };
//   }, [myUserId]);

//   // ✅ FIX 3: Auto-start call if navigated as caller
//   useEffect(() => {
//     if (isCaller && friendUserId && myUserId) {
//       startCall(friendUserId);
//     }
//   }, [isCaller, friendUserId, myUserId]);

//   const startCall = (toUserId) => {
//     if (!toUserId) return;
//     const channelName = `call_${Date.now()}`;
//     console.log("📤 Sending call invite to:", toUserId);
//     socket.emit("call:invite", {
//       fromUserId: myUserId,
//       toUserId,
//       channelName,
//     });
//     setCalleeId(toUserId);
//     setScreen("calling");
//   };

//   const acceptCall = () => {
//     console.log("✅ Accepting call from:", incomingCall.fromUserId);
//     socket.emit("call:accept", {
//       fromUserId: incomingCall.fromUserId,
//       toUserId: myUserId,
//       channelName: incomingCall.channelName,
//     });
//   };

//   const declineCall = () => {
//     socket.emit("call:decline", { fromUserId: incomingCall.fromUserId });
//     setIncoming(null);
//     setScreen("home");
//   };

//   const endCall = () => {
//     const otherId = incomingCall?.fromUserId || calleeId;
//     socket.emit("call:end", { toUserId: otherId });
//     setScreen("home");
//     setCallConfig(null);
//     setIncoming(null);
//   };

//   // ── Screens ────────────────────────────────────────────────────────────────

//   if (screen === "incall" && callConfig) {
//     return (
//       <AgoraRTCProvider client={client}>
//         <CallRoom callConfig={callConfig} onLeave={endCall} />
//       </AgoraRTCProvider>
//     );
//   }

//   // ✅ INCOMING CALL SCREEN (receiver sees this)
//   if (screen === "ringing") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800 shadow-2xl">
//           {/* Animated ring effect */}
//           <div className="relative flex items-center justify-center mx-auto mb-6 w-24 h-24">
//             <div className="absolute w-24 h-24 rounded-full bg-green-500/20 animate-ping" />
//             <div className="absolute w-20 h-20 rounded-full bg-green-500/30 animate-ping delay-75" />
//             <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center z-10">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <p className="text-gray-400 text-sm mb-1">Incoming video call from</p>
//           <p className="text-white text-lg font-bold mb-2 truncate px-2">
//             {incomingCall?.fromUserId}
//           </p>
//           <p className="text-gray-500 text-xs mb-8">Wants to video call you</p>

//           <div className="flex gap-4">
//             <button
//               onClick={declineCall}
//               className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               {/* Phone down icon */}
//               <svg className="w-5 h-5 rotate-135" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
//               </svg>
//               Decline
//             </button>
//             <button
//               onClick={acceptCall}
//               className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               {/* Phone icon */}
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
//               </svg>
//               Accept
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (screen === "calling") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800">
//           <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
//             <svg
//               className="w-10 h-10 text-white animate-spin"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8H4z"
//               />
//             </svg>
//           </div>
//           <p className="text-white text-xl font-bold mb-1 truncate">{calleeId}</p>
//           <p className="text-gray-400 text-sm mb-6">Calling...</p>
//           <button
//             onClick={() => {
//               socket.emit("call:end", { toUserId: calleeId });
//               setScreen("home");
//             }}
//             className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Home screen
//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm border border-gray-800">
//         <h1 className="text-white text-xl font-bold mb-1">Video Call</h1>
//         <p className="text-gray-400 text-sm mb-6">
//           Your ID:{" "}
//           <span className="text-blue-400 font-mono text-xs break-all">{myUserId}</span>
//         </p>
//         <input
//           type="text"
//           placeholder="Enter friend's user ID..."
//           value={calleeId}
//           onChange={(e) => setCalleeId(e.target.value)}
//           className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors"
//         />
//         <button
//           onClick={() => startCall(calleeId)}
//           className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 10l4.553-2.277A1 1 0 0121 8.677v6.646a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
//             />
//           </svg>
//           Call
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { useSocket } from "../context/SocketContext"; // ← from context
// import AgoraRTC, {
//   AgoraRTCProvider,
//   useJoin,
//   useLocalCameraTrack,
//   useLocalMicrophoneTrack,
//   usePublish,
//   LocalVideoTrack,
//   RemoteUser,
//   useRemoteUsers,
// } from "agora-rtc-react";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// function CallRoom({ callConfig, onLeave }) {
//   const { localCameraTrack } = useLocalCameraTrack(true);
//   const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
//   usePublish([localMicrophoneTrack, localCameraTrack].filter(Boolean));
//   const remoteUsers = useRemoteUsers();
//   useJoin({ appid: callConfig.appId, channel: callConfig.channelName, token: callConfig.token }, true);

//   return (
//     <div className="min-h-screen bg-gray-950 flex flex-col">
//       <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//           <span className="text-white text-sm font-medium">In call</span>
//         </div>
//         <span className="text-gray-400 text-sm">{remoteUsers.length + 1} participants</span>
//       </div>
//       <div className="flex-1 p-4 grid grid-cols-2 gap-3">
//         <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video">
//           {localCameraTrack ? (
//             <LocalVideoTrack track={localCameraTrack} play className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">No camera</div>
//           )}
//           <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">You</div>
//         </div>
//         {remoteUsers.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-700 aspect-video flex items-center justify-center text-gray-500 text-sm">
//             Waiting...
//           </div>
//         ) : (
//           remoteUsers.map((u) => (
//             <div key={u.uid} className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 aspect-video">
//               <RemoteUser user={u} className="w-full h-full object-cover" />
//             </div>
//           ))
//         )}
//       </div>
//       <div className="flex justify-center py-5 border-t border-gray-800">
//         <button onClick={onLeave} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all active:scale-95">
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function AgoraCall() {
//   // ✅ Everything comes from global context now
//   const { socket, incomingCall, setIncomingCall, myUserId } = useSocket();

//   const location = useLocation();
//   const friendUserId = location?.state?.userId;
//   const isCaller = location?.state?.isCaller;

//   const [screen, setScreen] = useState("home");
//   const [callConfig, setCallConfig] = useState(null);
//   const [calleeId, setCalleeId] = useState("");

//   useEffect(() => {
//     // ✅ If receiver was navigated here by SocketProvider, show ringing
//     if (incomingCall && !isCaller) {
//       setScreen("ringing");
//     }
//   }, [incomingCall]);

//   useEffect(() => {
//     const onCallReady = ({ token, channelName, appId }) => {
//       setCallConfig({ token, channelName, appId });
//       setScreen("incall");
//     };
//     const onCallDeclined = () => {
//       setScreen("home");
//       alert("Call was declined.");
//     };
//     const onCallEnded = () => {
//       setScreen("home");
//       setCallConfig(null);
//     };
//     const onCallError = ({ message }) => {
//       alert(message);
//       setScreen("home");
//     };

//     socket.on("call:ready", onCallReady);
//     socket.on("call:declined", onCallDeclined);
//     socket.on("call:ended", onCallEnded);
//     socket.on("call:error", onCallError);

//     return () => {
//       socket.off("call:ready", onCallReady);
//       socket.off("call:declined", onCallDeclined);
//       socket.off("call:ended", onCallEnded);
//       socket.off("call:error", onCallError);
//     };
//   }, [socket]);

//   // Auto-start if navigated as caller
//   useEffect(() => {
//     if (isCaller && friendUserId) {
//       startCall(friendUserId);
//     }
//   }, [isCaller, friendUserId]);

//   const startCall = (toUserId) => {
//     if (!toUserId) return;
//     const channelName = `call_${Date.now()}`;
//     socket.emit("call:invite", { fromUserId: myUserId, toUserId, channelName });
//     setCalleeId(toUserId);
//     setScreen("calling");
//   };

//   const acceptCall = () => {
//     socket.emit("call:accept", {
//       fromUserId: incomingCall.fromUserId,
//       toUserId: myUserId,
//       channelName: incomingCall.channelName,
//     });
//   };

//   const declineCall = () => {
//     socket.emit("call:decline", { fromUserId: incomingCall.fromUserId });
//     setIncomingCall(null);
//     setScreen("home");
//   };

//   const endCall = () => {
//     const otherId = incomingCall?.fromUserId || calleeId;
//     socket.emit("call:end", { toUserId: otherId });
//     setScreen("home");
//     setCallConfig(null);
//     setIncomingCall(null);
//   };

//   if (screen === "incall" && callConfig) {
//     return (
//       <AgoraRTCProvider client={client}>
//         <CallRoom callConfig={callConfig} onLeave={endCall} />
//       </AgoraRTCProvider>
//     );
//   }

//   if (screen === "ringing") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800 shadow-2xl">
//           <div className="relative flex items-center justify-center mx-auto mb-6 w-24 h-24">
//             <div className="absolute w-24 h-24 rounded-full bg-green-500/20 animate-ping" />
//             <div className="absolute w-20 h-20 rounded-full bg-green-500/30 animate-ping delay-75" />
//             <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center z-10">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//             </div>
//           </div>
//           <p className="text-gray-400 text-sm mb-1">Incoming call from</p>
//           <p className="text-white text-lg font-bold mb-6 truncate px-2">{incomingCall?.fromUserId}</p>
//           <div className="flex gap-4">
//             <button onClick={declineCall} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all">
//               Decline
//             </button>
//             <button onClick={acceptCall} className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all">
//               Accept
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (screen === "calling") {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800">
//           <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
//             <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//           </div>
//           <p className="text-white text-xl font-bold mb-1 truncate">{calleeId}</p>
//           <p className="text-gray-400 text-sm mb-6">Calling...</p>
//           <button
//             onClick={() => { socket.emit("call:end", { toUserId: calleeId }); setScreen("home"); }}
//             className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm border border-gray-800">
//         <h1 className="text-white text-xl font-bold mb-1">Video Call</h1>
//         <p className="text-gray-400 text-sm mb-6">
//           Your ID: <span className="text-blue-400 font-mono text-xs break-all">{myUserId}</span>
//         </p>
//         <input
//           type="text"
//           placeholder="Enter friend's user ID..."
//           value={calleeId}
//           onChange={(e) => setCalleeId(e.target.value)}
//           className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors"
//         />
//         <button
//           onClick={() => startCall(calleeId)}
//           className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
//         >
//           Call
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
 import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import AgoraRTC, {
  AgoraRTCProvider,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRemoteAudioTracks,
} from "agora-rtc-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// ─── Audio Call Room ──────────────────────────────────────────────────────────
function CallRoom({ callConfig, onLeave, remoteUserName }) {
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
  const [muted, setMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [localVolume, setLocalVolume] = useState(0);
  const [remoteVolume, setRemoteVolume] = useState(0);
  const animFrameRef = useRef(null);

  usePublish([localMicrophoneTrack].filter(Boolean));
  useJoin(
    { appid: callConfig.appId, channel: callConfig.channelName, token: callConfig.token },
    true
  );

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // ✅ Play remote audio
  useEffect(() => {
    audioTracks.forEach((track) => track.play());
  }, [audioTracks]);

  // ✅ Poll volume levels from Agora tracks
  useEffect(() => {
    const poll = () => {
      // Local mic volume
      if (localMicrophoneTrack && !muted) {
        const vol = localMicrophoneTrack.getVolumeLevel(); // 0.0 → 1.0
        setLocalVolume(vol);
      } else {
        setLocalVolume(0);
      }

      // Remote audio volume
      if (audioTracks.length > 0) {
        const vol = audioTracks[0].getVolumeLevel();
        setRemoteVolume(vol);
      } else {
        setRemoteVolume(0);
      }

      animFrameRef.current = requestAnimationFrame(poll);
    };

    animFrameRef.current = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [localMicrophoneTrack, audioTracks, muted]);

  // ✅ Call timer
  useEffect(() => {
    const timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const toggleMute = () => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(muted);
      setMuted((m) => !m);
    }
  };

  // Scale bubble: 1.0 at silence, up to 1.5 when loud
  const localScale  = 1 + localVolume  * 1.8;
  const remoteScale = 1 + remoteVolume * 1.8;

  // Opacity of the ring: faint at silence, bright when speaking
  const localOpacity  = 0.15 + localVolume  * 0.7;
  const remoteOpacity = 0.15 + remoteVolume * 0.7;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-between py-16 px-6">

      {/* Status */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          {remoteUsers.length > 0 ? "Connected" : "Connecting..."}
        </p>
        <p className="text-green-400 text-sm font-mono mt-1">
          {formatDuration(callDuration)}
        </p>
      </div>

      {/* Avatars */}
      <div className="flex flex-col items-center gap-12 w-full">

        {/* Remote user */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Voice ring — scales with remote volume */}
            <div
              className="absolute rounded-full bg-blue-500 transition-none"
              style={{
                width:   "100%",
                height:  "100%",
                
                opacity: remoteUsers.length > 0 ? remoteOpacity : 0,
                transform: `scale(${remoteUsers.length > 0 ? remoteScale : 1})`,
                transition: "transform 80ms ease-out, opacity 80ms ease-out",
              }}
            />
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center z-10 shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>
          <p className="text-white font-semibold text-sm">
            {remoteUsers.length > 0 ? "Friend" : "Waiting..."}
          </p>
          {remoteVolume > 0.05 && (
            <p className="text-blue-400 text-xs animate-pulse">🎙️ Speaking</p>
          )}
        </div>

        {/* Local user */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center w-28 h-28">
            {/* Voice ring — scales with local volume */}
            <div
              className="absolute rounded-full bg-green-500 transition-none"
              style={{
                width:   "100%",
                height:  "100%",
                opacity: !muted ? localOpacity : 0,
                transform: `scale(${!muted ? localScale : 1})`,
                transition: "transform 80ms ease-out, opacity 80ms ease-out",
              }}
            />
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center z-10 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>
          <p className="text-white font-semibold text-sm">You</p>
          {localVolume > 0.05 && !muted && (
            <p className="text-green-400 text-xs animate-pulse">🎙️ Speaking</p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              muted ? "bg-red-600 hover:bg-red-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {muted ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v3m0 0H9m3 0h3M3 3l18 18M9.5 9.5A3 3 0 0012 15a3 3 0 002.5-1.5M12 3a3 3 0 013 3v4.5" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm-7 9a7 7 0 0014 0h-2a5 5 0 01-10 0H5zm7 9v-2.07A7.001 7.001 0 0019 11h-2a5 5 0 01-10 0H5a7.001 7.001 0 007 6.93V19H9v2h6v-2h-3z" />
              </svg>
            )}
          </button>
          <span className="text-gray-400 text-xs">{muted ? "Unmute" : "Mute"}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onLeave}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            <svg className="w-7 h-7 text-white rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
            </svg>
          </button>
          <span className="text-gray-400 text-xs">End</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AgoraCall() {
  const { socket, incomingCall, setIncomingCall, myUserId } = useSocket();

  const location = useLocation();
  const friendUserId = location?.state?.userId;
  const isCaller = location?.state?.isCaller;

  const [screen, setScreen] = useState("home");
  const [callConfig, setCallConfig] = useState(null);
  const [calleeId, setCalleeId] = useState("");

  useEffect(() => {
    if (incomingCall && !isCaller) {
      setScreen("ringing");
    }
  }, [incomingCall]);

  useEffect(() => {
    const onCallReady = ({ token, channelName, appId }) => {
      setCallConfig({ token, channelName, appId });
      setScreen("incall");
    };
    const onCallDeclined = () => { setScreen("home"); alert("Call was declined."); };
    const onCallEnded = () => { setScreen("home"); setCallConfig(null); };
    const onCallError = ({ message }) => { alert(message); setScreen("home"); };

    socket.on("call:ready", onCallReady);
    socket.on("call:declined", onCallDeclined);
    socket.on("call:ended", onCallEnded);
    socket.on("call:error", onCallError);

    return () => {
      socket.off("call:ready", onCallReady);
      socket.off("call:declined", onCallDeclined);
      socket.off("call:ended", onCallEnded);
      socket.off("call:error", onCallError);
    };
  }, [socket]);

  useEffect(() => {
    if (isCaller && friendUserId) startCall(friendUserId);
  }, [isCaller, friendUserId]);

  const startCall = (toUserId) => {
    if (!toUserId) return;
    const channelName = `call_${Date.now()}`;
    socket.emit("call:invite", { fromUserId: myUserId, toUserId, channelName });
    setCalleeId(toUserId);
    setScreen("calling");
  };

  const acceptCall = () => {
    socket.emit("call:accept", {
      fromUserId: incomingCall.fromUserId,
      toUserId: myUserId,
      channelName: incomingCall.channelName,
    });
  };

  const declineCall = () => {
    socket.emit("call:decline", { fromUserId: incomingCall.fromUserId });
    setIncomingCall(null);
    setScreen("home");
  };

  const endCall = () => {
    const otherId = incomingCall?.fromUserId || calleeId;
    socket.emit("call:end", { toUserId: otherId });
    setScreen("home");
    setCallConfig(null);
    setIncomingCall(null);
  };

  // ── Screens ────────────────────────────────────────────────────────────────

  if (screen === "incall" && callConfig) {
    return (
      <AgoraRTCProvider client={client}>
        <CallRoom callConfig={callConfig} onLeave={endCall} />
      </AgoraRTCProvider>
    );
  }

  if (screen === "ringing") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800 shadow-2xl">
          <div className="relative flex items-center justify-center mx-auto mb-6 w-28 h-28">
            <div className="absolute w-28 h-28 rounded-full bg-green-500/20 animate-ping" />
            <div className="absolute w-22 h-22 rounded-full bg-green-500/30 animate-ping delay-150" />
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center z-10">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Incoming audio call from</p>
          <p className="text-white text-lg font-bold mb-2 truncate px-2">
            {incomingCall?.fromUserId}
          </p>
          <p className="text-gray-500 text-xs mb-8">🎙️ Audio call</p>
          <div className="flex gap-4">
            <button
              onClick={declineCall}
              className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all active:scale-95"
            >
              Decline
            </button>
            <button
              onClick={acceptCall}
              className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all active:scale-95"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "calling") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-8 w-80 text-center border border-gray-800">
          <div className="relative flex items-center justify-center mx-auto mb-6 w-28 h-28">
            <div className="absolute w-28 h-28 rounded-full bg-blue-500/20 animate-ping" />
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center z-10">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
              </svg>
            </div>
          </div>
          <p className="text-white text-xl font-bold mb-1 truncate">{calleeId}</p>
          <p className="text-gray-400 text-sm mb-8">Calling...</p>
          <button
            onClick={() => { socket.emit("call:end", { toUserId: calleeId }); setScreen("home"); }}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm border border-gray-800">
        <h1 className="text-white text-xl font-bold mb-1">Audio Call</h1>
        <p className="text-gray-400 text-sm mb-6">
          Your ID: <span className="text-blue-400 font-mono text-xs break-all">{myUserId}</span>
        </p>
        <input
          type="text"
          placeholder="Enter friend's user ID..."
          value={calleeId}
          onChange={(e) => setCalleeId(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={() => startCall(calleeId)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          🎙️ Start Audio Call
        </button>
      </div>
    </div>
  );
}