// Main Vue App
const { createApp } = Vue;

createApp({
    components: {
        HomeComponent,
        HeadsUpComponent,
        WavelengthComponent,
        ScenariosComponent
    },
    data() {
        return {
            currentView: 'home',
            celebrities: [],
            scenarios: [],
            spectrums: []
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
        },
        async loadSpectrums() {
            try {
                const response = await fetch('data/spectrums.txt');
                const text = await response.text();
                this.spectrums = text.split('\n').filter(line => line.trim()).map(line => {
                    const [left, right] = line.split(' vs ');
                    return { left, right };
                });
            } catch (error) {
                console.error('Error loading spectrums:', error);
            }
        }
    },
    mounted() {
        this.loadCelebrities();
        this.loadScenarios();
        this.loadSpectrums();
    }
}).mount('#app');
