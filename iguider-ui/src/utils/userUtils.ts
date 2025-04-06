import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';

export class UserUtils {

    static getUserId(token: string) {
        try {
            const decoded = jwtDecode(token);
            const userId = decoded["user_id"];
            return userId;
        } catch (error) {
            console.error('Failed to get user:', error);
            return null;
        }
    }

    static isAdmin(token: string) {
        try {
            if (!token) return false
            const decoded = jwtDecode(token);
            const isAdmin = decoded["is_admin"];
            return isAdmin;
        } catch (error) {
            console.error('Failed to get user:', error);
            return null;
        }
    }
}