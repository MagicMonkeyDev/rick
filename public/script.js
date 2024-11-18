document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.querySelector('.intro-container');
    const websiteContent = document.querySelector('.website-content');
    
    // Hide website content initially
    websiteContent.style.visibility = 'hidden';
    websiteContent.style.opacity = '0';
  
    // After intro animation
    setTimeout(() => {
      // Fade out intro
      introContainer.style.opacity = '0';
      
      // Show website content
      websiteContent.style.visibility = 'visible';
      websiteContent.style.opacity = '1';
      
      // Remove intro container after fade
      setTimeout(() => {
        introContainer.remove();
      }, 500);
    }, 3000);
  
    // Terminal functionality
    const terminal = document.querySelector('.terminal');
    const output = document.querySelector('.output');
    const input = document.querySelector('.input');
    const inputField = document.querySelector('#input');
    const prompt = document.querySelector('.prompt');
    const cursorSpan = document.querySelector('.cursor');
  
    let currentDir = '~';
    let commandHistory = [];
    let historyIndex = -1;
  
    const commands = {
      help: {
        description: 'Show available commands',
        execute: () => {
          return Object.entries(commands)
            .map(([cmd, info]) => `${cmd}: ${info.description}`)
            .join('\n');
        },
      },
      clear: {
        description: 'Clear the terminal',
        execute: () => {
          output.innerHTML = '';
          return '';
        },
      },
      echo: {
        description: 'Print text to the terminal',
        execute: (args) => args.join(' '),
      },
      pwd: {
        description: 'Print working directory',
        execute: () => currentDir,
      },
      whoami: {
        description: 'Display system information',
        execute: () => 'Guest User',
      },
      date: {
        description: 'Display current date and time',
        execute: () => new Date().toString(),
      },
      ls: {
        description: 'List directory contents',
        execute: () => 'Documents  Downloads  Pictures  Music  Videos',
      },
      cd: {
        description: 'Change directory',
        execute: (args) => {
          if (args.length === 0 || args[0] === '~') {
            currentDir = '~';
          } else {
            currentDir = args[0];
          }
          prompt.textContent = `guest@terminal:${currentDir}$`;
          return '';
        },
      },
    };
  
    function createOutputNode(content, isError = false) {
      const line = document.createElement('div');
      line.className = 'line';
      line.innerHTML = `<span class="prompt">guest@terminal:${currentDir}$</span> ${content}`;
      if (isError) {
        line.classList.add('error');
      }
      return line;
    }
  
    function executeCommand(cmdString) {
      const [cmd, ...args] = cmdString.trim().split(' ');
      const command = commands[cmd];
  
      if (command) {
        const output = command.execute(args);
        return createOutputNode(cmdString + '\n' + output);
      } else if (cmd) {
        return createOutputNode(cmdString + '\nCommand not found: ' + cmd, true);
      }
      return createOutputNode(cmdString);
    }
  
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = inputField.value;
        if (command.trim()) {
          commandHistory.push(command);
          historyIndex = commandHistory.length;
          output.appendChild(executeCommand(command));
          inputField.value = '';
          terminal.scrollTop = terminal.scrollHeight;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          inputField.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          inputField.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          inputField.value = '';
        }
      }
    });
  
    // Focus input when clicking anywhere in the terminal
    terminal.addEventListener('click', () => {
      inputField.focus();
    });
  
    // Initial focus
    inputField.focus();
  
    // Cursor blink animation
    setInterval(() => {
      cursorSpan.style.opacity = cursorSpan.style.opacity === '0' ? '1' : '0';
    }, 500);
  });