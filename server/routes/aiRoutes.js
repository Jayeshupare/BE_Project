import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview, generatePost, generatePrompt, summarizeText, buildResume, checkPlagiarism, generateInterviewQuestions, repurposeContent } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogTitle)
aiRouter.post('/generate-image', auth, generateImage)

aiRouter.post('/remove-image-background', upload.single('image'), auth, removeImageBackground)

aiRouter.post('/remove-image-object', upload.single('image'), auth, removeImageObject)

aiRouter.post('/resume-review', upload.single('resume'), auth, resumeReview)

aiRouter.post('/generate-post', auth, generatePost)
aiRouter.post('/generate-prompt', auth, generatePrompt) // New
aiRouter.post('/summarize-text', auth, summarizeText) // New
aiRouter.post('/build-resume', auth, buildResume) // New
aiRouter.post('/check-plagiarism', auth, checkPlagiarism) // New
aiRouter.post('/generate-interview-questions', auth, generateInterviewQuestions) // New
aiRouter.post('/repurpose-content', auth, repurposeContent) // New


export default aiRouter