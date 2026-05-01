import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, CheckCircle } from "lucide-react";
import {
  Cake,
  Ruler,
  Heart,
  Globe,
  Languages,
  Utensils,
  PawPrint,
  Music,
  BookOpen,
  CookingPot,
  Plane,
  Film,
  Drama,
  PartyPopper,
  ShoppingBag,
  Palette,
  Mountain,
  Music2,
  Dumbbell,
  Mic,
  Gamepad2,
  Flower,
  Trophy,
  HeartPulse,
  Camera,
  Sparkles,
} from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./EditProfile.css";
import { useUser } from "../../../context/userinfo";
// Dummy Image (Replace with your actual asset path)
import userImg from "../../../assets/profile-user.png";
import axiosInstance from "../../../api/axiosInstance";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, loading, fetchUser } = useUser();
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("Developer");
  const [location, setLocation] = useState("Dehradun");
  const [interest, setInterest] = useState([]);
  const [photo, setPhoto] = useState([]);
  console.log(photo)
  const [about, setAbout] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [navigation, setNavigation] = useState("");
  const [passdata, usePassData] = useState('')
  useEffect(() => {
    if (user) {
      setName(user.name);

      if (user?.work_info?.position) {
        setOccupation(user.work_info.position);
        setNavigation("/Work");
        usePassData(user.work_info)
      } else if (user?.study_info?.course) {
        setOccupation(`Student ${user.study_info.course}`);
        setNavigation("/Study");
        usePassData(user.study_info)
      }else if(user?.location?.address){
        setLocation(user?.location);
        setNavigation("/ManualLocation");
        usePassData(user.location)
      }
      setLocation(user?.location?.address);
      setInterest(user?.interest);
      setPhoto(user?.photos);
      setAbout(user?.preferences);
    }
  }, [user]);

  const iconMap = {
    age: Cake,
    height: Ruler,
    religion: Heart,
    ethnicity: Globe,
    spoken_language: Languages,
  };

  const interestIconMap = {
    "Eating Out": Utensils,
    Pets: PawPrint,
    Music: Music,
    Reading: BookOpen,
    Cooking: CookingPot,
    Travel: Plane,
    Movies: Film,
    Theatre: Drama,
    Parting: PartyPopper,
    Shopping: ShoppingBag,
    "Art and Craft": Palette,
    Adventure: Mountain,
    Dancing: Music2,
    Fitness: Dumbbell,
    Singing: Mic,
    "Video Games": Gamepad2,
    Gardening: Flower,
    Sports: Trophy,
    Yoga: HeartPulse,
    Photography: Camera,
    Meditation: Sparkles,
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadUserImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilephoto", file);

    try {
      const res = await axiosInstance.post(
        `/user-profile-image/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success == true) {
        setSuccess(true);
        setFile(null);
        setPreview(null);
        fetchUser();

        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object" && value !== null) {
      return `${value.min} - ${value.max}`;
    }

    return value;
  };

  return (
    <AppLayout>
      <div className="ep-screen-wrapper">
        {/* TOP STATUS BAR SPACE */}
        <div className="ep-status-bar-mock"></div>

        <div className="ep-scroll-view">
          {/* --- PROFILE HEADER --- */}
          <div className="ep-header">
            <div className="ep-avatar-box">
              <img
                src={
                  preview ||
                  user?.profilephoto ||
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                }
                alt="user"
                className="ep-main-i"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?img=12";
                }}
              />

              <div
                className="ep-camera-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <Camera size={22} color="white" fill="currentColor" />
              </div>
            </div>

            {preview && (
              <button
                onClick={uploadUserImage}
                className="ep-change-photo-text flex items-center gap-2"
              >
                {success && preview != null ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    Uploaded Successfully
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload Image
                  </>
                )}
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* --- MAIN INFO CARD --- */}
          <div className="ep-main-card">
            <div className="ep-field-row">
              <div className="ep-label-box">Name</div>
              <div className="ep-input-box">
                <input
                  type="text"
                  value={name?.charAt(0).toUpperCase() + name?.slice(1)}
                  // onChange={(e) => setName(e.target.value)}
                  onClick={() =>
                    navigate("/askName", {
                      state: { profile_edit: "profile_edit", name: user?.name },
                    })
                  }
                  defaultValue="Wingmann"
                />
                {/* <span className="ep-age-val">23</span> */}
              </div>
            </div>

            <div className="ep-field-row">
              <div className="ep-label-box">Occupation</div>
              <div className="ep-input-box">
                <input
                  type="text"
                  value={
                    occupation
                      ? occupation.charAt(0).toUpperCase() + occupation.slice(1)
                      : "Software Developer"
                  }
                  // onChange={(e) => setOccupation(e.target.value)}
                  // onClick={()=>navigate(navigation, {
                  //     state: { profile_edit: "profile_edit", occupation: user?.name }
                  // })}
                  onClick={() => {
                    navigate(navigation, {
                      state: {
                        profile_edit: "profile_edit",
                        occupation: passdata, // ✅ correct value
                      },
                    });
                  }}
                  defaultValue="Software Devloper"
                />
              </div>
            </div>

            <div className="ep-field-row">
              <div className="ep-label-box">Location</div>
              <div className="ep-input-box">
                <input
                  type="text"
                  value={
                    location
                      ? location.charAt(0).toUpperCase() + location.slice(1)
                      : "Dehradun"
                  }
                  // onChange={(e) => setLocation(e.target.value)}
                
                  onClick={() =>
                    navigate("/ManualLocation", {
                      state: { location_edit: "location_edit", location: location.charAt(0).toUpperCase() + location.slice(1) },
                    })
                  }

                  defaultValue="Dehradun"
                />
                {/* <div className="ep-dist-tag">1km</div> */}
              </div>
            </div>

            <div className="ep-divider"></div>

            {/* About Me Section inside the same card */}
            <div className="ep-section-header">About me</div>
            <div className="ep-tags-grid">
              {Object.entries(about).map(([key, value]) => {
                const Icon = iconMap[key];

                return (
                  <div key={key} className="inline-flex m-1">
                    <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full text-sm font-medium">
                      {Icon && <Icon size={14} />}
                      {formatValue(value)}
                    </span>
                  </div>
                );
              })}
              {/* <div className="ep-add-tag-circle">
                <Plus size={18} color="#D1BBD8" strokeWidth={3} />
              </div> */}
            </div>
          </div>

          {/* --- INTERESTS CARD --- */}
          <div className="ep-main-card">
            <div className="ep-section-header">Interests</div>
            <div className="ep-tags-grid">
              {user?.interest?.map((item, index) => {
                const Icon = interestIconMap[item];

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {Icon && <Icon size={14} />}
                    {item}
                  </div>
                );
              })}

              <div
                className="ep-add-tag-circle"
                onClick={() =>
                  navigate("/intrest", {
                    state: {
                      profile_edit: "profile_edit",
                      interest: user?.interest,
                    },
                  })
                }
              >
                <Plus size={18} color="#D1BBD8" strokeWidth={3} />
              </div>
            </div>
            {/* <div className="ep-add-interest-btn">
              <Plus size={16} /> ADD Interest
            </div> */}
          </div>

          {/* --- PHOTO GRID CARD --- */}
          <div className="ep-main-card ep-photo-card">
            <div className="ep-photo-grid">
              {photo.map((value, i) => (
                <div key={i} className="ep-photo-slot">
                  <img src={value} alt="slot" />
                </div>
              ))}
              <div
                onClick={() =>
                  navigate("/uploads", {
                    state: {
                      profile_edit: "profile_edit",
                      Photos: user?.photos,
                    },
                  })
                }
                className="ep-photo-slot ep-add-slot"
              >
                <Plus size={32} color="#5D326F" strokeWidth={2.5} />
                <span>Add Photo</span>
              </div>
            </div>
          </div>

          {/* --- UPDATE BUTTON --- */}
          {/* <div className="ep-action-container">
            <button className="ep-update-btn">Update Profile</button>
          </div> */}

          <div className="ep-bottom-padding"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default EditProfile;
