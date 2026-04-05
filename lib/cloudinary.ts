import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

let timeOffset: number | null = null;

// Helper to get a reliable timestamp for Cloudinary in case system clock is out of sync
const getAccurateTimestamp = async (): Promise<number> => {
  if (timeOffset !== null) {
    return Math.round((Date.now() + timeOffset) / 1000);
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC", { 
      cache: "no-store",
      signal: controller.signal,
    });
    if (res.ok) {
      const d = await res.json();
      const trueTime = Date.UTC(d.year, d.month - 1, d.day, d.hour, d.minute, d.seconds);
      timeOffset = trueTime - Date.now();
      return Math.round(trueTime / 1000);
    }
  } catch (err) {
    console.warn("Failed to fetch accurate time, falling back to system clock", err);
  }
  return Math.round(Date.now() / 1000);
};

export const uploadImage = async (file: string, folder: string = "portfolio") => {
  try {
    const timestamp = await getAccurateTimestamp();
    const result = await cloudinary.uploader.upload(file, {
      folder,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      resource_type: "auto",
    })
    return result
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}

export default cloudinary
