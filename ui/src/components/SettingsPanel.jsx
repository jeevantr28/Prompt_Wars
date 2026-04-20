import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  Key,
  Edit2,
} from "lucide-react";

export default function SettingsPanel({ isLightMode, setIsLightMode }) {
  // Accordion State
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isAdditionalOptionsOpen, setIsAdditionalOptionsOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: "John Doe",
    dob: "1995-08-15",
    gender: "Male",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
    emergencyContact: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Aadhaar OTP State
  const [aadhaar, setAadhaar] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);

  // Preferences State
  const [prefs, setPrefs] = useState({
    crowdAlerts: true,
    concessionPromos: true,
    locationTracking: true,
    notificationsEnabled: true,
    locationServices: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsEditingProfile(false);
    }, 1500);
  };

  const handleSendOtp = () => {
    if (aadhaar.length < 12)
      return alert("Please enter a valid 12-digit Aadhaar number.");
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setIsAadhaarVerified(true);
      setIsOtpSent(false);
    } else {
      alert("Invalid OTP. Please enter 6 digits.");
    }
  };

  const togglePref = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const Toggle = ({ active, onClick }) => (
    <div
      className={`toggle-switch ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="toggle-thumb" />
    </div>
  );

  return (
    <div
      className="glass-panel"
      style={{
        gridColumn: "1 / -1",
        gridRow: "1 / -1",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border-glass)",
          paddingBottom: "1rem",
        }}
      >
        <h3
          className="glow-text"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "1.5rem",
          }}
        >
          <Settings size={28} className="glow-purple" />
          Fan App Settings
        </h3>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
          overflowY: "auto",
          paddingRight: "1rem",
        }}
      >
        {/* Personal Info Accordion */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid var(--border-glass)",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              background: isPersonalInfoOpen
                ? "rgba(255,255,255,0.05)"
                : "transparent",
            }}
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--accent-blue)",
                fontSize: "1.2rem",
                margin: 0,
              }}
            >
              <User size={20} /> Personal Information
            </h4>
            {isPersonalInfoOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>

          {isPersonalInfoOpen && (
            <div
              className="animate-slide-up"
              style={{
                padding: "1.5rem",
                borderTop: "1px solid var(--border-glass)",
              }}
            >
              {/* Profile Avatar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--bg-dark)",
                    border: "2px dashed var(--accent-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <User
                      size={40}
                      style={{ color: "var(--text-secondary)" }}
                    />
                  )}
                </div>
                {isEditingProfile && (
                  <button
                    className="button-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      background: "transparent",
                      border: "1px solid var(--accent-blue)",
                      color: "var(--accent-blue)",
                    }}
                    onClick={() => alert("Mock: Opening File Picker...")}
                  >
                    <Camera size={16} /> Upload Photo
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                /* READ-ONLY VIEW */
                <div
                  className="animate-fade-in"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="button-primary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        background: "transparent",
                        border: "1px solid var(--accent-blue)",
                        color: "var(--accent-blue)",
                        borderRadius: "8px",
                      }}
                    >
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Full Name
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.name}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Email (Gmail)
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.email}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Date of Birth
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.dob}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Gender
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.gender}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Phone Number
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.phone}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Emergency Contact
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                        }}
                      >
                        {profile.emergencyContact || "Not set"}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Aadhaar Status
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginTop: "4px",
                          color: isAadhaarVerified
                            ? "var(--accent-green)"
                            : "var(--accent-orange)",
                        }}
                      >
                        {isAadhaarVerified
                          ? `Verified (XXXX-${aadhaar.slice(-4)})`
                          : "Not Verified"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* EDIT MODE */
                <div className="animate-fade-in">
                  {/* Aadhaar OTP Verification Block */}
                  <div
                    style={{
                      background: "var(--bg-dark)",
                      padding: "1.5rem",
                      borderRadius: "12px",
                      border: "1px solid var(--border-glass)",
                      marginBottom: "2rem",
                    }}
                  >
                    <h5
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--text-primary)",
                        marginBottom: "1rem",
                        fontSize: "1rem",
                      }}
                    >
                      <Shield size={16} className="glow-green" /> Identity
                      Verification
                    </h5>

                    {isAadhaarVerified ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "var(--accent-green)",
                          fontWeight: "500",
                          padding: "12px",
                          background: "rgba(16, 185, 129, 0.1)",
                          borderRadius: "8px",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <CheckCircle size={18} /> Aadhaar Verified Successfully
                        (XXXX-XXXX-{aadhaar.slice(-4)})
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-end",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <label
                              style={{
                                display: "block",
                                fontSize: "0.85rem",
                                color: "var(--text-secondary)",
                                marginBottom: "6px",
                              }}
                            >
                              Aadhaar Number
                            </label>
                            <input
                              type="text"
                              maxLength="12"
                              placeholder="Enter 12-digit Aadhaar"
                              className="input-field"
                              value={aadhaar}
                              onChange={(e) =>
                                setAadhaar(e.target.value.replace(/\D/g, ""))
                              }
                              disabled={isOtpSent}
                            />
                          </div>
                          {!isOtpSent && (
                            <button
                              type="button"
                              className="button-primary"
                              onClick={handleSendOtp}
                              style={{ padding: "10px 20px", height: "42px" }}
                            >
                              Send OTP
                            </button>
                          )}
                        </div>

                        {isOtpSent && (
                          <div
                            className="animate-fade-in"
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "flex-end",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <label
                                style={{
                                  display: "block",
                                  fontSize: "0.85rem",
                                  color: "var(--text-secondary)",
                                  marginBottom: "6px",
                                }}
                              >
                                Enter 6-Digit OTP
                              </label>
                              <div style={{ position: "relative" }}>
                                <Key
                                  size={16}
                                  style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "13px",
                                    color: "var(--text-secondary)",
                                  }}
                                />
                                <input
                                  type="text"
                                  maxLength="6"
                                  placeholder="XXXXXX"
                                  className="input-field"
                                  value={otp}
                                  onChange={(e) =>
                                    setOtp(e.target.value.replace(/\D/g, ""))
                                  }
                                  style={{ paddingLeft: "36px" }}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              className="button-primary"
                              onClick={handleVerifyOtp}
                              style={{
                                padding: "10px 20px",
                                height: "42px",
                                background: "var(--accent-green)",
                              }}
                            >
                              Verify
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Standard Profile Form */}
                  <form
                    onSubmit={saveProfile}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.5rem",
                    }}
                  >
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="input-field"
                        value={profile.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="input-field"
                        value={profile.dob}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="input-field"
                        value={profile.gender}
                        onChange={handleProfileChange}
                        style={{ cursor: "pointer" }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="input-field"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        className="input-field"
                        value={profile.emergencyContact}
                        onChange={handleProfileChange}
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="input-field"
                        value={profile.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div
                      style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        type="submit"
                        className="button-primary"
                        style={{ padding: "12px 24px" }}
                      >
                        Save Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-secondary)",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      {isSaved && (
                        <span
                          className="animate-fade-in"
                          style={{
                            color: "var(--accent-green)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.9rem",
                          }}
                        >
                          <CheckCircle size={16} /> Saved!
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preferences & Theme */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid var(--border-glass)",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              background: isPreferencesOpen
                ? "rgba(255,255,255,0.05)"
                : "transparent",
            }}
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--accent-purple)",
                fontSize: "1.2rem",
                margin: 0,
              }}
            >
              <Bell size={20} /> Preferences
            </h4>
            {isPreferencesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isPreferencesOpen && (
            <div
              className="animate-slide-up"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                padding: "1.5rem",
                borderTop: "1px solid var(--border-glass)",
              }}
            >
            {/* Theme Toggle */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--border-glass)",
                paddingBottom: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--text-primary)",
                  }}
                >
                  {isLightMode ? <Sun size={16} /> : <Moon size={16} />}
                  Appearance
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Toggle between Dark and Light mode.
                </div>
              </div>
              <Toggle
                active={!isLightMode}
                onClick={() => setIsLightMode(!isLightMode)}
              />
            </div>

            {/* Notification Toggles */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{ fontWeight: "500", color: "var(--text-primary)" }}
                >
                  AI Crowd Redistribution Alerts
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Get push notifications to avoid bottlenecks.
                </div>
              </div>
              <Toggle
                active={prefs.crowdAlerts}
                onClick={() => togglePref("crowdAlerts")}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{ fontWeight: "500", color: "var(--text-primary)" }}
                >
                  Dynamic Concession Promos
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Receive time-limited discounts to balance queues.
                </div>
              </div>
              <Toggle
                active={prefs.concessionPromos}
                onClick={() => togglePref("concessionPromos")}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--border-glass)",
                paddingTop: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: prefs.locationTracking
                      ? "var(--text-primary)"
                      : "var(--accent-red)",
                  }}
                >
                  <Shield size={16} /> Location Tracking
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Required for hyper-personalized navigation and alerts.
                </div>
              </div>
              <Toggle
                active={prefs.locationTracking}
                onClick={() => togglePref("locationTracking")}
              />
            </div>
            </div>
          )}
        </div>

        {/* Additional Options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid var(--border-glass)",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setIsAdditionalOptionsOpen(!isAdditionalOptionsOpen)}
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              background: isAdditionalOptionsOpen
                ? "rgba(255,255,255,0.05)"
                : "transparent",
            }}
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--accent-red)",
                fontSize: "1.2rem",
                margin: 0,
              }}
            >
              <Settings size={20} /> Additional Options
            </h4>
            {isAdditionalOptionsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isAdditionalOptionsOpen && (
            <div
              className="animate-slide-up"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                padding: "1.5rem",
                borderTop: "1px solid var(--border-glass)",
              }}
            >
            {/* System Notifications Toggle */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: "500", color: "var(--text-primary)" }}>
                  Push Notifications
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Allow app to send system-level notifications.
                </div>
              </div>
              <Toggle
                active={prefs.notificationsEnabled}
                onClick={() => togglePref("notificationsEnabled")}
              />
            </div>

            {/* Location Services Toggle */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--border-glass)",
                paddingTop: "1rem",
              }}
            >
              <div>
                <div style={{ fontWeight: "500", color: "var(--text-primary)" }}>
                  Location Services
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  Allow app to access your device's location.
                </div>
              </div>
              <Toggle
                active={prefs.locationServices}
                onClick={() => togglePref("locationServices")}
              />
            </div>

            {/* Account Actions */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                borderTop: "1px solid var(--border-glass)",
                paddingTop: "1.5rem",
                marginTop: "0.5rem"
              }}
            >
              <button
                className="button-primary"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--accent-blue)",
                  color: "var(--accent-blue)",
                  boxShadow: "none"
                }}
                onClick={() => alert("Mock: Signing out...")}
              >
                Sign Out
              </button>
              <button
                className="button-primary"
                style={{
                  flex: 1,
                  background: "rgba(244, 63, 94, 0.1)",
                  border: "1px solid var(--accent-red)",
                  color: "var(--accent-red)",
                  boxShadow: "none"
                }}
                onClick={() => {
                  if(window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    alert("Mock: Account deleted.");
                  }
                }}
              >
                Delete Account
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
