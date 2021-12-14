const searchtoilet = new Vue({
    el: '#searchtoilet',
    data: {
        countries: [],
        cities: [],
        districts: [],
        selected: {
            country: "國家",
            city: "城市",
            district: "地區",
            country_id: "",
            city_id: "",
            district_id: "",
            country_name: "",
            city_name: "",
            district_name: ""
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
