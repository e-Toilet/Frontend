const showtoilet = new Vue({
    el: '#showtoilet',
    data: {
        toilets: [],
        toiletinfo: [],
        reviews: [],
        countries: [],
        cities: [],
        districts: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getToiletByLoc?district_id=36')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toilets = result
            })
        axios.get('http://140.115.87.117:8090/getToiletByID?toilet_id=1')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toiletinfo = result
                //                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getReview?toilet_id=1')
            .then((response) => {
                result = JSON.parse(response.data.Reviewinfo)
                showtoilet.reviews = result
                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getAllCountry')
            .then((response) => {
                result = JSON.parse(response.data.CountryInfo)
                searchtoilet.countries = result
                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getAllCity')
            .then((response) => {
                result = JSON.parse(response.data.CityInfo)
                searchtoilet.cities = result
            })
        axios.get('http://140.115.87.117:8090/getAllDistrict')
            .then((response) => {
                result = JSON.parse(response.data.DistrictInfo)
                searchtoilet.districts = result
            })
    }
})