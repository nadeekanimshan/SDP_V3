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

// Initialize token service
const tokenService = new TokenService({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN!),
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN!),
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
    }),
    refresh_token: tokenService.generateRefreshToken({
      userId: user.id.toString(),
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
    }),
    refresh_token: tokenService.generateRefreshToken({
      userId: newUser.id.toString(),
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
  getType,
};

export default AuthService;
