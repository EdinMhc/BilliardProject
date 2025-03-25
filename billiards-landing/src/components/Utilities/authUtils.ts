export const isNormalUser = (roles: string[]) => roles.includes('NormalUser');
export const isAdmin = (roles: string[]) => roles.includes('Admin');
export const isSuperAdmin = (roles: string[]) => roles.includes('SuperAdmin');