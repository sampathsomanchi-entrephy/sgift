// Vue Components
const HomeComponent = {
    template: `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-pink-600 text-center mb-8">Anniversary Games 💕</h1>
            <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div @click="$emit('navigate', 'headsup')" class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-pink-200">
                    <h2 class="text-2xl font-bold text-pink-500 mb-4">🎭 Heads Up!</h2>
                    <p class="text-gray-600">Guess the celebrity! Hide, show, and celebrate when you get it right.</p>
                </div>
                <div @click="$emit('navigate', 'scenarios')" class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-pink-200">
                    <h2 class="text-2xl font-bold text-pink-500 mb-4">🎲 Random Scenarios</h2>
                    <p class="text-gray-600">What would you do? Explore fun hypothetical situations together.</p>
                </div>
                <div @click="$emit('navigate', 'wavelength')" class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-pink-200">
                    <h2 class="text-2xl font-bold text-pink-500 mb-4">🌊 Wavelength</h2>
                    <p class="text-gray-600">Read minds by guessing where concepts fall on a spectrum between opposites.</p>
                </div>
            </div>
        </div>
    `,
    emits: ['navigate']
};

const HeadsUpComponent = {
    template: `
        <div class="container mx-auto px-4 py-8">
            <button @click="$emit('navigate', 'home')" class="mb-4 bg-pink-200 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-300">← Back</button>
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 class="text-3xl font-bold text-pink-600 mb-6">🎭 Heads Up!</h2>
                
                <div v-if="timer > 0 && timerActive" class="mb-4 text-xl font-bold text-red-500">
                    Time: {{ Math.floor(timer / 60) }}:{{ (timer % 60).toString().padStart(2, '0') }}
                </div>
                
                <div class="mb-6">
                    <div v-if="showCelebrity" class="text-2xl font-bold text-gray-800 mb-4">{{ currentCelebrity }}</div>
                    <div v-else class="text-2xl text-gray-400 mb-4">Celebrity Hidden</div>
                </div>
                
                <div class="space-y-4">
                    <div class="grid grid-cols-3 gap-2">
                        <button @click="showCelebrity = false" class="bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 text-sm font-medium">Hide</button>
                        <button @click="showCelebrity = true" class="bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 text-sm font-medium">Show</button>
                        <button v-if="!timerActive" @click="startTimer" class="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 text-sm font-medium">Timer</button>
                        <div v-else class="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-medium text-center">{{ Math.floor(timer / 60) }}:{{ (timer % 60).toString().padStart(2, '0') }}</div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <button @click="gotIt" class="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 text-lg font-bold">Got it! 🎉</button>
                        <button @click="nextCelebrity" class="bg-pink-300 text-pink-700 px-8 py-3 rounded-lg hover:bg-pink-400 text-lg font-bold">Next →</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['celebrities'],
    emits: ['navigate'],
    data() {
        return {
            currentCelebrityIndex: 0,
            showCelebrity: false,
            timer: 60,
            timerActive: false,
            timerInterval: null
        }
    },
    computed: {
        currentCelebrity() {
            return this.celebrities[this.currentCelebrityIndex] || 'Loading...';
        }
    },
    methods: {
        startTimer() {
            this.timer = 60;
            this.timerActive = true;
            this.timerInterval = setInterval(() => {
                this.timer--;
                if (this.timer <= 0) {
                    this.stopTimer();
                    alert('Time\'s up! 🕐');
                }
            }, 1000);
        },
        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            this.timerActive = false;
        },
        gotIt() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        },
        nextCelebrity() {
            this.currentCelebrityIndex = (this.currentCelebrityIndex + 1) % this.celebrities.length;
            this.showCelebrity = false;
            // Reset timer when next button is clicked
            this.stopTimer();
            this.timer = 60;
        }
    },
    beforeUnmount() {
        this.stopTimer();
    }
};

const WavelengthComponent = {
    template: `
        <div class="container mx-auto px-4 py-8">
            <button @click="$emit('navigate', 'home')" class="mb-4 bg-pink-200 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-300">← Back</button>
            <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-3xl font-bold text-pink-600 mb-6 text-center">🌊 Wavelength</h2>
                
                <div class="mb-6 text-center">
                    <div class="text-xl font-bold text-gray-800 mb-4">{{ currentSpectrum.left }} ← → {{ currentSpectrum.right }}</div>
                    <div class="bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 h-8 rounded-lg relative mx-auto max-w-md">
                        <div class="absolute top-0 h-8 bg-green-400 opacity-70 rounded" 
                             :style="{ left: targetPosition + '%', width: '15%' }"></div>
                        <div v-if="showTarget" class="absolute top-0 h-8 bg-green-600 border-2 border-green-800 rounded" 
                             :style="{ left: targetPosition + '%', width: '15%' }"></div>
                        <div v-if="guessPosition !== null" class="absolute top-0 h-8 w-1 bg-black" 
                             :style="{ left: guessPosition + '%' }"></div>
                    </div>
                </div>

                <div class="text-center space-y-4">
                    <div v-if="!gameStarted" class="space-y-4">
                        <button @click="startRound" class="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 text-lg font-bold">Start Round</button>
                    </div>
                    
                    <div v-if="gameStarted && !showTarget" class="space-y-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 mb-2">Move the dial to make your guess:</label>
                            <input type="range" min="0" max="85" v-model="guessPosition" 
                                   class="w-full max-w-md mx-auto block">
                        </div>
                        <button @click="lockInGuess" class="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 text-lg font-bold">Lock In Guess</button>
                    </div>
                    
                    <div v-if="showTarget" class="space-y-4">
                        <div class="text-lg font-bold" :class="scoreClass">{{ scoreText }}</div>
                        <button @click="nextRound" class="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 text-lg">Next Round →</button>
                    </div>
                </div>

                <div class="mt-8 text-center">
                    <div class="text-sm text-gray-600 max-w-2xl mx-auto">
                        <p class="mb-2"><strong>How to Play:</strong> The Psychic gives a clue for where a concept falls on the spectrum. The team guesses by moving the dial.</p>
                        <p>Green zone = target area. Get as close as possible to score points!</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['spectrums'],
    emits: ['navigate'],
    data() {
        return {
            currentSpectrumIndex: 0,
            targetPosition: 50,
            guessPosition: null,
            gameStarted: false,
            showTarget: false
        }
    },
    computed: {
        currentSpectrum() {
            return this.spectrums[this.currentSpectrumIndex] || { left: 'Loading...', right: 'Loading...' };
        },
        scoreText() {
            if (this.guessPosition === null) return '';
            const distance = Math.abs(this.guessPosition - (this.targetPosition + 7.5));
            if (distance <= 7.5) return '🎯 Perfect! 4 Points';
            if (distance <= 15) return '🎉 Great! 3 Points';
            if (distance <= 25) return '👍 Good! 2 Points';
            if (distance <= 35) return '👌 Close! 1 Point';
            return '😅 Miss! 0 Points';
        },
        scoreClass() {
            if (this.guessPosition === null) return '';
            const distance = Math.abs(this.guessPosition - (this.targetPosition + 7.5));
            if (distance <= 15) return 'text-green-600';
            if (distance <= 35) return 'text-yellow-600';
            return 'text-red-600';
        }
    },
    methods: {
        startRound() {
            this.targetPosition = Math.random() * 85;
            this.guessPosition = 42.5;
            this.gameStarted = true;
            this.showTarget = false;
        },
        lockInGuess() {
            this.showTarget = true;
        },
        nextRound() {
            this.currentSpectrumIndex = (this.currentSpectrumIndex + 1) % this.spectrums.length;
            this.gameStarted = false;
            this.showTarget = false;
            this.guessPosition = null;
        }
    }
};
    template: `
        <div class="container mx-auto px-4 py-8">
            <button @click="$emit('navigate', 'home')" class="mb-4 bg-pink-200 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-300">← Back</button>
            <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 class="text-3xl font-bold text-pink-600 mb-6">🎲 Random Scenarios</h2>
                <div class="mb-6">
                    <p class="text-lg text-gray-800 leading-relaxed">{{ currentScenario }}</p>
                </div>
                <button @click="nextScenario" class="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 text-lg">Next Scenario →</button>
            </div>
        </div>
    `,
    props: ['scenarios'],
    emits: ['navigate'],
    data() {
        return {
            currentScenarioIndex: 0
        }
    },
    computed: {
        currentScenario() {
            return this.scenarios[this.currentScenarioIndex] || 'Loading...';
        }
    },
    methods: {
        nextScenario() {
            this.currentScenarioIndex = (this.currentScenarioIndex + 1) % this.scenarios.length;
        }
    }
};
