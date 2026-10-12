import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageCircle, Send, Mic, Volume2, MicOff, Sparkles,
  Bot, User, Trash2, Stethoscope, Camera, Pill, AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge, Spinner } from '@/components/ui';
import { generateChatResponse } from '@/lib/medical';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/types';

const QUICK_PROMPTS = [
  'I have fever and headache',
  'Explain my blood test results',
  'I have a skin rash',
  'What does high blood pressure mean?',
  'I feel tired all the time',
];

export function Chatbot() {
  const { session, language, navigate } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadHistory = useCallback(async () => {
    if (!session) {
      setMessages([{ role: 'assistant', content: getGreeting(language) }]);
      return;
    }
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true })
      .limit(50);
    if (data && data.length > 0) {
      setMessages(data as ChatMessage[]);
      setHistory(data.map((m) => ({ role: m.role, content: m.content })));
    } else {
      setMessages([{ role: 'assistant', content: getGreeting(language) }]);
    }
  }, [session, language]);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const getGreeting = (lang: string) => {
    const greetings: Record<string, string> = {
      en: "Hello! I'm your AI Health Advisor, available 24/7. I can help you understand symptoms, predict possible diseases, explain lab reports, recommend precautions, and find the right doctor. How are you feeling today?",
      hi: "नमस्ते! मैं आपका एआई हेल्थ सलाहकार हूं, 24/7 उपलब्ध। आप आज कैसा महसूस कर रहे हैं?",
      te: "నమస్తే! నేను మీ ఏఐ హెల్త్ సలహాదారు, 24/7 అందుబాటులో. మీరు ఈ రోజు ఎలా ఉన్నారు?",
      ta: "வணக்கம்! நான் உங்கள் ஏஐ சுகாதார ஆலோசகர், 24/7 கிடைக்கிறேன். இன்று எப்படி உணர்கிறீர்கள்?",
    };
    return greetings[lang] || greetings.en;
  };

  const handleSend = async (text?: string) => {
    const message = (text || input).trim();
    if (!message || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: message, language };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const newHistory = [...history, { role: 'user', content: message }];
    setHistory(newHistory);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    const response = generateChatResponse(message, newHistory);

    const aiMsg: ChatMessage = { role: 'assistant', content: response, language };
    setMessages((prev) => [...prev, aiMsg]);
    setHistory([...newHistory, { role: 'assistant', content: response }]);

    if (session) {
      await supabase.from('chat_messages').insert([
        { user_id: session.user.id, role: 'user', content: message, language },
        { user_id: session.user.id, role: 'assistant', content: response, language },
      ]);
    }

    setLoading(false);
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setInput('Voice input is not supported in your browser. Please type your message.');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechLangCode(language);
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.replace(/[•⚠️*#]/g, ''));
    utterance.lang = getSpeechLangCode(language);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const getSpeechLangCode = (lang: string): string => {
    const codes: Record<string, string> = {
      en: 'en-US', hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN', kn: 'kn-IN',
      ml: 'ml-IN', mr: 'mr-IN', bn: 'bn-IN', gu: 'gu-IN', pa: 'pa-IN',
      or: 'or-IN', ur: 'ur-PK',
    };
    return codes[lang] || 'en-US';
  };

  const clearChat = async () => {
    if (session) {
      await supabase.from('chat_messages').delete().eq('user_id', session.user.id);
    }
    setMessages([{ role: 'assistant', content: getGreeting(language) }]);
    setHistory([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Badge variant="success" className="mb-2"><span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" /> Online</Badge>
            <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">AI Health Advisor</h1>
            <p className="text-sm text-muted">Chat with your AI doctor in {language === 'en' ? 'English' : 'your language'}. Voice & text supported.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearChat}><Trash2 className="h-4 w-4" /> Clear</Button>
        </div>

        <Card glass className="flex h-[calc(100vh-220px)] flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line/60 bg-primary-50/50 px-5 py-3 dark:bg-primary-900/20">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500">
              <Bot className="h-6 w-6 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-accent-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-ink">Dr. MediSense AI</p>
              <p className="text-xs text-accent-600">AI-powered • 12 languages • Voice ready</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => navigate('symptoms')} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20" title="Symptom Checker">
                <Stethoscope className="h-4 w-4" />
              </button>
              <button onClick={() => navigate('camera')} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20" title="Camera Scan">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3 animate-fade-in-up', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={cn('group max-w-[80%]', msg.role === 'user' ? 'items-end' : 'items-start')}>
                  <div className={cn(
                    'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                      : 'bg-slate-100 text-ink dark:bg-slate-800'
                  )}>
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className={line.startsWith('•') || line.startsWith('1.') || /^\d+\./.test(line) ? 'ml-2' : ''}>{line || '\u00A0'}</p>
                    ))}
                  </div>
                  {msg.role === 'assistant' && (
                    <button onClick={() => speakResponse(msg.content)} className="mt-1 flex items-center gap-1 text-xs text-muted opacity-0 transition-opacity hover:text-primary-600 group-hover:opacity-100">
                      <Volume2 className={speaking ? 'h-3 w-3 animate-pulse text-primary-600' : 'h-3 w-3'} /> {speaking ? 'Stop' : 'Listen'}
                    </button>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-600">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-400 dark:bg-slate-800">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-line/60 p-3">
              <p className="mb-2 px-2 text-xs font-semibold text-muted">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-all hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-line/60 p-3">
            <div className="flex items-end gap-2">
              <button
                onClick={toggleVoiceInput}
                className={cn(
                  'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all',
                  listening ? 'bg-error-500 text-white animate-pulse' : 'bg-slate-100 text-muted hover:bg-primary-50 hover:text-primary-600 dark:bg-slate-800'
                )}
              >
                {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={listening ? 'Listening...' : 'Describe your symptoms or ask a health question...'}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                style={{ maxHeight: '120px' }}
              />
              <Button onClick={() => handleSend()} disabled={!input.trim() || loading} className="h-11 px-4">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            {listening && <p className="mt-2 px-2 text-xs text-error-600 animate-blink">🎤 Listening... Speak now</p>}
          </div>
        </Card>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-3 dark:border-warning-900/30 dark:bg-warning-900/10">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs text-warning-800 dark:text-warning-200">AI responses are educational only. For serious symptoms, consult a licensed doctor or call emergency services.</p>
        </div>
      </div>
    </div>
  );
}
