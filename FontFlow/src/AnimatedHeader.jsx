import React, { useEffect, useState } from 'react';
import './css/AnimatedHeader.css';

class ScrambleTheText {
  constructor(setTextContent) {
    this.setTextContent = setTextContent;
    this.chars = "M!E<H*I!KQW__Q+A?";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.setTextContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 80); // Make start later for longer effect
      const end = start + Math.floor(Math.random() * 80); // Increase range for slower scrambling
      this.queue.push({
        from,
        to,
        start,
        end,
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomCharacter();
          this.queue[i].char = char;
        }
        output += `<span class="dummy">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.setTextContent(output);
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomCharacter() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const AnimatedHeader = () => {
  const [displayText, setDisplayText] = useState('FontFlow'); // Default text is FontFlow
  const [animationTriggered, setAnimationTriggered] = useState(false); // Track if animation ran

  // Initialize scrambled text animation
  useEffect(() => {
    if (!animationTriggered) {
      const TheGreetingEffect = new ScrambleTheText(setDisplayText);

      // Start the animation only once on page load
      const animateText = () => {
        TheGreetingEffect.setText('Find your font').then(() => {
          // After scrambling, revert to "FontFlow"
          setTimeout(() => {
            TheGreetingEffect.setText('FontFlow');
          }, 1500); // You can adjust this timeout to control how long "Find your font" stays
        });
      };

      // Trigger the animation and mark it as triggered
      animateText();
      setAnimationTriggered(true);
    }
  }, [animationTriggered]);

  return (
    <div className="content-area">
      <h1
        dangerouslySetInnerHTML={{ __html: displayText }}
        className="animated-header"
      ></h1>
    </div>
  );
};

export default AnimatedHeader;
