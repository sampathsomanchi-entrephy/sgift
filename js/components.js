// Vue Components
const HomeComponent = {
    template: `
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-pink-600 text-center mb-8">Anniversary Games 💕</h1>
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div @click="$emit('navigate', 'headsup')" class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-pink-200">
                    <h2 class="text-2xl font-bold text-pink-500 mb-4">🎭 Heads Up!</h2>
                    <p class="text-gray-600">Guess the celebrity! Hide, show, and celebrate when you get it right.</p>
                </div>
                <div @click="$emit('navigate', 'scenarios')" class="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-pink-200">
                    <h2 class="text-2xl font-bold text-pink-500 mb-4">🎲 Random Scenarios</h2>
                    <p class="text-gray-600">What would you do? Explore fun hypothetical situations together.</p>
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
        }
    },
    beforeUnmount() {
        this.stopTimer();
    }
};

const ScenariosComponent = {
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
