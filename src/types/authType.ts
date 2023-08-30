import z from 'zod';

export type TUsersPermissions = {
  usersPermissionsUser: {
    data: {
      attributes: {
        avatar: {
          data: {
            attributes: {
              url: string;
            };
          } | null;
        };
      };
    };
  };
};

export type TLoginResponse = {
  jwt: string;
  user: {
    email: string;
    id: string;
  };
  id: string;
};

export const authValidationSchema = z.object({
  identifier: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z
    .string()
    .nonempty({
      message: 'Please enter a password',
    })
    .min(8, {
      message: 'Password must be at least 8 characters',
    }),
});

export type typeAuthValidationSchema = z.infer<typeof authValidationSchema>;
