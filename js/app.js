// Main Vue App
const { createApp } = Vue;

createApp({
    components: {
        HomeComponent,
        HeadsUpComponent,
        ScenariosComponent
    },
    data() {
        return {
            currentView: 'home',
            celebrities: [],
            scenarios: []
        }
    },
    methods: {
        navigate(view) {
            this.currentView = view;
        },
        async loadCelebrities() {
            try {
                const response = await fetch('data/celebrities.txt');
                const text = await response.text();
                this.celebrities = text.split('\n').filter(line => line.trim());
            } catch (error) {
                console.error('Error loading celebrities:', error);
            }
        },
        async loadScenarios() {
            try {
                const response = await fetch('data/scenarios.txt');
                const text = await response.text();
                this.scenarios = text.split('\n').filter(line => line.trim());
            } catch (error) {
                console.error('Error loading scenarios:', error);
            }
        }
    },
    mounted() {
        this.loadCelebrities();
        this.loadScenarios();
    }
}).mount('#app');
