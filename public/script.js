document.addEventListener('DOMContentLoaded', () => {
    const loadingSequence = document.getElementById('loading-sequence');
    const terminal = document.querySelector('.terminal');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    let commandHistory = [];
    let historyIndex = -1;

    // Show terminal after loading sequence
    setTimeout(() => {
        loadingSequence.classList.add('hidden');
        terminal.style.display = 'flex';
        // Add fade-in effect for terminal
        terminal.style.opacity = 0;
        terminal.style.animation = 'fadeIn 1s ease forwards';
    }, 4000); // Adjust timing as needed

    // Add click event to terminal container
    terminal.addEventListener('click', (e) => {
        // Focus the input field when clicking anywhere in the terminal
        input.focus();
        
        // Prevent focus loss when selecting text
        if (window.getSelection().toString()) {
            return;
        }
        
        // Move cursor to end of input
        const len = input.value.length;
        input.setSelectionRange(len, len);
    });

    // Prevent focus loss when clicking output text
    document.getElementById('output').addEventListener('mousedown', (e) => {
        // Allow text selection but maintain input focus
        if (!window.getSelection().toString()) {
            e.preventDefault();
            input.focus();
        }
    });

    // Initial welcome message
    output.innerHTML = `
        <div class="welcome-message">
            <pre class="ascii-art">
            ______ _      _    _____                  _             _ 
            | ___ (_)    | |  |_   _|                (_)           | |
            | |_/ /_  ___| | __ | | ___ _ __ _ __ ___ _ _ __   __ _| |
            |    /| |/ __| |/ / | |/ _ \\ '__| '_ \` _ \\ | '_ \\ / _\` | |
            | |\\ \\| | (__|   < _| |  __/ |  | | | | | | | | | | (_| | |
            \\_| \\_|_|\\___|_|\\_\\\\___/\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
            </pre>
            <div class="typing-effect">Welcome to Rick's Terminal v3.137...</div>
            <div class="typing-effect">Type <span class="command-hint">help</span> to see available commands.</div>
        </div>
    `;

    const commands = {
        help: {
            description: 'Show available commands',
            execute: () => {
                return Object.entries(commands).map(([cmd, info]) => 
                    `<div class="command-item">
                        <span class="command-name">${cmd}</span> - 
                        <span class="command-desc">${info.description}</span>
                    </div>`
                ).join('');
            }
        },
        clear: {
            description: 'Clear terminal screen',
            execute: () => {
                output.innerHTML = '';
                return '';
            }
        },
        whoami: {
            description: 'Display identity information',
            execute: () => {
                return `<div class="identity-card">
                    <div class="card-header">IDENTITY VERIFICATION</div>
                    <div class="card-content">
                        <div>Name: Rick Sanchez</div>
                        <div>Status: Wanted Criminal</div>
                        <div>Dimension: C-137</div>
                        <div class="warning">⚠️ HIGH-PRIORITY TARGET</div>
                    </div>
                </div>`;
            }
        },
        portal: {
            description: 'Create a portal to random dimension',
            execute: () => {
                return createPortalEffect();
            }
        },
        inventory: {
            description: 'Show current inventory',
            execute: showInventory
        },
        quote: {
            description: 'Display random Rick quote',
            execute: getRandomQuote
        },
        games: {
            description: 'List available mini-games',
            execute: () => {
                return `Available Games:
                    <br>- type <span class="command-hint">snake</span> to play Snake
                    <br>- type <span class="command-hint">guess</span> for Number Guessing
                    <br>- type <span class="command-hint">hangman</span> for Hangman`;
            }
        },
        snake: {
            description: 'Play Snake game',
            execute: startSnakeGame
        },
        guess: {
            description: 'Play Number Guessing game',
            execute: startNumberGame
        },
        date: {
            description: 'Show current space-time coordinates',
            execute: () => {
                return `Current Space-Time Coordinates:
                    <br>Earth Date: ${new Date().toLocaleString()}
                    <br>Dimension: C-137
                    <br>Timeline: Alpha-Prime`;
            }
        }
    };

    function createPortalEffect() {
        const portalStages = [
            { text: 'Initializing portal gun...', color: '#87d1e5' },
            { text: 'Calculating dimensional coordinates...', color: '#97ce4c' },
            { text: 'Stabilizing quantum field...', color: '#ff71ce' },
            { text: 'PORTAL OPENED! *burp* Let\'s go!', color: '#39ff14' }
        ];

        let output = '';
        portalStages.forEach((stage, index) => {
            setTimeout(() => {
                appendOutput(`<div style="color: ${stage.color}">${stage.text}</div>`);
            }, index * 500);
        });

        return '<div style="color: #87d1e5">Starting portal sequence...</div>';
    }

    function appendOutput(text) {
        output.innerHTML += text;
        output.scrollTop = output.scrollHeight;
    }

    // Command history navigation
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                input.value = '';
            }
        }
    });

    // Command execution
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.toLowerCase().trim();
            
            // Add to command history
            if (command) {
                commandHistory.push(command);
                historyIndex = -1;
            }

            // Display command
            output.innerHTML += `
                <div class="command-line">
                    <span class="prompt">
                        <span class="user">rick@c137</span>
                        <span class="separator">:</span>
                        <span class="location">~/portal-gun</span>
                        <span class="dollar">$</span>
                    </span>
                    <span class="typed-command">${input.value}</span>
                </div>
            `;

            // Execute command
            if (commands[command]) {
                const result = commands[command].execute();
                if (result) {
                    output.innerHTML += `<div class="command-output">${result}</div>`;
                }
            } else if (command) {
                output.innerHTML += `
                    <div class="error-message">
                        Aw geez, command not found: ${command}
                        <br>Type <span class="command-hint">help</span> for available commands
                    </div>
                `;
            }

            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });
});