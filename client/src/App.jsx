import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
// import WriteArticle from './pages/WriteArticle'
// import BlogTitles from './pages/BlogTitles'
// import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
// import ReviewResume from './pages/ReviewResume'
import PostCreator from './pages/PostCreator'
import GeneratePrompt from './pages/GeneratePrompt'
import SummarizeText from './pages/SummarizeText'
// import AIResumeBuilder from './pages/AIResumeBuilder'
import CheckPlagiarism from './pages/CheckPlagiarism'
import GenerateInterviewQuestions from './pages/GenerateInterviewQuestions'
import RepurposeContent from './pages/RepurposeContent'
// import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} /> */}
          {/* <Route path='generate-images' element={<GenerateImages />} /> */}
          <Route path='generate-post' element={<PostCreator />} />
          <Route path='generate-prompt' element={<GeneratePrompt />} />
          <Route path='summarize-text' element={<SummarizeText />} />
          {/*<Route path='resume-builder' element={<AIResumeBuilder />} />*/}
          <Route path='check-plagiarism' element={<CheckPlagiarism />} />
          <Route path='generate-interview-questions' element={<GenerateInterviewQuestions />} />
          <Route path='repurpose-content' element={<RepurposeContent />} />

          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          {/* <Route path='review-resume' element={<ReviewResume />} /> */}
          {/* <Route path='community' element={<Community />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
