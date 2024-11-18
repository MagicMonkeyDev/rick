document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    
    const commands = {
        help: 'Available commands: help, clear, whoami, portal, quote, inventory',
        whoami: 'The Rickest Rick from dimension C-137',
        portal: '*burp* Creating portal to random dimension...',
        inventory: [
            'Portal Gun',
            'Plumbus',
            'Mega Seeds',
            'Flask of ???',
            'Anti-Matter Gun'
        ],
        quote: [
            'Wubba Lubba Dub Dub!',
            'I turned myself into a pickle, Morty!',
            'Nobody exists on purpose. Nobody belongs anywhere. We\'re all going to die. Come watch TV.',
            'Sometimes science is more art than science, Morty.',
            'What, so everyone's supposed to sleep every single night now?'
        ]
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.toLowerCase().trim();
            let response = '';

            // Add command to output
            output.innerHTML += `<div class="prompt">
                <span class="user">rick@c137</span>
                <span class="separator">:</span>
                <span class="location">~/portal-gun</span>
                <span class="dollar">$ ${input.value}</span>
            </div>`;

            // Process command
            if (command === 'clear') {
                output.innerHTML = '';
            } else if (commands[command]) {
                if (Array.isArray(commands[command])) {
                    response = commands[command][Math.floor(Math.random() * commands[command].length)];
                } else {
                    response = commands[command];
                }
                output.innerHTML += `<div>${response}</div>`;
            } else {
                output.innerHTML += `<div>Aw geez, command not found: ${command}</div>`;
            }

            input.value = '';
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});