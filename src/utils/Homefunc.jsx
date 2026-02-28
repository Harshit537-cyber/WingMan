 const calculateProfileCompletion = (user) => {
  if (!user) return 0;

  let score = 0;

  // ✅ Basic info
  if (user.name && user.DOB && user.gender) score += 15;

  // ✅ Photos
  if (user.photos?.length > 0) score += 15;

  // ✅ Location
  if (user.location?.address || user.location?.lat) score += 10;

  // ✅ Height
  if (user.height) score += 5;

  // ✅ Lifestyle
  const life = user.lifestyle || {};
  if (life.drink || life.smoke || life.exercise) score += 10;

  // ✅ Interests
  if (user.interest?.length > 0) score += 5;

  // ✅ Bio / Story
  if (user.story) score += 10;

  // ✅ Work info
  if (user.work_info?.company || user.work_info?.position) score += 10;

  // ✅ Preferences (minimum 3)
  const prefs = user.preferences || {};
  let prefCount = 0;

  if (prefs.age?.min && prefs.age?.max) prefCount++;
  if (prefs.height?.min && prefs.height?.max) prefCount++;
  if (prefs.religion) prefCount++;
  if (prefs.ethnicity) prefCount++;
  if (prefs.spoken_language?.length > 0) prefCount++;

  if (prefCount >= 3) score += 15;

  // ✅ Onboarding
  if (user.isOnboarded) score += 5;

  return Math.min(score, 100);
};



export default calculateProfileCompletion