export interface User {
    userName: string;
    password?: string;
    setUser: (userInfo: { userName: string; password?: string }) => void;
}
