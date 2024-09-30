// Define an enum for rating categories
const Rating = {
  BAD: 1,
  LOW: 2,
  MEDIUM: 3,
  GOOD: 4,
  GREAT: 5,
};

// Function to get the string value from the enum
export const getRatingValue = (rating: number) => {
  switch (rating) {
    case Rating.BAD:
      return { value: "bad", color: '#EF4444' };
    case Rating.LOW:
      return {value: "low", color: '#FCD34D' };
    case Rating.MEDIUM:
      return {value: "medium", color: "#F59E0B"};
    case Rating.GOOD:
      return {value: "good", color: "#34D399"};
    case Rating.GREAT:
      return { value: "great", color: "#059669" };
    default:
      return {value: "unknown", color: "#D1D5DB"};
  }
};

export interface Ratings {
    rating_key: string;
    total_rating: number;
    count: number;
    fill: string;
}