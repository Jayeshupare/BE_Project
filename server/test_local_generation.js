
import { generateSocialPost } from './utils/contentGenerator.js';

console.log("--- Testing Custom Post Generation Algorithm ---");

const testCases = [
    { topic: 'Artificial Intelligence', tone: 'Professional', platform: 'LinkedIn' },
    { topic: 'Remote Work', tone: 'Casual', platform: 'Twitter' },
    { topic: 'Coffee', tone: 'Witty', platform: 'Instagram' },
    { topic: 'Climate Change', tone: 'Urgent', platform: 'Facebook' },
    { topic: 'Self Care', tone: 'Inspirational', platform: 'Threads' }
];

testCases.forEach(test => {
    console.log(`\n[${test.tone} on ${test.platform}] Topic: ${test.topic}`);
    console.log("-".repeat(50));
    const content = generateSocialPost(test.topic, test.tone, test.platform);
    console.log(content);
});

console.log("\n--- Randomness Check (Twitter/Witty/JavaScript) ---");
const set = new Set();
for (let i = 0; i < 5; i++) {
    const content = generateSocialPost('JavaScript', 'Witty', 'Twitter');
    console.log(`Run ${i + 1}: ${content.substring(0, 50)}...`);
    set.add(content);
}

if (set.size > 1) {
    console.log("\n✅ Randomness Confirmed: Generated different outputs.");
} else {
    console.log("\n❌ Warning: Outputs were identical.");
}
