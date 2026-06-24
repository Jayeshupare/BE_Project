// interviewGenerator.js

export const generateInterviewQuestionsTool = (role = 'Candidate', industry = 'Tech', level = 'Mid-Level') => {
    const questionBank = {
        "Frontend": [
            "What are HTML, CSS, and JavaScript used for?",
            "What is React and why is it used?",
            "What are components in frontend frameworks?",
            "What is state management in React?",
            "What are APIs in frontend development?",
            "What is JSX in React?",
            "What is state and props in React?",
            "What are hooks in React (useState, useEffect)?",
            "Explain the CSS Box Model.",
            "What is the Virtual DOM and how does it work?",
            "How do you optimize a website's performance?",
            "Explain semantic HTML and its importance.",
            "What are CSS preprocessors like SASS/LESS?",
            "How do you ensure a website is fully responsive?",
            "What is the difference between local storage, session storage, and cookies?"
        ],
        "Backend": [
            "What is Node.js and its event loop?",
            "What is Express.js?",
            "What is a REST API?",
            "What is middleware in backend development?",
            "Explain authentication vs authorization.",
            "What is middleware in Express?",
            "What are routes in Express.js?",
            "Difference between app.get() and app.post()?",
            "How does Express handle requests and responses?",
            "What are microservices vs monolithic architecture?",
            "How do you handle error logging and monitoring?",
            "What is CORS and why is it needed?",
            "Explain JWT (JSON Web Tokens) and how they work.",
            "How do you prevent SQL injection and XSS?",
            "What are web sockets and when would you use them?"
        ],
        "Database": [
            "What is MongoDB and how is it used?",
            "What is SQL vs NoSQL?",
            "How does frontend connect with backend?",
            "What is a CRUD operation?",
            "What are collections and documents in MongoDB?",
            "What are CRUD operations in MongoDB?",
            "What is Mongoose in Node.js?",
            "Explain database indexing and its benefits.",
            "What is database normalization?",
            "What are ACID properties in a database?",
            "How do you optimize a slow database query?",
            "What is a database transaction?",
            "Difference between Primary Key and Foreign Key?",
            "Explain sharding vs replication.",
            "What are SQL joins and their types?"
        ],
        "Data Analyst": [
            "What is Data Analysis?",
            "Roles and responsibilities of a Data Analyst?",
            "Difference between Data Analyst, Scientist, and Engineer?",
            "Types of data (qualitative vs quantitative)?",
            "What tools are used by Data Analysts?",
            "Commonly used Excel functions?",
            "What is VLOOKUP and HLOOKUP?",
            "What are Pivot Tables in Excel?",
            "What is data cleaning and why is it important?",
            "How do you handle missing values?",
            "What is data transformation?",
            "What is data normalization?",
            "What is outlier detection?",
            "What tools are used for data visualization?",
            "What is exploratory data analysis (EDA)?"
        ],
        "Data Science": [
            "What is Data Science?",
            "What is the role of a Data Scientist?",
            "Difference between Data Science, Analysis, and ML?",
            "Main steps in a Data Science lifecycle?",
            "What are structured and unstructured data?",
            "Explain mean, median, and mode.",
            "What is standard deviation?",
            "Why is probability important in Data Science?",
            "What is correlation and covariance?",
            "What is hypothesis testing?",
            "What is exploratory data analysis (EDA)?",
            "What is feature selection?",
            "How do you handle imbalanced datasets?",
            "Explain A/B testing.",
            "What is cross-validation?"
        ],
        "Machine Learning": [
            "What is supervised vs unsupervised learning?",
            "Common ML algorithms used in Data Science?",
            "What is model evaluation?",
            "What is overfitting and how to reduce it?",
            "What is a confusion matrix?",
            "Difference between AI, ML, and Deep Learning?",
            "Types of Machine Learning?",
            "Real-world applications of AI and ML?",
            "What is data preprocessing in ML?",
            "What is feature engineering?",
            "Normalization vs standardization?",
            "What is Linear Regression?",
            "What is Logistic Regression?",
            "Explain Decision Trees and Random Forests.",
            "What is K-Nearest Neighbors (KNN)?"
        ],
        "Python": [
            "What is Python and why is it used?",
            "Key features of Python?",
            "Python’s core data types?",
            "Difference between list, tuple, set, and dictionary?",
            "What is indentation in Python?",
            "What are loops in Python (for, while)?",
            "What are conditional statements in Python?",
            "Difference between *args and **kwargs?",
            "What are lambda functions?",
            "What is OOP in Python?",
            "What is inheritance and polymorphism?",
            "What are modules and packages?",
            "What is exception handling?",
            "What are decorators in Python?",
            "How does Python manage memory (garbage collection)?"
        ],
        "Java": [
            "Main features of Java?",
            "Difference between JDK, JRE, and JVM?",
            "Why is Java platform independent?",
            "Primitive data types in Java?",
            "Difference between == and .equals()?",
            "Four pillars of OOP?",
            "What is polymorphism (overloading vs overriding)?",
            "What is abstraction in Java?",
            "What is encapsulation?",
            "Interface vs abstract class?",
            "Use of static keyword in Java?",
            "What is the final keyword used for?",
            "What is exception handling in Java?",
            "Checked vs unchecked exceptions?",
            "Difference between ArrayList and LinkedList?"
        ],
        "DevOps": [
            "What is DevOps and its lifecycle?",
            "What is Continuous Integration and Continuous Deployment (CI/CD)?",
            "Difference between Agile and DevOps?",
            "What is version control (Git)?",
            "What is Docker and containerization?",
            "What is Kubernetes and how does it work?",
            "What is Infrastructure as Code (IaC)?",
            "Explain Terraform vs Ansible.",
            "How do you monitor a production system?",
            "What are microservices?",
            "Explain blue-green deployments.",
            "How do you handle secrets management?",
            "What is Jenkins and how is it used?",
            "What is a reverse proxy (e.g., Nginx)?",
            "How do you ensure high availability and disaster recovery?"
        ],
        "Mobile": [
            "Difference between native and cross-platform mobile app development?",
            "What is React Native?",
            "What is Flutter and Dart?",
            "Explain the mobile app lifecycle.",
            "How do you handle state in a mobile app?",
            "What are push notifications and how do they work?",
            "How do you optimize mobile app performance?",
            "What is the difference between iOS and Android development?",
            "How do you manage local storage on mobile devices?",
            "What are the guidelines for App Store and Play Store submission?",
            "How do you implement deep linking?",
            "What are background tasks in mobile apps?",
            "How do you ensure mobile app security?",
            "Explain memory leaks in mobile applications.",
            "How do you test a mobile application?"
        ],
        "QA": [
            "What is the difference between Manual and Automated testing?",
            "What is the Software Testing Life Cycle (STLC)?",
            "What are unit, integration, and end-to-end (E2E) tests?",
            "What is regression testing?",
            "What is a bug lifecycle?",
            "What is Selenium and how is it used?",
            "Explain Black Box vs White Box testing.",
            "What is performance testing vs load testing?",
            "How do you write a good test case?",
            "What is API testing and what tools do you use (e.g., Postman)?",
            "What is Continuous Testing in CI/CD?",
            "How do you prioritize which tests to automate?",
            "What is a test plan and test strategy?",
            "How do you handle flaky tests?",
            "What is smoke testing vs sanity testing?"
        ],
        "UI/UX": [
            "What is the difference between UI and UX?",
            "Explain the design thinking process.",
            "What are wireframes and prototypes?",
            "What is user-centered design?",
            "How do you conduct user research?",
            "What are personas and why use them?",
            "Explain responsive vs adaptive design.",
            "What is accessibility in web design (WCAG)?",
            "What are design systems and style guides?",
            "How do you measure UX success?",
            "What tools do you use for UI/UX design (Figma, Adobe XD)?",
            "What is information architecture?",
            "Explain color theory and typography principles.",
            "How do you handle negative user feedback?",
            "What is A/B testing in design?"
        ]
    };

    const lowerRole = role.toLowerCase();
    let matchedQs = [];

    // Vastly improved matching logic to capture all possible roles
    if (lowerRole.includes('mern') || lowerRole.includes('full stack') || lowerRole.includes('fullstack') || lowerRole.includes('web')) {
        matchedQs.push(...(questionBank['Full Stack'] || []), ...questionBank['Frontend'], ...questionBank['Backend'], ...questionBank['Database']);
    }
    if (lowerRole.includes('front') || lowerRole.includes('react') || lowerRole.includes('ui developer') || lowerRole.includes('angular') || lowerRole.includes('vue')) {
        matchedQs.push(...questionBank['Frontend']);
    }
    if (lowerRole.includes('back') || lowerRole.includes('node') || lowerRole.includes('express') || lowerRole.includes('api') || lowerRole.includes('php') || lowerRole.includes('ruby')) {
        matchedQs.push(...questionBank['Backend'], ...questionBank['Database']);
    }
    if (lowerRole.includes('data analyst') || lowerRole.includes('analysis') || lowerRole.includes('business analyst')) {
        matchedQs.push(...questionBank['Data Analyst'], ...questionBank['Database']);
    }
    if (lowerRole.includes('data science') || lowerRole.includes('scientist')) {
        matchedQs.push(...questionBank['Data Science'], ...questionBank['Machine Learning'], ...questionBank['Python']);
    }
    if (lowerRole.includes('ai') || lowerRole.includes('ml') || lowerRole.includes('machine learning') || lowerRole.includes('deep learning')) {
        matchedQs.push(...questionBank['Machine Learning'], ...questionBank['Python']);
    }
    if (lowerRole.includes('sql') || lowerRole.includes('database') || lowerRole.includes('dba')) {
        matchedQs.push(...questionBank['Database']);
    }
    if (lowerRole.includes('python') || lowerRole.includes('django') || lowerRole.includes('flask')) {
        matchedQs.push(...questionBank['Python']);
    }
    if (lowerRole.includes('java') && !lowerRole.includes('javascript')) {
        matchedQs.push(...questionBank['Java']);
    }
    if (lowerRole.includes('devops') || lowerRole.includes('sre') || lowerRole.includes('cloud') || lowerRole.includes('aws') || lowerRole.includes('azure') || lowerRole.includes('platform')) {
        matchedQs.push(...questionBank['DevOps']);
    }
    if (lowerRole.includes('mobile') || lowerRole.includes('ios') || lowerRole.includes('android') || lowerRole.includes('flutter') || lowerRole.includes('react native')) {
        matchedQs.push(...questionBank['Mobile']);
    }
    if (lowerRole.includes('qa') || lowerRole.includes('test') || lowerRole.includes('sdet') || lowerRole.includes('quality')) {
        matchedQs.push(...questionBank['QA']);
    }
    if (lowerRole.includes('design') || lowerRole.includes('ui/ux') || lowerRole.includes('ux') || lowerRole.includes('product designer')) {
        matchedQs.push(...questionBank['UI/UX']);
    }

    // Deduplicate the array in case a role matches multiple overlapping categories
    matchedQs = [...new Set(matchedQs)];

    const generalQs = [
        `What specific technical skills do you bring to the ${role} position?`,
        `How does your technical experience apply here?`,
        `What are your favorite tools and technologies to use for ${role}?`,
        `How do you stay up-to-date with industry trends in ${industry}?`,
        `Describe a time when you had to learn a new tool or technology quickly for a project.`,
        `What is the most complex problem you have solved in ${industry}?`,
        `Can you explain a technical concept related to ${role} to a non-technical person?`,
        `What programming languages or frameworks do you consider yourself an expert in?`,
        `How do you handle debugging and troubleshooting code?`,
        `What is your preferred development environment and workflow?`,
        `Tell us about a time you optimized a piece of code or process.`,
        `How do you ensure your code is secure and follows best practices?`,
        `What version control systems do you use?`,
        `Describe your experience with databases and data management.`,
        `How do you handle technical debt in a project?`
    ];

    // Ensure we have questions even if no keyword match
    if (matchedQs.length === 0) {
        matchedQs = [...generalQs];
    }

    // We want 12 questions for the final output
    const TOTAL_QS = 12;

    // To ensure "different questions for each level" from the SAME bank,
    // we use the level to pick a different subset of the matched questions.
    const levelOffsets = {
        'Intern': 0,
        'Junior': 1,
        'Mid-Level': 2,
        'Senior': 3,
        'Lead': 4,
        'Executive': 5
    };
    
    let offset = levelOffsets[level] || 0;
    
    // Sort matchedQs deterministically so that the slicing logic is consistent
    matchedQs.sort((a, b) => a.localeCompare(b));
    
    let finalQs = [];
    
    // Iterate and grab questions that match our "modulo" offset.
    for (let i = 0; i < matchedQs.length; i++) {
        if (i % 6 === offset) {
            finalQs.push(matchedQs[i]);
        }
    }
    
    // Fill remaining if less than 12
    if (finalQs.length < TOTAL_QS) {
        const remainingQs = matchedQs.filter(q => !finalQs.includes(q));
        remainingQs.sort(() => 0.5 - Math.random());
        const needed = TOTAL_QS - finalQs.length;
        
        const fromRemaining = Math.min(needed, remainingQs.length);
        finalQs.push(...remainingQs.slice(0, fromRemaining));
        
        if (finalQs.length < TOTAL_QS) {
            const extraQs = generalQs.filter(q => !finalQs.includes(q));
            extraQs.sort(() => 0.5 - Math.random());
            const stillNeeded = TOTAL_QS - finalQs.length;
            finalQs.push(...extraQs.slice(0, stillNeeded));
        }
    }
    
    // Trim if somehow it's more than TOTAL_QS
    finalQs = finalQs.slice(0, TOTAL_QS);
    
    // Append a few behavioral/leadership questions based on the level to reach 14-15
    const levelBehaviors = {
        'Intern': [
            `What are your primary learning goals for this ${role} internship?`,
            `Describe a time you had to learn a new concept quickly. How did you approach it?`
        ],
        'Junior': [
            `How do you approach debugging or troubleshooting when you get stuck on a problem?`,
            `Where do you see your career as a ${role} heading in the next 2-3 years?`
        ],
        'Mid-Level': [
            `How do you balance adhering to best practices versus delivering a project on a tight deadline?`,
            `What is the most challenging technical problem you've solved recently?`
        ],
        'Senior': [
            `Describe your approach to mentoring junior team members.`,
            `Tell me about a time you had to make a major architectural or strategic decision.`
        ],
        'Lead': [
            `How do you align your team's technical goals with broader business objectives?`,
            `Describe your process for setting goals, OKRs, and KPIs for your team.`
        ],
        'Executive': [
            `How do you define and drive the technical vision for an organization in ${industry}?`,
            `How do you build and scale high-performing technical teams?`
        ]
    };
    
    finalQs.push(...(levelBehaviors[level] || []));

    // finalQs will have exactly 14 questions
    return `### Interview Questions for ${level} ${role} (${industry})\n\n${finalQs.map((q, i) => `${i + 1}. ${q}`).join('\n\n')}\n`;
};
