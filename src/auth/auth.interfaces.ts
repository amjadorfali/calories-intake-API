import { UserEntity } from 'src/user/entities/user.entity';

export type AuthenticatedUser = Pick<UserEntity, 'userName' | 'registrationNumber' | 'id' | 'role'>;
export type JwtPayload = {
  sub: number;
  userName: string;
  id: string;
  role: 'admin' | 'customer';
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
