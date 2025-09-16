import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html);
};