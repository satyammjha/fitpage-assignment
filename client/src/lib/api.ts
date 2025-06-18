import axios from "axios";

export async function submitReviewToServer({
  username,
  productId,
  rating,
  review,
  imageFile,
}: {
  username: string;
  productId: string;
  rating: number;
  review?: string;
  imageFile?: File;
}) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("productId", productId);
    formData.append("rating", String(rating));
    if (review) formData.append("review", review);
    if (imageFile) formData.append("image", imageFile);

    const res = await axios.post("http://localhost:5000/api/review", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Review submitted successfully:", res);
    return res.data;
  } catch (err) {
    console.error("❌ Error submitting review:", err);
    throw err;
  }
}


export async function getUserByIp() {
  try {
    const res = await fetch("http://localhost:5000/user/getuser", {
      method: "GET",
    });

    const data = await res.json();
    console.log("✅ User fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    throw err;
  }
}