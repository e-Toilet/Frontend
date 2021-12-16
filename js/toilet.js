const showtoilet = new Vue({
    el: '#showtoilet',
    data: {
        toilets: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getToiletByLoc?district_id=36')
        .then((response) => {
            result = JSON.parse(response.data.Toiletinfo)
            showtoilet.toilets = result
        })
    },
    methods: {
    }
})
