import { prisma } from "../../config/database/prisma";
const bcrypt = require("bcrypt");
import { HttpError } from "../middlewares/ErrorMiddlewares";
import { TokenService } from "../utils/token";

type UserRegister = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;
  city: string;
  district: string;
  type_id: number;
};

type RegisterResponce = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  type: string;
  access_token: string;
  refresh_token: string;
};

// Initialize token service (access: 24h default, refresh: 7 days default)
const tokenService = new TokenService({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 86400, // 24 hours
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800, // 7 days
});

const login = async (
  email: string,
  password: string
): Promise<RegisterResponce> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      type: true,
    },
  });
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpError("Invalid password", 401);
  }
  return {
    id: user.id,
    email: user.email,
    first_name: user.firstName!,
    last_name: user.lastName!,
    type: user.type.name,
    access_token: tokenService.generateAccessToken({
      userId: user.id.toString(),
      role: user.type.name,
    }),
    refresh_token: tokenService.generateRefreshToken({
      userId: user.id.toString(),
      role: user.type.name,
    }),
  };
};

const register = async (
  userRegister: UserRegister
): Promise<RegisterResponce> => {
  const user = await prisma.user.findUnique({
    where: {
      email: userRegister.email,
    },
    include: {
      type: true,
    },
  });
  if (user) {
    throw new HttpError("User already exists", 409);
  }
  const hashedPassword = await bcrypt.hash(userRegister.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: userRegister.email,
      password: hashedPassword,
      firstName: userRegister.first_name,
      lastName: userRegister.last_name,
      contactNumber: userRegister.contact_number,
      address: userRegister.address,
      city: userRegister.city,
      district: userRegister.district,
      type: {
        connect: {
          id: userRegister.type_id,
        },
      },
    },
    include: {
      type: true,
    },
  });
  return {
    id: newUser.id,
    email: newUser.email,
    first_name: newUser.firstName!,
    last_name: newUser.lastName!,
    type: newUser.type.name,
    access_token: tokenService.generateAccessToken({
      userId: newUser.id.toString(),
      role: newUser.type.name,
    }),
    refresh_token: tokenService.generateRefreshToken({
      userId: newUser.id.toString(),
      role: newUser.type.name,
    }),
  };
};

type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  current_password?: string;
  new_password?: string;
};

const updateProfile = async (
  userId: number,
  data: UpdateProfileData
): Promise<{ id: number; email: string; first_name: string; last_name: string }> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { type: true },
  });
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  const updateData: Record<string, unknown> = {};
  if (data.first_name !== undefined) updateData.firstName = data.first_name;
  if (data.last_name !== undefined) updateData.lastName = data.last_name;
  if (data.new_password) {
    if (!data.current_password) {
      throw new HttpError("Current password is required to change password", 400);
    }
    const isPasswordValid = await bcrypt.compare(data.current_password, user.password);
    if (!isPasswordValid) {
      throw new HttpError("Current password is incorrect", 401);
    }
    updateData.password = await bcrypt.hash(data.new_password, 10);
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    include: { type: true },
  });
  return {
    id: updatedUser.id,
    email: updatedUser.email,
    first_name: updatedUser.firstName!,
    last_name: updatedUser.lastName!,
  };
};

const refreshToken = async (refresh_token: string): Promise<{ access_token: string; refresh_token: string }> => {
  const payload = tokenService.verifyRefreshToken(refresh_token);
  if (!payload) {
    throw new HttpError("Invalid or expired refresh token", 401);
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(payload.userId) },
    include: { type: true },
  });
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return {
    access_token: tokenService.generateAccessToken({
      userId: user.id.toString(),
      role: user.type.name,
    }),
    refresh_token: tokenService.generateRefreshToken({
      userId: user.id.toString(),
      role: user.type.name,
    }),
  };
};

const getType = async (type: string): Promise<{ type_id: number }> => {
    console.log(type)
  const userType = await prisma.userType.findFirst({
    where: {
      name: type,
    }
  });
  console.log(userType)
  if (!userType) {
    throw new HttpError("User type not found", 404);
  }
  return { type_id: userType.id };
};

const AuthService = {
  login,
  register,
  refreshToken,
  getType,
  updateProfile,
};

export default AuthService;
