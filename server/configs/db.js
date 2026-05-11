import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'local_db.json');

// Initialize local JSON DB if missing
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ creations: [] }, null, 2));
}

function generateId() {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export default async function sql(strings, ...values) {
    let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    let creations = db.creations;

    let query = strings.reduce((acc, str, i) => acc + str + (i < values.length ? `__VAL${i}__` : ''), '').trim().replace(/\s+/g, ' ');
    let lowerQuery = query.toLowerCase();

    // Handle INSERT
    if (lowerQuery.startsWith('insert into creations')) {
        const colsMatch = query.match(/\((.*?)\)/);
        const valsMatch = query.match(/values\s*\((.*?)\)/i);

        let newRecord = {
            id: generateId(),
            user_id: '',
            prompt: '',
            content: '',
            type: 'manual',
            publish: false,
            likes: [],
            created_at: new Date().toISOString()
        };

        if (colsMatch && valsMatch) {
            const columns = colsMatch[1].split(',').map(s => s.trim());
            // Extract tokens (ignoring commas inside strings if any)
            const valRegex = /(__VAL\d+__|'[^']*'|"[^"]*"|true|false)/g;
            const valTokens = [];
            let match;
            while ((match = valRegex.exec(valsMatch[1])) !== null) {
                valTokens.push(match[1]);
            }

            columns.forEach((col, idx) => {
                if (idx >= valTokens.length) return;
                let token = valTokens[idx];
                let value;
                if (token.startsWith('__VAL')) {
                    let valIdx = parseInt(token.replace('__VAL', '').replace('__', ''));
                    value = values[valIdx];
                } else if (token.startsWith("'") || token.startsWith('"')) {
                    value = token.slice(1, -1);
                } else if (token === 'false') {
                    value = false;
                } else if (token === 'true') {
                    value = true;
                } else {
                    value = token;
                }
                newRecord[col] = value;
            });
        }

        creations.push(newRecord);
        fs.writeFileSync(DB_FILE, JSON.stringify({ creations }, null, 2));
        return [newRecord];
    }

    // Handle SELECT specific user
    if (lowerQuery.includes('select * from creations where user_id')) {
        let userId = values[0];
        let sorted = creations.filter(c => c.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sorted;
    }

    // Handle SELECT published
    if (lowerQuery.includes('select * from creations where publish')) {
        let sorted = creations.filter(c => c.publish === true).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sorted;
    }

    // Handle SELECT single by id
    if (lowerQuery.includes('select * from creations where id =')) {
        let id = values[0];
        let found = creations.find(c => String(c.id) === String(id));
        return found ? [found] : [];
    }

    // Handle UPDATE likes
    if (lowerQuery.includes('update creations set likes =')) {
        let formattedArray = values[0]; // "{user1,user2}"
        let id = values[1];

        // Convert "{id1,id2}" to ["id1", "id2"]
        let likesStr = String(formattedArray).replace(/[{}]/g, '');
        let likes = likesStr.trim() === '' ? [] : likesStr.split(',');

        let found = creations.find(c => String(c.id) === String(id));
        if (found) {
            found.likes = likes;
            fs.writeFileSync(DB_FILE, JSON.stringify({ creations }, null, 2));
        }
        return [];
    }

    return [];
} 