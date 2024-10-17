import { db } from '../db_connection';
import { User } from '../db_types';



export async function getUserById(id: number): Promise<User | null> {
    const query = 'SELECT id, username, email FROM users WHERE id = ${id}';
    
    try {
        const user = await db.oneOrNone<User>(query, { id });
        return user;
    } catch (error) {
        console.error(`Error fetching user for ID ${id}:`, error);
        return null;
    }
}

// import { testQuery } from '../db_test';
// testQuery(getUserById,1)