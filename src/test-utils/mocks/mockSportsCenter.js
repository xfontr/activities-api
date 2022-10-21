import { mockProtoUser } from "./mockUser";

const mockSportsCenter = {
  name: "Some center",
  description: "Nice center in Barcelona",
  users: [{ ...mockProtoUser, id: 1 }],
};

export default mockSportsCenter;
