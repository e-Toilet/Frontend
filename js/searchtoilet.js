const searchtoilet = new Vue({
    el: '#searchtoilet',
    data: {
        countries: [],
        cities: [],
        districts: [],
        selected: {
            country_id: "-1",
            city_id: "-1",
            district_id: "-1",
        }
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getAllCountry')
            .then((response) => {
                result = JSON.parse(response.data.CountryInfo)
                searchtoilet.countries = result
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
    },
    methods: {
        test: () => {

        }
    }
})
