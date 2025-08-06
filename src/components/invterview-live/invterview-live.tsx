/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Battery, Brain, Camera, CameraOff, Clock, Eye, FileText, FileVideo, GripVertical, HelpCircle, Info, Lightbulb, Maximize2, MessageSquare, Mic, Minimize2, Rocket, Shield, Signal, SkipForward, Smile, Sparkles, Timer, Video, Wifi, X } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface InterviewSection {
  id: number;
  title: string;
  question: string;
  hints: string[];
  duration: number;
  video: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skills: string[];
  tips: string[];
}

const interviewSections: InterviewSection[] = [
  {
    id: 1,
    title: 'Introduction',
    question: 'Please introduce yourself and tell us about your background and experience.',
    category: 'Personal',
    difficulty: 'Easy',
    skills: ['Communication', 'Self-awareness', 'Confidence'],
    hints: [
      'Mention your name and current role',
      'Highlight relevant experience',
      'Keep it concise and professional',
      'Show enthusiasm and confidence'
    ],
    tips: [
      'Practice your elevator pitch beforehand',
      'Focus on achievements relevant to the role',
      'Maintain good eye contact with the camera',
      'Speak clearly and at a moderate pace'
    ],
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/MXBfZ2uHuAdiEmVjJ3bwQC.jpg" data-uuid="MXBfZ2uHuAdiEmVjJ3bwQC" data-v="4" data-type="inline"/>`,
    duration: 120
  },
  {
    id: 2,
    title: 'Technical Skills',
    question: "Describe your technical expertise and the technologies you're most comfortable working with.",
    category: 'Technical',
    difficulty: 'Medium',
    skills: ['Technical Knowledge', 'Problem Solving', 'Learning Ability'],
    hints: [
      'Focus on relevant technologies',
      'Provide specific examples',
      'Mention recent projects',
      'Discuss learning approach'
    ],
    tips: [
      "Prepare specific examples of projects you've worked on",
      'Mention both frontend and backend technologies if applicable',
      'Discuss how you stay updated with new technologies',
      'Be honest about your skill levels'
    ],
    duration: 120,
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/EoS46jUP1CkZ4QpBSE5GVy.jpg" data-uuid="EoS46jUP1CkZ4QpBSE5GVy" data-v="4" data-type="inline"/>`
  },
  {
    id: 3,
    title: 'Problem Solving',
    question: 'Tell us about a challenging problem you solved recently and walk us through your approach.',
    category: 'Analytical',
    difficulty: 'Hard',
    skills: ['Critical Thinking', 'Analytical Skills', 'Creativity'],
    hints: [
      'Use the STAR method',
      'Be specific about the challenge',
      'Explain your thought process',
      'Highlight the outcome'
    ],
    tips: [
      'Structure your answer: Situation, Task, Action, Result',
      'Choose a problem that showcases your skills',
      'Explain your reasoning step by step',
      'Mention what you learned from the experience'
    ],
    duration: 120,
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/MXBfZ2uHuAdiEmVjJ3bwQC.jpg" data-uuid="MXBfZ2uHuAdiEmVjJ3bwQC" data-v="4" data-type="inline"/>`
  },
  {
    id: 4,
    title: 'Team Collaboration',
    question: "How do you handle working in a team environment and what's your communication style?",
    category: 'Interpersonal',
    difficulty: 'Medium',
    skills: ['Teamwork', 'Communication', 'Leadership'],
    hints: [
      'Give concrete examples',
      'Mention conflict resolution',
      'Discuss different team roles',
      'Show adaptability'
    ],
    tips: [
      'Share examples of successful team projects',
      'Discuss how you handle disagreements',
      'Mention your preferred communication methods',
      'Show that you can both lead and follow'
    ],
    duration: 120,
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/MXBfZ2uHuAdiEmVjJ3bwQC.jpg" data-uuid="MXBfZ2uHuAdiEmVjJ3bwQC" data-v="4" data-type="inline"/>`
  },
  {
    id: 5,
    title: 'Future Goals',
    question: 'Where do you see yourself in the next few years and why are you interested in this position?',
    category: 'Career',
    difficulty: 'Medium',
    skills: ['Vision', 'Motivation', 'Goal Setting'],
    hints: [
      'Align with company goals',
      'Show long-term thinking',
      'Demonstrate research about the role',
      'Express genuine interest'
    ],
    tips: [
      'Research the company and role thoroughly',
      "Connect your goals with the company's mission",
      'Be realistic but ambitious',
      'Show enthusiasm for growth opportunities'
    ],
    duration: 120,
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/EoS46jUP1CkZ4QpBSE5GVy.jpg" data-uuid="EoS46jUP1CkZ4QpBSE5GVy" data-v="4" data-type="inline"/>`
  },
  {
    id: 6,
    title: 'Leadership Experience',
    question: 'Describe a time when you had to lead a project or team. What was your approach and what did you learn?',
    category: 'Leadership',
    difficulty: 'Hard',
    skills: ['Leadership', 'Project Management', 'Decision Making'],
    hints: [
      'Choose a specific leadership example',
      'Explain your leadership style',
      'Discuss challenges you faced',
      'Share lessons learned'
    ],
    tips: [
      'Focus on a project where you made a real impact',
      'Discuss how you motivated your team',
      'Mention any obstacles and how you overcame them',
      'Reflect on what you would do differently'
    ],
    duration: 120,
    video: `<img style="width: 100%; margin: auto; display: block;" class="vidyard-player-embed" src="https://play.vidyard.com/MXBfZ2uHuAdiEmVjJ3bwQC.jpg" data-uuid="MXBfZ2uHuAdiEmVjJ3bwQC" data-v="4" data-type="inline"/>`
  }
];

// Enhanced tracking interfaces
interface ScreenshotData {
  timestamp: number;
  webcamImage: string;
  screenImage: string;
  section: number;
  activity: string;
  deviceInfo: {
    userAgent: string;
    screenResolution: string;
    viewport: string;
    battery?: number;
    connection?: string;
  };
}

interface ActivityLog {
  timestamp: number;
  action: string;
  section: number;
  details: string;
  elementTarget?: string;
}

// Video Player Component
interface VideoPlayerProps {
  currentSection: InterviewSection;
  timeLeft: number;
  isAutoRecording: boolean;
  formatTime: (seconds: number) => string;
}

function VideoPlayer({ currentSection, timeLeft, isAutoRecording, formatTime }: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="space-y-4 sm:space-y-6"
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
        <CardContent className="p-3 sm:p-6">
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-800"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Video className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Video Guide</h3>
                <p className="text-xs sm:text-sm text-gray-600">{currentSection.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs sm:text-sm">
                {formatTime(timeLeft)} left
              </Badge>
              {isAutoRecording && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center space-x-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="hidden sm:inline">REC</span>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
            <div 
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: currentSection.video }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Enhanced Question Component
interface EnhancedQuestionProps {
  currentSection: InterviewSection;
  currentSectionIndex: number;
  timeLeft: number;
  showHints: boolean;
  setShowHints: (show: boolean) => void;
  formatTime: (seconds: number) => string;
}

function EnhancedQuestion({
  currentSection,
  currentSectionIndex,
  timeLeft,
  showHints,
  setShowHints,
  formatTime
}: EnhancedQuestionProps) {
  const [showTips, setShowTips] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Question Header */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50 shadow-xl">
        <CardContent className="p-3 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <motion.div
                    className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </motion.div>
                  <div>
                    <Badge className="mb-1 sm:mb-2 bg-gradient-to-br from-blue-600 to-blue-800 px-2 sm:px-3 py-1 text-white text-xs sm:text-sm">
                      Question {currentSectionIndex + 1}
                    </Badge>
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900">{currentSection.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{currentSection.category}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="mb-1 sm:mb-2 flex items-center space-x-2">
                    <Timer className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {formatTime(timeLeft)} remaining
                    </Badge>
                  </div>
                </div>
              </div>
              
              <motion.h2
                className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold leading-tight text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {currentSection.question}
              </motion.h2>
              
              {/* Skills Required */}
              <motion.div
                className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {currentSection.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs sm:text-sm">
                      <Brain className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Hints Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-3 sm:p-6">
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setShowHints(!showHints)}
                  variant="ghost"
                  className="flex items-center space-x-2 text-sm sm:text-lg font-semibold hover:bg-blue-50 p-2 sm:p-3"
                >
                  <Lightbulb className={`h-4 w-4 sm:h-5 sm:w-5 ${showHints ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <span>{showHints ? 'Hide' : 'Show'} Hints</span>
                  <Badge variant="outline" className="ml-1 sm:ml-2 text-xs">
                    {currentSection.hints.length}
                  </Badge>
                </Button>
              </motion.div>
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowTips(!showTips)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1 text-xs sm:text-sm"
                  >
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Tips</span>
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <AnimatePresence>
              {showHints && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="space-y-2 sm:space-y-3"
                >
                  {currentSection.hints.map((hint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start space-x-2 sm:space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-2 sm:p-3"
                    >
                      <div className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">{hint}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="mt-3 sm:mt-4 space-y-2 sm:space-y-3"
                >
                  <div className="mb-2 sm:mb-3 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">Pro Tips</h4>
                  </div>
                  {currentSection.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start space-x-2 sm:space-x-3 rounded-lg border border-purple-200 bg-purple-50 p-2 sm:p-3"
                    >
                      <Rocket className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-purple-500" />
                      <p className="text-xs sm:text-sm text-gray-700">{tip}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  <span className="text-xs sm:text-sm text-gray-600">Practice Mode</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mic className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-gray-600">Audio Clear</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                    <Info className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    Help
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                    <Smile className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    Feedback
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Auto Recording Status Component
interface AutoRecordingStatusProps {
  isRecording: boolean;
  recordingDuration: number;
  totalSections: number;
  currentSection: number;
  screenshots: ScreenshotData[];
  activityLogs: ActivityLog[];
  onClose: () => void;
}

function AutoRecordingStatus({
  isRecording,
  recordingDuration,
  totalSections,
  currentSection,
  screenshots,
  activityLogs,
  onClose
}: AutoRecordingStatusProps) {
  const formatRecordingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 max-w-[calc(100vw-1rem)] sm:max-w-none">
      <motion.div
        className="w-72 sm:min-w-80 rounded-xl border-2 border-gray-200 bg-white p-3 sm:p-5 shadow-2xl"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="space-y-3 sm:space-y-4">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600"
                animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Video className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">HD Recording</h3>
                <p className="text-xs text-gray-500">Video + Screenshots</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileVideo className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              <span className="text-xs text-gray-500">MP4</span>
              <motion.button
                onClick={onClose}
                className="ml-2 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Close recording status"
              >
                <X className="h-2 w-2 sm:h-3 sm:w-3" />
              </motion.button>
            </div>
          </div>

          {/* Recording Status */}
          {isRecording ? (
            <motion.div
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <span className="font-mono text-sm sm:text-lg font-bold text-red-600">
                    {formatRecordingTime(recordingDuration)}
                  </span>
                </div>
                <Badge className="bg-red-100 text-red-800 text-xs">LIVE</Badge>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-2 sm:p-3">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-red-700">
                    <Camera className="h-2 w-2 sm:h-3 sm:w-3" />
                    <span>Webcam HD</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-red-700">
                    <Eye className="h-2 w-2 sm:h-3 sm:w-3" />
                    <span>{screenshots.length} Captures</span>
                  </div>
                </div>
                <div className="mt-1 sm:mt-2 text-xs font-medium text-red-600">
                  Section {currentSection + 1} of {totalSections} • Auto-capturing every 30s
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 sm:p-3">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-gray-400" />
                <span>Recording Stopped</span>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Interview Progress</span>
              <span>{Math.round(((currentSection + 1) / totalSections) * 100)}%</span>
            </div>
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {/* Device Status */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs">
            <div className="flex items-center space-x-1 text-gray-600">
              <Wifi className="h-2 w-2 sm:h-3 sm:w-3 text-green-500" />
              <span className="hidden sm:inline">Online</span>
              <span className="sm:hidden">On</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Battery className="h-2 w-2 sm:h-3 sm:w-3 text-green-500" />
              <span className="hidden sm:inline">Good</span>
              <span className="sm:hidden">OK</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Signal className="h-2 w-2 sm:h-3 sm:w-3 text-green-500" />
              <span className="hidden sm:inline">Strong</span>
              <span className="sm:hidden">Hi</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Screenshot Display Component
interface ScreenshotDisplayProps {
  screenshots: ScreenshotData[];
  isVisible: boolean;
  onClose: () => void;
}

function ScreenshotDisplay({ screenshots, isVisible, onClose }: ScreenshotDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!isVisible || screenshots.length === 0) return null;

  const currentScreenshot = screenshots[currentIndex];

  return (
    <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 max-w-[calc(100vw-1rem)] sm:max-w-none">
      <motion.div
        className="w-80 sm:w-96 rounded-xl border-2 border-gray-200 bg-white p-3 sm:p-4 shadow-2xl"
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Camera className="h-4 w-4 text-white" />
              </motion.div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">HD Screenshots</h3>
                <p className="text-xs text-gray-500">Auto-captured every 30s</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-800 text-xs">
                {currentIndex + 1}/{screenshots.length}
              </Badge>
              <motion.button
                onClick={onClose}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-3 w-3" />
              </motion.button>
            </div>
          </div>

          {/* Screenshot Preview */}
          <div className="space-y-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-200">
              <img
                src={currentScreenshot.screenImage || "/placeholder.svg?height=400&width=600"}
                alt={`Screenshot ${currentIndex + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Webcam Preview */}
            {currentScreenshot.webcamImage && (
              <div className="flex justify-end">
                <div className="h-16 w-24 overflow-hidden rounded border-2 border-blue-200">
                  <img
                    src={currentScreenshot.webcamImage || "/placeholder.svg?height=100&width=150"}
                    alt={`Webcam ${currentIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Screenshot Info */}
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-purple-800">Time:</span>
                <p className="text-purple-600">{new Date(currentScreenshot.timestamp).toLocaleTimeString()}</p>
              </div>
              <div>
                <span className="font-medium text-purple-800">Section:</span>
                <p className="text-purple-600">Section {currentScreenshot.section + 1}</p>
              </div>
            </div>
            <div className="mt-1">
              <span className="font-medium text-purple-800">Activity:</span>
              <p className="text-purple-600">{currentScreenshot.activity}</p>
            </div>
          </div>

          {/* Navigation */}
          {screenshots.length > 1 && (
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center space-x-1 rounded bg-purple-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                <span>Prev</span>
              </motion.button>
              
              <div className="flex space-x-1">
                {screenshots.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={() => setCurrentIndex(Math.min(screenshots.length - 1, currentIndex + 1))}
                disabled={currentIndex === screenshots.length - 1}
                className="flex items-center space-x-1 rounded bg-purple-600 px-2 py-1 text-xs text-white disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Next</span>
                <span>→</span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Draggable Webcam Component
interface DraggableWebcamProps {
  webcamRef: React.RefObject<Webcam | null>;
  webcamError: string;
  videoConstraints: any;
  handleUserMedia: () => void;
  handleUserMediaError: (error: string | DOMException) => void;
  retryCamera: () => void;
  isActive: boolean;
  isRecording: boolean;
}

function DraggableWebcam({
  webcamRef,
  webcamError,
  videoConstraints,
  handleUserMedia,
  handleUserMediaError,
  retryCamera,
  isActive,
  isRecording
}: DraggableWebcamProps) {
  const [webcamSize, setWebcamSize] = useState(200);
  const [isCircleShape, setIsCircleShape] = useState(true);
  const [isWebcamVisible, setIsWebcamVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const baseSize = isMobile ? 150 : 300;
  const currentSize = isMinimized ? Math.max(60, baseSize * 0.4) : Math.min(webcamSize, baseSize);

  const increaseSize = () => {
    const maxSize = isMobile ? 200 : 550;
    setWebcamSize((prev) => Math.min(maxSize, prev + (isMobile ? 10 : 20)));
  };

  const decreaseSize = () => {
    const minSize = isMobile ? 80 : 120;
    setWebcamSize((prev) => Math.max(minSize, prev - (isMobile ? 10 : 20)));
  };

  const toggleShape = () => {
    setIsCircleShape(!isCircleShape);
  };

  const closeWebcam = () => {
    setIsWebcamVisible(false);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setMouseStart({ x: clientX, y: clientY });
    setStartPos({ x: position.x, y: position.y });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - mouseStart.x;
      const deltaY = clientY - mouseStart.y;
      const newX = startPos.x + deltaX;
      const newY = startPos.y + deltaY;
      
      const maxX = window.innerWidth - currentSize - 20;
      const maxY = window.innerHeight - currentSize - 20;
      
      setPosition({
        x: Math.max(10, Math.min(newX, maxX)),
        y: Math.max(10, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, mouseStart, startPos, currentSize]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isWebcamVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-40"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${currentSize}px`,
        height: `${currentSize}px`
      }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          scale: isDragging ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        {/* Enhanced Drag Handle Bar with Controls */}
        {!isMinimized && (
          <motion.div
            className={`absolute ${isMobile ? '-top-8' : '-top-12'} left-1/2 -translate-x-1/2 transform cursor-grab rounded-t-lg bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-white ${
              isDragging ? 'cursor-grabbing' : ''
            } flex items-center space-x-1 sm:space-x-2 shadow-lg`}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <GripVertical className="h-2 w-2 sm:h-3 sm:w-3" />
            
            {/* Size Controls - Hidden on very small screens */}
            {!isMobile && (
              <div className="flex items-center space-x-1 border-l border-white/30 pl-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseSize();
                  }}
                  className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Decrease size"
                >
                  <span className="text-xs font-bold">-</span>
                </motion.button>
                <span className="font-mono text-xs">{webcamSize}</span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseSize();
                  }}
                  className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Increase size"
                >
                  <span className="text-xs font-bold">+</span>
                </motion.button>
              </div>
            )}
            
            {/* Shape Toggle */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleShape();
              }}
              className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded bg-white/20 text-white transition-colors hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isCircleShape ? 'Switch to square' : 'Switch to circle'}
            >
              {isCircleShape ? (
                <div className="h-2 w-2 sm:h-3 sm:w-3 border border-white" />
              ) : (
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full border border-white" />
              )}
            </motion.button>
            
            {/* Minimize Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
              className="text-white transition-colors hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Minimize"
            >
              <Minimize2 className="h-2 w-2 sm:h-3 sm:w-3" />
            </motion.button>
            
            {/* Close Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                closeWebcam();
              }}
              className="text-white transition-colors hover:text-red-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Close webcam"
            >
              <X className="h-2 w-2 sm:h-3 sm:w-3" />
            </motion.button>
          </motion.div>
        )}

        {/* Main Webcam Container with Dynamic Shape */}
        <motion.div
          className={`h-full w-full overflow-hidden ${isCircleShape ? 'rounded-full' : 'rounded-lg'} border-2 sm:border-4 ${
            isRecording
              ? 'border-red-500 shadow-lg shadow-red-500/50'
              : isActive
                ? 'border-blue-400 shadow-lg shadow-blue-400/30'
                : 'border-white shadow-lg'
          } relative cursor-grab bg-gray-900 ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            width: `${currentSize}px`,
            height: `${currentSize}px`
          }}
        >
          {webcamError ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-2 sm:p-4 text-center text-white">
              <CameraOff className={`${isMinimized ? 'h-4 w-4' : 'h-6 w-6 sm:h-12 sm:w-12'} mb-1 sm:mb-2 text-red-400`} />
              {!isMinimized && (
                <>
                  <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-red-400">Camera Error</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={(e: any) => {
                        e.stopPropagation();
                        retryCamera();
                      }}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <Camera className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                      Retry
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                width="100%"
                height="100%"
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                mirrored={true}
                className="h-full w-full object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* HD Quality Indicator */}
              {!isMinimized && (
                <motion.div
                  className="absolute right-1 top-1 sm:right-2 sm:top-2 rounded-full bg-green-600 px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold text-white shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  HD
                </motion.div>
              )}
              
              {/* Auto Recording Indicator */}
              {isRecording && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`absolute ${
                    isMinimized ? 'left-1 top-1' : 'left-1 top-1 sm:left-2 sm:top-2'
                  } flex items-center space-x-1 rounded-full bg-red-600 px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-white shadow-lg`}
                  initial={{ opacity: 0, x: -20 }}
                >
                  <motion.div
                    className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                  {!isMinimized && <span className="text-xs">REC</span>}
                </motion.div>
              )}
              
              {/* Minimize button for minimized state */}
              {isMinimized && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize();
                  }}
                  className="absolute right-1 top-1 sm:right-2 sm:top-2 rounded-full bg-black/50 p-0.5 sm:p-1 text-white transition-colors hover:bg-black/70"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize2 className="h-2 w-2 sm:h-3 sm:w-3" />
                </motion.button>
              )}
            </>
          )}
        </motion.div>

        {/* Dragging Visual Feedback */}
        {isDragging && (
          <motion.div
            className="absolute -inset-1 sm:-inset-2 rounded-full border-2 border-dashed border-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

function ConfirmationModal({ isOpen, onConfirm, onCancel, isSubmitting }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="w-full max-w-md rounded-xl bg-white p-4 sm:p-6 shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </motion.div>
          
          <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">Submit Interview</h3>
          <p className="mb-6 text-sm sm:text-base text-gray-600">
            Are you ready to submit your interview? This will stop the recording and generate your report.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 sm:space-y-0">
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Interview'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Already Submitted Component
function AlreadySubmitted() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="max-w-md sm:max-w-2xl border-0 p-4 sm:p-8 shadow-2xl">
          <CardContent className="space-y-4 sm:space-y-6">
            <motion.div
              className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </motion.div>
            
            <div>
              <h1 className="mb-2 text-xl sm:text-3xl font-bold text-gray-900">Interview Submitted!</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Thank you for completing the interview. Your responses have been recorded and will be reviewed shortly.
              </p>
            </div>
            
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 sm:p-4 text-sm sm:text-base text-green-800">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm">
                <li>• Your watermarked HD video and report have been automatically downloaded</li>
                <li>• Our team will review your responses within 24-48 hours</li>
                {/* <li>• You'll receive feedback via email</li> */}
                <li>• Screenshots and activity logs are included in your PDF report</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Main Interview App Component
export default function VideoInterviewApp() {
  const [currentSection, setCurrentSection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [initialCountdown, setInitialCountdown] = useState(10);
  const [showInitialCountdown, setShowInitialCountdown] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // Auto Recording states
  const [isAutoRecording, setIsAutoRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Enhanced tracking states
  const [screenshots, setScreenshots] = useState<ScreenshotData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [lastScreenshotTime, setLastScreenshotTime] = useState(0);
  const [totalInterviewTime, setTotalInterviewTime] = useState(0);

  // Modal states
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

  // Tab visibility tracking
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Add state for recording status visibility in the main component
  const [isRecordingStatusVisible, setIsRecordingStatusVisible] = useState(true);
  const [showScreenshotDisplay, setShowScreenshotDisplay] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const screenshotIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Webcam configuration - HD Resolution
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: 'user',
    frameRate: { ideal: 30, max: 60 }
  };

  // Tab visibility tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
      if (document.hidden) {
        logActivity('Tab Switch', 'User switched to another tab');
      } else {
        logActivity('Tab Return', 'User returned to interview tab');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Total interview time tracking
  useEffect(() => {
    if (showWebcam && !isCompleted) {
      totalTimeIntervalRef.current = setInterval(() => {
        setTotalInterviewTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (totalTimeIntervalRef.current) {
        clearInterval(totalTimeIntervalRef.current);
      }
    };
  }, [showWebcam, isCompleted]);

  // Enhanced Activity Logging
  const logActivity = useCallback(
    (action: string, details: string, elementTarget?: string) => {
      const newLog: ActivityLog = {
        timestamp: Date.now(),
        action,
        section: currentSection,
        details,
        elementTarget
      };
      setActivityLogs((prev) => [...prev, newLog]);
    },
    [currentSection]
  );

  // Enhanced Screenshot Capture with improved error handling and better tracking
  const captureScreenshot = useCallback(async () => {
    try {
      logActivity('Screenshot Start', `Starting HD screenshot capture for section ${currentSection + 1}`);
    
      // Capture screen with enhanced configuration for better PDF compatibility
      const screenCanvas = await html2canvas(document.body, {
        height: window.innerHeight,
        width: window.innerWidth,
        scrollX: 0,
        scrollY: 0,
        scale: 1, // Full scale for better quality
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 20000,
        removeContainer: true,
        foreignObjectRendering: false,
        ignoreElements: (element) => {
          // Ignore problematic elements
          const classList = element.classList;
          const style = element.getAttribute('style') || '';
          
          return (
            element.classList?.contains('html2canvas-ignore') ||
            style.includes('oklch') ||
            style.includes('color-mix') ||
            classList?.toString().includes('oklch') ||
            element.tagName === 'SCRIPT' ||
            element.tagName === 'STYLE' ||
            element.tagName === 'LINK'
          );
        },
        onclone: (clonedDoc) => {
          // Clean up problematic CSS
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(style => {
            if (style.textContent?.includes('oklch') || style.textContent?.includes('color-mix')) {
              style.remove();
            }
          });
          
          // Add fallback styles for better PDF compatibility
          const fallbackStyle = clonedDoc.createElement('style');
          fallbackStyle.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(200, 200, 200) !important;
          }
          .bg-gradient-to-br { background: rgb(248, 250, 252) !important; }
          .bg-blue-600 { background: rgb(37, 99, 235) !important; }
          .bg-green-600 { background: rgb(22, 163, 74) !important; }
          .bg-red-600 { background: rgb(220, 38, 38) !important; }
        `;
          clonedDoc.head.appendChild(fallbackStyle);
        }
      });

      // Convert to high-quality JPEG for PDF compatibility
      const screenImage = screenCanvas.toDataURL('image/jpeg', 0.9); // Higher quality

      // Capture webcam in full HD with better error handling
      let webcamImage = '';
      if (webcamRef.current) {
        try {
          webcamImage = webcamRef.current.getScreenshot({
            width: 1920,
            height: 1080
          }) || '';
          logActivity('Webcam Capture', 'HD webcam screenshot captured successfully');
        } catch (webcamError) {
          console.warn('Webcam screenshot failed:', webcamError);
          logActivity('Webcam Error', `Webcam screenshot failed: ${webcamError}`);
          webcamImage = '';
        }
      }

      // Enhanced device info collection
      let deviceInfo;
      try {
        deviceInfo = {
          userAgent: navigator.userAgent,
          screenResolution: `${screen.width}x${screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          battery: undefined,
          connection: (navigator as any).connection ? (navigator as any).connection.effectiveType : undefined
        };

        // Try to get battery info if available
        if ((navigator as any).getBattery) {
          try {
            const battery = await (navigator as any).getBattery();
            // deviceInfo.battery = battery.level * 100;
          } catch (batteryError) {
            console.warn('Battery API failed:', batteryError);
          }
        }
      } catch (deviceError) {
        console.warn('Device info collection failed:', deviceError);
        deviceInfo = {
          userAgent: 'Unknown',
          screenResolution: 'Unknown',
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          battery: undefined,
          connection: undefined
        };
      }

      const screenshot: ScreenshotData = {
        timestamp: Date.now(),
        webcamImage,
        screenImage,
        section: currentSection,
        activity: `Section ${currentSection + 1} - ${interviewSections[currentSection].title}`,
        deviceInfo
      };

      setScreenshots((prev) => [...prev, screenshot]);
      logActivity('Screenshot Complete', `HD screenshot captured successfully for section ${currentSection + 1} - Size: ${Math.round(screenImage.length / 1024)}KB screen + ${Math.round(webcamImage.length / 1024)}KB webcam`);
    
      // Auto-show screenshot display for first few captures
      if (screenshots.length < 3) {
        setShowScreenshotDisplay(true);
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      logActivity('Screenshot Error', `Failed to capture screenshot: ${error}`);
      
      // Enhanced fallback approach
      try {
        const fallbackCanvas = await html2canvas(document.body, {
          height: window.innerHeight,
          width: window.innerWidth,
          scale: 0.8,
          useCORS: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          foreignObjectRendering: false
        });
        
        const fallbackImage = fallbackCanvas.toDataURL('image/jpeg', 0.8);
        
        const fallbackScreenshot: ScreenshotData = {
          timestamp: Date.now(),
          webcamImage: '',
          screenImage: fallbackImage,
          section: currentSection,
          activity: `Section ${currentSection + 1} - ${interviewSections[currentSection].title} (Fallback)`,
          deviceInfo: {
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            battery: undefined,
            connection: undefined
          }
        };
        
        setScreenshots((prev) => [...prev, fallbackScreenshot]);
        logActivity('Screenshot Fallback', `Fallback screenshot captured for section ${currentSection + 1}`);
      } catch (fallbackError) {
        console.error('Fallback screenshot also failed:', fallbackError);
        logActivity('Screenshot Critical Error', `Both primary and fallback screenshot methods failed`);
      }
    }
  }, [currentSection, logActivity, screenshots.length]);

  // Enhanced PDF Report Generation with University Style and Screenshots
  const generatePDFReport = useCallback(async () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // University Header Design
      pdf.setFillColor(25, 51, 134);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      // University Logo Area (placeholder)
      pdf.setFillColor(255, 255, 255);
      pdf.rect(10, 5, 15, 15, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(25, 51, 134);
      pdf.text('UNIV', 12, 13);
      pdf.text('LOGO', 12, 16);
      
      // University Title
      pdf.setFontSize(18);
      pdf.setTextColor(255, 255, 255);
      pdf.text('UNIVERSITY INTERVIEW ASSESSMENT REPORT', pageWidth / 2, 16, { align: 'center' });
      
      // Report Details Header
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('OFFICIAL INTERVIEW DOCUMENTATION', pageWidth / 2, 35, { align: 'center' });
      
      // Candidate Information Section
      pdf.setFillColor(240, 248, 255);
      pdf.rect(10, 45, pageWidth - 20, 35, 'F');
      pdf.setDrawColor(25, 51, 134);
      pdf.rect(10, 45, pageWidth - 20, 35, 'S');
      
      pdf.setFontSize(14);
      pdf.setTextColor(25, 51, 134);
      pdf.text('CANDIDATE INFORMATION', 15, 55);
      
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const currentDate = new Date();
      pdf.text(`Interview Date: ${currentDate.toLocaleDateString()}`, 15, 65);
      pdf.text(`Interview Time: ${currentDate.toLocaleTimeString()}`, 15, 70);
      pdf.text(`Total Duration: ${Math.floor(totalInterviewTime / 60)}m ${totalInterviewTime % 60}s`, 15, 75);
      
      pdf.text(`Recording Duration: ${Math.floor(recordingDuration / 60)}m ${recordingDuration % 60}s`, pageWidth / 2 + 10, 65);
      pdf.text(`HD Screenshots Captured: ${screenshots.length}`, pageWidth / 2 + 10, 70);
      pdf.text(`Activity Events Logged: ${activityLogs.length}`, pageWidth / 2 + 10, 75);

      // Interview Performance Summary
      pdf.setFillColor(248, 250, 252);
      pdf.rect(10, 90, pageWidth - 20, 40, 'F');
      pdf.setDrawColor(25, 51, 134);
      pdf.rect(10, 90, pageWidth - 20, 40, 'S');
      
      pdf.setFontSize(14);
      pdf.setTextColor(25, 51, 134);
      pdf.text('INTERVIEW PERFORMANCE SUMMARY', 15, 100);
      
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Sections Completed: ${completedSections.length}/${interviewSections.length}`, 15, 110);
      pdf.text(`Completion Rate: ${Math.round((completedSections.length / interviewSections.length) * 100)}%`, 15, 115);
      
      // Tab Activity Summary
      const tabSwitches = activityLogs.filter((log) => log.action === 'Tab Switch').length;
      pdf.text(`Tab Switches Detected: ${tabSwitches}`, 15, 120);
      pdf.text(`Focus Maintenance: ${tabSwitches === 0 ? 'Excellent' : tabSwitches < 3 ? 'Good' : 'Needs Improvement'}`, 15, 125);

      // HD Screenshots Section - ENHANCED WITH PROPER IMAGE HANDLING
      if (screenshots.length > 0) {
        pdf.addPage();
        
        // University Header
        pdf.setFillColor(25, 51, 134);
        pdf.rect(0, 0, pageWidth, 20, 'F');
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text('HD VISUAL DOCUMENTATION & SCREENSHOTS', pageWidth / 2, 12, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Total Screenshots Captured: ${screenshots.length} (Auto-captured every 30 seconds)`, 15, 30);
        pdf.text(`Webcam + Screen Recording: Full HD Quality (1920x1080)`, 15, 35);
        
        let screenshotY = 50;
        
        // Process each screenshot with proper error handling
        for (let i = 0; i < screenshots.length; i++) {
          const screenshot = screenshots[i];
          
          // Check if we need a new page
          if (screenshotY > pageHeight - 120) {
            pdf.addPage();
            // Add header to new page
            pdf.setFillColor(25, 51, 134);
            pdf.rect(0, 0, pageWidth, 20, 'F');
            pdf.setFontSize(12);
            pdf.setTextColor(255, 255, 255);
            pdf.text('HD VISUAL DOCUMENTATION (CONTINUED)', pageWidth / 2, 12, { align: 'center' });
            screenshotY = 35;
          }
          
          // Screenshot info box
          pdf.setFillColor(249, 250, 251);
          pdf.rect(10, screenshotY - 5, pageWidth - 20, 110, 'F');
          pdf.setDrawColor(209, 213, 219);
          pdf.rect(10, screenshotY - 5, pageWidth - 20, 110, 'S');
          
          // Screenshot header
          pdf.setFontSize(12);
          pdf.setTextColor(25, 51, 134);
          pdf.text(`Screenshot ${i + 1} - ${new Date(screenshot.timestamp).toLocaleString()}`, 15, screenshotY + 5);
          
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`Section: ${screenshot.activity}`, 15, screenshotY + 12);
          pdf.text(`Device Resolution: ${screenshot.deviceInfo.viewport}`, 15, screenshotY + 18);
          pdf.text(`Screen Resolution: ${screenshot.deviceInfo.screenResolution}`, 15, screenshotY + 24);
          
          // Add main screen screenshot
          try {
            if (screenshot.screenImage && screenshot.screenImage.length > 100) {
              // Main screen capture - larger size
              const screenImgWidth = 85;
              const screenImgHeight = 55;
              
              pdf.addImage(
                screenshot.screenImage,
                'JPEG',
                pageWidth - screenImgWidth - 15,
                screenshotY,
                screenImgWidth,
                screenImgHeight,
                `screen_${i}`,
                'MEDIUM'
              );
              
              // Add label for screen capture
              pdf.setFontSize(8);
              pdf.setTextColor(107, 114, 128);
              pdf.text('Screen Capture (HD)', pageWidth - screenImgWidth - 15, screenshotY + screenImgHeight + 5);
            } else {
              // Placeholder for missing screen image
              pdf.setFillColor(240, 240, 240);
              pdf.rect(pageWidth - 85 - 15, screenshotY, 85, 55, 'F');
              pdf.setFontSize(10);
              pdf.setTextColor(107, 114, 128);
              pdf.text('Screen capture', pageWidth - 60, screenshotY + 25, { align: 'center' });
              pdf.text('not available', pageWidth - 60, screenshotY + 35, { align: 'center' });
            }
          } catch (screenError) {
            console.warn(`Error adding screen image ${i}:`, screenError);
            // Add placeholder
            pdf.setFillColor(254, 226, 226);
            pdf.rect(pageWidth - 85 - 15, screenshotY, 85, 55, 'F');
            pdf.setFontSize(8);
            pdf.setTextColor(153, 27, 27);
            pdf.text('Screen capture error', pageWidth - 60, screenshotY + 30, { align: 'center' });
          }
          
          // Add webcam screenshot if available
          try {
            if (screenshot.webcamImage && screenshot.webcamImage.length > 100) {
              const webcamImgWidth = 45;
              const webcamImgHeight = 30;
              
              pdf.addImage(
                screenshot.webcamImage,
                'JPEG',
                pageWidth - webcamImgWidth - 15,
                screenshotY + 60,
                webcamImgWidth,
                webcamImgHeight,
                `webcam_${i}`,
                'MEDIUM'
              );
              
              // Add label for webcam
              pdf.setFontSize(8);
              pdf.setTextColor(107, 114, 128);
              pdf.text('Webcam (HD)', pageWidth - webcamImgWidth - 15, screenshotY + 95);
            } else {
              // Placeholder for missing webcam image
              pdf.setFillColor(240, 240, 240);
              pdf.rect(pageWidth - 45 - 15, screenshotY + 60, 45, 30, 'F');
              pdf.setFontSize(8);
              pdf.setTextColor(107, 114, 128);
              pdf.text('Webcam', pageWidth - 37, screenshotY + 72, { align: 'center' });
              pdf.text('not available', pageWidth - 37, screenshotY + 80, { align: 'center' });
            }
          } catch (webcamError) {
            console.warn(`Error adding webcam image ${i}:`, webcamError);
            // Add placeholder
            pdf.setFillColor(254, 226, 226);
            pdf.rect(pageWidth - 45 - 15, screenshotY + 60, 45, 30, 'F');
            pdf.setFontSize(8);
            pdf.setTextColor(153, 27, 27);
            pdf.text('Webcam error', pageWidth - 37, screenshotY + 75, { align: 'center' });
          }
          
          // Additional screenshot metadata
          pdf.setFontSize(9);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`Capture Time: ${new Date(screenshot.timestamp).toLocaleTimeString()}`, 15, screenshotY + 35);
          pdf.text(`User Agent: ${screenshot.deviceInfo.userAgent.substring(0, 60)}...`, 15, screenshotY + 42);
          
          if (screenshot.deviceInfo.battery) {
            pdf.text(`Battery Level: ${Math.round(screenshot.deviceInfo.battery)}%`, 15, screenshotY + 49);
          }
          if (screenshot.deviceInfo.connection) {
            pdf.text(`Network: ${screenshot.deviceInfo.connection}`, 15, screenshotY + 56);
          }
          
          // Activity during screenshot
          pdf.setFontSize(8);
          pdf.setTextColor(75, 85, 99);
          pdf.text(`Activity: ${screenshot.activity}`, 15, screenshotY + 65);
          
          // Movement tracking info
          const relatedActivities = activityLogs.filter(log => 
            Math.abs(log.timestamp - screenshot.timestamp) < 30000 // Within 30 seconds
          );
          
          if (relatedActivities.length > 0) {
            pdf.text(`User Actions (±30s): ${relatedActivities.length} events`, 15, screenshotY + 72);
            const recentActions = relatedActivities.slice(-3).map(log => log.action).join(', ');
            pdf.text(`Recent: ${recentActions.substring(0, 50)}...`, 15, screenshotY + 79);
          }
          
          screenshotY += 120;
        }
        
        // Screenshot summary
        pdf.setFontSize(10);
        pdf.setTextColor(25, 51, 134);
        pdf.text(`Total Visual Documentation: ${screenshots.length} HD screenshots with webcam overlay`, 15, screenshotY + 10);
        pdf.text(`Capture Frequency: Every 30 seconds during active interview`, 15, screenshotY + 17);
        pdf.text(`Quality: Full HD (1920x1080) screen + webcam capture`, 15, screenshotY + 24);
      }

      // Save PDF with enhanced naming
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const timeString = new Date()
        .toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
        .replace(':', '-');
      const totalTimeFormatted = `${Math.floor(totalInterviewTime / 60)}m${totalInterviewTime % 60}s`;
      pdf.save(`University-Interview-Report-HD-Screenshots-${timestamp}-${timeString}-${totalTimeFormatted}.pdf`);

      logActivity('PDF Generated', `University-style interview report with ${screenshots.length} HD screenshots generated: ${totalTimeFormatted} total time`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      logActivity('PDF Error', `Error generating PDF report: ${error}`);
    }
  }, [screenshots, activityLogs, completedSections, recordingDuration, totalInterviewTime, logActivity]);

  // Handle webcam ready
  const handleUserMedia = useCallback(() => {
    console.log('Camera accessed successfully');
    setWebcamError('');
    logActivity('Camera', 'Webcam access granted successfully');
  }, [logActivity]);

  // Handle webcam error
  const handleUserMediaError = useCallback(
    (error: string | DOMException) => {
      console.error('Webcam error:', error);
      if (typeof error === 'string') {
        setWebcamError(error);
      } else {
        switch (error.name) {
          case 'NotAllowedError':
            setWebcamError('Camera access denied. Please allow camera access and refresh the page.');
            break;
          case 'NotFoundError':
            setWebcamError('No camera found. Please connect a camera and try again.');
            break;
          case 'NotSupportedError':
            setWebcamError('Camera access is not supported in this browser.');
            break;
          default:
            setWebcamError('Failed to access camera. Please check your camera settings.');
        }
      }
      logActivity('Camera Error', `Webcam error: ${error}`);
    },
    [logActivity]
  );

  // Enhanced Auto Recording with Watermark
  const startAutoRecording = async () => {
    try {
      console.log('Starting HD auto recording with watermark...');
      logActivity('Recording', 'HD auto recording with watermark started');
      
      // Get webcam stream with audio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1920,
          height: 1080,
          frameRate: { ideal: 30, max: 60 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      // Create canvas for watermark overlay
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d')!;

      // Create video element for processing
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Wait for video to be ready
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      // Function to draw frame with watermark
      const drawFrame = () => {
        // Draw the video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Add watermark background (semi-transparent black rectangle)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(canvas.width - 280, canvas.height - 80, 270, 70);
        
        // Add watermark text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('Interview Platform', canvas.width - 20, canvas.height - 45);
        
        // Add timestamp
        ctx.font = '16px Arial';
        ctx.fillText(new Date().toLocaleString(), canvas.width - 20, canvas.height - 20);
        
        // Add HD indicator
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('HD', canvas.width - 20, canvas.height - 60);
      };

      // Create stream from canvas
      const canvasStream = canvas.captureStream(30);
      
      // Add audio track from original stream
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        canvasStream.addTrack(audioTrack);
      }

      // Start drawing frames
      const frameInterval = setInterval(drawFrame, 1000 / 30);

      // Use MP4 if supported, otherwise WebM
      const mimeType = MediaRecorder.isTypeSupported('video/mp4; codecs="avc1.424028, mp4a.40.2"')
        ? 'video/mp4; codecs="avc1.424028, mp4a.40.2"'
        : MediaRecorder.isTypeSupported('video/webm; codecs=vp9,opus')
          ? 'video/webm; codecs=vp9,opus'
          : 'video/webm';

      const recorder = new MediaRecorder(canvasStream, {
        mimeType: mimeType,
        videoBitsPerSecond: 2500000,
        audioBitsPerSecond: 128000
      });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        clearInterval(frameInterval);
        
        const videoBlob = new Blob(chunks, { type: mimeType });
        await downloadVideoFile(videoBlob, mimeType);
        await generatePDFReport();

        stream.getTracks().forEach((track) => {
          track.stop();
        });
        video.remove();
        canvas.remove();
        setRecordedChunks([]);
      };

      recorder.start(1000);
      setMediaRecorder(recorder);
      setIsAutoRecording(true);
      setRecordingDuration(0);
      setRecordedChunks(chunks);

      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start screenshot capture every 30 seconds
      screenshotIntervalRef.current = setInterval(() => {
        captureScreenshot();
      }, 30000);

      // Take initial screenshot
      setTimeout(() => {
        captureScreenshot();
      }, 2000);
    } catch (error) {
      console.error('Error starting HD auto recording with watermark:', error);
      setWebcamError('Failed to start recording. Please check camera and microphone permissions.');
      logActivity('Recording Error', `Failed to start recording: ${error}`);
    }
  };

  const stopAutoRecording = () => {
    console.log('Stopping HD auto recording...');
    logActivity('Recording', 'HD auto recording stopped');
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    if (screenshotIntervalRef.current) {
      clearInterval(screenshotIntervalRef.current);
      screenshotIntervalRef.current = null;
    }
    setIsAutoRecording(false);
    setMediaRecorder(null);
  };

  // Enhanced download video file function
  const downloadVideoFile = async (videoBlob: Blob, mimeType: string) => {
    try {
      setIsDownloading(true);
      logActivity('Download', 'Starting watermarked video download');

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const timeString = new Date()
        .toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
        .replace(':', '-');

      const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
      const totalTimeFormatted = `${Math.floor(totalInterviewTime / 60)}m${totalInterviewTime % 60}s`;
      const filename = `Interview-HD-Watermarked-${timestamp}-${timeString}-${totalTimeFormatted}.${extension}`;

      const url = URL.createObjectURL(videoBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      logActivity('Download', `Watermarked video downloaded: ${filename} (${(videoBlob.size / (1024 * 1024)).toFixed(2)} MB)`);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading watermarked video:', error);
      logActivity('Download Error', `Error downloading watermarked video: ${error}`);
      setIsDownloading(false);
    }
  };

  // Final Submission Handler
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    logActivity('Final Submission', 'Interview submission initiated');
    try {
      if (isAutoRecording) {
        stopAutoRecording();
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      logActivity('Final Submission', 'Interview submission completed successfully');

      setTimeout(() => {
        setIsSubmitting(false);
        setShowConfirmationModal(false);
        setIsAlreadySubmitted(true);
      }, 3000);
    } catch (error) {
      console.error('Error during final submission:', error);
      logActivity('Submission Error', `Error during submission: ${error}`);
      setIsSubmitting(false);
    }
  };

  const closeRecordingStatus = () => {
    setIsRecordingStatusVisible(false);
  };

  // Auto-start recording when interview begins
  useEffect(() => {
    if (isActive && !showInitialCountdown && !isAutoRecording && showWebcam && !webcamError) {
      startAutoRecording();
    }
  }, [isActive, showInitialCountdown, showWebcam, webcamError]);

  // Auto-show screenshot display every 30 seconds
  useEffect(() => {
    if (screenshots.length > 0 && screenshots.length % 3 === 0) {
      setShowScreenshotDisplay(true);
      setTimeout(() => {
        setShowScreenshotDisplay(false);
      }, 10000);
    }
  }, [screenshots.length]);

  // Initial countdown timer
  useEffect(() => {
    if (showInitialCountdown && initialCountdown > 0) {
      const timer = setInterval(() => {
        setInitialCountdown((prev) => {
          if (prev <= 1) {
            setShowInitialCountdown(false);
            setIsActive(true);
            setTimeLeft(120);
            logActivity('Section Start', `Section ${currentSection + 1} started after 10-second break`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showInitialCountdown, initialCountdown, currentSection, logActivity]);

  // Main question timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0 && !showInitialCountdown) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            logActivity('Time Up', `Section ${currentSection + 1} time expired - auto-progressing`);

            setCompletedSections((prev) => [...prev, currentSection]);

            setTimeout(() => {
              if (currentSection < interviewSections.length - 1) {
                setCurrentSection((prev) => prev + 1);
                setShowHints(false);
                setInitialCountdown(10);
                setShowInitialCountdown(true);
                logActivity('Auto Progress', `Auto-progressed to section ${currentSection + 2} after time expiry`);
              } else {
                setShowConfirmationModal(true);
                logActivity('Interview Complete', 'All sections completed - showing confirmation modal');
              }
            }, 1000);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, showInitialCountdown, currentSection, logActivity]);

  // Manual next section function
  const nextSection = () => {
    setCompletedSections((prev) => [...prev, currentSection]);
    logActivity('Manual Progress', `Section ${currentSection + 1} completed manually`);

    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentSection < interviewSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setShowHints(false);
      setInitialCountdown(10);
      setShowInitialCountdown(true);
      logActivity('Manual Next', `Manually moved to section ${currentSection + 2}`);
    } else {
      setShowConfirmationModal(true);
      logActivity('Interview Complete', 'All sections completed manually - showing confirmation modal');
    }
  };

  const skipSection = () => {
    nextSection();
  };

  const startInterview = () => {
    setShowWebcam(true);
    setShowInitialCountdown(true);
    setInitialCountdown(10);
    logActivity('Interview Start', 'HD interview session initiated');
  };

  const retryCamera = () => {
    setWebcamError('');
    setShowWebcam(false);
    setTimeout(() => {
      setShowWebcam(true);
    }, 100);
    logActivity('Camera Retry', 'Camera access retry attempted');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSectionData = interviewSections[currentSection];

  // Already Submitted Screen
  if (isAlreadySubmitted) {
    return <AlreadySubmitted />;
  }

  if (!showWebcam) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full">
          <Card className="max-w-xs sm:max-w-2xl mx-auto border-0 p-4 sm:p-8 shadow-2xl">
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="relative">
                <motion.div
                  className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -right-1 -top-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                </motion.div>
              </div>
              
              <div>
                <h1 className="mb-2 text-xl sm:text-3xl font-bold text-gray-900">HD Interview Platform</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Professional interview system with auto-timer, HD recording with watermark, and comprehensive university-style reporting.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="rounded-lg border border-green-200 bg-green-50 p-3 sm:p-4"
                >
                  <Video className="mb-2 h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  <h3 className="font-semibold text-green-800 text-sm sm:text-base">HD Recording + Watermark</h3>
                  <p className="text-green-600 text-xs sm:text-sm">1920x1080 + Branded Watermark</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-4"
                >
                  <Timer className="mb-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Auto Timer</h3>
                  <p className="text-blue-600 text-xs sm:text-sm">2-min questions + 10s breaks</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="rounded-lg border border-purple-200 bg-purple-50 p-3 sm:p-4"
                >
                  <Camera className="mb-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  <h3 className="font-semibold text-purple-800 text-sm sm:text-base">HD Screenshots</h3>
                  <p className="text-purple-600 text-xs sm:text-sm">Auto-capture every 30s</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="rounded-lg border border-orange-200 bg-orange-50 p-3 sm:p-4"
                >
                  <FileText className="mb-2 h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  <h3 className="font-semibold text-orange-800 text-sm sm:text-base">University Report</h3>
                  <p className="text-orange-600 text-xs sm:text-sm">Professional PDF analysis</p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500"
              >
                <p>• ✅ {interviewSections.length} comprehensive interview sections</p>
                <p>• ✅ 2-minute timer per question (auto-progresses when time ends)</p>
                <p>• ✅ 10-second break between each question</p>
                <p>• ✅ Auto HD recording with watermark overlay</p>
                <p>• ✅ HD screenshots captured every 30 seconds with webcam preview</p>
                <p>• ✅ Tab switching detection and comprehensive activity logging</p>
                <p>• ✅ University-style PDF report with visual documentation</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="rounded-lg border border-red-200 bg-red-50 p-3 sm:p-4 text-xs sm:text-sm text-red-800"
              >
                <div className="mb-2 flex items-center space-x-2">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <strong>Enhanced Features:</strong>
                </div>
                <ul className="ml-4 space-y-1 text-xs">
                  <li>• Watermarked HD video with timestamp and branding</li>
                  <li>• Real-time screenshot display with webcam thumbnails</li>
                  <li>• Professional university-style PDF report</li>
                  <li>• Complete activity timeline and technical specifications</li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button onClick={startInterview} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Camera className="mr-2 h-4 w-4" />
                  Start HD Interview with Watermark
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-4">
      <div className="mx-auto max-w-7xl">
        {/* Auto Recording Status */}
        {showWebcam && isRecordingStatusVisible && (
          <AutoRecordingStatus
            isRecording={isAutoRecording}
            recordingDuration={recordingDuration}
            totalSections={interviewSections.length}
            currentSection={currentSection}
            screenshots={screenshots}
            activityLogs={activityLogs}
            onClose={closeRecordingStatus}
          />
        )}

        {/* Screenshot Display */}
        <ScreenshotDisplay
          screenshots={screenshots}
          isVisible={showScreenshotDisplay}
          onClose={() => setShowScreenshotDisplay(false)}
        />

        {/* Initial Countdown */}
        <AnimatePresence>
          {showInitialCountdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            >
              <Card className="border-0 p-4 sm:p-8 text-center shadow-2xl max-w-sm sm:max-w-md w-full">
                <CardContent className="space-y-3 sm:space-y-4">
                  <motion.div
                    className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-600"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {currentSection === 0 ? 'Get Ready!' : 'Break Time!'}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-gray-600">
                    {currentSection === 0 ? `Section ${currentSection + 1} will begin in:` : `Next section starts in:`}
                  </p>
                  
                  <motion.div
                    key={initialCountdown}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-4xl sm:text-6xl font-bold text-blue-600"
                  >
                    {initialCountdown}
                  </motion.div>
                  
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 sm:p-3 text-xs text-blue-600">
                    <div className="mb-1 flex items-center justify-center space-x-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="font-medium">2-minute timer per question</span>
                    </div>
                    <p>Timer will count down from 2:00 to 0:00</p>
                    <p className="mt-1 text-blue-500">Auto-progresses when timer reaches 0:00</p>
                  </div>
                  
                  {isAutoRecording && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-2 sm:p-3 text-xs text-red-600">
                      <div className="mb-1 flex items-center justify-center space-x-2">
                        <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-medium">HD Recording with Watermark Active</span>
                      </div>
                      <p>Full HD video + watermark + screenshots + activity tracking</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Video Section */}
          <AnimatePresence mode="wait">
            <VideoPlayer
              key={currentSection}
              currentSection={currentSectionData}
              timeLeft={timeLeft}
              isAutoRecording={isAutoRecording}
              formatTime={formatTime}
            />
          </AnimatePresence>

          {/* Question Section */}
          <AnimatePresence mode="wait">
            <EnhancedQuestion
              key={currentSection}
              currentSection={currentSectionData}
              currentSectionIndex={currentSection}
              timeLeft={timeLeft}
              showHints={showHints}
              setShowHints={setShowHints}
              formatTime={formatTime}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 sm:mt-8"
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-0">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={skipSection}
                      size="lg"
                      disabled={showInitialCountdown}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-bl from-[#1F3386] to-[#3B5AF0] px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:bg-gradient-to-tr text-sm sm:text-base"
                    >
                      <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-medium">Next & Continue</span>
                    </Button>
                  </motion.div>
                  
                  {/* Timer Status Display */}
                  {isActive && !showInitialCountdown && (
                    <motion.div
                      className="flex items-center space-x-2 rounded-lg border border-orange-200 bg-orange-50 px-3 sm:px-4 py-2"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                      <span className="text-xs sm:text-sm font-medium text-orange-700">
                        Auto-progress in {formatTime(timeLeft)}
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Recording Status */}
                  {isAutoRecording && (
                    <motion.div
                      className="flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50 px-3 sm:px-4 py-2"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <span className="text-xs sm:text-sm font-medium text-red-700">HD Recording + Watermark</span>
                    </motion.div>
                  )}

                  {/* Screenshot Status */}
                  {screenshots.length > 0 && (
                    <motion.div
                      className="flex items-center space-x-2 rounded-lg border border-purple-200 bg-purple-50 px-3 sm:px-4 py-2 cursor-pointer"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      onClick={() => setShowScreenshotDisplay(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                      <span className="text-xs sm:text-sm font-medium text-purple-700">
                        {screenshots.length} HD Screenshots
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-3 sm:mt-4">
                <div className="mb-2 flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>
                    Question {currentSection + 1} of {interviewSections.length}
                  </span>
                  <span>{Math.round(((currentSection + 1) / interviewSections.length) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 sm:h-2 w-full rounded-full bg-gray-200">
                  <motion.div
                    className="h-full rounded-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSection + 1) / interviewSections.length) * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
              
              {webcamError && (
                <motion.div
                  className="mt-3 sm:mt-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 sm:p-4">
                    <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-red-800">{webcamError}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={retryCamera} variant="outline" size="sm" className="hover:bg-blue-50 text-xs sm:text-sm">
                        <Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Retry Camera
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Draggable Webcam */}
        {showWebcam && (
          <DraggableWebcam
            webcamRef={webcamRef}
            webcamError={webcamError}
            videoConstraints={videoConstraints}
            handleUserMedia={handleUserMedia}
            handleUserMediaError={handleUserMediaError}
            retryCamera={retryCamera}
            isActive={isActive}
            isRecording={isAutoRecording}
          />
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmationModal && (
            <ConfirmationModal
              isOpen={showConfirmationModal}
              onConfirm={handleFinalSubmission}
              onCancel={() => setShowConfirmationModal(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
