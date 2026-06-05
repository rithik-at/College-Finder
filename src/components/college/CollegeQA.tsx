'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Send, User as UserIcon, HelpCircle } from 'lucide-react';

type User = {
  id: number;
  username: string;
  name: string;
};

type Answer = {
  id: number;
  content: string;
  upvotes: number;
  user: User;
  createdAt: string;
};

type Question = {
  id: number;
  title: string;
  content: string;
  upvotes: number;
  user: User;
  answers: Answer[];
  createdAt: string;
};

export function CollegeQA({ collegeId }: { collegeId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Forms state
  const [username, setUsername] = useState('');
  const [newQTitle, setNewQTitle] = useState('');
  const [newQContent, setNewQContent] = useState('');
  const [replyContent, setReplyContent] = useState<Record<number, string>>({});
  const [activeReply, setActiveReply] = useState<number | null>(null);

  useEffect(() => {
    fetchQA();
    // Pre-fill username from local storage if exists
    const storedUser = localStorage.getItem('collegeHubUser');
    if (storedUser) setUsername(storedUser);
  }, [collegeId]);

  const fetchQA = async () => {
    try {
      const res = await fetch(`/api/qa?collegeId=${collegeId}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch QA', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !newQTitle || !newQContent) return;

    localStorage.setItem('collegeHubUser', username);

    const res = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ask',
        collegeId,
        username,
        title: newQTitle,
        content: newQContent
      })
    });

    if (res.ok) {
      const newQuestion = await res.json();
      setQuestions([newQuestion, ...questions]);
      setNewQTitle('');
      setNewQContent('');
    }
  };

  const handleAnswer = async (e: React.FormEvent, questionId: number) => {
    e.preventDefault();
    const content = replyContent[questionId];
    if (!username || !content) return;

    localStorage.setItem('collegeHubUser', username);

    const res = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'answer',
        questionId,
        username,
        content
      })
    });

    if (res.ok) {
      const newAnswer = await res.json();
      setQuestions(questions.map(q => {
        if (q.id === questionId) {
          return { ...q, answers: [newAnswer, ...q.answers] };
        }
        return q;
      }));
      setReplyContent({ ...replyContent, [questionId]: '' });
      setActiveReply(null);
    }
  };

  const handleUpvote = async (questionId: number) => {
    const res = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upvote_question', questionId, username: username || 'guest', content: 'upvote' })
    });
    
    if (res.ok) {
      setQuestions(questions.map(q => 
        q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
      ));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Q&A</h2>
          <p className="text-gray-500">Ask questions and discuss with alumni and students.</p>
        </div>
      </div>

      {/* Ask Question Form */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-6 sm:p-10 mb-12 border border-indigo-100 shadow-sm relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-indigo-950 mb-6 flex items-center gap-2">
             <HelpCircle className="w-6 h-6 text-indigo-600" />
             Have a question about this college?
          </h3>
          <form onSubmit={handleAskQuestion} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Username / Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 bg-white rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-gray-900 placeholder-gray-400 shadow-sm"
                required
              />
              <input
                type="text"
                placeholder="Question Title (e.g., How is the CS placement?)"
                value={newQTitle}
                onChange={(e) => setNewQTitle(e.target.value)}
                className="w-full px-5 py-4 bg-white rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-gray-900 placeholder-gray-400 shadow-sm"
                required
              />
            </div>
            <textarea
              placeholder="Add more details about your question..."
              value={newQContent}
              onChange={(e) => setNewQContent(e.target.value)}
              rows={4}
              className="w-full p-5 bg-white rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none font-medium text-gray-900 placeholder-gray-400 shadow-sm"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-extrabold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Post Question <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-40 bg-gray-100 border border-gray-200 w-full"></div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 border border-gray-200 border-dashed">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold text-lg">No questions asked yet.</p>
            <p className="text-gray-400 mt-1">Be the first to start the discussion!</p>
          </div>
        ) : (
          questions.map((q) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Upvote Column */}
                <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 bg-gray-50 sm:bg-transparent p-3 sm:p-0 border sm:border-0 border-gray-100 shrink-0">
                  <button 
                    onClick={() => handleUpvote(q.id)}
                    className="p-3 bg-white sm:bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 transition-all border border-indigo-100 sm:border-0 shadow-sm sm:shadow-none focus:scale-95"
                    title="Upvote this question"
                  >
                    <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <span className="font-extrabold text-indigo-950 text-xl sm:mt-1">{q.upvotes}</span>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest sm:hidden">Votes</span>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">{q.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-6 whitespace-pre-wrap">{q.content}</p>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2 font-bold text-indigo-700 bg-indigo-50/80 px-3 py-1.5 border border-indigo-100">
                      <UserIcon className="w-4 h-4" /> {q.user.name}
                    </div>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    <span className="font-medium text-gray-500">{new Date(q.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>

                  {/* Answers Section */}
                  <div className="space-y-6">
                    <h4 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
                       <MessageSquare className="w-5 h-5 text-indigo-400" />
                       {q.answers.length} {q.answers.length === 1 ? 'Answer' : 'Answers'}
                    </h4>
                    
                    {q.answers.map(a => (
                      <div key={a.id} className="bg-gray-50/80 border border-gray-100 p-5 sm:p-6 relative hover:bg-white hover:shadow-sm transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                        <p className="text-gray-700 mb-4 text-[15px] leading-relaxed">{a.content}</p>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-7 h-7 bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold">
                            {a.user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-emerald-700">{a.user.name}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-gray-500 font-medium text-xs">{new Date(a.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}

                    {/* Reply Form toggle */}
                    {activeReply === q.id ? (
                      <form onSubmit={(e) => handleAnswer(e, q.id)} className="mt-6 flex flex-col sm:flex-row gap-3 bg-indigo-50/50 p-5 border border-indigo-100">
                        <input
                          type="text"
                          placeholder="Write a helpful reply..."
                          value={replyContent[q.id] || ''}
                          onChange={(e) => setReplyContent({...replyContent, [q.id]: e.target.value})}
                          className="flex-1 px-5 py-3.5 bg-white border border-indigo-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm font-medium"
                          autoFocus
                          required
                        />
                        <div className="flex gap-2 shrink-0">
                          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 font-extrabold transition-colors shadow-md shadow-indigo-600/20 w-full sm:w-auto">Reply</button>
                          <button type="button" onClick={() => setActiveReply(null)} className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-6 py-3.5 font-bold transition-colors w-full sm:w-auto shadow-sm">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        onClick={() => setActiveReply(q.id)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-5 py-3 transition-colors border border-indigo-100 hover:border-indigo-300 shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" /> Add your answer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
