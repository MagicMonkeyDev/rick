document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    
    const commands = {
        help: `Available commands:
            <br>help - Show this message
            <br>clear - Clear terminal
            <br>whoami - Identity check
            <br>portal - Create a portal
            <br>quote - Random quote
            <br>inventory - Show inventory
            <br>dimension - Current dimension info
            <br>schwifty - Get schwifty!`,
        whoami: '*burp* You\'re Rick C-137, the Rickest Rick of all Ricks, you drunk genius!',
        portal: createPortalEffect,
        inventory: showInventory,
        quote: getRandomQuote,
        dimension: 'Current Dimension: C-137 | Status: Cronenberged | Council of Ricks Threat Level: HIGH',
        schwifty: 'SHOW ME WHAT YOU GOT! 🗿 *Music starts playing* Time to get schwifty!',
    };

    // Add Matrix-like rain effect
    createMatrixRain();

    function createPortalEffect() {
        const portalText = '*burp* Creating portal to random dimension...';
        setTimeout(() => {
            output.innerHTML += `<div style="color: #87d1e5">Portal gun energy at 100%...</div>`;
        }, 500);
        setTimeout(() => {
            output.innerHTML += `<div style="color: #97ce4c">PORTAL OPENED! *burp* Let's go!</div>`;
        }, 1500);
        return portalText;
    }

    function showInventory() {
        return `
            🔫 Portal Gun (charged)
            🧪 Mega Seeds (2)
            🍺 Flask (infinite)
            ⚡ Microverse Battery
            🔬 Shrink Ray
            🧠 Mind Blowers Helmet
            💊 Random Pills
            ⚗️ Concentrated Dark Matter
        `;
    }

    function getRandomQuote() {
        const quotes = [
            "Wubba Lubba Dub Dub!",
            "I turned myself into a pickle, Morty! I'm Pickle Riiiick!",
            "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
            "Sometimes science is more art than science, Morty.",
            "What, so everyone's supposed to sleep every single night now?",
            "To live is to risk it all.",
            "Life is effort and I'll stop when I die!",
            "Break the cycle, Morty. Rise above. Focus on science.",
            "*burp* I don't do adventures with boring people, Morty!",
            "Grassss... tastes bad!"
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-bg');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#97ce4c';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

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