const app = new Vue({
    el: '#app',
    data: {
        toilets: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getAllToilet')
                .then( (response) => {
                    result = JSON.parse(response.data.Toiletinfo)
                    app.toilets = result  
                })
    },
    methods: {
        test2: () => {
        }
    }
})