import bcryptjs from "bcryptjs";
import { User } from "../modules/user/user.model";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
// import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
// import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: "superadmin@gmail.com",
    });
    // provide data from .env  - email

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash("Abc@12345", Number(10));

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: "superadmin@gmail.com",
    };

    const payload: IUser = {
      name: "Super admin",
      role: Role.SUPER_ADMIN,
      email: "superadmin@gmail.com",
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superadmin = await User.create(payload);
    console.log("Super Admin Created Successfuly! \n");
    console.log(superadmin);
  } catch (error) {
    console.log(error);
  }
};
