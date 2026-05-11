
const styles = {
    Professional: {
        hooks: [
            "The landscape of [Topic] is shifting rapidly.",
            "I've been reflecting on the impact of [Topic] recently.",
            "Key insights on [Topic] that every leader should know.",
            "Why [Topic] is more relevant now than ever.",
            "Let's talk about the future of [Topic]."
        ],
        bodies: [
            "It presents both challenges and opportunities that we must navigate carefully. Innovation is key.",
            "We are seeing a paradigm shift. Those who adapt will thrive, while others may fall behind.",
            "Efficiency, scale, and impact are driven by how we handle this. The data speaks for itself.",
            "Strategic implementation of this concept can lead to significant competitive advantages."
        ],
        ctas: [
            "What are your thoughts on this? Let's discuss.",
            "How is your organization handling this?",
            "Share your experiences in the comments.",
            "Agree or disagree? 👇"
        ]
    },
    Casual: {
        hooks: [
            "Just thinking about [Topic] today! 🚀",
            "You know what's wild? [Topic].",
            "Can we talk about [Topic] for a sec?",
            "My brain is 100% on [Topic] right now.",
            "Anyone else obsessed with [Topic]?"
        ],
        bodies: [
            "It’s actually crazy how much things are changing. Love it or hate it, it's happening!",
            "I tried it out recently and... wow. Game changer.",
            "Honestly, I didn't think I'd care this much, but here we are. 😂",
            "It’s simplified so much for me. Highly recommend checking it out."
        ],
        ctas: [
            "What do you think?",
            "Hit me up in the comments!",
            "Yay or nay?",
            "Let me know below! 👇"
        ]
    },
    Witty: {
        hooks: [
            "They say [Topic] is the future. I say, bring coffee first. ☕",
            "[Topic]: The best thing since sliced bread? Maybe.",
            "If I had a nickel for every time I heard about [Topic]...",
            "Me looking at [Topic] like... 👀",
            "Unpopular opinion: [Topic] is actually fun."
        ],
        bodies: [
            "Let's be real, it's pretty cool. But also, slightly terrifying? Just me?",
            "I'm just here for the memes, but the tech is okay too I guess.",
            "It works 60% of the time, every time. 😎",
            "Adulting is hard. [Topic] makes it slightly less hard."
        ],
        ctas: [
            "Don't @ me. 😂",
            "Prove me wrong.",
            "Who's with me?",
            "Tell me I'm not crazy. 👇"
        ]
    },
    Inspirational: {
        hooks: [
            "Never stop learning about [Topic].",
            "The journey of [Topic] is the reward. ✨",
            "Dream big. Work hard. Master [Topic].",
            "Success leaves clues, and [Topic] is a big one.",
            "Your only limit with [Topic] is your imagination."
        ],
        bodies: [
            "It is the courage to continue that counts. Apply this and watch your career soar.",
            "Every expert was once a beginner. Start today.",
            "Growth happens outside your comfort zone. Embrace the new.",
            "Believe in the power of innovation to transform your life."
        ],
        ctas: [
            "Are you ready to start?",
            "Tag someone who needs to see this.",
            "Double tap if you agree! ❤️",
            "Keep pushing forward! 💪"
        ]
    },
    Urgent: {
        hooks: [
            "⚠️ Breaking: Big changes coming to [Topic].",
            "🚨 Attention: If you're ignoring [Topic], you're falling behind.",
            "Stop what you're doing and look at [Topic].",
            "Last chance to jump on the [Topic] trend! 🔥",
            "You need to see this about [Topic] right now."
        ],
        bodies: [
            "Here's why you need to pay attention immediately. The window of opportunity is closing.",
            "Don't say I didn't warn you. This is going to be huge.",
            "The market is moving fast. Speed is everything.",
            "This is the update we've all been waiting for."
        ],
        ctas: [
            "Read more now!",
            "Don't miss out!",
            "Act fast!",
            "Link in bio! 🔗"
        ]
    }
};

const platformAdjustments = {
    Twitter: { maxLength: 280, hashCount: 2, newLine: "\n\n" },
    LinkedIn: { maxLength: 3000, hashCount: 5, newLine: "\n\n" },
    Instagram: { maxLength: 2200, hashCount: 10, newLine: "\n.\n.\n.\n" },
    Facebook: { maxLength: 63206, hashCount: 3, newLine: "\n\n" },
    Threads: { maxLength: 500, hashCount: 3, newLine: "\n\n" }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateSocialPost = (topic, tone, platform) => {
    const style = styles[tone] || styles['Professional'];
    const rules = platformAdjustments[platform] || platformAdjustments['Twitter'];

    const hook = getRandom(style.hooks).replace(/\[Topic\]/g, topic);
    const body = getRandom(style.bodies).replace(/\[Topic\]/g, topic);
    const cta = getRandom(style.ctas);

    // Dynamic Hashtags
    const cleanTopic = topic.replace(/\s+/g, '');
    const baseTags = [`#${cleanTopic}`];
    const extraTags = ['#Trending', '#Life', '#Tech', '#News', '#Vibes', '#Growth', '#Future'];

    while (baseTags.length < rules.hashCount) {
        const randomTag = getRandom(extraTags);
        if (!baseTags.includes(randomTag)) {
            baseTags.push(randomTag);
        }
    }

    const tags = baseTags.join(' ');

    return `${hook}${rules.newLine}${body}${rules.newLine}${cta}${rules.newLine}${tags}`;
};
