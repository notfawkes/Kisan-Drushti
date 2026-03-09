import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}
export function Chatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Set initial message only after translation is loaded
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: t('chatbot.hello'),
        sender: 'bot'
      }]);
    }
  }, [t, messages.length]);

  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I've analyzed the recent soil moisture data. Irrigation is optimal.",
        'Pest detection agent reports no anomalies in sector 4.',
        'Weather forecast indicates rain tomorrow. I suggest delaying the fertilizer application.',
        'Market prices for wheat are trending up. Good time to consider selling.'];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: randomResponse,
          sender: 'bot'
        }]
      );
    }, 1000);
  };
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            transition={{
              duration: 0.2
            }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-emerald-950/30">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {t('chatbot.title')}
                  </h3>
                  <p className="text-xs text-emerald-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-zinc-400 hover:text-zinc-100">

                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">

              {messages.map((msg) =>
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-zinc-800' : 'bg-emerald-900/50'}`}>

                      {msg.sender === 'user' ?
                        <User className="w-3 h-3 text-zinc-300" /> :

                        <Bot className="w-3 h-3 text-emerald-400" />
                      }
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700/50'}`}>

                      {msg.text}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950">
              <form
                onSubmit={handleSend}
                className="flex items-center space-x-2">

                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-600" />

                <Button
                  type="submit"
                  size="icon"
                  className="bg-emerald-600 hover:bg-emerald-700 shrink-0">

                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-colors border border-emerald-500/50">

        {isOpen ?
          <X className="w-6 h-6" /> :

          <MessageSquare className="w-6 h-6" />
        }
      </motion.button>
    </div>);

}