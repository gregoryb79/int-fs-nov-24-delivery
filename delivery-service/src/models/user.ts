import { createHash, randomUUID } from "crypto";
import { dbClient } from "./db";

export async function isEmailTaken(email: string) {
    const res = await dbClient.execute(`SELECT * FROM users WHERE email = "${email}"`);

    return !!res.rows.length;
}

export async function createUser(email: string, password: string, fullName: string) {
    const id = randomUUID();
    const createdAt = new Date();
    const passwordHash = hashPasswordWithSalt(password, createdAt);

    await dbClient.execute(`INSERT INTO users (id, email, passwordHash, fullName, createdAt)
VALUES ("${id}", "${email}", "${passwordHash}", "${fullName}", ${createdAt.valueOf()})`);

    return id;
}

export async function getByCredentials(email: string, password: string) {
    const res = await dbClient.execute(`SELECT * FROM users WHERE email = "${email}"`);

    if (res.rows.length !== 1) {
        throw new Error();
    }

    const { id, passwordHash, fullName, createdAt } = res.rows[0];
    
    if (passwordHash !== hashPasswordWithSalt(password, new Date(createdAt as string))) {
        throw new Error();
    }

    return { id, email, fullName, createdAt };
}

function hashPasswordWithSalt(password: string, salt: Date) {
    const hash = createHash("sha512");

    hash.update(password);
    hash.update(salt.valueOf().toString());

    return hash.digest("base64");
}
