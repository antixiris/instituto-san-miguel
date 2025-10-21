import React, { useState, useEffect, useRef } from 'react';

/**
 * TokenAnimation - Conceptual text animation component
 * Animates text as tokens appearing sequentially
 * Represents "the word as unit" philosophy
 */

interface TokenAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // ms between tokens
}

export const TokenAnimation: React.FC<TokenAnimationProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 50,
}) => {
  const [visibleTokens, setVisibleTokens] = useState(0);
  const tokens = text.split(' ');

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      tokens.forEach((_, index) => {
        setTimeout(() => {
          setVisibleTokens(index + 1);
        }, index * speed);
      });
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {tokens.map((token, index) => (
        <span
          key={index}
          className={`inline-block ${index < visibleTokens ? 'animate-token-appear' : 'opacity-0'}`}
          style={{ animationDelay: `${index * speed}ms` }}
        >
          {token}
          {index < tokens.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

/**
 * SemanticShift - Animates word transformation
 * Represents "semantics as dynamics" philosophy
 */

interface SemanticShiftProps {
  words: string[];
  className?: string;
  interval?: number; // ms between word changes
  highlightWord?: boolean; // Highlight first word in orange
}

export const SemanticShift: React.FC<SemanticShiftProps> = ({
  words,
  className = '',
  interval = 3000,
  highlightWord = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShifting, setIsShifting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsShifting(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsShifting(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  // Split sentence to highlight key words
  const renderText = () => {
    if (!highlightWord) {
      return words[currentIndex];
    }

    const sentence = words[currentIndex];
    const keyWords = ['investigación', 'conocimiento', 'ciencia', 'tecnología'];

    // Find which keyword appears in this sentence
    let foundKeyword: string | null = null;
    let keywordIndex = -1;

    for (const keyword of keyWords) {
      const index = sentence.toLowerCase().indexOf(keyword);
      if (index !== -1) {
        foundKeyword = keyword;
        keywordIndex = index;
        break;
      }
    }

    // If no keyword found, return sentence as-is
    if (!foundKeyword || keywordIndex === -1) {
      return sentence;
    }

    // Split sentence into parts: before, keyword, after
    const before = sentence.substring(0, keywordIndex);
    const keywordText = sentence.substring(keywordIndex, keywordIndex + foundKeyword.length);
    const after = sentence.substring(keywordIndex + foundKeyword.length);

    return (
      <>
        {before}
        <span className="text-orange-600 dark:text-orange-500">{keywordText}</span>
        {after}
      </>
    );
  };

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        isShifting ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
      } ${className}`}
    >
      {renderText()}
    </span>
  );
};

/**
 * LetterByLetter - Typing effect animation
 * Pure minimalist text appearance
 */

interface LetterByLetterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // ms between letters
}

export const LetterByLetter: React.FC<LetterByLetterProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 30,
}) => {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setVisibleLength((prev) => {
          if (prev >= text.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {text.substring(0, visibleLength)}
      {visibleLength < text.length && (
        <span className="inline-block w-0.5 h-4 bg-current animate-pulse ml-0.5" />
      )}
    </span>
  );
};

/**
 * FadeInWords - Fade in words sequentially
 * Minimal, elegant appearance
 */

interface FadeInWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number; // ms between words
}

export const FadeInWords: React.FC<FadeInWordsProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 100,
}) => {
  const words = text.split(' ');
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ transitionDelay: `${index * stagger}ms` }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

/**
 * Default export for convenience
 */
export default TokenAnimation;
