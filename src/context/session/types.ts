export type Profile = {
  email?: string;
  username?: string;
  name?: {
    first_name?: string;
    last_name?: string;
  };
};

export type Identity = {
  id?: string;
  traits?: Profile;
};

export type SessionRole = {
  object: string;
  role: string;
};

export type Session = {
  authenticated?: boolean;
  sub?: string;
  exp?: string;
  profile?: Profile;
  roles?: SessionRole[];
  identity?: Identity;
} & Record<string, unknown>;

export type SessionContextValue = {
  session: Session | null;
  identityId: string | null;
  profile: Profile | null;
  displayName: string | null;
  roles: SessionRole[];
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};
