const showtoilet = new Vue({
    el: '#showtoilet',
    data: {
        toilets: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getAllToilet')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toilets = result
                console.log(result)
            })
    },
    methods: {

    }
})
