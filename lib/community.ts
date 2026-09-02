export interface CommunityPost {
  id: string;
  user: string;
  location: string;
  caption: string;
  likes: number;
  comments: number;
  gradient: string;
}

const GRADIENTS = [
  "linear-gradient(135deg, #3d4a7a 0%, #9fb8ff 100%)",
  "linear-gradient(135deg, #c7d4f5 0%, #9fb8ff 100%)",
  "linear-gradient(135deg, #6f84c9 0%, #3d4a7a 100%)",
  "linear-gradient(135deg, #1f2847 0%, #6f84c9 100%)",
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "c1", user: "@rohan.on.repeat", location: "Bandra, Mumbai", caption: "Gati on the flyover before the 8am rush.", likes: 214, comments: 12, gradient: GRADIENTS[0] },
  { id: "c2", user: "@priya.kicks", location: "Koramangala, Bengaluru", caption: "Tezz Low for the gully match.", likes: 189, comments: 8, gradient: GRADIENTS[1] },
  { id: "c3", user: "@thegullyking", location: "CP, New Delhi", caption: "Udaan Mid, rooftop to rooftop.", likes: 342, comments: 21, gradient: GRADIENTS[2] },
  { id: "c4", user: "@sneakerhead.ind", location: "Salt Lake, Kolkata", caption: "Chalo High at golden hour.", likes: 156, comments: 6, gradient: GRADIENTS[3] },
  { id: "c5", user: "@aarav.walks", location: "Andheri, Mumbai", caption: "First pair, still my favorite colorway.", likes: 98, comments: 4, gradient: GRADIENTS[0] },
  { id: "c6", user: "@meera.streets", location: "Jayanagar, Bengaluru", caption: "Kirana Cream is unmatched in person.", likes: 267, comments: 15, gradient: GRADIENTS[1] },
  { id: "c7", user: "@delhi.drops", location: "Hauz Khas, New Delhi", caption: "Drop 001 day one fit.", likes: 411, comments: 29, gradient: GRADIENTS[2] },
  { id: "c8", user: "@kicks.by.kabir", location: "Park Street, Kolkata", caption: "Sole detail on the Gully Haze.", likes: 134, comments: 7, gradient: GRADIENTS[3] },
];
