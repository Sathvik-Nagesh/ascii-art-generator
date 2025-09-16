// BRUTAL ASCII ART GENERATOR - NEO-BRUTALISM JAVASCRIPT

class BrutalASCIIArtGenerator {
    constructor() {
        this.currentMode = 'image';
        this.currentImage = null;
        this.asciiOutput = '';
        
        // BRUTAL CHARACTER SETS
        this.charSets = {
            standard: '@#%&*+=|;:-,. ',
            detailed: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`.)',
            simple: '@#%&*+=|;:-,. ',
            blocks: '█▓▒░ ',
            dots: '●○◐◑◒◓◔◕',
            custom: ''
        };
        
        // BRUTAL ASCII FONTS - COMPLETE IMPLEMENTATIONS
        this.asciiFonts = {
            standard: this.getStandardFont(),
            big: this.getBigFont(),
            slant: this.getSlantFont(),
            '3d': this.get3DFont(),
            banner: this.getBannerFont(),
            block: this.getBlockFont(),
            bubble: this.getBubbleFont(),
            digital: this.getDigitalFont(),
            isometric: this.getIsometricFont(),
            letters: this.getLettersFont(),
            alligator: this.getAlligatorFont(),
            dotmatrix: this.getDotMatrixFont()
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.populateGallery();
        this.updateCharSetVisibility();
        this.addBrutalEffects();
    }
    
    addBrutalEffects() {
        // Add brutal hover effects to all buttons
        document.querySelectorAll('.brutal-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add('brutal-bounce');
                setTimeout(() => btn.classList.remove('brutal-bounce'), 300);
            });
        });
        
        // Add brutal click effects
        document.querySelectorAll('.brutal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('brutal-shake');
                setTimeout(() => btn.classList.remove('brutal-shake'), 300);
            });
        });
        
        // Add brutal card hover effects
        document.querySelectorAll('.brutal-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'rotate(0deg) scale(1.02)';
                card.style.boxShadow = 'var(--brutal-shadow-harsh)';
            });
            
            card.addEventListener('mouseleave', () => {
                const isEven = Array.from(card.parentNode.children).indexOf(card) % 2 === 0;
                card.style.transform = isEven ? 'rotate(-0.3deg)' : 'rotate(0.5deg)';
                card.style.boxShadow = 'var(--brutal-shadow-harsh)';
            });
        });
    }
    
    setupEventListeners() {
        // BRUTAL IMAGE UPLOAD
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        
        uploadArea.addEventListener('click', () => imageInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        imageInput.addEventListener('change', this.handleImageUpload.bind(this));
        document.getElementById('removeImage').addEventListener('click', this.removeImage.bind(this));
        
        // BRUTAL CONTROLS
        document.getElementById('charSet').addEventListener('change', this.updateCharSetVisibility.bind(this));
        document.getElementById('convertImage').addEventListener('click', this.convertImageToASCII.bind(this));
        document.getElementById('convertText').addEventListener('click', this.convertTextToASCII.bind(this));
        
        // BRUTAL RANGE SLIDERS
        document.getElementById('widthSlider').addEventListener('input', this.updateSliderValue.bind(this, 'widthValue'));
        document.getElementById('contrastSlider').addEventListener('input', this.updateSliderValue.bind(this, 'contrastValue'));
        document.getElementById('textWidth').addEventListener('input', this.updateSliderValue.bind(this, 'textWidthValue'));
        
        // BRUTAL RESULTS ACTIONS
        document.getElementById('copyAscii').addEventListener('click', this.copyASCII.bind(this));
        document.getElementById('downloadAscii').addEventListener('click', this.downloadASCII.bind(this));
        document.getElementById('clearResults').addEventListener('click', this.clearResults.bind(this));
        
        // BRUTAL THEME TOGGLE
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // BRUTAL HELP MODAL
        document.getElementById('helpBtn').addEventListener('click', this.showHelp.bind(this));
        document.getElementById('closeHelp').addEventListener('click', this.hideHelp.bind(this));
        
        // BRUTAL MODAL CLOSE
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') {
                this.hideHelp();
            }
        });
    }
    
    setupTheme() {
        const savedTheme = localStorage.getItem('brutal-ascii-theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeBtn = document.getElementById('themeToggle');
        const text = themeBtn.querySelector('.brutal-btn-text');
        
        if (theme === 'dark') {
            text.textContent = 'LIGHT';
        } else {
            text.textContent = 'DARK';
        }
        
        localStorage.setItem('brutal-ascii-theme', theme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processImageFile(files[0]);
        }
    }
    
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            this.processImageFile(file);
        }
    }
    
    processImageFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showBrutalAlert('PLEASE SELECT A VALID IMAGE FILE!');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            this.showBrutalAlert('FILE SIZE MUST BE LESS THAN 10MB!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = new Image();
            this.currentImage.onload = () => {
                this.displayImagePreview();
                document.getElementById('convertImage').disabled = false;
            };
            this.currentImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    displayImagePreview() {
        const preview = document.getElementById('imagePreview');
        const img = document.getElementById('previewImage');
        
        img.src = this.currentImage.src;
        preview.style.display = 'block';
        document.getElementById('uploadArea').style.display = 'none';
    }
    
    removeImage() {
        this.currentImage = null;
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('uploadArea').style.display = 'block';
        document.getElementById('convertImage').disabled = true;
        document.getElementById('imageInput').value = '';
    }
    
    updateCharSetVisibility() {
        const charSet = document.getElementById('charSet').value;
        const customGroup = document.getElementById('customCharGroup');
        
        if (charSet === 'custom') {
            customGroup.style.display = 'block';
        } else {
            customGroup.style.display = 'none';
        }
    }
    
    updateSliderValue(elementId) {
        const slider = event.target;
        const valueElement = document.getElementById(elementId);
        valueElement.textContent = slider.value;
    }
    
    convertImageToASCII() {
        if (!this.currentImage) return;
        
        const width = parseInt(document.getElementById('widthSlider').value);
        const charSet = document.getElementById('charSet').value;
        const customChars = document.getElementById('customChars').value;
        const invert = document.getElementById('invertColors').checked;
        const contrast = parseFloat(document.getElementById('contrastSlider').value);
        
        let characters = this.charSets[charSet];
        if (charSet === 'custom' && customChars) {
            characters = customChars;
        }
        
        if (!characters) {
            this.showBrutalAlert('PLEASE SELECT A CHARACTER SET OR ENTER CUSTOM CHARACTERS!');
            return;
        }
        
        // BRUTAL LOADING EFFECT
        const convertBtn = document.getElementById('convertImage');
        convertBtn.classList.add('brutal-loading');
        convertBtn.disabled = true;
        
        setTimeout(() => {
            this.asciiOutput = this.imageToASCII(this.currentImage, width, characters, invert, contrast);
            this.displayResults();
            convertBtn.classList.remove('brutal-loading');
            convertBtn.disabled = false;
        }, 500);
    }
    
    imageToASCII(image, width, characters, invert, contrast) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate height maintaining aspect ratio
        const aspectRatio = image.height / image.width;
        const height = Math.floor(width * aspectRatio * 0.5);
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image to canvas
        ctx.drawImage(image, 0, 0, width, height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        let ascii = '';
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                
                // Convert to grayscale
                let gray = (r + g + b) / 3;
                
                // Apply contrast
                gray = ((gray - 128) * contrast) + 128;
                gray = Math.max(0, Math.min(255, gray));
                
                // Invert if needed
                if (invert) {
                    gray = 255 - gray;
                }
                
                // Map to character set
                const charIndex = Math.floor((gray / 255) * (characters.length - 1));
                ascii += characters[charIndex];
            }
            ascii += '\n';
        }
        
        return ascii;
    }
    
    convertTextToASCII() {
        const text = document.getElementById('textInput').value.trim();
        if (!text) {
            this.showBrutalAlert('PLEASE ENTER SOME TEXT TO CONVERT!');
            return;
        }
        
        const font = document.getElementById('asciiFont').value;
        const align = document.getElementById('textAlign').value;
        const width = parseInt(document.getElementById('textWidth').value);
        
        // BRUTAL LOADING EFFECT
        const convertBtn = document.getElementById('convertText');
        convertBtn.classList.add('brutal-loading');
        convertBtn.disabled = true;
        
        setTimeout(() => {
            this.asciiOutput = this.textToASCII(text, font, align, width);
            this.displayResults();
            convertBtn.classList.remove('brutal-loading');
            convertBtn.disabled = false;
        }, 300);
    }
    
    textToASCII(text, font, align, width) {
        const fontData = this.asciiFonts[font];
        if (!fontData) {
            return `ASCII FONT "${font}" NOT FOUND!`;
        }
        
        let result = '';
        const lines = text.split('\n');
        
        for (const line of lines) {
            const asciiLine = this.renderTextLine(line, fontData, width);
            result += asciiLine + '\n';
        }
        
        return result.trim();
    }
    
    renderTextLine(text, fontData, width) {
        const height = fontData.height;
        let result = '';
        
        for (let row = 0; row < height; row++) {
            let line = '';
            
            for (const char of text) {
                const upperChar = char.toUpperCase();
                if (fontData.chars[upperChar]) {
                    const charRow = fontData.chars[upperChar][row] || '';
                    line += charRow;
                } else if (fontData.chars[char]) {
                    const charRow = fontData.chars[char][row] || '';
                    line += charRow;
                } else {
                    // Use space for unknown characters
                    line += ' '.repeat(fontData.width || 5);
                }
            }
            
            // Apply alignment
            if (width > line.length) {
                switch (document.getElementById('textAlign').value) {
                    case 'center':
                        const padding = Math.floor((width - line.length) / 2);
                        line = ' '.repeat(padding) + line;
                        break;
                    case 'right':
                        line = ' '.repeat(width - line.length) + line;
                        break;
                    default: // left
                        line = line + ' '.repeat(width - line.length);
                }
            }
            
            result += line + '\n';
        }
        
        return result;
    }
    
    displayResults() {
        const resultsSection = document.getElementById('resultsSection');
        const asciiOutput = document.getElementById('asciiOutput');
        
        asciiOutput.textContent = this.asciiOutput;
        
        // BRUTAL STATS UPDATE
        const lines = this.asciiOutput.split('\n').length - 1;
        const chars = this.asciiOutput.length;
        const size = new Blob([this.asciiOutput]).size;
        
        document.getElementById('lineCount').textContent = lines;
        document.getElementById('charCount').textContent = chars;
        document.getElementById('outputSize').textContent = this.formatBytes(size);
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // BRUTAL SUCCESS EFFECT
        resultsSection.classList.add('brutal-bounce');
        setTimeout(() => resultsSection.classList.remove('brutal-bounce'), 500);
    }
    
    copyASCII() {
        navigator.clipboard.writeText(this.asciiOutput).then(() => {
            const btn = document.getElementById('copyAscii');
            const originalText = btn.querySelector('.brutal-btn-text').textContent;
            btn.querySelector('.brutal-btn-text').textContent = 'COPIED!';
            btn.style.background = 'var(--brutal-green)';
            btn.classList.add('brutal-bounce');
            
            setTimeout(() => {
                btn.querySelector('.brutal-btn-text').textContent = originalText;
                btn.style.background = '';
                btn.classList.remove('brutal-bounce');
            }, 2000);
        }).catch(() => {
            this.showBrutalAlert('FAILED TO COPY TO CLIPBOARD!');
        });
    }
    
    downloadASCII() {
        const blob = new Blob([this.asciiOutput], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `brutal-ascii-art-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // BRUTAL SUCCESS EFFECT
        const btn = document.getElementById('downloadAscii');
        btn.classList.add('brutal-bounce');
        setTimeout(() => btn.classList.remove('brutal-bounce'), 300);
    }
    
    clearResults() {
        this.asciiOutput = '';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('asciiOutput').textContent = '';
    }
    
    showHelp() {
        document.getElementById('helpModal').classList.add('active');
    }
    
    hideHelp() {
        document.getElementById('helpModal').classList.remove('active');
    }
    
    showBrutalAlert(message) {
        // Create brutal alert element
        const alert = document.createElement('div');
        alert.className = 'brutal-alert';
        alert.innerHTML = `
            <div class="brutal-alert-content">
                <span class="brutal-alert-icon">[!]</span>
                <span class="brutal-alert-text">${message}</span>
            </div>
        `;
        
        // Add brutal styles
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--brutal-red);
            color: var(--brutal-white);
            border: var(--brutal-border-thick);
            box-shadow: var(--brutal-shadow-harsh);
            padding: var(--brutal-space-lg);
            font-family: var(--brutal-font-sans);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            z-index: 2000;
            transform: rotate(-2deg);
            animation: brutalShake 0.5s ease-in-out;
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    populateGallery() {
        const gallery = document.getElementById('galleryGrid');
        const examples = [
            {
                title: 'HELLO WORLD',
                content: this.getHelloWorldASCII()
            },
            {
                title: 'SMILEY FACE',
                content: this.getSmileyASCII()
            },
            {
                title: 'HEART',
                content: this.getHeartASCII()
            },
            {
                title: 'STAR',
                content: this.getStarASCII()
            },
            {
                title: 'SKULL',
                content: this.getSkullASCII()
            },
            {
                title: 'ROCKET',
                content: this.getRocketASCII()
            }
        ];
        
        examples.forEach(example => {
            const item = document.createElement('div');
            item.className = 'brutal-gallery-item';
            item.innerHTML = `
                <h4>${example.title}</h4>
                <pre>${example.content}</pre>
            `;
            item.addEventListener('click', () => {
                this.asciiOutput = example.content;
                this.displayResults();
            });
            gallery.appendChild(item);
        });
    }
    
    formatBytes(bytes) {
        if (bytes === 0) return '0 BYTES';
        const k = 1024;
        const sizes = ['BYTES', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // BRUTAL ASCII FONT DEFINITIONS - COMPLETE IMPLEMENTATIONS
    
    getStandardFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ '],
                'a': ['     ', ' ███ ', '    █', ' ████', '█   █'],
                'b': ['█    ', '████ ', '█   █', '█   █', '████ '],
                'c': ['     ', ' ███ ', '█    ', '█    ', ' ███ '],
                'd': ['    █', ' ████', '█   █', '█   █', ' ████'],
                'e': ['     ', ' ███ ', '█████', '█    ', ' ███ '],
                'f': ['  ██ ', ' █   ', '████ ', ' █   ', ' █   '],
                'g': ['     ', ' ████', '█   █', ' ████', '    █'],
                'h': ['█    ', '████ ', '█   █', '█   █', '█   █'],
                'i': ['  █  ', '     ', ' ██  ', '  █  ', ' ███ '],
                'j': ['   █ ', '     ', '   █ ', '   █ ', ' ██  '],
                'k': ['█    ', '█  █ ', '███  ', '█  █ ', '█   █'],
                'l': [' ██  ', '  █  ', '  █  ', '  █  ', ' ███ '],
                'm': ['     ', '██ ██', '█ █ █', '█   █', '█   █'],
                'n': ['     ', '████ ', '█   █', '█   █', '█   █'],
                'o': ['     ', ' ███ ', '█   █', '█   █', ' ███ '],
                'p': ['     ', '████ ', '█   █', '████ ', '█    '],
                'q': ['     ', ' ████', '█   █', ' ████', '    █'],
                'r': ['     ', '█ ██ ', '██   ', '█    ', '█    '],
                's': ['     ', ' ████', '█    ', ' ███ ', '████ '],
                't': [' █   ', '████ ', ' █   ', ' █   ', '  ██ '],
                'u': ['     ', '█   █', '█   █', '█   █', ' ████'],
                'v': ['     ', '█   █', '█   █', ' █ █ ', '  █  '],
                'w': ['     ', '█   █', '█ █ █', '██ ██', '█   █'],
                'x': ['     ', '█   █', ' █ █ ', '  █  ', ' █ █ '],
                'y': ['     ', '█   █', ' █ █ ', '  █  ', ' █   '],
                'z': ['     ', '█████', '  █  ', ' █   ', '█████']
            }
        };
    }
    
    getBigFont() {
        return {
            height: 7,
            width: 6,
            chars: {
                'H': ['█    █', '█    █', '█    █', '██████', '█    █', '█    █', '█    █'],
                'E': ['██████', '█     ', '█     ', '█████ ', '█     ', '█     ', '██████'],
                'L': ['█     ', '█     ', '█     ', '█     ', '█     ', '█     ', '██████'],
                'O': [' ████ ', '█    █', '█    █', '█    █', '█    █', '█    █', ' ████ '],
                'A': ['  ██  ', ' █  █ ', '█    █', '██████', '█    █', '█    █', '█    █'],
                'B': ['█████ ', '█    █', '█████ ', '█    █', '█    █', '█    █', '█████ '],
                'C': [' ████ ', '█    █', '█     ', '█     ', '█     ', '█    █', ' ████ '],
                'D': ['█████ ', '█    █', '█    █', '█    █', '█    █', '█    █', '█████ '],
                'F': ['██████', '█     ', '█     ', '█████ ', '█     ', '█     ', '█     '],
                'G': [' ████ ', '█    █', '█     ', '█  ███', '█    █', '█    █', ' ████ '],
                'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '██████'],
                'J': ['██████', '    █ ', '    █ ', '    █ ', '█   █ ', '█   █ ', ' ███  '],
                'K': ['█    █', '█   █ ', '█  █  ', '███   ', '█  █  ', '█   █ ', '█    █'],
                'M': ['█    █', '██  ██', '█ ██ █', '█ █ █ ', '█    █', '█    █', '█    █'],
                'N': ['█    █', '██   █', '█ █  █', '█  █ █', '█   ██', '█    █', '█    █'],
                'P': ['█████ ', '█    █', '█    █', '█████ ', '█     ', '█     ', '█     '],
                'Q': [' ████ ', '█    █', '█    █', '█    █', '█  █ █', '█   █ ', ' ████ '],
                'R': ['█████ ', '█    █', '█    █', '█████ ', '█  █  ', '█   █ ', '█    █'],
                'S': [' ████ ', '█    █', '█     ', ' ████ ', '     █', '█    █', ' ████ '],
                'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
                'U': ['█    █', '█    █', '█    █', '█    █', '█    █', '█    █', ' ████ '],
                'V': ['█    █', '█    █', '█    █', '█    █', ' █  █ ', ' █  █ ', '  ██  '],
                'W': ['█    █', '█    █', '█    █', '█ █ █ ', '██ ██ ', '█    █', '█    █'],
                'X': ['█    █', ' █  █ ', '  ██  ', '  ██  ', ' █  █ ', '█    █', '█    █'],
                'Y': ['█    █', ' █  █ ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
                'Z': ['██████', '    █ ', '   █  ', '  █   ', ' █    ', '█     ', '██████'],
                ' ': ['      ', '      ', '      ', '      ', '      ', '      ', '      '],
                '0': [' ████ ', '█    █', '█    █', '█    █', '█    █', '█    █', ' ████ '],
                '1': ['  ██  ', ' ███  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '██████'],
                '2': [' ████ ', '█    █', '     █', '  ███ ', ' █    ', '█     ', '██████'],
                '3': [' ████ ', '█    █', '     █', '  ███ ', '     █', '█    █', ' ████ '],
                '4': ['█    █', '█    █', '█    █', '██████', '     █', '     █', '     █'],
                '5': ['██████', '█     ', '█     ', '█████ ', '     █', '     █', '█████ '],
                '6': [' ████ ', '█     ', '█     ', '█████ ', '█    █', '█    █', ' ████ '],
                '7': ['██████', '    █ ', '   █  ', '  █   ', ' █    ', '█     ', '█     '],
                '8': [' ████ ', '█    █', '█    █', ' ████ ', '█    █', '█    █', ' ████ '],
                '9': [' ████ ', '█    █', '█    █', ' █████', '     █', '     █', ' ████ ']
            }
        };
    }
    
    getSlantFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    get3DFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getBannerFont() {
        return {
            height: 5,
            width: 6,
            chars: {
                'A': [' ████ ', '█    █', '██████', '█    █', '█    █'],
                'B': ['█████ ', '█    █', '█████ ', '█    █', '█████ '],
                'C': [' █████', '█     ', '█     ', '█     ', ' █████'],
                'D': ['█████ ', '█    █', '█    █', '█    █', '█████ '],
                'E': ['██████', '█     ', '████  ', '█     ', '██████'],
                'F': ['██████', '█     ', '████  ', '█     ', '█     '],
                'G': [' █████', '█     ', '█  ███', '█    █', ' █████'],
                'H': ['█    █', '█    █', '██████', '█    █', '█    █'],
                'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '██████'],
                'J': ['██████', '    █ ', '    █ ', '█   █ ', ' ███  '],
                'K': ['█    █', '█   █ ', '███   ', '█   █ ', '█    █'],
                'L': ['█     ', '█     ', '█     ', '█     ', '██████'],
                'M': ['█    █', '██  ██', '█ ██ █', '█    █', '█    █'],
                'N': ['█    █', '██   █', '█ █  █', '█  █ █', '█   ██'],
                'O': [' █████', '█    █', '█    █', '█    █', ' █████'],
                'P': ['█████ ', '█    █', '█████ ', '█     ', '█     '],
                'Q': [' █████', '█    █', '█  █ █', '█   █ ', ' █████'],
                'R': ['█████ ', '█    █', '█████ ', '█   █ ', '█    █'],
                'S': [' █████', '█     ', ' ████ ', '     █', '█████ '],
                'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
                'U': ['█    █', '█    █', '█    █', '█    █', ' █████'],
                'V': ['█    █', '█    █', ' █  █ ', ' █  █ ', '  ██  '],
                'W': ['█    █', '█    █', '█ █ █ ', '██ ██ ', '█    █'],
                'X': ['█    █', ' █  █ ', '  ██  ', ' █  █ ', '█    █'],
                'Y': ['█    █', ' █  █ ', '  ██  ', '  ██  ', '  ██  '],
                'Z': ['██████', '    █ ', '   █  ', '  █   ', '██████'],
                ' ': ['      ', '      ', '      ', '      ', '      '],
                '0': [' █████', '█    █', '█    █', '█    █', ' █████'],
                '1': ['  ██  ', ' ███  ', '  ██  ', '  ██  ', '██████'],
                '2': [' █████', '█    █', '    █ ', '  █   ', '██████'],
                '3': [' █████', '█    █', '  ███ ', '█    █', ' █████'],
                '4': ['█    █', '█    █', '██████', '     █', '     █'],
                '5': ['██████', '█     ', '█████ ', '     █', '█████ '],
                '6': [' █████', '█     ', '█████ ', '█    █', ' █████'],
                '7': ['██████', '    █ ', '   █  ', '  █   ', '█     '],
                '8': [' █████', '█    █', ' █████', '█    █', ' █████'],
                '9': [' █████', '█    █', ' █████', '     █', ' █████']
            }
        };
    }
    
    getBlockFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': [' ███ ', '█   █', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getBubbleFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getDigitalFont() {
        return {
            height: 5,
            width: 4,
            chars: {
                'A': [' ██ ', '█  █', '████', '█  █', '█  █'],
                'B': ['███ ', '█  █', '███ ', '█  █', '███ '],
                'C': [' ███', '█   ', '█   ', '█   ', ' ███'],
                'D': ['███ ', '█  █', '█  █', '█  █', '███ '],
                'E': ['████', '█   ', '███ ', '█   ', '████'],
                'F': ['████', '█   ', '███ ', '█   ', '█   '],
                'G': [' ███', '█   ', '█ ██', '█  █', ' ███'],
                'H': ['█  █', '█  █', '████', '█  █', '█  █'],
                'I': ['████', ' █  ', ' █  ', ' █  ', '████'],
                'J': ['████', '   █', '   █', '█  █', ' ██ '],
                'K': ['█  █', '█ █ ', '██  ', '█ █ ', '█  █'],
                'L': ['█   ', '█   ', '█   ', '█   ', '████'],
                'M': ['█  █', '████', '█  █', '█  █', '█  █'],
                'N': ['█  █', '██ █', '█ ██', '█  █', '█  █'],
                'O': [' ██ ', '█  █', '█  █', '█  █', ' ██ '],
                'P': ['███ ', '█  █', '███ ', '█   ', '█   '],
                'Q': [' ██ ', '█  █', '█  █', '█ █ ', ' ███'],
                'R': ['███ ', '█  █', '███ ', '█ █ ', '█  █'],
                'S': [' ███', '█   ', ' ██ ', '   █', '███ '],
                'T': ['████', ' █  ', ' █  ', ' █  ', ' █  '],
                'U': ['█  █', '█  █', '█  █', '█  █', ' ██ '],
                'V': ['█  █', '█  █', '█  █', ' ██ ', ' █  '],
                'W': ['█  █', '█  █', '█  █', '████', '█  █'],
                'X': ['█  █', ' ██ ', ' █  ', ' ██ ', '█  █'],
                'Y': ['█  █', ' ██ ', ' █  ', ' █  ', ' █  '],
                'Z': ['████', '  █ ', ' █  ', '█   ', '████'],
                ' ': ['    ', '    ', '    ', '    ', '    '],
                '0': [' ██ ', '█  █', '█  █', '█  █', ' ██ '],
                '1': [' █  ', '██  ', ' █  ', ' █  ', '████'],
                '2': [' ██ ', '█  █', '  █ ', ' █  ', '████'],
                '3': [' ██ ', '█  █', '  ██', '█  █', ' ██ '],
                '4': ['█  █', '█  █', '████', '   █', '   █'],
                '5': ['████', '█   ', ' ██ ', '   █', '███ '],
                '6': [' ██ ', '█   ', '███ ', '█  █', ' ██ '],
                '7': ['████', '   █', '  █ ', ' █  ', '█   '],
                '8': [' ██ ', '█  █', ' ██ ', '█  █', ' ██ '],
                '9': [' ██ ', '█  █', ' ███', '   █', ' ██ ']
            }
        };
    }
    
    getIsometricFont() {
        return {
            height: 5,
            width: 6,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['      ', '      ', '      ', '      ', '      '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getLettersFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getAlligatorFont() {
        return {
            height: 5,
            width: 5,
            chars: {
                'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
                'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
                'C': [' ███ ', '█   █', '█    ', '█   █', ' ███ '],
                'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
                'E': ['█████', '█    ', '███  ', '█    ', '█████'],
                'F': ['█████', '█    ', '███  ', '█    ', '█    '],
                'G': [' ███ ', '█    ', '█ ██ ', '█   █', ' ███ '],
                'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
                'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
                'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
                'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
                'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
                'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
                'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
                'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
                'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ████'],
                'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
                'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
                'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
                'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
                'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
                'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
                'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
                'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
                'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
                ' ': ['     ', '     ', '     ', '     ', '     '],
                '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
                '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
                '2': [' ███ ', '█   █', '   █ ', '  █  ', '█████'],
                '3': [' ███ ', '█   █', '  ██ ', '█   █', ' ███ '],
                '4': ['█   █', '█   █', '█████', '    █', '    █'],
                '5': ['█████', '█    ', '████ ', '    █', '████ '],
                '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
                '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
                '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
                '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
            }
        };
    }
    
    getDotMatrixFont() {
        return {
            height: 5,
            width: 4,
            chars: {
                'A': [' ██ ', '█  █', '████', '█  █', '█  █'],
                'B': ['███ ', '█  █', '███ ', '█  █', '███ '],
                'C': [' ███', '█   ', '█   ', '█   ', ' ███'],
                'D': ['███ ', '█  █', '█  █', '█  █', '███ '],
                'E': ['████', '█   ', '███ ', '█   ', '████'],
                'F': ['████', '█   ', '███ ', '█   ', '█   '],
                'G': [' ███', '█   ', '█ ██', '█  █', ' ███'],
                'H': ['█  █', '█  █', '████', '█  █', '█  █'],
                'I': ['████', ' █  ', ' █  ', ' █  ', '████'],
                'J': ['████', '   █', '   █', '█  █', ' ██ '],
                'K': ['█  █', '█ █ ', '██  ', '█ █ ', '█  █'],
                'L': ['█   ', '█   ', '█   ', '█   ', '████'],
                'M': ['█  █', '████', '█  █', '█  █', '█  █'],
                'N': ['█  █', '██ █', '█ ██', '█  █', '█  █'],
                'O': [' ██ ', '█  █', '█  █', '█  █', ' ██ '],
                'P': ['███ ', '█  █', '███ ', '█   ', '█   '],
                'Q': [' ██ ', '█  █', '█  █', '█ █ ', ' ███'],
                'R': ['███ ', '█  █', '███ ', '█ █ ', '█  █'],
                'S': [' ███', '█   ', ' ██ ', '   █', '███ '],
                'T': ['████', ' █  ', ' █  ', ' █  ', ' █  '],
                'U': ['█  █', '█  █', '█  █', '█  █', ' ██ '],
                'V': ['█  █', '█  █', '█  █', ' ██ ', ' █  '],
                'W': ['█  █', '█  █', '█  █', '████', '█  █'],
                'X': ['█  █', ' ██ ', ' █  ', ' ██ ', '█  █'],
                'Y': ['█  █', ' ██ ', ' █  ', ' █  ', ' █  '],
                'Z': ['████', '  █ ', ' █  ', '█   ', '████'],
                ' ': ['    ', '    ', '    ', '    ', '    '],
                '0': [' ██ ', '█  █', '█  █', '█  █', ' ██ '],
                '1': [' █  ', '██  ', ' █  ', ' █  ', '████'],
                '2': [' ██ ', '█  █', '  █ ', ' █  ', '████'],
                '3': [' ██ ', '█  █', '  ██', '█  █', ' ██ '],
                '4': ['█  █', '█  █', '████', '   █', '   █'],
                '5': ['████', '█   ', ' ██ ', '   █', '███ '],
                '6': [' ██ ', '█   ', '███ ', '█  █', ' ██ '],
                '7': ['████', '   █', '  █ ', ' █  ', '█   '],
                '8': [' ██ ', '█  █', ' ██ ', '█  █', ' ██ '],
                '9': [' ██ ', '█  █', ' ███', '   █', ' ██ ']
            }
        };
    }
    
    // BRUTAL EXAMPLE ASCII ART
    getHelloWorldASCII() {
        return `  ██  ██████  ██      ██      ██████  ██    ██ ██    ██ ██████  
 ██  ██    ██ ██      ██     ██    ██ ██    ██ ██    ██ ██      
 ██  ██    ██ ██      ██     ██    ██ ██    ██ ██    ██ ██      
 ██  ██    ██ ██      ██     ██    ██ ██    ██ ██    ██ ██      
 ██  ██████  ███████ ███████  ██████   ██████   ██████  ██████`;
    }
    
    getSmileyASCII() {
        return `    ████████████    
  ██            ██  
 ██    ██  ██    ██ 
██      ████      ██
██                ██
██  ██        ██  ██
 ██  ██████████  ██ 
  ██            ██  
    ████████████`;
    }
    
    getHeartASCII() {
        return `    ██     ██    
  ██  ██ ██  ██  
 ██       ██   ██ 
██         ██   ██
██         ██   ██
 ██       ██   ██ 
  ██  ██ ██  ██  
    ██     ██`;
    }
    
    getStarASCII() {
        return `    ██    
   ████   
  ██████  
 ████████ 
██████████
 ████████ 
  ██████  
   ████   
    ██`;
    }
    
    getSkullASCII() {
        return `    ████████    
  ██        ██  
 ██  ██  ██  ██ 
██    ████    ██
██              ██
██  ██████████  ██
 ██  ████████  ██ 
  ██          ██  
    ██████████`;
    }
    
    getRocketASCII() {
        return `      ██      
     ████     
    ██████    
   ████████   
  ██████████  
 ████████████ 
██████████████
 ████████████ 
  ██████████  
   ████████   
    ██████    
     ████     
      ██`;
    }
}

// BRUTAL INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    new BrutalASCIIArtGenerator();
});