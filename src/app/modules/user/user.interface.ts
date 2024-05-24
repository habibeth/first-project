

export type TUser = {
    id: string;
    password: string;
    needPasswordChange: boolean;
    role: 'admin' | 'faculty' | 'student';
    status: 'in-progress' | 'block';
    isDeleted: boolean;
}

